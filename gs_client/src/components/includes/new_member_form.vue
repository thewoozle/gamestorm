
	<template>
		

      <form @submit.prevent="submit_new_form" class="rows" >
         <div class="form_wrapper" :account=account>
         
            <div class="form_row email_check_row">
               <label for="last_name">Email</label>
               <div class="input_wrapper">
                  <input class="input text_box" type="text" name="email" id="email"   v-model="account.email" required @keyup="check_email(); submitErrors.email = null"/>
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
                  <input class="input text_box" type="text" name="first_name" id="first_name"   v-model="account.first_name" required @keyup="submitErrors.first_name = null"/>
               </div>
               <span class="input_message" v-bind:class="submitErrors.first_name? 'show' : ''" v-text="submitErrors.first_name"></span>
            </div>
            
            <div class="form_row">
               <label for="last_name">Last Name</label>
               <div class="input_wrapper">
                  <input class="input text_box" type="text" name="last_name" id="last_name"   v-model="account.last_name" required @keyup="submitErrors.last_name = null"/>
               </div>
               <span class="input_message" v-bind:class="submitErrors.last_name? 'show' : ''" v-text="submitErrors.last_name"></span> 					
            </div>
            
            
            <div class="form_row">
               <label for="last_name">Address</label>
               <div class="input_wrapper">
                  <input class="input text_box" type="text" name="address" id="address"   v-model="account.address" required @keyup="submitErrors.address = null"/>
               </div>
               <span class="input_message" v-bind:class="submitErrors.address? 'show' : ''" v-text="submitErrors.address"></span> 					
            </div>
            
            
            <div class="form_row">
               <label for="last_name">Address 2</label>
               <div class="input_wrapper">
                  <input class="input text_box" type="text" name="address2" id="address2"   v-model="account.address2" @keyup="submitErrors.address2 = null"/>
               </div>
               <span class="input_message" v-bind:class="submitErrors.address2? 'show' : ''" v-text="submitErrors.address2"></span> 					
            </div>
            
            
            <div class="form_row">
               <label for="last_name">City</label>
               <div class="input_wrapper">
                  <input class="input text_box" type="text" name="city" id="city"   v-model="account.city" required @keyup="submitErrors.city = null"/>
               </div>
               <span class="input_message" v-bind:class="submitErrors.city? 'show' : ''" v-text="submitErrors.city"></span> 					
            </div>
            
            
            <div class="form_row">
               <div class="form_element">
                  <div class="input_wrapper">
                     <select class="select" name="state" id="state" v-model="account.state" @click="submitErrors.state = 'null'" @set="account.state == null? account.state = '' : ''">
                        <option value="" style="display: none" >State...</option>
                        <option :value="state.state" v-for="state in statesList" >{{state.name}}</option>	
                     </select>
                     <label>State or Territory</label>
                     <span class="form_error" v-if="submitErrors.state" v-text="submitErrors.state? 'State or Territory is required' : ''"></span>
                  </div>   
               </div>      
               <div class="form_element">
                  <div class="input_wrapper" title="leave blank if over 18 at time of next convention">
                  <datetime type="date" v-model="account.birth_date"   ></datetime>
                  
                  </div>				
                  <label for="country">Birthdate</label>
                  <span class="input_message" v-bind:class="submitErrors.birthDate? 'show' : ''" v-text="submitErrors.birthDate"></span>
               </div>
            </div>	
            
            
            <div class="form_row">
               <div class="form_element">
                  <label for="last_name">Postal Code</label>
                  <div class="input_wrapper">
                     <input class="input text_box" type="text" name="zip" id="zip"   v-model="account.zip" required @keyup="submitErrors.zip = null"/>
                  </div>
                  <span class="input_message" v-bind:class="submitErrors.zip? 'show' : ''" v-text="submitErrors.zip"></span> 	
               
               </div>      
               <div class="form_element">
                  <label for="last_name">Phone</label>
                  <div class="input_wrapper">
                     <input class="input text_box" type="text" name="phone" id="phone"   v-model="account.phone" />
                  </div>                                    
               </div>
            </div>
            
            <p>All information will be confidential and used only in relation to having website access and for convention membership. </p>
            
            <div class="form_row controls">
               <button type="submit" class="button">Submit</button>			
            </div>
         </div>
            
      </form>

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
				props: {
               account: {
                  type: Object,
               },
            },
            
				computed: {
               ...mapState({
                  statesList		: 'statesList',               
               }),
               ...mapGetters({
                  conventionInfo	: 'conventionInfo',
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
                     vm.account.email = vm.account.email.replace(/ /g, '');
                     vm.$store.dispatch('check_email', vm.account.email).then((response) => {
                        if(response) {
                           vm.checkEmail = response.data.users.length;
                        }
                     }, (err) => {
                           vm.submitErrors = err;
                        vm.showLoginLoading = false;
                     });
                  },
                  
                  
                  
                  /* -----------------------------------------------------------
                              SUBMIT FORM 
                              return account object to parent
                     ----------------------------------------------------------- */
                  submit_new_form() {
                     var vm = this;
                     vm.$emit('newAccount', vm.account);
                  }
                  
                  
				}
			}
	
	</script>
	
	<style>
	
	</style>