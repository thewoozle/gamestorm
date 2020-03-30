	<template>
      
      <div class="page_wrapper" ref="app" id="app" :class="[pageName, pageType, pageClasses.pageReady,pageClasses.showMenu,pageClasses.showSlideout,pageClasses.fixFooter]">
     
         <span id="loading" :class="showSpinner? 'show' : ''"><span class="spinner" ></span></span>
         
         <div class="system_messages" :class="systemMessages.length > 0? 'show' : ''">
            <span class="message" v-for="message in systemMessages" v-text="message"></span>
         </div>
         
         <div class="reset_password" v-if="urlParams.c">
            <div class="" v-if="$store.dispatch('validate_reset', {reset_code: urlParams.c})">
               <span class="warning" v-if="!urlParams.c"> Warning, unknown user. Please request a new password reset link</span>
               <button type="button" class="button close_button fal fa-times" @click="()=>{urlParams = {};}" ></button>
            
               <changepassword />  
            </div>
            <div class="reused_reset" v-else >
               RESET CODE ALREADY USED
            </div>
         </div>
                        
         
         <div class="login_page"  v-else-if="showOverlay == 'login'">
            <login_page/>
         </div>
         
         
         <div class="main_page" v-else>      
         
            <main_menu class="main_menu "  v-if="pageType == 'public' "/>
               <header class="page_header">
               
                  <button class="signin_button" id="sign-in_button" @click.prevent="showSignIn? showSignIn = false: showSignIn=true">Sign In @{{showSignIn}}</button>
                  
               <admin_page_header v-if="pageType == 'admin' " />		
               <reg_page_header v-else-if="pageType == 'registration'" />	
               <scheduling_page_header v-else-if="pageType == 'scheduling'" />		
               <page_header v-else />
               </header>
               
               
              
            <main class="main_content " ref="main_content" @scroll="handle_page_scroll">
               
               
               <router-view class="main_view"/>
               
                
               <page_footer v-if="pageType == 'public' " />
            </main>
            
         </div>   
	  </div>
	</template>

	
	
	
	
	<script>
		import Vue from 'vue'
		import page_header from '@/components/includes/page_header'
		import admin_page_header from '@/components/includes/admin_page_header'
		import reg_page_header from '@/components/includes/reg_page_header'
		import scheduling_page_header from '@/components/includes/scheduling_page_header'
		import main_menu from '@/components/includes/main_menu'	
		import Router from 'vue-router'
      import changepassword from '@/components/includes/change_password'
      
		
		import page_footer from '@/components/includes/page_footer'	
		import {apiDomain} from './config'
      import {mapState, mapGetters} from 'vuex'
      
      import event_submission_form from '@/components/includes/event_submission_form'
      import user_events_list from '@/components/includes/user_events_list'
      
      import login_page from '@/components/login_page'
		
		Vue.use(Router)
		export default {
		  name: 'App',
		  
		data() {
			return {
				pageClasses	: [],
				topdistance	: 0,
				pageType	   : 'public',
				showSignIn  : false,
            showDevNotes: false,
            urlParams   : {},
            showSpinner : true,
            showOverlay : '',
			}
		},  
		  
		components: {
			'page_header' 		: page_header ,
			'admin_page_header'	: admin_page_header,
         'scheduling_page_header': scheduling_page_header,
			'reg_page_header'	: reg_page_header,
			'main_menu' 		: main_menu,
			'page_footer'		: page_footer,
         'changepassword'  : changepassword,
         'event_submission_form': event_submission_form,
         'user_events_list': user_events_list,
         'login_page'      : login_page,
		},
		  computed: {
           ...mapState({
               devNotes    : 'devNotes',
               currentCon  : 'currentCon',
               systemMessages: 'systemMessages',
               userEvents  : 'userEvents',
           }),
           ...mapGetters({
              user      : 'user',
           }),
			pageName() {
				return this.$route.name;
			},
		  },
		  
			beforeCreate() { 
            var vm = this;
            vm.$store.dispatch('get_site_data').then(()=>{});         
         },
			
		  created() {
            var vm = this;
            let _urlParams = new URL(window.location.href);
            let resPassword = _urlParams.searchParams.has('c');
            let login = _urlParams.searchParams.has('login');
            
            console.log(login);
            
            if(!vm.$route.name ) { vm.$router.push({name: 'mainpage'});}
            if(login == true) {
               vm.showOverlay = 'login';
               vm.showSpinner = false;
            } else if(resPassword == true) {
               _urlParams? vm.urlParams.c = new URL(window.location.href).searchParams.get('c') : vm.urlParams = {}; 
            }        
				vm.handle_page_load();  
		  },
		  
		  
		  watch: {
				pageName(name) {
					this.set_page_type(name);
				},
            
            user:function(newval, oldval) {
               var vm = this;
               if(!newval.uuid) {
                  if(vm.$route.name == 'mainpage') { vm.$router.push({name: 'mainpage'});}
               }
            },
            
            $route(to, from) {
               var vm = this;
               vm.$store.dispatch('reset_activity_timer');
            },
            
		  },
		  
		  
		  
		  methods: {
			  
			  
			// HANDLE PAGE SCROLL
			handle_page_scroll(e) {
				if (this.$route.name == 'mainpage') {
					var vm = this,
						app = vm.$refs.app;
						
					if (e.target.scrollTop >1 && e.target.scrollTop <=40  ) {
						app.classList.remove('scroll_80', 'scroll_120', 'scroll_160');
						app.classList.add('scroll_40');
					}else if (e.target.scrollTop >40 && e.target.scrollTop <=80 ) {
						app.classList.remove('scroll_40',  'scroll_120', 'scroll_160');
						app.classList.add('scroll_80');
					}else if (e.target.scrollTop >80 && e.target.scrollTop <=120 ) {
						app.classList.remove('scroll_40', 'scroll_80',  'scroll_160');
						app.classList.add('scroll_120');
					}else if (e.target.scrollTop >120)  {
						app.classList.remove('scroll_40', 'scroll_80', 'scroll_120', );
						app.classList.add('scroll_160');
					} else {
						app.classList.remove('scroll_40', 'scroll_80', 'scroll_120', 'scroll_160');
					}	
				
               vm.$store.dispatch('reset_activity_timer');
				}
			},
         
         
         
			
			
			handle_page_load() {
				var vm = this;
            
            vm.$store.dispatch('check_user').then(()=>{});
            
				vm.$store.dispatch('update_page_status', {pageReady: 'ready'}).then(() => {
					vm.pageClasses = this.$store.state.pageStatus;	
					// vm.$store.dispatch('get_con_events').then(() => {
               vm.showSpinner = false;	
               // });  
				});
            vm.set_page_type(vm.pageName);
			},
			
			set_page_type(name) {
            console.log(name);
				var vm = this;
				switch(name) {
					case 'adminpage':
               case 'newspage':
						vm.pageType = 'admin';
						break;
						
						
					case 'registrationpage':
               case 'atconpurchase':
               case 'regreportspage':
						vm.pageType = 'registration';
						break;
					
               case 'schedulingpage':
                  vm.pageType = 'scheduling';
                  break;
					default: 
						vm.pageType = 'public';
				}
            console.log('use store to hold page type and name');
				//console.log('name:'+name+' / ' + vm.pageType);
			},
			
			
			  
		  }
		}
	</script>

	
	
	
	
	
	
	<style>
		
	/*	-----------------------------------------------------------------------------------------------------
										COLOR GUIDE / theme variables
		-----------------------------------------------------------------------------------------------------	*/	
		:root {
			--mainColor				: #0C0D0F; 					
			--backgroundColor		: #1c1d1f;			
			--borderColor			: #B9BEC0;	
			--borderColor2			: #0c485f;
			--borderColor3			: #0076A3;			
			--lightColor			: #fff;
			--contrastColor		: #665976;
			--passColor				: #7adc8a;	
         --activeColor        : #008000;
			--button2				: #42634e;
			--textColor				: #fbffea;
			--textColor3			: #5590d9;	
			--textColor2			: #6e6673;
			--textColor4			: #182c35;
			--titleColor			: #a8d4f5;
			--button				   : #182c35;
			--buttonHighlight		: rgba(28,63,79,.75);
			--backHighlight		: rgba(168, 212, 245, .5);			
			--sectionBackground	: #374146;
			--linkColor				: #ae9868;		
			--glowColor				: #98c6ff;
			--warningColor         : #c50d0d;
			--highlightColor		: #F7D17D;

			
			--altBackground		: #f9f7ec;
			--altColor				: #ebeeff;
         --altBackground2     : #c4decd;
         
							
			
			--borderRadius			: .25rem;
			--blackBoxShadow 		: inset 0px 1px 2px rgba(255,255,255,.25), 
									inset 0px -10px 20px rgba(0,0,0,0.6), 
									inset 0 35px 60px -12px rgba(255,255,255,.1);
		}
		
		
		/*  -----------------------------------------------------------------------------------------------------
										COLOR GRADIENTS
			-----------------------------------------------------------------------------------------------------
		*/	
		
		
		/*  -----------------------------------------------------------------------------------------------------
										ANIMATIONS
			-----------------------------------------------------------------------------------------------------
		*/

		/*	------------	Spinner	------------	*/
			
		@-moz-keyframes spin {
			from { -moz-transform: rotate(0deg); }
			to { -moz-transform: rotate(360deg); }
		}
		@-webkit-keyframes spin {
			from { -webkit-transform: rotate(0deg); }
			to { -webkit-transform: rotate(360deg); }
		}
		@keyframes spin {
			from {transform:rotate(0deg);}
			to {transform:rotate(360deg);}
		}

		
		 
		/*  -----------------------------------------------------------------------------------------------------
										GENERAL  TYPOGRAPHY
			-----------------------------------------------------------------------------------------------------	*/
		
		/*	---	Source Sans Pro (200, 300, 400, 600, 700) 	---*/		
		.admin_page .article_content .label,
		.article .title,
		.article .article_meta .title,
      textarea,
		select,
		input,
		* {
			font-family: 'Source Sans Pro', Arial, sans-serif;
		}
		
		
		/*	------	Dosis	------	*/
		.news_date,
		.paragraph_title,
		.post_date,
		.button,
		.control,
		.title,	
		.page_header .header_blurb .item,
		.copywrite,	
		.page_footer .title,
		.label,
		.subnav_link,
      .admin_title,
		.form_section_title,
		.article_content,
		.slide_label,
		.subtitle,
		.nav_link,
		.response_icons .text,
		.link {
			font-family: Dosis, sans-serif;
			letter-spacing: .05em;
		}	
		
		/*	------	AVQUEST	------ */
		.con_title {
			font-family: Avquest, serif;
			font-size: 3rem;
			letter-spacing: .2em;
		}
		
		/*	------	Bangers	------	*/
		.site_title,
		.subsection_title,
		.section_title {
			font-family: Bangers, sans-serif;
			letter-spacing: .15em;
		}
		
		
		
		/*	-- Lovers Quarrel --- */
		.gs_num	{
			font-family: LoversQuarrel, cursive;
		}
		
		* {
			color: #eef0f3;
			color: var(--textColor);
		}
		/*------	Quattrocento	------*/
		
		.section.events_slideout .gm_tos .content,
		.copyright {
			font-family: Quattrocento, serif;		
		}
		/*	---		font-awesome	---	*/
		.fa:before {
			font-family: fontAwesome;
		}
		a {
			color :#FFFEF0;
			color: var(--textColor);
		}
		#menu_button:hover,
		a:hover {
			color: var(--borderColor);	
			color: var( --silverSand);
		}
		
		/*	------	TITLES	------	*/		
      
		.site_title {
			font-size: 2.85rem;
			text-transform: uppercase;
			letter-spacing: .05em;
			font-weight: lighter;
			color: #a8d4f5;
			color: var(--titleColor);
			text-align: center;
			text-shadow: -1px -1px 0px rgba(0,0,0,0.15);		
		}
		.page_title {
         
         justify-content: center;
			font-size: 2.25rem;
         line-height: 1.5em;
			text-transform: uppercase;
         color: var(--altColor);
         text-shadow: -1px -1px 4px rgba(190,0,0,0.5);
	}
	
      
		.section_title {
			
         justify-content: flex-start;
			width: 100%;
			font-size: 2rem;
			line-height: 1.5em;
			font-weight: 600;
			text-transform: uppercase;
			padding: 0 0 0 25px;
			color: var(--titleColor);		
			text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
		}
      .section_title .text {
         min-width: 50%;
         justify-content: flex-end;
         text-align: right;
      }
		.admin_title {
			
			width: 100%;
			
			width: 100%;
         font-size: 2rem;
         line-height: 1em;
         font-weight: 100;
         text-shadow: none;
      }
		.sections > .section_title {
			text-align: center;
		}
		.subsection_title {
			font-size: 1.1rem;
			display: inline-block;
			width: 100%;
			font-weight: normal;
			color: var(--textColor3);
			text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
		}
		.subtitle {
			font-size: 1.25em;
			text-transform: uppercase;
		}
		.form_section_title {
			
			width: 100%;
			text-transform: uppercase;		
			margin-top: .5rem;
			padding: .5rem 0;
			font-size : 1.1rem;
			text-align: left;
			font-weight: lighter;
		}
		.editable .paragraph_title,
		.paragraph_title {
			font-weight: bold;		
			letter-spacing: .05em;
			text-transform: uppercase;
		}
			
		
		/*  -----------------------------------------------------------------------------------------------------
										COMMON STYLES
			-----------------------------------------------------------------------------------------------------    */ 
		.ct-widget.ct-dialog * {
			color: #444;
		}
		.ct-widget.ct-ignition {
			transform:translateY(3rem);
		}
		.editable .paragraph_title + p {
			margin-top: 0;
		}
		
      .fake_slider {
         position: absolute;
            z-index: 25
            ;
         display: inline-block;
         overflow: auto;
      }
      .fake_slider .content {
         display: inline-block;
         width: 0;
         height: 0;
      }
      .hidden {
         display: none!important;         
      }
   
   
		.data_view {
			
			flex-direction: column;	
			align-items: center;
			position: fixed;		
				z-index: 101;
				left: 1rem;
				top: calc(100vh - 2rem);
			width: 10rem;
			height: calc(100vh - 2rem);
			overflow: hidden;
			opacity: .5;
			padding: 0;
			cursor: pointer;
			background: #e0e0a5;	
			transition: top .3s, opacity .3s, width .3s, padding .3s, left .3s;
		}
		.data_view:nth-of-type(n+2) {	left: 12rem; }
		.data_view:nth-of-type(n+3) {	left: 23rem; }
		.data_view:nth-of-type(n+4) {	left: 34rem; }
		.data_view:nth-of-type(n+5) {	left: 45rem; }
		.data_view:nth-of-type(n+6) {	left: 56rem; }
		.data_view:nth-of-type(n+7) {	left: 67rem; }
		
		.data_view .title {
					
			padding: .5rem 1rem;
			color: #222;
			width: 100%;
			justify-content: center;
			align-items: center;
			line-height: 1em;
		}
		.data_view:hover {
			opacity: 1;		
			padding: .5rem 0;
			top: calc(100vh - 3rem);
		}
		.data_view.show {
			top: 2rem;
			background: #ffffea;	
			left: 0!important;
			opacity: 1;
			padding: 2rem 0;
			overflow-Y: auto;
			width: 100vw; 
		}
		.data_view pre {
			
			margin: 1rem 0;
			color: #222;
			pointer-events: none;
			font-size: 1.1rem;
			font-weight: 300;
		}
      
      .list_button {
         
            justify-content: center;
            text-align: center;
         font-size: 1.5rem;
         height: 1.15em;
         line-height: 1.15em;
         width: 2rem;         
         color: var(--button);
         border-radius: .15rem;
         cursor: pointer;
         background: none;
      }
      .list_button:hover {
         background: var(--buttonHighlight);
         opacity: .65;
         color: var(--lightColor);
      }
		
		/*	------------	MINI REPORT	------------	*/
		.mini_report {
			
			justify-content: space-between;
			flex-wrap: wrap;
		}
		.mini_report .report_widget {
			
			align-items: flex-start;
			flex-wrap: wrap;
			background: var(--altBackground);
			padding: .75rem 1rem;
			border: solid 1px var(--borderColor);
			border-radius: .2rem;
		}
		.mini_report .widget_title {
			
			justify-content: center;
			width: 100%;
			font-weight: 300;
			font-size: 1.5rem;
			letter-spacing: .05em;
			color: var(--contrastColor);		
		}
		.mini_report .info_wrapper {
			
			flex-wrap: wrap;
			justify-content: space-around;
		}
		.mini_report .elements {
			
			flex-wrap: wrap;
		}
		.mini_report .info_element {
			
			width: 100%;
			justify-content: space-between;
			flex-wrap: wrap;
		}
		.mini_report .info_item {
			
			align-items: center;
			justify-ontent: space-between;
		}
		
		.mini_report .name,
		.mini_report .date,
		.mini_report .value {
			
			text-align: right;
			padding: 0 .25rem;
			justify-content: flex-end;
		}
		.mini_report .name {
			position: relative;
			width: 20rem;
			line-height: 1em;
			color: var(--textColor2);
			padding-right: .25rem;
			margin-right: .5rem;
			align-items: center;
		}
		.mini_report .name:after {
			content: ':';
			position: absolute;
				top: 0;
				left: 100%;
			height: 100%;
			width: 1rem; 
			
			align-items: center;
			font: inherit;
		}
		.mini_report .value,
		.mini_report .date{
			color: var(--textColor4);
			font-weight: bold;
		}
		.mini_report .value {
			width: 6rem;
		}
		.mini_report .date{
			width: 16rem;
		}

		
      .system_messages {
         position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
         width: 100%;  
         max-height: 0;
         overflow: hidden;
         opacity: 0;
         background: rgba(255,255,255,.9);
         color: var(--mainColor);
         justify-content: center;
         padding: 0 2rem;
         align-items: center;
         flex-direction: column;
         transition: top .4s, opacity .4s, z-index .4s, max-height .4s, padding .4s;
      }
      .system_messages.show {
         top: 0;
         opacity: 1;
         z-index: 90;
         padding: 1rem 2rem;
         max-height: 10rem;
      }
      .system_messages .message {
         width: auto;
         font-size: 1.5rem;
         color: var(--warningColor);
      }
      .system_messages .message +.message {
         margin-top: 1rem;
         
      }
		
		
		/*	------------	SCROLL BAR (webkit)	------------	*/	
		::-webkit-scrollbar {
			width: 1.25rem;
			height: 1.25rem;
		}
		::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
			background: #151515;
			border-radius: .25rem;
		}
		::-webkit-scrollbar-thumb {
			border-radius: .25rem;
			transform:translateY(.1rem);
			cursor: pointer;
			background: #0c485f;
			-webkit-box-shadow: inset 1px 1px 1rem rgba(33,34,35,0.5),
				2px 2px 5px rgba(0,0,0,0.3); 
		}
		::-webkit-scrollbar-thumb:hover {
			-webkit-box-shadow: inset 1px 1px 1rem rgba(33,34,35,1),
				2px 2px 5px rgba(0,0,0,0.3); 
		}
		
		.disabled {
			pointer-events: none!important;
			filter: grayscale(.65) blur(1px) !important;
			opacity: .5 !important;
		}
		
		
		.error_message {
			font-size: .9rem;
			color: var(--highlightColor);
			text-align: center;
			font-weight: 300;
			text-shadow: -1px -1px 1px rgba(0,0,0,.1);
		}
		.editable p {
			font: inherit;
			text-shadow: inherit;
		}
		
		/*	------	REPORT BOX	------	*/
		
		.report_box {
			
			align-items: center;
			flex-wrap: wrap;
			width: 100%;
			max-width: 16rem;
			height: 5rem;	
			padding: .5rem;		
			border: solid 2px var(--borderColor, #fff);
			border-radius: var(--borderRadius);
			background: #7eaebb;
		}
		.report_box .item {
			
			justify-contnet: space-between;
			width: 100%;
			margin: .25rem 0;
		}
		.report_box .item .text {
			
			flex-wrap: wrap;
			align-items: center;
			height: 2rem;
			width: 10rem;
			font-size: 1rem;
			line-height: 1rem;
			font-weight: 300;
			
		}
		.report_box .item .value{
			position: relative;
			
			font-size: 2rem;
			font-weight: bold;
			width: 4rem;
			justify-content: flex-end;
			height: 2rem;
			line-height: 2rem;
		}
		.report_box .item .value:after {
			content: ':';
			position: absolute;		
				top: 0;
				left: -1rem;
			font: inherit;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
			height: 100%;
			color: #d5d5d5;
			padding-bottom: .25rem;
			line-height: 1.75rem;		
		}
		
		/*------	CONTROL BAR	------	*/
		.control_bar { 
			position: absolute;
				top: 0;
				right: 0;
				z-index: 25;
			width: 3rem;
			margin: .5rem .5rem 0 0;
			
			flex-direction: column;
		}
		.control_bar .control_button + .control_button{ 
			margin-top: .5rem;
		}
		
		.control_button {
			
			width: 3rem;
			height: 3rem;
			line-height: 1.5rem;
			justify-content: center;
			cursor: pointer;
			font-size: 1.5rem;
			color: var(--passColor);
			padding: .25rem;
			background: var(--buttonHighlight);
			border: solid 1px var(--borderColor3);
			border-radius: var(--borderRadius);
		}
		.control_button.active,
		.control_button:hover { 		
			background: none;
			border-color: transparent;
			color: var(--textColor2);
		}
		.control_button:active { 	
			transform:translateY(1px);
         
		}
		.control_button.active { 	
         box-shadow: inset 1px 1px 4px rgba(0,0,0,0.65);
		}
		.control_button .text {
         
         padding-left: .5rem;
         line-height: 1.25em;
         font-family: Dosis, sans-serif;
         letter-spacing: .05em;
      }
		
			
		
		/*	------	SLIDEOUTS	------	*/
		.slideout {
			position: fixed;
				top: 0;
				z-index: 1000;
				right: -100%;
			height: 100vh;	
			max-width: 42rem;
			
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding: 2rem 4rem 2rem 2rem;
			overflow: hidden;
			overflow-Y: auto;
			transition: right .6s ease-in-out;
		}
		.slideout.show {
			right: 0
		}
		
		.slideout .title {
			
			width: 100%;
			font-weight: bold;
			font-size: 1.35rem;
			justify-content: center;
			color: var(--textColor2);
		}
		.slideout .slideout_controls {
			position: absolute;
				top: 0;
				right: 0;
				z-index: 10;
			margin: 1rem;
			width: 3rem;
			
			flex-direction: column;
			
		}
		.slideout_controls .control {
			
			
		}
		.slideout_controls .control + .control {
			margin-top: .5rem;
			
		}
		.slideout .section_content {
			
			margin: 1rem auto;
			min-width: 20rem;
		}
		/*	------	DATE BULLET	------	*/
		.date_bullet {
			
			flex-wrap: wrap;
			align-items: center;
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			background: var(--button);
			color: var(--titleColor);
			text-shadow: -1px -1px 1px rgba(0,0,0,.1);
			border: solid 1px var(--backgroundColor);
		}
		.date_bullet.active {
			background: var(--passColor);
			color: #fff;
		}
		.date_bullet .month {
			
			font-size: .7rem;
			line-height: 1rem;
			width: 100%;
			height: 50%;
			align-items: flex-end;
			justify-content: center;
			text-transform: uppercase;
		}
		.date_bullet .day {
			
			width: 100%;
			height: 50%;
			align-items: flex-start;
			line-height: 1rem;
			padding-top: .1rem;
			letter-spacing: .05em;
			justify-content: center;
			font-size: 1.25rem;
		}
		
		/*	------	INFO ELEMENT	------	*/
		.info_elements {
			
			flex-wrap: wrap;		
		}
		.info_element {
			
			align-items: center;
			justify-content: space-between;
		}
		.info_element img {
			
			width: 6rem;
			height: 6rem;
			margin-right: 1rem;
		}
		.info_element  {
		}
		.info_element {
			
		}
		
		/*	------	SEARCH / SORT BAR	------	*/
		.search_bar {
			 
			flex-wrap: wrap;		
			padding: .5rem;
		}
		.search_bar .search{
			
			width: 100%;
			align-items: center;
			padding: 0 .25rem;
		}
		.search_bar .search .text_box{
			width: 100%;
			padding: .5rem .25rem;
			border-radius: var(--borderRadius);
		}
		.search_bar .buttons {
			
			width: 100%;
			align-items: center;
			justify-content: space-around;
			flex-wrap: wrap;
		}
		.search_bar .sort_button {
				
			border: solid 1px var(--borderColor);
			border-radius: .25rem;
			background: #eee;
			margin: .15rem 0;
			padding: .25rem .5rem;
			cursor: pointer;
		}
		.search_bar .sort_button:hover {
			background: var(--glowColor);
			color: #fff;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
		}

		/*	------	NEWS ITEMS	------	*/
		.news_items {
			
			flex-direction: column;		
		}
		.news_items .news_item {			
			width:  100%;
         position: relative;
			padding: 0 .5rem;
         justify-content: space-between;
		}
		.news_items .news_item + .news_item {	
         margin-top: 1rem;
         padding-top: .6rem;
         border-top: solid 1px var(--borderColor);
      }
		.news_items .news_date {
         width: 3rem;
			justify-content: space-between;
			background: rgba(0,0,0,.1);
			cursor: pointer;
			align-items: center;
			height: 3rem;
			color: var(--highlightColor);
			font-weight: 100;		
		}
		.news_items .news_date:hover {
			color: var(--glowColor);
		}
		.news_items .news_item .title {
			padding: 0 1rem;
			flex-wrap: wrap;
			justify-content: flex-start;
			text-align: left;
			line-height: 1em;
         font-size: 1.35rem;
         color: var(--highlightColor);
			width: calc(100% - 3rem);
			font-weight: 300;
		}
      
		.news_items .article_button {
         position: absolute;
            top: 0;
            right: 0;
            z-index: 10;
         display: flex;
         margin: .65rem;
         justify-content: center;
         align-items: center;
         font-size: 2.5rem;
         width: 1em;
         height: 1em;
         cursor: pointer;
         border-radius: .25em;
         background: rgba(0,118,163,.4);
         color: var(--titleColor);
      }
		.news_items .article_button:hover {
         background: rgba(0,0,0,0.1);
      }
		
		.news_items .news_article {
         flex-wrap: wrap;
         padding: .5rem 1rem;
         width: 100%;
		}
		.news_items .news_article .content {
         margin-top: 0;
         max-height: 0;
         flex-wrap: wrap;
         overflow: hidden;
         transition: max-height .4s, margin .4s, opacity .4s
      }
		.news_items .news_article.show .content {
         margin-top: .5rem;
         max-height: 10rem;
         overflow-Y: auto;
         opacity: 1;
      }
		.news_items .news_article .content p {
         margin: .5rem 0;
      }
		
		
		/*	------	HEADER NAVIGATION		-----	*/
		.page_header .nav_link {
			
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			padding: .25rem 1rem;
			min-width: 8rem;
			height: 2.5rem;
			white-space: normal;
			font-size: .85rem;
			color: var(--passColor);
			font-weight: 300;
			line-height: 1.1em;
			background: var(--button);
			border: solid 1px var(--borderColor2);
			border-radius: .2rem;		
			transition: background .3s,border-color .3s, color .3s;
		}
		.page_header .nav_link + .nav_link {
			margin-left: 2rem;
		}
		.page_header .nav_link:hover {
			background: none;
			border-color: transparent;
			color: var(--titleColor);
		}
		.page_header.nav_link:active {
			transform:translateY(1px);
		}
		
		
		
		
		/*	------	LINKS & BUTTONS	------	*/
		.link {
			font-size: inherit;
			color: var(--titleColor);
			text-shadow: -1px -1px 1px rgba(0,0,0,0.1);		
		}
		.link:hover {
			color: var(--passColor);
			border-bottom: solid 1px var(--passColor);
			margin-bottom: -1px;
		}
		.link:active {
			
		}
		
		
		
		.link_tile {
			position: relative;		
			display: inline-block;
			cursor: pointer;
			line-height: 2rem;
			margin: .25rem 0;
			padding: 0 .25rem;
			color: #0076A3;
			background: var(--button);
			text-shadow: -1px -1px 0px rgba(0,0,0,0.15);
		}
		.close {
			font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
			font-weight: lighter;
		}
		
		.menu_trigger,
		.link_tile  {
			color: var(--titleColor);
		}
		.menu_trigger:hover,
		.header_controls .link_tile:hover  {
			color: #A1C6DC;
		}
		.link_tile:hover {
			background: var(--button2);
			color: var(--lightColor);
			text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
		}
		.link_tile:active {
			transform: translateY(1px);
		}
		.link_tile:before {
			color: var(--backgroundColor);
			text-shadow: 1px 0px 2px rgba(255,255,255,.65);
		}
		
		.link_tile input,
		.link_tile span {
			display: inline-block;
			background: none;
			line-height: inherit;
			color: inherit;
			text-shadow: inherit;
			cursor: inherit;
		}
		.link_tile .icon {
			width: 2rem;
			font-size: 1.25rem;
			text-align: center;	
		}
		.link_tile .text {		
			font-weight: lighter;
			font-size: 1rem;
		}
		
		
		.toggle_button {
			position: relative;
			
					flex-wrap: wrap;
			width: 100%;
			font-size: .9rem;
			height: 80%;
			padding: .25rem .5rem;
			cursor: pointer;
			background: var(--button);
			color: var(--borderColor);
			border: solid 1px var(--button2);
			line-height: 1em;
			border-radius: .25rem;
			transition: color .3s, background .3s;		
		}
		.toggle_button:hover {
			background: none;
			border-color: transparent;
		}
		.toggle_button:active,
		.toggle_button.active {
			background: rgba(0,0,0,0.35);
			box-shadow: 0 -1px 2px rgba(0,0,0,0.5);		
			transform:translateY(1px);		
			color: var(--titleColor);
		}
		.toggle_button .text_wrapper {
			
			width: 100%;
			flex-wrap: wrap;
			color: inherit;
			align-items: center;
			height: 1.85rem;
		}
		.toggle_button .text_wrapper .text {
			
			width: 100%;
			height: 1.8rem;
			align-items: center;
			font-size: .9rem;
			line-height: 1em;
			justify-content: center;
		}
		.toggle_button .text_wrapper .detail {
			
			width: 100%;
			font-size: .8rem;
			line-height: 1em;
			justify-content: center;
		}
		
		.toggle_button .grad_bar {
			position: absolute;
			bottom: .35rem;
			left: 13.5%;
			width: 75%;
			height: .25rem;
         border-radius: .1rem;
         background: var(--glowColor);
			opacity: 0;
		}
		.toggle_button .checkbox {
			position: absolute;
			z-index: -1;
			opacity: 0;
		}
		.toggle_button:hover .grad_bar {
			opacity: .15;
		}		
		.toggle_button.active .grad_bar {
			opacity: 1;
		}
		
		
		
		
		.button {
			position: relative;
			
			flex-direction: column;
			justify-content: center;
			align-items: center;
			min-height: 2.5rem;		
			width: 10rem;
			background: rgba(0,118,163,.4);
			line-height: 1.25em;
			border-radius: .2rem;
			font-weight: lighter;
			cursor: pointer;
			font-size: 1.5rem;
			color: #a8d4f5;
			padding: .25rem .5rem;		
			color: var(--titleColor);
			letter-spacing: .1em;
			opacity: .85;
			text-shadow: -1px -1px rgba(0,0,0,0.25);
			transition: opacity .3s, color .3s, background .3s;
		}
		.button:hover {
			opacity: 1;
			background: none;
			color: var(--titleColor);
			
			text-shadow: -1px -1px 1px rgba(0,0,0, .15);
		}
		
		
		
		.showhide_trigger {
			cursor: pointer;
		}
		.showhide_content {
			display: none;
			transition:	display .4s,
							max-height .4s,
							z-index .4s,
							opacity .4s;	
		}
		.showhide .close {
			font-size: 1.35rem;
		}
		.showhide_content.clone {
			position: absolute;		
				z-index: -1;
			max-height: 0;	
			display: inline-block;
			opacity: 0;
			padding: 2rem;
			width: 15rem;	
			background: var(--lightColor);
			border: solid 3px red;
			text-align: left;
			border-radius: .25rem;
			box-shadow: 2px 2px 3px rgba(0,0,0,0.5);
		}
		
		.showhide_content.show {
				z-index: 100;
				top: 0;
				left: 50%;
			display: block;	
			max-height: 50rem;
			opacity: 1;
			box-shadow: 2px 2px 2px rgba(0,0,0,0.75);		
		}
		
			
		#loading {
			position: fixed;
				left: 50%;
				top: 50%;
			width: 8rem;
			height: 8rem;
			opacity: 0;
			z-index: -1;
			transform:translate(-4rem, -4rem) scale(1);
			transition:	opacity .8s, height .8s, width .8s, transform .8s, z-index .8s;						
		}
		#loading.show {
			transform:translate(-4rem, -8rem) scale(.25);
			opacity: 1;
			z-index: 1001;
		}
		#loading .spinner {
			display: none;
			width: 100%;
			height: 100%;	
			border-radius: 50%;
			border: 1px solid transparent;
			border-top-color: #2180BA;	
		}
		#loading.show .spinner {
			display: block;
			-webkit-animation: spin 2s linear infinite;
			animation: spin 2s linear infinite;	
      }
		#app.ready #loading .spinner {
			-webkit-animation: none;
			animation: none;
		}
		
		#loading .spinner:before {
			content: "";
			position: absolute;
			top: 5px;
			left: 5px;
			right: 5px;
			bottom: 5px;
			border-radius: 50%;
			border: 1px solid transparent;
			border-top-color: #F27D30;
			-webkit-animation: spin 3s linear infinite;
			animation: spin 3s linear infinite;
		}
		#loading .spinner:after {
			content: "";
			position: absolute;
			top: 15px;
			left: 15px;
			right: 15px;
			bottom: 15px;
			border-radius: 50%;
			border: 1px solid transparent;
			border-top-color: #4DBF8C;
			-webkit-animation: spin 1.5s linear infinite;
			animation: spin 1.5s linear infinite;
		}
		
		.close_button {
			
			justify-content: center;
			align-items: center;
			font-size: 3rem;
			cursor: pointer;
			background: rgba(80,0,0,.25);
			border: solid 1px #700;
			width: 3rem;
			height: 3rem;
			padding: 0;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
		}
		.close_button:hover {
			background: none;
			color: var(--titleColor);
			border-color: transparent;
		} 
		
		
		.popup_message {
			position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			opacity: 0;	
			padding: 2rem;
			width: 100%;
			background: rgba(131,119,82,.35);
         color: #fff;
			
			justify-content: center;
			align-items: center;
			transition: opacity .3s, z-index .3s;
		}
		.popup_message.show {
			opacity: 1;
			z-index: 100;
		}
		
      
	.email_check {
      position:relative;
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 2rem;
   }
	.email_check .icon {
      position: absolute;
         top: calc(50% - 2rem);
         right: 1rem;
         z-index: 10;
      display: flex;
         justify-content: center;
         align-items: center;
      width: 2rem;
      height: 2rem;
      font-size: 1.25rem;
      text-shadow: 0 1px 1px rgba(0,0,0,0.15);
      background: rgba(0,0,0,0.15);
      color: var(--passColor);
   }
	.email_check .icon.fa-user-plus,
	.email_check .icon.fa-exclamation {
      color: var(--warningColor);
      cursor: pointer;
   }
	.email_check .message {
      position: absolute;
         top: 0;
         right: -30rem;
      width: 30rem;
      font-size: .85rem;
      background: #4f0202;
      color: var(--highlightColor);
      padding: .15rem .5rem;
      display: flex;      
      transition: right .5s;
   }
	.email_check .icon:hover ~ .message {
      right: 3rem;
   }
   
		
		
		
		
		/*  -----------------------------------------------------------------------------------------------------
											FORM ELEMENTS
			-----------------------------------------------------------------------------------------------------
		*/ 
		.form_buttons {
			position: absolute;
				top: 0;
				right: 0;
				z-index: 100;
			
			margin: .1rem .1rem 0 0;
			justify-content: space-around;
		}
		.main_content form .form_buttons .form_button {
			
			justify-content: center;
			align-items: center;
			margin: 0 .25rem;
			height: 2rem;
			line-height: 2rem;
			background: var(--borderColor);
			padding: 0 .35rem;
			color: #fff;
			cursor: pointer;
			border-radius: var(--borderRadius);
			border: solid 1px var(--warningColor);
		} 
		
		form .form_info {
			position: absolute;
				top: 0;
				left: 0;
				z-index: 50;
			width: 100%;
			height: 0;
			overflow: visible;
		}
		form .form_info .info_trigger {
			position: absolute;
				top: 1rem;
				right: 1rem;
				z-index: 25;
			color: var(--button2);
			border-radius: 50%;
			font-size: 1.2rem;
			height: 1rem;
			width: 1rem;		
			cursor: pointer;
			text-align: center;
			line-height: 1rem;		
		}
		form .form_info .info_trigger:hover {
			background: var(--button2);
			color: #fff;
		}
		form .form_info .info_content {
			position: absolute;
				top: 0;
				right: 0;
				z-index: 10;
			background: #fff;
			border: solid 1px var(--borderColor);
			padding: 2rem;
			width: 100%;
			color: var(--textColor2);
			transform:scale(0);
			transform-origin: 100% 0;
			box-shadow: 2px 2px 2px rgba(0,0,0,0.25);
			border-radius: var(--borderRadius);
			transition: transform .4s, top .4s, right .4s;
		}
		form .form_info.show .info_content {
			transform:scale(1);	
			top: 2rem;
			right: 2rem;
			width: calc(100% - 4rem);
		}
		
		
		
		.form_wrapper {
			position: relative;		
		}
		.form_wrapper .form {
			display: inline-block;
			margin-right: 2.5rem;
		}
		.input {
			font-weight: lighter;
		}
		.form_section.half {
			display: inline-block;
			width: 49.5%;		
		}	
		.form_row {
			
			justify-content: space-between;
			width: 100%;
			position: relative;
			line-height: 2em;
			padding: .25rem 0;
		}
      .form_row .footnote {
         
         width: 100%;
         font-weight: 100;
         color: var(--highlightColor);
      }
		.form_element {
         position: relative;
			
            flex-wrap: wrap;
            flex: 1; 
			margin: 0 .2
			5rem;
			flex-wrap: wrap;
		}
		.form_row + .form_row {
			margin-top: .75rem;
		}	
		.input_wrapper {
			
			position: relative;
			line-height: inherit;
			flex-wrap: wrap;
		}
		.form_row  .form_error{
			position: absolute;
				top: 100%;
				left: 0;
			width: 100%;
			font-weight: 100;
			font-style: italic;
			transform:translateY(-1.35rem);
			text-align: left;
			line-height: 1em;
			padding: 0 0 0 1rem;
			color: #c3fb87;
			background: rgba(0,0,0,0.1);
			text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
		}
      
		
		.reg_form .form_content.main .form_element .half {
			width: 50%;
		}
		
		.reg_form .form_content.main .form_element.third {
			width: 33%;
		}	
		.form_row .input_wrappers {
			position: relative;
			
			width: 100%;
			flex-wrap: wrap;
		}
		.form_row .input_wrapper {
			position: relative;
			
			padding: 0 1rem;
			flex: 1; 
			flex-wrap: wrap;
		}
		.form_row .input_message {
			position: absolute;
				top: 100%;
				left: 2rem;
				z-index: 10;
			color: #c00;
			padding: 0 .5rem;
			font-size: .75rem;
			font-style: italic;
			transition: line-height .3s;
			line-height: 1rem;
		}

		label {
			position: relative;
			
			flex-wrap: wrap;
			align-items: center;
			width: 8rem;
			justify-content: flex-end;
			padding: 0 4% 0 0;
			text-transform: capitalize;	
			border-right: solid 1px #ccc;
			line-height: 1em;
			color: var(--textColor3);
		}
      .label.top {
         width: 90%;
         padding: 0 0 .5rem 1rem;
         border-right: 0;
         text-align: left;
         justify-content: flex-start;
         flex-wrap: nowrap;
      }
      .label .subtext {
         width: 100%;
         font-size: .65em;
         margin-top: .25em;
         font-style: italic;
         justify-content: inherit;
      }
		label .password_show {
			position: absolute;
				bottom: 0;
				right: 0;		
				z-index: 10;
			cursor: pointer;
			background: none;
			width: 1.5rem;
			text-align: center;
			font-size: 1rem;
			color: var(--titleColor);
		} 
		label .password_show:hover {
			color: var(--textColor3);
		}
		label .password_show.active {
			color: var(--highlightColor);
		}
		.input_wrapper .pass_icon {
			position: absolute;
				top: 0;
				left: 100%;
			
			height: 100%;
			width: 1.5rem;
			justify-content: center;
			align-items: center;
			color: var(--passColor);
		}
		.input_wrapper .pass_icon.fail {
			color: var(--warningColor);
		}
		label .password_show:hover {
			color: var(--button);
		}
		label .required {
			position: absolute;
			top: 50%;
			right: .25rem;
			color: #c00;
			margin-top: .25rem;
			font-size: .65rem;
			font-style: italic;
		}
		form .input_wrapper .response_icons {
			
			width: 2rem;
			align-items: center;
			justify-content: center;
		}
		form .input_wrapper .response_icons .text {
			font-size: .65rem;
			line-height: 1.1rem;
			font-weight: bold;
			padding: 0 0 0 .5rem;
		}
		form .input_wrapper .response_icons .pass {
			color: var(--passColor);
		}
		form .input_wrapper .response_icons .fail {
			color: var(--warningColor);
		}
		form .input_wrapper .input_message {
			position: absolute;
				top: 100%;
				left: -12.5%;
			padding: .15rem .5rem;
			font-weight: 300;
			font-style: italic;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
			background: rgba(0,0,0,0.1);
			width: 125%;
			color: var(--warningColor);
		}
		
		
		.form_element.third label,
		.form_element.half label{
			width: 100%;
			min-height: 2.5rem;
			justify-content: center;
			border-right: 0;
			border-bottom: solid 1px #ccc;
			padding: 0 .5rem .5rem .5rem;
		}
		.form_element.half {
			width: 50%;
			padding: 0 .75rem;
		}
		.form_element.third {
			width: 33.3%;
			max-width: 10rem;
			padding: 0 .5rem;
		}
		.form_element.third .label {
			jsutify-content: center;
		}
		.text_box,
		input[type="number"],
		input[type="text"],
		.select,
		.textarea {
			
			border-bottom: solid 1px #777;
			margin-left: .5rem;
			line-height: 1em;
			color: var(--titleColor);
			font-size: 1.15rem;
			font-weight: 300;
			letter-spacing: .05em;
			width: 100%;
			background: none;
			min-height: 2rem;
			padding: 0 1rem 0 .5rem;
		}
		.select {         
			border: solid 1px #777;
			border-radius: .2em;
         font-size: .9rem;
      }
		.textarea {
			min-height: 3rem;
			border-radius: .2em;
			border: solid 1px #777;
		}
		.checkbox_wrapper {
         position: relative;
         
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
         font-size: 2rem;
			cursor: pointer;
			height: 1em;
			width: 1em;
			border-radius: .25rem;	
		}
		.checkbox_wrapper:before {
         position: absolute;
            top: 0;
            left: 0;
			font-size: 1.1em;
			background: var(--button);
         color: #7d7d7d;
      }
		.checkbox_wrapper label{
			margin-left: 1rem;
		}
		.checkbox_wrapper .checkbox {
			
			position: absolute;
            top: 0;
            left: 0;         
            z-index: 10;
         width: 100%;
         height: 100%;
         opacity: 0;
         cursor: pointer;
		}
		.select option {
			color: var(--button);
			text-transform: capitalize;
		}
		.form_element .pass, 
		.form_element .fail {
			
			align-items: center;
			position: absolute;
				top: 0;
				left: 100%;
			padding: 0 0 0 .5rem;	
			height: 100%;
			width: 5rem;
			font-size: .8rem;
			line-height: 1.1em;
			color: var(--warningColor);
		}
		.form_element .pass {
			font-size: 1.5rem;
			color: var(--passColor);
		}
		.controls {
			margin-top: 1rem;
			
			justify-content: flex-end;
			padding: 0 2rem;
		}
		
		.vdatetime-popup {
			border-radius: .15rem;
		}
		.vdatetime-calendar__current--month,
		.vdatetime-time-picker__item,
		.vdatetime-calendar__month__weekday, .vdatetime-calendar__month__day,
		.vdatetime-calendar__month__weekday > span, .vdatetime-calendar__month__day > span {
			color: var(--textColor2);
		}
		.vdatetime-popup__date {
				font-size: 1.25rem;
				font-weight: bold;
		}
		
		.vdatetime-input {
			color: var(--textColor2);
			background: none;
		}
		
		
		
		
		
		/*	---	validator ---	* /
		form .validator {
			position: absolute;
				right: 10px;
				bottom: 5px;
			line-height: 11px;	
			color: var(--totamPole);
			font-size: 10px;
			text-decoration: underline;
			display: block;
		}
		form .slide_label {
			position: absolute;
			display: inline-block;
			bottom: 0;
			left: 0;
			z-index: 10;
		}
		*/
		.form_wrapper .form_controls { 
			display: inline-block;		
			position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				z-index: 10;
			background: #333;
			border-radius: 0 2px 2px 0;
			text-align: center;
			width: 2.5rem;
		}
		
		.form_wrapper .form_controls .article_control {
			position: relative;
			display: none;
			margin: 0 auto;
			cursor: pointer;
			color: #var(--silverSand);
			stroke: #var(--silverSand);
			font-size: 2rem;
			width: 2rem;
			margin: .5rem 0;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
			opacity: 0;
			pointer-events: none;
			transition: opacity .2s;
		}	
		.form_wrapper .form_controls .article_control .close_icon {
			height: 1.5rem;
		}
		
		.form_wrapper .form_controls .article_control.show {
			display: inline-block;
			opacity: .5;
		}
		.form_wrapper .form_controls .article_control.active {
			display: inline-block;
			opacity: 1;
			pointer-events: auto;
		}
		.form_wrapper .form_controls .control_wrapper .confirm {
			position: relative;
			max-height: 0;
			font-size: 0;
			opacity: .65;
			overflow: hidden;
			transition: max-height .4s,
						opacity .4s;
		}
		.form_wrapper .form_controls .control_wrapper .confirm.active {
			max-height: 4rem;		
		}
		.form_wrapper .form_controls .control_wrapper .confirm .text {
			display: block;
			text-align: center;
			font-size: .65rem;
			line-height: 1.25em;
			font-style: italic;
			color: var(--goldenSand);
		}
		.form_wrapper .form_controls .control_wrapper .confirm .icon {
			color: #00902f;
			font-size: 2rem;
		}
		.form_wrapper .form_controls .control_wrapper .confirm:hover {
			opacity: 1;
		}
		
		form .expanding_row {
			max-height: 0;
			overflow: hidden;
			align-self: flex-start;
			padding: 0;
			line-height: 0;
			transition: line-height .4s, max-height .4s, padding .4s;
		}
		form .expanding_row.show {
			line-height: 1rem;
			max-height: 5rem;
		}		
		
		.page_header {
			display: flex;
         justify-content: center;
			position: fixed;
				top: 0;
				left: 0;
				z-index: 50;
			width: calc(100% - 1rem);
			height: 6rem;
			margin: 0 auto;
			font-size: 0.45rem;
         transition: height .2s;
		}
			
		.page_header .header_inner {
			position: relative;
			display: flex;
         align-items: center;
			justify-content: space-between;
			font-size: 1em;
			height: 100%; 
			width: 100%;	
         max-width: 1300px;
			transition: height .5s, background .5s;
		}	
		
		.page_header .signin_button {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 90;
			display: none;
		}
		/*  -----------------------------------------------------------------------------------------------------
										BASIC PAGE LAYOUT
			-----------------------------------------------------------------------------------------------------    */ 
      div, span, input, img,article, aside, details, fig, section, caption, figure, footer, header, hgroup, label, i, nav, section { display: flex;   }
		body {
			overflow: hidden;
			background: var(--backgroundColor);
		}	
      button {
         cursor: pointer;
      }
		.page_wrapper {
			position: relative;
			width: 100vw;
			height: 100vh;
         justify-content: center;
		}
      .main_page {
         position: relative;
         width: 100%;
         max-width: 90rem;
         min-height: 100vh;
      }
		.page_wrapper.admin {
			background: #f3fcff;
		}
		.page_background {
			
			justify-content: center;
			align-items: center;
			position: fixed;
				top: 0;
				left: 0;			
			width: 100vw;
			height: 100vh;
			background-repeat: no-repeat;
			background-position: 50% 50%;
			background-size: cover;
			opacity: .1;
		}
		.page_background .video {
			
			min-width: 100vw;
			min-height: 100vh;
			visibility: hidden;
			height: auto;
			width: auto;		
			object-position: 50% 50%;
			object-fit: cover;
			background-size: cover;
		}
		.main_content {
         position: relative;
			font-size: 1rem;
			height: calc(100vh - 6rem);
			width: 100%;
			margin: 6rem 0  0 0; 
			padding: 1rem 0 0;         
			white-space: normal;
			overflow: hidden;
			overflow-y: auto;
			background-size: cover;
			background: rgba(0,0,0,0.1);
         transition: margin .2s;
		}
      
   #app.scroll_40 .main_content {
      margin-top: 5.5rem;
   }
   
   #app.scroll_80 .main_content {
      margin-top: 5rem;
   }
   #app.scroll_120 .main_content {
      margin-top: 4.5rem;
   }
   
   #app.scroll_160 .main_content {
      margin-top: 4rem;
   }
   
		.main_view {
			
			flex-wrap: wrap;
			justify-content: space-around;
			min-height: 50vh;
			position: relative;
			width: 100%;
			max-width: 90rem;
         min-height: 100%;
			margin: 0 auto;
		}
		.main_content .sections {
			
            flex-wrap: wrap;
            justify-content: center;
			position: relative;
			width: 100%;
		}
		
		.main_content .section {
			         
			width: 100%;
         max-width:65rem;
		}
      
		
		.page_content {
			position: relative;
				z-index: 10;
			height: 100vh;
			width: 100%;
			font-size: 0;
			left: 0;
			background: #1c1d1f;
			overflow: hidden;
			overflow-Y: auto;
			background: var(--backgroundColor);
			margin: 0 auto;
			padding: .5rem 0 0 0;
			transform-origin: 0 0;
			transition: left .4s, transform .4s, width .4s;
		}
		body.show_nav .page_content {
			left: 30%;
			transform: scale(.7);
			width: 100%;
		}
      
      
		#app .reset_password {
         
         justify-content: center;
         align-items: center;
         position: fixed;
            top: 0;
            left: 0;
         height: 100vh;
         width: 100vw;
         background:   var(--altColor); 
      }
		#app .reset_password form {
         position:relative;
         
         flex-wrap: wrap;
         width: 100%;
         max-width: 35rem;
         margin-bottom: 20%;
         padding: 2rem 1rem;
         background: #fff;
         border: solid 1px var(--borderColor);
         border-radius: .35rem;
      }
		#app .reset_password input {
         color: var(--textColor4);
      }
		#app .reset_password .pass_icon {
         left: 90%;
      }
		#app .reset_password .controls .button {
         color: #fff;
      }
		#app .reset_password .controls .button:hover {
         color: var(--button);
         text-shadow: none;
      }
		#app .reset_password .warning {
         
         width: 100%;
         justify-content: center;
         text-align: center;
         color: var(--warningColor);
         font-style: italic;
      }
		#app .reset_password .close_button {
         position: absolute;
            top: -4rem;
            right: 0;
         font-size: 1.25rem; 
         width: auto;
         padding: 0 1rem;
         color: #fff;
      }
		#app .reset_password .close_button:hover {
         color: var(--warningColor);
      }
		#app .reset_password .reset_message {
         position: absolute;
         bottom: .5rem;
         left: 0;
         width: 100%;
         
         justify-content: center;
         color: var(--passColor);
         font-size: 1.5rem;
         font-style: italic;
      }
      
      
      
		/*  ---------------------------------------------------------------------------------
								EVENTS PLACEHOLDER
			---------------------------------------------------------------------------------  	*/	
      
      .events_placeholder {
         position: fixed;
            top: 6.5rem;
            left: 0;
            z-index: 49;
         
            justify-content: center;
            flex-wrap: wrap;
         overflow: hidden;
         overflow-Y: auto;
         padding: 1rem 2rem;
         align-items: flex-start;
         max-height: calc(100vh - 6.5rem);
         width: 100vw;
         background: var(--backgroundColor);
      }
      
      .events_placeholder .login_message {
         
         justify-content: center;
         margin-top:3rem;
         width: 100%;
      }
      
      .events_placeholder .sections {
         
            justify-content: space-between;
         width: 100%;
         
      }
      .events_placeholder .section_title {
         
         width: 100%;
         justify-content: center;
      }
      
      .events_placeholder .section .title {
         font-size: 1.5rem;
         font-weight: 300;
         width: 100%;
         
         justify-content: center;
      }
      .events_placeholder .section .subtitle {
         
         width: 100%;
         justify-content: center;
         font-size:.9rem;
         font-weight: normal;
         margin-top: .5rem;
      }
         
      .events_placeholder .submission_intro {
         
         padding: .5rem .5rem .5rem 2rem;
      }
      .events_placeholder .event_submission {
         
            flex-direction: column;
         padding: 0 1rem 0 2rem;
         width: 65%; 
      }
         
      .events_placeholder .event_display{
         position: relative;
         
         width: 30%;
      }
      .events_placeholder .event_display .loading {
         position: absolute;
         left: 0;
         top: 2rem;
         color: #999;
         font-weight: 100;
         width: 100%;
         text-align: center;
      }
      
      
		.admin_page  * {
			color: var(--mainColor);
		}
      
      
      .login_page {
         
         justify-content: center;  
      }
      
      
      
		
	
		/*  ---------------------------------------------------------------------------------
								RESPONSIVE LAYOUT
			---------------------------------------------------------------------------------  	*/
		
		
		@media (min-width:1536px) { 
		}
		
		@media (min-width:1280px) { /* desktop */ 
			
		}
		
		@media (max-width:1024px) { /* laptop, small desktop */ 
			
		}
		
		@media (max-width:800px) { /* tablet, large phone */ 
			
			.page_header .signin_button {
				
			}
		}
		
		@media (max-width:400px) { /* small phone */ 
		
		}
	
	
	
	
		
		
	</style>
