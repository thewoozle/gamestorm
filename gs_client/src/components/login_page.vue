   <template>
      <div class="login_page_wrapper">						
         <div class="form_message" :class="login.login_message? 'show' : ''" v-text="login.login_message"></div>	
			
         <section class="section login_section">
            <span class="title page_title">GameStorm Login</span>
                     
            <div class="login">
               <span class="login_error" v-if="loginError" v-text="loginError"></span>
               <div class="element login_form">
                  <div class="form_row email_row">
                     <div class="input_wrapper" >
                     <label >Email</label>
                        <input class="text_box" type="text" v-model="login.login_email" @keyup="check_login_email($event)" />
                        <span class="dropdown_control fal fa-arrow-alt-square-down"  v-if="!login.showUsers && login.users.length > 0" @click.prevent="login.showUsers = true; $forceUpdate();"></span>         
                     </div>   
                     
                     <div class="email_dropdown">
                        <span class="checking_message" :class="login.show_checking? 'show' : ''">checking email address...</span>
                        
                        <div class="members" :class="login.showUsers && login.users.length > 1? 'show' : ''" >
                           <button type="button" class="close_button  fal fa-times" @click="login.showUsers = false; $forceUpdate()"></button>
                           <span class="member" v-for="user in login.users" v-text="user.first_name+' '+user.last_name" @click.prevent="select_user(user.uuid)"></span>
                        </div>
                        <span class="input_message" v-if="login.submitErrors.email" v-text="login.submitErrors.email"></span>
                     </div>
                     
                  </div>
                  
                  
                  <div class="form_row pass_row" :class="login.showPassField? 'show' : ''">
                     <label for="password">Password</label>
                     <div class="input_wrapper">
                        <input type="password" class="input text_box" v-model="login.login_pass" @keydown="login.submitErrors.password = null" />
                        <span class="input_message" v-if="login.submitErrors.password">Enter your password. You may select LOGIN HELP to reset your password</span>
                     </div>
                     <span class="input_message" v-if="login.submitErrors.password">Unknown Password</span>
                  </div>

                  
							<div class="buttons">
								<button type="button" class="button"  @click.prevent="dropdownSection == 'help'? dropdownSection = 'login' : dropdownSection ='help'">Sign-in Help</button>
								<!--  <button type="button" class="button"  @click.prevent="show_new_account()">New Account</button> -->
                        <button type="button" class="button" @click.prevent="submit_login()" v-if="login.showPassField">sign-in</button>
                        <button type="button" class="button" @click.prevent="show_password_field()" v-else >continue</button>
							</div>
							
                     
               </div>
               <div class="element instructions">
                  <p>Enter account email address and password. If multiple accounts use the same email address, select the target account from the resulting dropdown. </p>
               </div>
            </div>         
                     
            <div class="new_account dropdown_section register_section" :class="dropdownSection == 'register'? 'show' : ''" >
               <button type="button" class="close_button fal fa-times " @click="dropdownSection = ''"></button>
               <div class="section_content register ">	
                           <span class="section_title">Create a new Account</span>
                           <p>A User Account is required to purchase a convention membership or schedule convention events. </p>
                           <p>If you have attended a GameStorm convention, you may already have a User Account, using the email address that you provided at Registration. </p>
                           
                              <new_member_form :account={} v-on:newAccount = "submit_new_user" />
                              
                              <div class="form_row">
                                 <label for="new_password" title="minimum 6 characters, no spaces or quotes">Password</label>
                                 <div class="input_wrappers">
                                    <div class="input_wrapper">
                                       <input id="new_password" v-bind:type="login.showPassword? 'text' : 'password'" class="input text_box new_password" name="new_password"  v-model="login.newPassword" required placeholder="Password" @keyup="validate_new_password(); login.submitErrors.email = null"/>
                                       <i class="pass_icon" v-bind:class="login.validate_password == true? 'fal fa-check-square' : 'fas fa-ban fail'" v-if="login.newPassword"></i>
                                    </div>	
                                    
                                    <div class="input_wrapper">
                                       <input id="compare_password" v-bind:type="login.showPassword? 'text' : 'password'" class="input text_box verify_password" name="compare_password" required v-model="login.confPassword" placeholder="Verify Password" @keyup="validate_new_password()"/>
                                       <i class="pass_icon" v-bind:class="login.newPassword == login.confPassword? 'fal fa-check-square' : 'fas fa-ban fail'" v-if="login.newPassword"></i>
                                    </div>
                                    <span class="input_message" v-bind:class="login.submitErrors.password? 'show' : ''" v-text="login.submitErrors.password"></span> 
                                 </div>	
                              </div>
                           
               </div>   
				</div>
							
			
            <div class="dropdown_section help_section" :class="dropdownSection == 'help'? 'show' : ''">
               <button type="button" class="close_button fal fa-times" @click="dropdownSection = ''"></button>
               <span class="section_title">Reset Password</span>
               
               <form method="post" action="" @submit.prevent="request_password_reset">
                  <div class="form_row">
                     <div class="form_element">
                        <label for="email">Email</label>
                        <div class="input_wrapper">
                           <input type="text" class="input text_box" v-model="reset_email" name="email" />
                           <span class="input_message" v-if="login.submitErrors.email">{{login.submitErrors.email}}</span>
                        </div>
                     </div>
                  </div>
                  <div class="controls">
                     <button type="submit" class="button">Reset</button>	
                     
                     
                  </div>
                     <p class="forgot_info" v-if="login.login_password_reset_message">{{password_reset_message}}</p>
                     <p class="forgot_info" v-else >If you have forgotten your password or need to request a password reset, enter the email address that you've used for your GameStorm account 
                        and we will email a password reset link to you. That link will allow you to enter a new password and login. 
                     </p>	
               </form> 
               
            </div>
							
                     
                  
                    
         </section>
      </div>   
   </template>

   <script>
		import Vue from 'vue'
		import { mapState,mapGetters } from 'vuex'
      import Router from 'vue-router'
      import changepassword from '@/components/includes/change_password'  
		import new_member_form from '@/components/includes/new_member_form'	
            
      Vue.use(Router);
   
   export default {
      
      name: 'login_page',
      data () {
         return {
            newUser        : {},
            urlParams      : {},
            loginError     : null,
            login          : {},
            reset_email    : null,
            dropdownSection: '',
         }
      }, 
        
      components: {
         'changepassword'  : changepassword,
         'new_member_form': new_member_form,
      },
      
      
		  watch: {            
		  },
		  
		  
        
      computed: {
         ...mapState({
            statesList		: 'statesList',               
         }),
         ...mapGetters({
            user			   : 'user',
         }),
         
      },
		  
      created() {
         var vm = this,
            _urlParams;
         _urlParams = new URL(window.location.href).searchParams.has('c');
         _urlParams? vm.urlParams.c = new URL(window.location.href).searchParams.get('c') : vm.urlParams = {}; 
         vm.reset_login();
         vm.check_logged_in();
      },
      
			
			
      mounted: function() {
         var vm = this;
         vm.login.show_loading          = false;
         //vm.$forceUpdate();
      },
			
			
      methods: {		
      
         
         reset_login() {
            var vm = this;
            vm.login = {};
            vm.login.showPassword         = null;
            vm.login.submitErrors         = {},
            vm.login.users                = [],
            vm.login.login_message        = null;
            vm.login.show_loading         = true;
            vm.login.validate_password    = false;
            vm.login.showPassField        = false;
            vm.login.login_password_reset_message= null;
            vm.login.check_email          = false;
            vm.login.show_checking        = false;
            vm.$forceUpdate();
      },
      
         select_user(uuid) {
            var vm = this;
            vm.login.showUsers = false;
            vm.login.showPassField = true;
            vm.login.uuid = uuid;
            vm.login.login_pass = '';            
            vm.$forceUpdate();
         },
         /*	----------------------------------------------------------- 
                     CHECK LOGGED IN	
            -----------------------------------------------------------	*/
         check_logged_in() {
            // var vm = this;
            // if (Vue.ls.get('user') && Vue.ls.get('user').length > 0) {
            // console.log(Vue.ls.get('user').length);
               // vm.$store.dispatch('update_user', Vue.ls.get('user') );						
            // } else {
               // if (vm.$route.name != 'mainpage') {
                  // vm.$router.replace({name: 'mainpage'});
               // }
            // }
         },	
         
         /* -------------------------------------------------------------
                           SHOW NEW ACCOUNT
            -------------------------------------------------------------  */
            show_new_account() {
               var vm = this;
               console.log(vm.login);
               vm.reset_login();
               vm.dropdownSection = 'register';
               vm.login.show_loading = false;
               vm.$forceUpdate();
            },
            
            
         /* -------------------------------------------------------------
                           SHOW PASSWORD FIELD  
            ------------------------------------------------------------- */
         show_password_field() {
            var vm = this;
            vm.login.showPassField  = true; 
            vm.login.login_pass = null;
            vm.$forceUpdate();
         },
         
         /* -------------------------------------------------------------
                           CHECK LOGIN EMAIL
            -------------------------------------------------------------  */
            check_login_email(event) {
               // check for '@ .' and dispatch for email match, returning matching users. 
               var vm = this;
               vm.login.showPassField = false;
               vm.login.showUsers = false;
               
               if(event.target.value.length > 5) {
                  if(event.target.value.indexOf('@') >-1 && event.target.value.indexOf('.') >-1) {
                     vm.login.show_checking = true;
                     vm.$store.dispatch('check_login_email', event.target.value).then((response) => {
                        vm.login.users = response.members;
                        vm.login.show_checking = false;
                        
                        if(response.members.length >=1) { vm.login.showPassField = true;} 
                        if(response.members.length >1) { vm.login.showUsers = true;} 
                        vm.$forceUpdate();
                     });
                  }
               } else {
                  vm.login.showUsers = false;
                  vm.login.users = [];
                  vm.$forceUpdate();
               }
            },
            
            /* --------------------------------------------------------------
                           SUBMIT LOGIN 
               -------------------------------------------------------------- */
            submit_login() {
               // clean-up login object
               var   vm = this,
                     _login ={};
               _login.email = vm.login.login_email;
               _login.password = vm.login.login_pass;
               if(vm.login.uuid) { _login.uuid = vm.login.uuid;}
               console.log("this");
               vm.$store.dispatch('submit_login', _login).then((response) => {
                  console.log('pass'+response);
                  if(response.success == 'pass') {                                    
                     location.href='https://gamestorm.org/schedule/index.html?uuid='+response.user.uuid+'&con_status='+response.user.con_status;
                  } 
               }).catch(reject => {
                  console.log('fail'+reject);
                     vm.loginError = reject.message;
                     setTimeout(function() {
                        vm.loginError = null;
                     },2000);
                  
               });
            } ,  
         
         
               /* -----------------------------------------------------------
                           SUBMIT NEW USER
                  ----------------------------------------------------------- */
               submit_new_user(e) {
                  // var vm = this;
                  // vm.account = e
                  // vm.account.password = vm.newPassword;
                  // vm.$store.dispatch('create_update_user_info', vm.account).then((response) => {
                     
                     // console.log(response.errors);
                     
                     // if(response == 'success') {
                                             
                        // // show response message for four seconds
                        // vm.login_message = response;		
                              
                              
                        // vm.dropdownSection = 'login';
                        // vm.account = {};
                        // vm.account.state = '';
                     // } else {
                        
                           // // show response message for four seconds
                           // vm.login_message = response;
                     // }
                     
                     // setTimeout(function() {
                        // vm.login_message = null;
                        // vm.submitErrors= {};
                     // },4000);
                     
                  // }, (err) => {
                     // console.log(err);
                     // vm.submitErrors = err;
                     // setTimeout(function() {
                        // vm.login_message = null;
                        // vm.submitErrors= {};
                        // vm.dropdownSection = 'login';
                        // vm.showPassword = 'password';
                     // },4000);
                  // });
                  
               },
               
               /* ---------------------------------------------------------------
                        CREATE USER
                  ---------------------------------------------------------------   */
               create_user(e) {
                  console.log(e.target);
               },
               
               /* ---------------------------------------------------------------
                        VALIDATE NEW PASSWORD
                  ---------------------------------------------------------------   */
               validate_new_password() {
                  var   vm = this;                 
                  
                  if(vm.login.newPassword) { vm.login.newPassword = vm.login.newPassword.replace(/ |"|'|`/g, ''); }
                  
                  if(vm.login.confPassword) {vm.login.confPassword = vm.login.confPassword.replace(/ |"|'|`/g, ''); }
                  
                  vm.login.newPassword.length >= 6? vm.login.validate_password = true : vm.login.validate_password = false;
                  
               },
               
               
				/*	----------------------------------------------------------- 
								REQUEST PASSWORD RESET	
					-----------------------------------------------------------	*/
				request_password_reset() {
					// send email for validation and get return status
					var 	vm = this;
							
               if(vm.reset_email) {
                  
					vm.$store.dispatch('reset_password', vm.reset_email).then((response) => {
                  vm.passwordResetMessage = response.response.message;
                  vm.reset_email = '';
                  
                  setTimeout(function() {                   
                     if(response.response.success == 'sent') {
                        vm.passwordResetMessage = null;  
                        vm.showLoginDropdown = false;
                        vm.submitErrors = {};
                     } 
                  },4000);
                  
                  
                  
               }, (err) => {
                  vm.passwordResetMessage = err.email;
                  setTimeout(function() {
                     vm.passwordResetMessage = null;
                     vm.dropdownSection = 'login';
                     vm.showPassword = 'password';
                  },4000);
               });	
                  

               }
                     
						
				},
         
         
      }
         
   }
   </script>


   <style scoped>
      
      .login_page_wrapper {
         display: flex;
         width: 100vw;
         max-width: 60rem;
         min-height: 30rem;
         height: 100vh;
         padding: 10vh 0;
      }
      .login_page  .page_title {
         width: 100%;
         font-size: 3rem;
         justify-content: center;
         line-height: 5rem;
         letter-spacing: .05em;
      }
      .login_page .login_section {
         flex-wrap: wrap;
      }
      
      .login_page .dropdown_section {
         position: fixed;
            top: 0;
            left: 0;
            z-index: 50;
         justify-content: center;   
         background: rgba(255,255,255,.1);
         max-height: 0;
         width: 100%;
         background: rgba(0,0,0,0.85);
         overflow: hidden;
         opacity: 0;
         padding: 0 2rem;
         transition: max-height .4s, opacity .4s, padding .4s;
      }
      .login_page .dropdown_section.show {
         max-height: 20rem;
         opacity: 1;
         padding: 2rem;
      }
      .login_page .dropdown_section .section_title {
         color: var(--titleColor);
      }
      .login_page .dropdown_section .close_button {
         position: absolute;
         top: 0;
         right: 0;
         margin: 1rem;
         z-index: 50;
         cursor: pointer;
      }
      
      .login_page .dropdown_section .section_content {
         flex-wrap: wrap;
         flex-direction: column;
         width: 100%;
         max-width: 60rem;
         border: solid 1px #111;
         border-radius: .25rem;
         background: var(--altBackground);         
      }
      .login_page .dropdown_section .section_content p {
         display: flex;
         padding: .5rem 2rem;
         width: 100%;
      }
      
      .login_page .section_title {
         width: 100%;
         font-size: 2.5rem;
         justify-content: center;
         font-weight: bold;         
         color: #2d2d42;
         height: 1.5em;
         line-height: 1.5em;
      }
      
      
      .login_page .register .new_account_form {
         margin-top: 2rem;
         margin: 2rem auto;
         
      }
      .login_page .login_section {
         width: 100%;
         max-width: 60rem;         
      }
      .login_page .login_section .login {
         position: relative;
         flex-wrap: wrap;
         margin-bottom: auto;
         justify-content: center;
      }
      .login_page .login_section .login_form {
         flex-wrap: wrap;
         order: 1;
         width:  60%;
         margin-bottom: auto;
         padding: 2rem 0 0 2rem;
      }
      .login_page .login_section .login_error {
         width: 100%;
         justify-content: center;
         height: 2rem;
         font-weight: 300;
         font-size: 1.5rem;
         padding: .5rem 0;
      }
      
      .login_page .login_form .pass_row {
         max-height: 0;
         opacity: 0;
         overflow: hidden;
         transition: max-height .3s, opacity .3s;
      }
      .login_page .login_form .pass_row.show {
         opacity: 1;
         max-height: 10rem;
      }
      
      .login_page .login_form label {
         display: flex;
         min-width: 6rem;
         align-items: center;
      }
      
      .login_page .login_form .form_row {
         width: 100%;
         justify-content: center;
         height: 3rem;
      }
      .login_page .login_form .form_row + .form_row {
         margin-top: 2rem;
      }
      .login_page .login_form .email_row {
         flex-wrap: wrap;
         position: relative;
      }
      .login_page .login_form  .input_wrapper {
         width: 100%;
         flex-wrap: nowrap;
      }
      .login_page .login_form .email_row .email_dropdown {
         position: absolute;
            top: 100%;
            left: 3rem;
            z-index: 25;
         width: calc(100% - 3rem);
         background: var(--altBackground);         
      }
      
      .login_page .login_form  .input_wrapper .dropdown_control {
         display: flex;
            align-items: center;
            justify-content: center;
         font-size: 1.5rem;
         margin-left: .5rem;;
      }
      .login_page .login_form .checking_message {
         position: absolute;
            top: 0;
            left: 0;
            z-index: -1; 
         width: 100%;
         opacity: 0;
         transition: opacity .3s, z-index .3s;
      }
      
      .login_page .login_form .checking_message.show {
         opacity: 1;
         z-index: 50;
      }
      .login_page .login_form .email_dropdown .members {
         max-height: 0;
         overflow: hidden;
         opacity: 0;
         padding: 0 1rem;  
         flex-direction: column;
         width: 100%;
         transition: max-height .4s, opacity .4s, margin .3s;
      }
      
      .login_page .login_form .email_dropdown .members.show {
         max-height: 10rem;
         opacity: 1;
         margin: 1rem 0;
      }
      .login_page .login_form .email_dropdown .members .member {
         width: 100%;
         cursor: pointer;
         padding: .25rem 1rem;
         width: 100%;
         color: var(--linkColor);
      }
      
      .login_page .login_form .email_dropdown .members .close_button {
         position: absolute;
         top: 0;
         right: 0;
      }
      .login_page .login_form .email_dropdown .members .member +.member {
         margin-top: .25rem;
      }
      .login_page .login_form .email_dropdown .members .member:hover {
         background: var(--glowColor);
         color: var(--button);
      }
      
      .login_page .login_form .buttons {
         width: 100%;
         padding: 1rem 0;
         margin-top: 5vh;
         justify-content: center;
      }
      
      .login_page .login_form .buttons .button {
         margin: 0 1vw;
         padding: .25rem 1rem;
         border-radius: .25rem;
      }
      
      .login_page .login_section .instructions {
         width: 30%;
         max-width: 25rem;
         padding: 2rem 0 0 2rem;
         order: 2;
         font-size: 1.15rem;
      }
      .login_page .login_section .instructions p {
         text-align: justify;
         font-size: inherit;
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
			
        .login_page  .login_section .instructions {
            order: 0;
            width: 100%;
            font-size: 1.35rem;
         }
         .login_page .login_section .login_form {
            width: 100%;
         }
		}
      
		@media (max-width:400px) { /* small phone */ 
		
		}
	
   
   </style>
