
	<template>
		
      
                        <div class="section_content register ">	
                           <span class="section_title">Create a new Account</span>
                           <p>A User Account is required to purchase a convention membership or schedule convention events. </p>
                           <p>If you have attended a GameStorm convention, you may already have a User Account, using the email address that you provided at Registration. </p>
                           
                           <div class="form_wrapper">
                              
                              <form @submit.prevent="submit_new_user" class="rows" >
                                 <div class="form_row email_check_row">
                                    <label for="last_name">Email</label>
                                    <div class="input_wrapper">
                                       <input class="input text_box" type="text" name="email" id="email"   v-model="newUser.email" required @keyup="check_email(); submitErrors.email = null"/>
                                    </div>
                                    <div v-if="checkEmail == 0" class="email_check">
                                       <span class="icon fal fa-thumbs-up" title="This email address is not in use" ></span> 
                                    </div>
                                    
                                    <div v-else-if="checkEmail == 1" class="email_check">
                                       <span class="icon fas fa-exclamation" title="This email address has a user account associated with it. You can use the SIGN-IN HELP link to set or reset your password, or
                                          if you are adding an additional user to your email address, you can continue to create a new user account" >
                                       </span> 
                                       <span class="message">This email address has a user account associated with it. You can use the SIGN-IN HELP link to set or reset your password, or
                                          if you are adding an additional user to your email address, you can continue to create a new user account that shares this email.
                                       </span>
                                    </div>
                                    
                                    <div v-else-if="checkEmail > 1" class="email_check">
                                       <span class="icon fas fa-user-plus" :title="'This email address has '+checkEmail +' user accounts associated with it. You can use the SIGN-IN HELP link to set or reset the accounts password(s) or continue creating a new user account. '" >
                                       </span> 
                                       <span class="message">This email address has {{checkEmail}} user account{{checkEmail >1? 's' : ''}} associated with it. You can use the SIGN-IN HELP link to set or reset the accounts password(s) or continue creating a new user account. 
                                       </span>
                                    </div>
                                    <span class="input_message" v-bind:class="submitErrors.email? 'show' : ''" v-text="submitErrors.email"></span> 			
                                 </div>
                                 
                                 <div class="form_row">
                                    <label for="first_name">First Name</label>
                                    <div class="input_wrapper">
                                       <input class="input text_box" type="text" name="first_name" id="first_name"   v-model="newUser.first_name" required @keyup="submitErrors.first_name = null"/>
                                    </div>
                                    <span class="input_message" v-bind:class="submitErrors.first_name? 'show' : ''" v-text="submitErrors.first_name"></span>
                                 </div>
                                 
                                 <div class="form_row">
                                    <label for="last_name">Last Name</label>
                                    <div class="input_wrapper">
                                       <input class="input text_box" type="text" name="last_name" id="last_name"   v-model="newUser.last_name" required @keyup="submitErrors.last_name = null"/>
                                    </div>
                                    <span class="input_message" v-bind:class="submitErrors.last_name? 'show' : ''" v-text="submitErrors.last_name"></span> 					
                                 </div>
                                 
                                 
                                 <div class="form_row">
                                    <label for="last_name">Address</label>
                                    <div class="input_wrapper">
                                       <input class="input text_box" type="text" name="address" id="address"   v-model="newUser.address" required @keyup="submitErrors.address = null"/>
                                    </div>
                                    <span class="input_message" v-bind:class="submitErrors.address? 'show' : ''" v-text="submitErrors.address"></span> 					
                                 </div>
                                 
                                 
                                 <div class="form_row">
                                    <label for="last_name">Address 2</label>
                                    <div class="input_wrapper">
                                       <input class="input text_box" type="text" name="address2" id="address2"   v-model="newUser.address2" @keyup="submitErrors.address2 = null"/>
                                    </div>
                                    <span class="input_message" v-bind:class="submitErrors.address2? 'show' : ''" v-text="submitErrors.address2"></span> 					
                                 </div>
                                 
                                 
                                 <div class="form_row">
                                    <label for="last_name">City</label>
                                    <div class="input_wrapper">
                                       <input class="input text_box" type="text" name="city" id="city"   v-model="newUser.city" required @keyup="submitErrors.city = null"/>
                                    </div>
                                    <span class="input_message" v-bind:class="submitErrors.city? 'show' : ''" v-text="submitErrors.city"></span> 					
                                 </div>
                                 
                                 
                                 <div class="form_row">
                                    <div class="form_element">
                                       <div class="input_wrapper">
                                          <select class="select" name="state" id="state" v-model="newUser.state" @click="submitErrors.state = 'null'" @set="newUser.state == null? newUser.state = '' : ''">
                                             <option value="" style="display: none" >State...</option>
                                             <option :value="state.state" v-for="state in statesList" >{{state.name}}</option>	
                                          </select>
                                          <label>State or Territory</label>
                                          <span class="form_error" v-if="submitErrors.state" v-text="submitErrors.state? 'State or Territory is required' : ''"></span>
                                       </div>   
                                    </div>      
                                    <div class="form_element">
                                       <div class="input_wrapper" title="leave blank if over 18 at time of next convention">
                                       <datetime type="date" v-model="newUser.birth_date"   ></datetime>
                                       
                                       </div>				
                                       <label for="country">Birthdate</label>
                                       <span class="input_message" v-bind:class="submitErrors.birthDate? 'show' : ''" v-text="submitErrors.birthDate"></span>
                                    </div>
                                 </div>	
											
                                 
                                 <div class="form_row">
                                    <div class="form_element">
                                       <label for="last_name">Postal Code</label>
                                       <div class="input_wrapper">
                                          <input class="input text_box" type="text" name="zip" id="zip"   v-model="newUser.zip" required @keyup="submitErrors.zip = null"/>
                                       </div>
                                       <span class="input_message" v-bind:class="submitErrors.zip? 'show' : ''" v-text="submitErrors.zip"></span> 	
                                    
                                    </div>      
                                    <div class="form_element">
                                       <label for="last_name">Phone</label>
                                       <div class="input_wrapper">
                                          <input class="input text_box" type="text" name="phone" id="phone"   v-model="newUser.phone" />
                                       </div>                                    
                                    </div>
                                 </div>
                                 
                                 <div class="form_row">
                                    <label for="new_password" title="minimum 6 characters, no spaces or quotes">Password 
                                       <button type="button" class="password_show fal" v-bind:class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="showPassword ? showPassword = false : showPassword = true"></button>
                                    </label>
                                    <div class="input_wrappers">
                                       <div class="input_wrapper">
                                          <input id="new_password" v-bind:type="showPassword? 'text' : 'password'" class="input text_box new_password" name="new_password"  v-model="newPassword" required placeholder="Password" @keyup="validate_new_password(); submitErrors.email = null"/>
                                          <i class="pass_icon" v-bind:class="validatePassword == true? 'fal fa-check-square' : 'fas fa-ban fail'" v-if="newPassword"></i>
                                       </div>	
                                       
                                       <div class="input_wrapper">
                                          <input id="compare_password" v-bind:type="showPassword? 'text' : 'password'" class="input text_box verify_password" name="compare_password" required v-model="confPassword" placeholder="Verify Password" @keyup="validate_new_password()"/>
                                          <i class="pass_icon" v-bind:class="newPassword == confPassword? 'fal fa-check-square' : 'fas fa-ban fail'" v-if="newPassword"></i>
                                       </div>
                                       <span class="input_message" v-bind:class="submitErrors.password? 'show' : ''" v-text="submitErrors.password"></span> 
                                    </div>	
                                 </div>
                                 
                                 <div class="form_row controls">
                                    <button type="submit" class="button">Submit</button>			
                                 </div>
                                 
                                 <p>All information will be confidential and used only in relation to having website access and for convention membership. </p>
                              </form>
                           </div>

                        </div>
                        
	</template>
	
	<script>
			import Vue from 'vue'
			import { mapState, mapGetters } from 'vuex'
         
         import moment from 'moment'
         import { Datetime } from 'vue-datetime'
         import 'vue-datetime/dist/vue-datetime.css'
         
         
         Vue.use(Datetime);
			
			export default{
				name: 'new_member_form',
				
				data() {
					return{					
                  showPassword		: 'password',
                  email 				: '',
                  password		   	: '',
                  uuid              : '',
                  formData		   	: {},
                  submitErrors		: {},
                  newPassword       : '',
                  confPassword      : '',
                  formMessage			: '',
                  loginMessage      : null,
                  loginUsers			: {},
                  showLoginLoading	: false,
                  newUser           : {},
                  validatePassword  : false,
                  showPassword      : 'password',
                  reset_email       :'',
                  showForgotInfo    : false,         
                  passwordResetMessage: null,
                  checkEmail        : null,
					}
				},
				
				watch: {
					
				},
				
				computed: {
               ...mapState({
                  statesList		: 'statesList',               
               }),
               ...mapGetters({
                  conventionInfo	: 'conventionInfo',
                  user			   : 'user',
                  pageContent		: 'pageContent',
               }),
				},
            
            components: {
               datetime: Datetime,
            },
				
				created() {
					
				},
            
				methods: {
                  
                  /* -----------------------------------------------------------
                              CHECK EMAIL
                     ----------------------------------------------------------- */
                  check_email() {
                     var vm = this;
                     vm.newUser.email = vm.newUser.email.replace(/ /g, '');
                     vm.$store.dispatch('check_email', vm.newUser.email).then((response) => {
                        vm.checkEmail = response.data.users.length;
                     }, (err) => {
                           vm.submitErrors = err;
                        vm.showLoginLoading = false;
                     });
                  },
                  
                  
               /* -----------------------------------------------------------
                           SUBMIT NEW USER
                  ----------------------------------------------------------- */
               submit_new_user(e) {
                  var vm = this;
                  vm.newUser.password = vm.newPassword;
                  vm.$store.dispatch('create_update_user_info', vm.newUser).then((response) => {
                     console.log(response.errors);
                     
                     if(response == 'success') {
                                             
                        // show response message for four seconds
                        vm.loginMessage = response;		
                              
                              
                        vm.dropdownSection = 'login';
                        vm.newUser = {};
                        vm.newUser.state = '';
                     } else {
                        
                           // show response message for four seconds
                           vm.loginMessage = response;
                     }
                     
                     setTimeout(function() {
                        vm.loginMessage = null;
                        vm.submitErrors= {};
                     },4000);
                     
                  }, (err) => {
                     console.log(err);
                     vm.submitErrors = err;
                     setTimeout(function() {
                        vm.loginMessage = null;
                        vm.submitErrors= {};
                        vm.dropdownSection = 'login';
                        vm.showPassword = 'password';
                     },4000);
                  });
                  
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
                  var vm = this;
                  console.log(vm.newPassword);
                  vm.newPassword = vm.newPassword.replace(/ |"|'|`/g, '');
                  vm.confPassword = vm.confPassword.replace(/ |"|'|`/g, '');
                  vm.newPassword.length >= 6? vm.validatePassword = true : vm.validatePassword = false;
                  
                  
                  
               },
               
					
				}
			}
	
	</script>
	
	<style>
	
	</style>