
	<template>
		<div class="component edit_profile">
		
      
							<form class="user_form" v-if="info.uuid" method="POST" action="" @submit.prevent="create_update_user">
                        <span class="form_message" v-if="formMessage" v-text="formMessage"></span>
								<div class="rows" >
									<input type="hidden" name="uuid" v-model="info.uuid" />
									<div class="form_row">
										<label for="first_name">First Name</label>
										<input class="input text_box" type="text" name="first_name"id="first_name" v-model="info.first_name" required/>
									</div>
									
									<div class="form_row">
										<label for="last_name">Last Name</label>
										<input class="input text_box" type="text" name="last_name" id="last_name" v-model="info.last_name" required/>
									</div>
									
									<div class="form_row">
										<label for="email">Email</label>
										<input class="input text_box" type="text" name="email" id="email" v-model="info.email" required/>
									</div>
									
									<div class="form_row">
										<label for="">Bus_name</label>
										<input class="input text_box" type="text" name="bus_name" id="business name"v-model="info.bus_name" />
									</div>
									
									<div class="form_row">
										<label for="address">Address</label>
										<input class="input text_box" type="text" name="address"id="address" v-model="info.address" required/>
									</div>
									
									<div class="form_row">
										<label for="address_2">Address 2</label>
										<input class="input text_box" type="text" name="address_2" id="address_2" v-model="info.address2" />
									</div>
									
									<div class="form_row">
										<label for="city">City</label>
										<input class="input text_box" type="text" name="city" id="city" v-model="info.city" required/>
									</div>
									
									<div class="form_row">
                                 <label>State or Territory</label>
                                 <select class="select" name="state" id="state" v-model="info.state" @click="submitErrors.state = null" >
                                    <option value="" style="display: none" >State...</option>
                                    <option :value="state.state" v-for="state in statesList" >{{state.name}}</option>	
                                 </select>
                                 <span class="form_error" v-if="submitErrors.state" v-text="submitErrors.state? 'State or Territory is required' : ''"></span> 
									</div>
									
									<div class="form_row">
											<label for="zip">Postal Code</label>
											<input class="input text_box" type="text" name="zip" id="zip" v-model="info.zip" required/>
									</div>
									
								
									<div class="form_row">
										<label for="phone">Phone</label>
										<input class="input text_box" type="text" name="phone" id="phone" v-model="info.phone" />
									</div>
                           
									<div class="form_row">    
                              <label for="country">Birthdate</label>
                                 <datetime class="input text_box" type="date" v-model="info.birth_date" title="leave blank if over 18 at time of next convention"   ></datetime>
                              <span class="input_message" v-bind:class="submitErrors.birthDate? 'show' : ''" v-text="submitErrors.birthDate"></span>
									</div>
									
									<div class="form_row checkboxes">
										<div class="form_element " title="Receive occasional emails about Gamestorm Events">
                                 <div class="input_wrapper" >
                                    <span class="checkbox_wrapper fal" :class="info.email_contact? 'fa-check-square' : 'fa-square'">
                                       <input class="checkbox" type="checkbox" name="email_contact" id="email_contact" value="1" v-model="info.email_contact" />
                                    </span>
                                 </div>   
                                 <label for="email_contact">Receive email updates?</label>
										</div>	
										
										<div class="form_element ">
                                 <div class="input_wrapper" >
                                    <span class="checkbox_wrapper fal" :class="info.volunteer_interest? 'fa-check-square' : 'fa-square'">
                                       <input class="checkbox" type="checkbox" name="volunteer_interest" id="volunteer_interest" value="1" v-model="info.volunteer_interest" />
                                    </span>
                                 </div>   										
											<label for="volunteer_interest">Interested in volunteering?</label></div>	
										
										<div class="form_element " title="Receive information about submitting and/or helping run games at the convention">
                                 <div class="input_wrapper" >
                                    <span class="checkbox_wrapper fal" :class="info.gm_interest? 'fa-check-square' : 'fa-square'">
                                       <input class="checkbox" type="checkbox" name="gm_interest" id="gm_interest" value="1" v-model="info.gm_interest" />
                                    </span>
                                 </div>   
											<label for="gm_interest">Interest in running a game?</label>
										</div>	
										
									</div>
									
									
								</div>
								
								<div class="controls">
									<button class="button" type="submit">Submit</button>
								</div>
							</form>
                     
		</div>
	</template>
	
	<script>
      import Vue from 'vue'
      import { mapGetters } from 'vuex'
      import Router from 'vue-router'
      import { Datetime } from 'vue-datetime'
		import 'vue-datetime/dist/vue-datetime.css'
      
		Vue.use(Datetime);
      
      export default{
         name: 'edit_profile',
         
         data() {
            return{
               submitErrors: {},
               formMessage : null,
            }
         },
         
         watch: {
            
         },
         
         components: {
				datetime: Datetime,
         },
         
         computed: {
            ...mapGetters({
               statesList  : 'statesList', 
               info        : 'userInfo',
               user        : 'user',  
            }),
         },
         
         mounted() {
         },
         
         methods: {
            create_update_user() {               
               var vm = this;
            vm.$store.dispatch('create_update_user_info', vm.info).then((response) =>{
               console.log(response);
               vm.formMessage = response.message;
            }); 
            
            }
         }
      }
	
	</script>
	
	<style>
      .checkboxes {
         
      }
      .checkboxes label {
         width: auto;
         max-width: 8rem;
         padding-left: .5rem;
         justify-content: flex-start;
         border: none;
         font-size: .9rem;     
      }
      .checkboxes .input_wrapper {
        display: flex;
        justify-content: center;
        width: 2rem;
        padding: 0;
      }
      .checkboxes .checkbox_wrapper {
         width: 2rem;
      }
	</style>