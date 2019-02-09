
	<template>
		
         <div class="reset_wrapper" >
            <form class="" @submit.prevent="reset_password" >
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
               
               <p class="reset_message" v-if="resetMessage" v-text="resetMessage"></p>
            
            </form>
                        
         </div>
	</template>
	
	<script>
			import Vue from 'vue'
			import { mapGetters } from 'vuex'
			
			export default{
				name: 'changepassword',
				
				data() {
					return{
                  showPassword: false,
                  newPassword : '',
                  confPassword: '',
                  submitErrors: [],
                  validatePassword: false,
                  resetMessage: null,
					
					}
				},
            
            
				
				watch: {
					
				},
				
				computed: {
					...mapGetters({
						user   : 'user',
					}),
				},
				
				created() {
					
				},
				methods: {
					
         /* ---------------------------------------------------------------
                  VALIDATE NEW PASSWORD
            ---------------------------------------------------------------   */
         validate_new_password() {
            var vm = this;
            vm.newPassword = vm.newPassword.replace(/ |"|'|`/g, '');
            vm.confPassword = vm.confPassword.replace(/ |"|'|`/g, '');
            vm.newPassword.length >= 6? vm.validatePassword = true : vm.validatePassword = false;            
         },
         
         reset_password() {
            var   vm = this,
                  userInfo = {}; 
               if(vm.confPassword == vm.newPassword) {
                  userInfo.newPassword = vm.newPassword;                  
                  userInfo.uuid = vm.$route.query.c || vm.user.uuid;
                  vm.$store.dispatch('update_password', userInfo).then((response) => {
                        vm.resetMessage = 'Password Reset';
                        setTimeout(function() {
                           vm.loginMessage = null;
                           vm.urlParams = {};
                           vm.showPassword = false;
                           
                           vm.$store.dispatch('update_user' ).then(()=>{
                              vm.$route.name == 'mainpage'? '' : vm.$router.push({name: 'mainpage'});
                           });
                        },2000);
                           
                  }, (err) => {
                     console.log(err);
                  });
               } 
               
         },
         
				}
			}
	
	</script>
	
	<style>
	
	</style>