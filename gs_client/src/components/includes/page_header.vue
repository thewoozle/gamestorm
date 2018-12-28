
	<template>

			<div  id="page_header" class="header_inner":class="pageName == 'mainpage' ? '' : 'minimized'"> 					
				<router-link :to="'/'" class="nav_link header_logo">
					<span class="gs_num">{{conventionInfo.con_num}}</span>						
				</router-link>
				
				
				<div class="header_element convention_element">
					<div class="con_info">
						<span class="item date">{{date(conventionInfo.start_date_time)}}</span>
						<span class="item hyphen">-</span>
						<span class="item date">{{date(conventionInfo.end_date_time)}}</span>	
					</div>
					<span class="venue">{{conventionInfo.venue_location}}</span>		
				</div>				
				
				
				<div class=" header_element user_controls">	
				
					<div class="control_element " v-if="user.uuid">
						<div class="links">
							<div class="column">
								<router-link :to="'/account'" class="button" >My Account</router-link>								
								<router-link :to="'/my_convention'" class="button" >My Convention</router-link>								
							</div> 
							
							<div class="column">							
								<router-link v-if="user.permissions && user.permissions.admin > 0" :to="'/admin'" class="button" >Admin</router-link>								
								<button type="button" class="button" @click="logout">Sign Out</button>
							</div>
						</div>						
					</div>
					
					
					
					
					<div class="control_element " v-else>
						<button class="button" :class="{'active':showLoginDropdown}" type="button" @click.prevent="{showLoginDropdown? showLoginDropdown = false : showLoginDropdown = true; }" title="Sign-in to an existing account or create a new user-account">Sign In</button>
						
						<div class="login_dropdown" :class="[{'show': showLoginDropdown}, {'register' : dropdownSection == 'register'}]">
                     <div class="form_message"  ref="login_message">{{formMessage}}</div>	
						
							<div class="buttons">
								<button type="button" class="button"  :class="{'active':dropdownSection == 'login'}" @click.prevent="dropdownSection = 'login'">Sign in</button>
								<button type="button" class="button"  :class="{'active':dropdownSection == 'help'}" @click.prevent="dropdownSection == 'help'? dropdownSection = 'login' : dropdownSection ='help'">Sign-in Help</button>
								<button type="button" class="button"  :class="{'active':dropdownSection == 'register'}" @click.prevent="dropdownSection == 'register'? dropdownSection = 'login' : dropdownSection ='register' ">Register</button>
								<button type="button" class="close_button fal fa-times" @click="{showLoginDropdown = false; dropdownSection = null;}"></button>
							</div>
							
							
							<div class="dropdown_section login_section" :class="{'show': dropdownSection == 'login'}">
								<form method="post" @submit.prevent="submit_login">
                        
                           <div class="form_row" v-if="loginUsers.length > 0">
										<label for="email">Select shared user account</label>
										<div class="input_wrapper">
                                 <select class="select" name="uuid" v-model="uuid">
                                    <option value="" style="display: none">select user....</option>
                                    <option v-for="user in loginUsers" :value="user.uuid" v-text="user.first_name+' '+user.last_name"></option>
                                 </select>
										</div>
                           </div>                       
                        
									<div class="form_row" v-else >
										<label for="email">Email</label>
										<div class="input_wrapper">
											<input type="text" class="input text_box" v-model="email" @keydown="submitErrors.email = null" name="email" />
											<span class="input_message" v-if="submitErrors.email">Enter the email address that is associated with this account</span>
										</div>
									</div>
									
									
									<div class="form_row">
										<label for="password">Password
											<button type="button" class="password_show fal fa-eye" :class="{'active': showPassword == 'text'}" @click.prevent="showPassword == 'text'? showPassword = 'password' : showPassword = 'text'"></button>
										</label>
										<div class="input_wrapper">
											<input :type="showPassword" class="input text_box" v-model="password" @keydown="submitErrors.password = null" name="password" />
											<span class="input_message" v-if="submitErrors.password">Enter your password. You may select LOGIN HELP to reset your password</span>
										</div>
									</div>
									<div class="controls">
										<button type="submit" class="button">Submit</button>
									</div>
								</form>
							</div>
							
				
							<div class="dropdown_section register_section" :class="{'show': dropdownSection == 'register'}">
                     
                     
                     
								REGISTER FORM<br />
                        [attended con disclaimer] <br />
                        [ show form, check email against memberships]
                        
                        <div class="section_content register ">	
                           <span class="section_title">Create a new Account</span>
                           <p>Create a GameStorm login and profile to access Convention material and register for the GameStorm Convention and Events.</p>
                           <p>All information will be confidential and used only in relation to having website access and for convention membership. </p>
                           
                           <div class="form_wrapper">
                              
                              <div class="rows" >
                                 <div class="form_row">
                                    <label for="first_name">First Name</label>
                                    <div class="input_wrapper">
                                       <input class="input text_box" type="text" name="first_name" id="first_name"   v-model="newUser.firstName" required @keyup="submitErrors.first_name = null"/>
                                    </div>
                                    <span class="input_message" v-bind:class="submitErrors.first_name? 'show' : ''" v-text="submitErrors.first_name"></span> 					
                                 </div>
                                 <div class="form_row">
                                    <label for="last_name">Last Name</label>
                                    <div class="input_wrapper">
                                       <input class="input text_box" type="text" name="last_name" id="last_name"   v-model="newUser.lastName" required @keyup="submitErrors.last_name = null"/>
                                    </div>
                                    <span class="input_message" v-bind:class="submitErrors.last_name? 'show' : ''" v-text="submitErrors.last_name"></span> 					
                                 </div>
                                 
                                 
                              </div>
                           </div>

                        </div>
                        
							</div>
							
			
							<div class="dropdown_section help_section" :class="{'show': dropdownSection == 'help'}">
								
								<p>If you have forgotten your password or need to request a password reset, enter the email address that you've used for your GameStorm account 
									and we will email a password reset link to you. That link will allow you to enter a new password and login. 
								</p>	
								
								<form method="post" action="" @submit.prevent="request_password_reset">							
									<div class="form_row">
										<div class="form_element">
											<label for="email">Email</label>
											<div class="input_wrapper">
												<input type="text" class="input text_box" v-model="email" name="email" />
												<span class="input_message" v-if="submitErrors.email">{{submitErrors.email}}</span>
											</div>
										</div>
									
										<div class="form_element">
											<button type="submit" class="button">Submit  Request</button>
										</div>
									</div>	
								</form> 
								
							</div>
							
							<span class="login_loading " :class="showLoginLoading? 'show':''">Loading. . .</span>
						</div>
					</div>
					
				</div>		
				
			<div class="site_title editable" ref="site_title" data-name="site_title"v-if="pageContent.site_title"  v-html="pageContent.site_title.content"></div>
			
			</div>
			
	</template>
	
	
	
	<script>
		import Vue from 'vue'
		import Axios from 'axios'
		import VueAxios from 'vue-axios'
		import { mapGetters } from 'vuex'
		import moment from 'moment'
		import {apiDomain} from '@/config'
		
		import Storage from 'vue-ls'
		import options from '@/ls_options'
		
		
		
		Vue.use(Storage, options);	
		Vue.use(VueAxios, Axios);
	
		export default{
			name: 'page_header',
			
			
			data() {
				return {
					showLoginDropdown	: false,
					dropdownSection	: 'login',
					showPassword		: 'password',
					email 				: '',
					password		   	: '',
               uuid              : '',
					formData		   	: {},
					submitErrors		: {},
					formMessage			: '',
					loginUsers			: {},
					showLoginLoading	: false,
               newUser           : {},
				}
			},
			
			
			watch: {
				showLoginDropdown() {
					var vm = this;
					vm.showLoginLoading = false;
				}
			},
					
			filters: {	
			},
			 
			computed: {
				...mapGetters({
					conventionInfo	: 'conventionInfo',
					user			   : 'user',
					pageContent		: 'pageContent'
				}),
				
				pageName() {
					return this.$route.name;
				}
				  
			},
		  
			created() {
				this.check_logged_in();
				
			},
			
			
			mounted: function() {
			},
			
			
			methods: {			
				date(date) {
					return moment(date).format('MMM Do, YYYY');
				},	
				
				
				/*	----------------------------------------------------------- 
								CHECK LOGGED IN	
					-----------------------------------------------------------	*/
				check_logged_in() {
					var vm = this;
					if (Vue.ls.get('user')) {
						vm.$store.dispatch('update_user', Vue.ls.get('user') );						
					} else {
						if (vm.$route.name != 'mainpage') {
							vm.$router.replace({name: 'mainpage'});
						}
					}
					
				},	
				
				
				/*	----------------------------------------------------------- 
								SUBMIT LOGIN	
					-----------------------------------------------------------	*/
				submit_login(e) {
					var vm = this,
                  loginInfo = {
                     email	   : vm.email,
                     password : vm.password,
                     uuid     : vm.uuid,
                  };                  
                  
					vm.submitErrors = {};
					vm.showLoginLoading = true;
					
					vm.$store.dispatch('submit_login', loginInfo).then((response) => {
                  
                     vm.showLoginLoading = false;
                     if (response.response.message) {
                        
                        // show response message for two seconds
                        vm.formMessage = response.response.message;							
                        vm.$refs.login_message.classList.add('show');
                        console.log('fix login message');
                           setTimeout(function() {
                           vm.$refs.login_message.classList.remove('show');
                           },2000);
                     } 
                     if (response.users) {
                        vm.loginUsers = response.users;
                     }	
                     
               }, (err) => {
                     vm.submitErrors = err;
                  vm.showLoginLoading = false;
               });
					
				},
				
				
				/*	----------------------------------------------------------- 
								LOGOUT
					-----------------------------------------------------------	*/
				logout(e) {
					var vm = this;
					vm.$store.dispatch('update_user', {});	
               Vue.ls.remove('user');
					vm.$router.go({name: 'mainpage'});
				},
				
				/*	----------------------------------------------------------- 
								REQUEST PASSWORD RESET	
					-----------------------------------------------------------	*/
				request_password_reset(e) {
					// send email for validation and get return status
					var 	vm = this,
							form = $(e.target);
							
							
							/*
						$.ajax({
							url: 'password_reset_request',
							type: 'POST',
							data: form.serialize()
						}).done(function(response){
							console.log(response);
							vm.responseMessage = response;
						}).fail(function(err){
							console.log(err.status+' - '+err.statusText);
						});		
						
						*/
						
				},
            
            /* ---------------------------------------------------------------
                     CREATE USER
               ---------------------------------------------------------------   */
				create_user(e) {
               console.log(e.target);
            }
				
			}
			
		}
	</script>
	
	
	<style>
	

    /*  -----------------------------------------------------------------------------------------------------
                                    PAGE HEADER
        -----------------------------------------------------------------------------------------------------    */ 
  
	
	#page_header .header_inner {
		height: 100%; 
		min-height: 6.5rem;
		background: rgba(30,30,30,.85);
	}	
	
	
	#page_header.minimized .header_inner {
		background: rgba(51,51,51,0.75);
		height: 90%;
	}
	
	
	#page_header .header_element {
		position: relative;
		display: flex;
		/* width: 28%; */
		height: 100%;
		transition: height .3s, opacity .2s;
	}
	#page_header .header_element:hover {
		opacity: 1;
	}
	
	#page_header .header_element .background {
		position: absolute;
			top: 0;
			left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: top center;
		background-repeat: no-repeat!important;
	}
	
	#page_header .header_logo {
		--fontSize : 3.75rem;
		position: absolute;
			top: 0;
			left: 23%;
		display: flex;
		font-size: var(--fontSize);
		height: 100%;
		width: 5em;
		transform:translateX(-2.5em);
		background: url(/static/images/gamestorm_logo_small.png) no-repeat top center;
		background-size: contain;
		transition: opacity .3s, transform .3s, width .3s;
	}	
	
	#page_header .header_logo:active {
		transform: translateY(0);
	}
	#page_header .gs_num{
		position: absolute; 
			top: .5em;
			right: .15rem;
		color: var(--lightColor);
		display: inline-block;
		text-align: center;
		font-size: 1em;
		line-height: 1em;
		-webkit-transform: rotate(-8deg);
		transform: rotate(-4deg);
		background-size: cover;
		text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
		transition: top .3s, font-size .3s, line-height .3s;
	}
	#page_header .site_title {
		--titleWidth: 60rem;
		display: flex;
		position: absolute;		
		z-index: 20;
		top: 100%;
		width: var(--titleWidth);		
		margin-top: 3rem;
		left: calc(50% - 30rem);
		text-align: center;
		letter-spacing: .1em;
		font-size: 2.85rem;
		text-transform: uppercase;
		letter-spacing: .05em;
		font-weight: lighter;
		color: var(--titleColor);
		text-align: center;
		text-shadow: -1px -1px 0px rgba(0,0,0,0.15);
		transition: top .3s, left .3s, font-size .3s, width .3s;		
	}
	
	#app.scroll_40 #page_header .site_title {
		top: 75%;
		font-size: 2.5rem;	
		--titleWidth: 60rem;
	}
	
	#app.scroll_40 #page_header .header_logo {		
		--fontSize: 3rem;
	}
	
	#app.scroll_80 #page_header .site_title {
		top: 50%;
		font-size: 2.2rem;
		--titleWidth: 50rem;
	}
	#app.scroll_80 #page_header .header_logo {		
		--fontSize: 2.5rem;
	}
	#app.scroll_120 #page_header .site_title {
		top: 25%;	
		font-size: 1.75rem;	
		--titleWidth: 33rem;
	}
	#app.scroll_120 #page_header .header_logo {			
		--fontSize: 2.25rem;
	}
	#page_header.minimized .site_title,
	#app.scroll_160 #page_header .site_title {
		top: 0;
		font-size: 1.25rem;
		left: 13%;
		--titleWidth: 15rem; 
	}
	#page_header.minimized .header_logo,
	#app.scroll_160 #page_header .header_logo {		
		--fontSize: 1.75rem;
	}
	
	
	#page_header .site_title span{
		width: 100%;
		justify-content: center;
		text-shadow: -1px 1px 2px rgba(0,0,0,0.35);
		display: flex;		
	}
	
	
	
	/*	------	CONVENTION ELEMENT	------	*/
	#page_header .convention_element {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-items: flex-start;
		padding: .5rem 0 0 0;
		width: 100%;
		max-width: 25rem;
		transition: transform .3s;
	}
	#page_header.minimized .convention_element {
		transform:scale(.8);
	}
	#page_header .convention_element .venue,
	#page_header .convention_element .con_info {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	#page_header .convention_element .item {
		display: flex;		
		font-weight: lighter;
		font-size: 1.65rem;
		line-height: 1em;
		padding: 0 .5rem;
		text-shadow: -1px -1px 0 rgba(0,0,0,0.1);
		font-style: italic;
	}
	#page_header .convention_element .venue {
		font-size: 1.25rem;
		color: var(--textColor3);
	}
	
	
	
	/*	------	User Controls	------	*/
	#page_header .user_controls {
		position: absolute;
			top: 0;
			right: 0; 
			z-index: 50;
		display: flex;
		height: 100%; 
		width: 100%;
		max-width: 20rem;
	}
	#page_header .user_controls .control_element{
		display: flex;
		justify-content: center;
		width: 100%;
		align-items: center;
	}
	#page_header .control_element .button.active {
		background: none;
		text-shadow: -1px -1px 1px rgba(0,0,0,.15);
		color: var(--passColor);
	}
	
	#page_header .user_controls .links {
		display: flex;
		justify-content: space-around;
	}
	#page_header .user_controls .links .column {
		display: flex;
		width: 45%;
		flex-wrap: wrap;
		align-items: flex-end;
	}
	#page_header .user_controls .links .button {
		width: 100%;
		font-size: 1rem;
		margin: .2rem 0;
	}
	
	
	
	#page_header .user_controls .login_dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		max-height: 0;
		overflow: hidden;
		background: var(--sectionBackground);
		transition: max-height .5s, top .5s;
	}
	#page_header .user_controls .login_dropdown .form_message {
		position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		width: 100%;
		opacity: 0;
		background: rgba(80,0,0,.65);
		color: #fff;
		font-size: 1.5rem;
		font-weight: 300;
		text-shadow: -1px -1px 0 rgba(0,0,0,0.1);
		padding: .5rem 0;
		text-align: center;
		transition: opacity .4s, z-index .4s;
	}
	#page_header .user_controls .login_dropdown .form_message.show {
		opacity: 1;
		z-index: 10;
	}
	
	#page_header .user_controls .login_dropdown.show {
		max-height: 15rem;
		top: 10%;
	}
	#page_header .user_controls .login_dropdown .buttons {
		display: flex;
		padding: .25rem 3rem;
		justify-content: space-around;
		flex-wrap: nowrap;
	}
	#page_header .user_controls .login_dropdown .buttons .close_button {
		position: absolute;
			top: 0;
			right: 0;
	}
	#page_header .user_controls .login_dropdown .buttons .button {
		font-size: 1rem;
		width: auto;
		min-height: 1.5rem;
		margin: .25rem .5rem;
	}
	#page_header .user_controls .dropdown_section {
		display: flex;
		flex-wrap: wrap;
		position: absolute;
			Z-index: -1;
		pointer-events: none;	
		width: 100%;
		min-width: 30rem;
		opacity: 0;
		padding: .25rem 1rem;
		transition: opacity .3s, z-index .3s
	}
	#page_header .user_controls .dropdown_section.show {
		position: relative;
		opacity: 1;
		z-index: 10;
		pointer-events: auto;
	}
	#page_header .user_controls .dropdown_section form .controls {
		display: flex;
		justify-content: flex-end;
		flex-wrap: nowrap;
		padding: 0;
	}
	
	#page_header form .input_wrapper .input_message {
		color: var(--highlightColor);
	}
	
	
	#page_header .user_controls .dropdown_section.help_section p {
		font-weight: 300;
	}
	#page_header .user_controls .dropdown_section.login_section {
	}
	#page_header .user_controls .dropdown_section.register_section {
		
	}
	
	
	
	
	#page_header .user_controls .signin_form .shared_accounts {
		position: absolute;
			top: 100%;
			left: 0;
		width: 100%;
		display: flex;
		background: var(--altColor);
		flex-wrap: wrap;
		color: var(--textColor2);
		max-height: 0;
		border-radius: .15rem;
		margin: 0;
		padding: 0;
		overflow: hidden;
		transition: max-height .4s, margin .4s, padding .4s;
	}
	#page_header .user_controls .signin_form .shared_accounts.show {
		max-height: 10rem;
		margin-top: 1rem;
		padding: .5rem 0;
	}
	#page_header .user_controls .signin_form .shared_accounts .title {
		display: flex;
		width: 100%;
		justify-content: center;
	}	
	#page_header .user_controls .signin_form .shared_accounts .buttons {
		display: flex;
		flex-direction: column;		
		width: 75%;
		margin: 0 auto;
		align-items: center;
	}	
	#page_header .user_controls .signin_form .shared_accounts .account_button {
		display: flex;
		padding: .25rem 1rem;
		color: var(--button);
		cursor: pointer;
		background: var(--lightColor);
		width: 100%;
		justify-content: flex-start;
		text-align: left;
		flex-wrap: wrap;
		white-space: normal;
		line-height: 1em;
		border: solid 1px var(--borderColor);
		border-radius: .15rem;
		margin: .35rem 0;
	}	
	#page_header .user_controls .signin_form .shared_accounts .account_button:hover {
		background: var(--textColor3);
		color: #fff;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
	}
	#page_header .user_controls .login_loading {
		position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 4rem;
		text-transform: uppercase;
		font-weight: 100;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
		height: 100%;
		width: 100%;
		opacity: 0;
		background: rgba(75,75,75,0.65);
		transition: opacity .3s, z-index .3s;
	}
	#page_header .user_controls .login_loading.show {
		opacity: 1;
		z-index: 100;
	}
	
	
	#page_header .user_controls .link_tile.submit_button {				
		align-self: flex-end;		 
		width: 100%;
		padding: 0 .25rem;
		font-size: 1.25rem;
		background: var(--button2);
		text-transform: uppercase;
		color: var(--lightColor);
		box-shadow: 2px 2px 2px rgba(0,0,0,0.35);
		text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
	}
	#page_header .user_controls .link_tile.submit_button:hover {	
		color: var(--goldenSand);
	}
	
	#page_header .user_controls .signin_form .sub_controls .link_tile:active {
		box-shadow: 0px -1px 1px rgba(0,0,0,0.5);		
	}
	
	#page_header .user_controls .user_name {
		font-size: 1.1rem;
		text-align: center;
		padding: .5rem 0;
		display: block;
		color: var(--textColor);
		font-weight: lighter;
	}
	
	
	
	
	
	
	#page_header .system_message_wrapper {
		position: relative;
		z-index: 50;
		display: flex;
		justify-content: center;
		position: absolute;
		top: 100%;
		left: 0;
		max-height: 0;
		overflow: hidden;		
		width: 100%;
		transition: max-height .4s;
	}
	#page_header .system_message_wrapper.show {
		max-height: 20rem;	
	}
	#page_header .system_message {
		display: flex;
		width: 60%;	
		padding: 1rem;
		background: var(--textColor);
		color: var(--textColor2);
	}
	#page_header .system_message {
		
	}
	#page_header .system_message {
		
	}
	
	
	
	
	
	/*	------	page title	------	*/ 
	.page_title {
		display: inline-block;
		position: absolute;
			top: 100%;
			left: 0;
			right: 0;
		color: var(--champagne);
		text-align: center;
		text-shadow: -1px -1px 4px rgba(190,0,0,0.5);
		transition: all .3s ease 0s;
	}
	
	
	/*	------	scroll state	------	*/	
	#page_header.scroll {
		padding: .5rem 0 2rem 0;
	}	
	#page_header.scroll .header_inner {
		height: 6rem;
	}
	
	#page_header.scroll .logo {
		-webkit-transform:translateY(-2rem) translateX(-2rem);
		transform:translateY(-2rem) translateX(-2rem);	
		height: 4rem;
	}
	#page_header.scroll .con_info.con_info .hotel_link .image {
		width: 100%;
		height: auto;
	}
	#page_header.scroll .page_title {
		width: 100%;
			left: 0;
			top: auto;
			bottom: 0;
		font-size: 1.75rem;
		text-align: center;
	}
	
	
	
	</style>