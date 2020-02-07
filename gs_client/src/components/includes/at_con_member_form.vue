
	<template>
		
      

      <form @submit.prevent="submit_new_form" class="rows at_con_member_form" >
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
               <label>State or Territory</label>
               
               <div class="input_wrapper">
                  <select class="select" name="state" id="state" v-model="account.state" @click="submitErrors.state = 'null'" @set="account.state == null? account.state = '' : ''">
                     <option value="" style="display: none" >State...</option>
                     <option :value="state.state" v-for="state in statesList" >{{state.name}}</option>	
                  </select>
               </div>   
            </div>  
            
            
            <div class="form_row">
               <label for="last_name">Postal Code</label>
               <div class="input_wrapper">
                  <input class="input text_box" type="text" name="zip" id="zip"   v-model="account.zip" required @keyup="submitErrors.zip = null"/>
               </div>
               <span class="input_message" v-bind:class="submitErrors.zip? 'show' : ''" v-text="submitErrors.zip"></span> 	
            
            </div>
            
            <div class="form_row">
               <label for="last_name">Phone</label>
               <div class="input_wrapper">
                  <input class="input text_box" type="text" name="phone" id="phone"   v-model="account.phone" />
               </div>    
            </div>   
            
            <div class="form_row">
               <label class="label" >Age<span class="subtext">( if under 18 at {{currentCon.short_name}} )</span></label>
               <div class="input_wrapper">
                  <input class="input text_box" title="age required if member is under 18 at time of the next convention" type="text" v-model="account.age"  @keyup="submitErrors.age = null"/>
               </div>
               <span class="input_message" v-bind:class="submitErrors.birthDate? 'show' : ''" v-text="submitErrors.birthDate"></span>
            </div>
            
            <div class="form_row parent_info" :class="account.age? 'show' : ''">
            
               <label class="label" >Parental Information</label>
               <div class="input_wrapper">
                  <input class="input text_box" placeholder="Parent or Guardian" />
                  <input class="input text_box" placeholder="contact number" />
               </div>
               
               <p>Memberships for children are subject to the Children Policy and will require a liability waiver.  </br>
                  Per OSFCI child policy, all children ten and under must be accompanied by an adult at all times. 
                  </p>
            </div>
            
            <p>All information will be confidential and used only in relation to having website access and for convention membership. </p>
            
            <p>All memberships are subject to the Code of Conduct.  </p>
            
            <div class="form_row controls">
               <button type="submit" class="button">Submit</button>
            </div>
         </div>
            
         <div class="member_types">
            <span class="title">Membership Types</span>
            <div class="member_type" :class="account.membership == type.type? 'picked' : '' " v-for="(type, index) in memberTypes" v-if="type.store_item">
               <div class="type_description">
                  <span class="type" v-text="type.short_description"></span>
                  <span class="price" v-text="'$'+type.price+'.00'"></span>
               </div>  
               <div class="check_wrapper">
                  <span class="type_check fal" :class="account.membership == type.type? 'fa-check-square' : 'fa-square' " @click.prevent="set_account_membership(index)"></span>
               </div>
            </div>
         
         </div>
      
      </form>
	</template>
	
	<script>
			import Vue from 'vue'
			import { mapState} from 'vuex'
         
         import moment from 'moment'
         
			
			export default{
				name: 'at_con_member_form',
				
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
                  showPassword      : false,
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
                  currentCon     : 'currentCon',
                  memberTypes    : 'memberTypes',
               }),
				},
            
            components: {
            },
				
				created() {
               var vm = this;
               vm.$store.dispatch('get_reg_data').then(()=>{});
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
                              SET ACCOUNT MEMBERSHIP
                     ----------------------------------------------------------- */
                  set_account_membership(index) {
                     var vm = this;
                     vm.account.membership = vm.memberTypes[index].type;
                     vm.account.price = vm.memberTypes[index].price;
                     vm.$emit('accountUpdate', vm.account );
                     vm.$forceUpdate();   
                  },
                  
                  /* -----------------------------------------------------------
                              SUBMIT FORM 
                              return account object to parent
                     ----------------------------------------------------------- */
                  submit_new_form() {
                     var vm = this;
                     if(vm.newPassword == vm.confPassword) {
                        vm.newPassword = null;
                        vm.confPassword = null;
                        vm.$emit('newAccount', vm.account);
                     }
                  },
                  
                  
                  
				}
			}
	
	</script>
	
   
   
   
   
	<style>
   .at_con_member_form {
      display: flex;
         justify-content: center;
      width: 100%;   
      max-width: 50rem;
      padding: 1rem 2rem;
      border: solid 1px var(--borderColor);
      border-radius: .25rem;
   }
   .at_con_member_form .form_wrapper {
      display: flex;
      flex-wrap: wrap; 
      width: calc(100% - 18rem);
      min-width: 20rem;
      overflow: hidden;
      max-width: 30rem;
   }
   .at_con_member_form .form_row {
      width: 100%; 
      justify-content: flex-end;
   }
   .at_con_member_form .input_wrapper {
      width: 100%;
   }
   .at_con_member_form .form_row + .form_row {
      margin-top: .5rem;
   }
   .at_con_member_form .form_element {
      max-width: calc(50% - 1rem);
   }
   .at_con_member_form .form_row label {
      width: 8rem;
      flex-wrap: wrap;
      font-size: .9rem;
      align-items: center;
      justify-content: flex-end;
   }
   #at_con_page .at_con_member_form .email_check .icon {
      color: var(--warningColor);
      top: 0;
   }
   #at_con_page .at_con_member_form .email_check .message {
      background: #4f0202;
      color: var(--highlightColor);
   }
   
   .at_con_member_form .parent_info {
      overflow: hidden;
      flex-wrap: wrap;
      padding: 0 2rem;
      max-height: 0;
      opacity: 0;
      transition: max-height .4s, opacity .4s;
   }
   .at_con_member_form .parent_info.show {
      max-height: 10rem;
      opacity: 1;
   }
   .at_con_member_form .parent_info .label {
      width: 100%;
      justify-content: flex-start;
   }
   .at_con_member_form .parent_info  .text_box{
      border: solid 1px var(--borderColor);
      margin: .25rem 0;
   }
   .at_con_member_form .parent_info {
   }
   
   
   .at_con_member_form .member_types {
      width: 18rem;
      padding: 0 1rem; 
      flex-direction: column;
   }
   .at_con_member_form .member_types .member_type {
      margin-top: .5rem;      
      opacity: .95;
   }
   .at_con_member_form .member_types .member_type.picked {
      opacity: 1;
   }
   .at_con_member_form .member_types .title {
      justify-content: center;
   }
   .at_con_member_form .member_types .type {
      width: 100%;
      font-size: 1.1rem;
   }
   .at_con_member_form .member_types .type_description {
      width: calc(100% - 2rem);
      flex-wrap: wrap;
   }
   .at_con_member_form .member_types .price {
      padding: 0 1rem;
      width: 100%;
      justify-content: flex-end;
      font-size: 1.15rem;
   }
   .at_con_member_form .member_types .check_wrapper {
      width: 3rem;
      justify-content: center;
      align-items: center;
      border-left: solid 1px var(--borderColor);
      
   }
   .at_con_member_form .member_types .type_check {
      cursor: pointer;
      font-size: 2rem;
   }
   
   
   
	
	</style>