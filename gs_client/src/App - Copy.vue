	<template>
	  <div class="page_wrapper" ref="app" id="app" :class="[pageClasses.pageReady,pageClasses.showMenu,pageClasses.showSlideout,pageClasses.fixFooter]">
		<span id="loading"><span class="spinner"></span></span>
		
		<main_menu />
		<page_header />
		
		
		
		<main class="main_content" ref="main_content">
			<router-view class="main_view"/>
		</main>	
		
		<page_footer />
		
		<slideout />
	  </div>
	</template>

	
	
	
	
	<script>
		import page_header from '@/components/page_header'
		import main_menu from '@/components/main_menu'	
		import slideout from '@/components/slideout'
		import page_footer from '@/components/page_footer'
	
		import {apiDomain} from './config';
		import { mapState } from 'vuex';
		
		export default {
		  name: 'App',
		  
		data() {
			return {
				pageClasses: []
			}
		},  
		  
		components: {
			'page_header' 	: page_header ,
			'main_menu' 	: main_menu,
			'slideout'		: slideout,
			'page_footer'	: page_footer,
		},
		  
		  computed: {
			...mapState([
				'pageStatus',
			  ]),
		  },
			
		  created() {
			var  vm = this;
			vm.$store.dispatch('get_live_events').then(() => {vm.$forceUpdate();});
		  },
		  
		  watch: {
			  
		  },
		  
		  mounted: function()  {
			var vm = this;
			vm.handle_page_load(); 
		  },
		  
		  
		  methods: {
			handle_page_load() {
				var vm = this;				
				vm.$store.dispatch('update_page_status', {pageReady: 'ready'}).then(() => {vm.pageClasses = this.$store.state.pageStatus});
					
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
			--lightColor			: #fff;
			--contrastColor			: #735896;
			--passColor				: #3D7D52;					
			--button2				: #42634e;					
			
			
			--altColor				: #ebeeff;					
			--titleColor			: #a8d4f5;					
			--allports				: #0076A3;					
			--borderColor2			: #0c485f;				
			--button				: #182c35;								
			--textColor3			: #5590d9;					
			--backHighlight			: rgba(168, 212, 245, .5);
			--sectionBackground		: rgba(123, 196, 230, .15);
			--linkColor				: #ae9868;		
			--glowColor				: #98c6ff;
			--warningColor          : #c50d0d;	
			--textColor				: #FFFEF0;					
			--highlightColor		: #F7D17D;			
			
			--textColor2			: #6e6673;					
			
			--borderRadius			: .25rem;
			
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
			font-size: 2.25rem;
			text-transform: uppercase;
			letter-spacing: .05em;
			color: var(--lightColor);
			text-shadow: -1px -1px 0px rgba(0,0,0,0.15);
		}
		
		.section_title {
			display: inline-block;
			width: 100%;
			font-size: 2rem;
			line-height: 1.5em;
			font-weight: 600;
			text-transform: uppercase;
			padding: 0 0 0 25px;
			color: var(--titleColor);		
			text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
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
			display: flex;
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
	
	
	/*	------	date bullet	------	*/
	.date_bullet {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 2.25rem;
		height: 2.25rem;
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
		display: flex;
		font-size: .7rem;
		line-height: 1em;
		width: 100%;
		height: 50%;
		align-items: flex-end;
		justify-content: center;
		text-transform: uppercase;
	}
	.date_bullet .day {
		display: flex;
		width: 100%;
		height: 50%;
		align-items: flex-start;
		line-height: 1em;
		padding-top: .1rem;
		letter-spacing: .05em;
		justify-content: center;
		font-size: .6rem;
	}
	
	/*	------	INFO ELEMENT	------	*/
	.info_elements {
		display: flex;
		flex-wrap: wrap;		
	}
	.info_element {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.info_element img {
		display: flex;
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
		display: flex; 
		flex-wrap: wrap;		
		padding: .5rem;
	}
	.search_bar .search{
		display: flex;
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
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.search_bar .sort_button {
		display: flex;	
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





	
	/*	------	TIME PICKER	------	*/
	.time_picker {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		width: 14rem;		
		padding: .25rem;
		align-items: flex-start;
		background: #fff;
		
	}
	.time_picker .days {
		display: flex;
		flex-wrap: wrap;
		padding: 0 .25rem 0 0;
		width: 6rem;
	}
	.time_picker .days .day {
		display: flex;
		width: 100%;
		text-transform: uppercase;
		justify-content: center;
		border-radius: .1rem;
		cursor: pointer;
		background: var(--textColor3);
		color: var(--textColor);
		text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
	}
	.time_picker .days .day + .day{
		margin-top: .15rem;
	}
	.time_picker .days .day.active,
	.time_picker .days .day:hover {
		background: var(--passColor);
	}
	.time_picker .times {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		height: 7rem;
		width: 8rem;
	}
	.time_picker .times_wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		border-left: solid 1px var(--borderColor);
		max-height: 100%;
		overflow: hidden;
		overflow-Y: auto;
		background: #fff;
		transition: max-height .4s, border .4s;
	}
	.time_picker:focus .times_wrapper,
	.time_picker:hover .times_wrapper {
		max-height: 75vh;
		border: solid 1px var(--borderColor);
	}
	.time_picker .time_wrapper{
		flex-wrap: wrap;
		overflow: hidden;
		position: relative;
		top: 0;
		transition: top .4s;
	}
	.time_picker .times_wrapper .day_wrapper {
		display: flex;
		flex-wrap: wrap;	
	}
	
	.time_picker .times .time_title {
		display: flex;
		width: 100%;
		justify-content: center;
		font-weight: bold;
		text-transform: uppercase;
		color: var(--textColor);
		background: var(--titleColor);
	}
	.time_picker .times .time_title + .time {
		border-top: solid 1px var(--borderColor);		
	}
	.time_picker .times .time + .time_title {
		margin-top: .65rem;
		border-top: solid 2px var(--titleColor);
	}
	.time_picker .times .time {
		position: relative;
		z-index: 10;
		display: flex;
		cursor: pointer;
		position: relative;
		color: var(--button);
		width: 100%;
		border-bottom: solid 1px var(--borderColor);
		justify-content: flex-end;
		padding: 0 2rem .1rem .75rem;
	}	
	.time_picker .times .time.between_time:before {
		content: '';
		position: absolute;
			top: 0;
			z-index: -1;
			left: 5%;
		height: 100%;	
		width: 90%;
	}
	.time_picker .times .time.between_time:before,
	.time_picker .times .time.start_time,
	.time_picker .times .time.end_time {
		background: rgba(12,72,95,.5);
	}
	.time_picker .times .time.between_time,
	.time_picker .times .time.start_time,
	.time_picker .times .time.end_time {
		color: #fff;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.1);		
	}
	
	.time_picker .times .time.active,
	.time_picker .times .time:hover {
		background: var(--#eee);
	}
	.time_picker .times .time + .time {
		padding-top: .1rem;
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
		display: flex;
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
		background: var(--buttonColor);
		border-color: var(--borderColor2);
	}
	.toggle_button:active,
	.toggle_button.active {
		background: rgba(0,0,0,0.35);
		box-shadow: 0 -1px 2px rgba(0,0,0,0.5);		
		transform:translateY(1px);		
		color: var(--titleColor);
	}
	.toggle_button .text_wrapper {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		color: inherit;
		align-items: center;
		height: 1.85rem;
	}
	.toggle_button .text_wrapper .text {
		display: flex;
		width: 100%;
		height: 1.8rem;
		align-items: center;
		font-size: .9rem;
		line-height: 1em;
		justify-content: center;
	}
	.toggle_button .text_wrapper .detail {
		display: flex;
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
		opacity: 0;
	}
	.toggle_button .checkbox {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}
	.toggle_button:hover .grad_bar {
		opacity: .25;
	}		
	.toggle_button.active .grad_bar {
		opacity: 1;
	}
	
	
	
	
	.button {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 3rem;		
		width: 10rem;
		background: rgba(0,118,163,.4);
		line-height: 1em;
		border-radius: .2rem;
		font-weight: lighter;
		cursor: pointer;
		font-size: 1.5rem;
		color: #a8d4f5;		
		color: var(--titleColor);
		letter-spacing: .1em;
		opacity: .85;
		text-shadow: -1px -1px rgba(0,0,0,0.25);
		transition: opacity .3s, color .3s, background .3s;
	}
	.button:hover {
		opacity: 1;
		background: var(--button);
		color: var(--altColor);
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
		opacity: 1;
		z-index: 1001;
		transform:translate(-4rem, -4rem) scale(1);
		transition:	opacity .8s, height .8s, width .8s, transform .8s, z-index .8s;						
	}
	#app.ready #loading {
		transform:translate(-4rem, -8rem) scale(.25);
		opacity: 0;
		z-index: -1;
	}
	#loading .spinner {
		display: block;
		width: 100%;
		height: 100%;	
		border-radius: 50%;
		border: 1px solid transparent;
		border-top-color: #2180BA;
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
	
	
	
	
	
	
	
    /*  -----------------------------------------------------------------------------------------------------
                                        FORM ELEMENTS
        -----------------------------------------------------------------------------------------------------
    */ 
	form .form_buttons {
		position: absolute;
			top: 0;
			right: 0;
			z-index: 100;
		display: flex;
		margin: .1rem .1rem 0 0;
		justify-content: space-around;
	}
	.main_content form .form_buttons .form_button {
		display: flex;
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
	.close_button {
		font-size: 1.5rem;
		font-weight: normal;
		cursor: pointer;
		background: var(--warningColor);
		width: 2rem;
		padding: 0;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
	}
	.close_button:hover {
		background: var(--altColor);
		font-weight: bold;
		color: var(--warningColor);
		border-color: transparent;
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
		display: flex;
		width: 100%;
		position: relative;
		line-height: 2em;
		padding: .25rem 0;
	}
	.form_row + .form_row {
		margin-top: .75rem;
	}
	.form_element {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
		line-height: inherit
	}	
	
	.input_wrapper {
		display: flex;
		position: relative;
		flex-wrap: wrap;
	}
	.input_wrapper .form_error{
		position: absolute;
			top: 100%;
			left: 0;
		width: 100%;
		transform:translateY(-.5rem);
		text-align: center;
		color: #fbfb87;
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
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.form_row .input_wrapper {
		position: relative;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	form .form_row .input_message {
		position: absolute;
			top: 100%;
			left: 2rem;
			z-index: 10;
		color: #c00;
		font-size: .75rem;
		font-style: italic;
		transition: line-height .3s;
		line-height: 1rem;
	}

	form label {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 10rem;
		justify-content: flex-end;
		padding: 0 4% 0 0;
		text-transform: capitalize;	
		border-right: solid 1px #ccc;
		line-height: 1em;
		color: var(--textColor3);
	}
	form label .password_show {
		position: absolute;
			bottom: 0;
			right: 0;		
			z-index: 10;
		cursor: pointer;
		width: 1.5rem;
		text-align: center;
		font-size: 1rem;
		color: inherit;
	} 
	form .input_wrapper .pass_icon {
		position: absolute;
			top: 0;
			left: 100%;
		display: flex;
		height: 100%;
		width: 1.5rem;
		justify-content: center;
		align-items: center;
		color: var(--passColor);
	}
	form .input_wrapper .pass_icon.fail {
		color: var(--warningColor);
	}
	form label .password_show:hover {
		color: var(--button);
	}
	form label .required {
		position: absolute;
		top: 50%;
		right: .25rem;
		color: #c00;
		margin-top: .25rem;
		font-size: .65rem;
		font-style: italic;
	}
	form .input_wrapper .response_icons {
		display: flex;
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
		left: 0;
		padding: .5rem 0 0 1rem;
		width: 100%;
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
	form .text_box,
	form select,
	form .textarea {
		display: flex;
		border: solid 1px #a5a5a5;
		border-radius: .2em;		
		margin-left: 4%;
		line-height: 1em;
		color: #333;
		font-size: 1.15rem;
		width: 100%;
		min-height: 2.75rem;
		max-width: 19rem;
		padding: .25rem .5rem;
	}
	form .textarea {
		min-height: 3rem;
	}
	form .checkbox {
		display: flex;
		transform: scale(1.5);
	}
	form .select option {
		color: inherit;
		text-transform: capitalize;
	}
	form .form_element .pass, 
	form .form_element .fail {
		display: flex;
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
	form .form_element .pass {
		font-size: 1.5rem;
		color: var(--passColor);
	}
	form .controls {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		padding: 0 2rem;
	}
	
	
	
	
	/*	---	validator ---	*/
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
		padding: .25rem 0;
		max-height: 5rem;
	}
	
	
	
    /*  -----------------------------------------------------------------------------------------------------
                                    BASIC PAGE LAYOUT
        -----------------------------------------------------------------------------------------------------    */ 
	body {
	}	
	.page_wrapper {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: var(--backgroundColor);
		overflow: hidden;
		overflow-y: auto;
	}
	.page_background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-size: cover;
		opacity: .1;
	}
	.page_background .video {
		position: absolute;
			top: 50vh;
			left: 50vw;
		min-width: 100vw;
		min-height: 100vh;
		visibility: hidden;
		height: auto;
		width: auto;		
		transform:translate(-50vw,-50vh);
		background-size: cover;
	}
	
	
	.main_content {
		font-size: 1rem;
		min-height: calc(100% - 6rem);
		width: 100%;
		margin-top: 6rem;
		padding-top: 1rem;
		white-space: normal;
		background-size: cover;
		background: rgba(0,0,0,0.1);
	}
	.main_view {
		display: flex;
		justify-content: space-around;
		min-height: 100vh;
		position: relative;
		font-size: 0;
		width: 100%;
		max-width: 112rem;
		margin: 0 auto;
	}
	
	
		
	/*------------	page controls		------------	*/
	
	.menu_buttons {
		position: absolute;
			left: 2vw;
			top: .5rem;
			z-index: 90;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition: transform .4s, left .4s
	}	
	.menu_buttons .menu_button {	
		display: flex;	
		font-size: 1.25rem;	
		width: 7rem;
		letter-spacing: .05em;
		background: rgba(0,0,0,0.5);
		color: var(--titleColor);
		border: solid 1px var(--button2);
		cursor: pointer;
		padding: .25rem 0;
		text-transform: uppercase;
		justify-content: center;
		transition: color .5s ;
	}
	.menu_buttons .menu_button + .menu_button {	
		margin-left: 1rem;
	}
	body.show_nav .menu_buttons {
		left: 28%;
		transform:translate(-7.3rem, .15rem);
		color: #F7D17D;
		color: var(--goldenSand);
	}
	body.show_nav #menu_button {
		background: var(--mainColor);
	}
	.menu_buttons #sign-in_button {
		display: none;
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
	
	
	
	
	
		
		
	</style>
