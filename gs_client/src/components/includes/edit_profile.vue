
	<template>
		<div class="component edit_profile">
		
      
							<form class="user_form" v-if="info.uuid" method="POST" action="" @submit.prevent="$store.dispatch('update_user_info', info) ">
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
                              <div class="input_wrapper">
                                 <select class="select" name="state" id="state" v-model="info.state" @click="submitErrors.state = 'null'" @set="info.state == null? info.state = '' : ''">
                                    <option value="" style="display: none" >State...</option>
                                    <option :value="state.state" v-for="state in statesList" >{{state.name}}</option>	
                                 </select>
                                 <label>State or Territory</label>
                                 <span class="form_error" v-if="submitErrors.state" v-text="submitErrors.state? 'State or Territory is required' : ''"></span>
                              </div>   
									</div>
									
									<div class="form_row">
											<label for="zip">Postal Code</label>
											<input class="input text_box" type="text" name="zip" id="zip" v-model="info.zip" required/>
									</div>
									
									<div class="form_row">
										<label for="country">Country</label>
										<input class="input text_box" type="text" name="country" id="country" v-model="info.country" />
									</div>						
								
									<div class="form_row">
										<label for="phone">Phone</label>
										<input class="input text_box" type="text" name="phone" id="phone" v-model="info.phone" />
									</div>
									
									<div class="form_row">
										<div class="form_element third" title="Receive occasional emails about Gamestorm Events">
											<label for="email_contact">Email Updates</label>
											<input class="checkbox" type="checkbox" name="email_contact" id="email_contact" value="1" v-model="info.email_contact" />
										</div>	
										
										<div class="form_element third">
											<label for="volunteer_interest">Interested in volunteering?</label>
											<input class="checkbox" type="checkbox" name="volunteer_interest" id="volunteer_interest" value="1" v-model="info.volunteer_interest" />
										</div>	
										
										<div class="form_element third" title="Receive information about submitting and/or helping run games at the convention">
											<label for="gm_interest">Interest in Running a game</label>
											<input class="checkbox" type="checkbox" name="gm_interest" id="gm_interest" value="1" v-model="info.gm_interest" />
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
			import { mapState,mapGetters } from 'vuex'
         import Router from 'vue-router'
			
			export default{
				name: 'edit_profile',
				
				data() {
					return{
                  info        : {},
                  submitErrors: {},
					}
				},
				
				watch: {
					
				},
				
				computed: {
					...mapGetters({
                  userInfo    : 'userInfo',
					}),
               ...mapState({
                  statesList  : 'statesList',   
               }),
				},
            
				created() {
               var vm = this;
               vm.get_user_info();
				},
				methods: {
               
					get_user_info() {
                  var vm = this;
                  if(vm.userInfo.uuid) {
                  console.log(vm.userInfo);
                     vm.info = vm.userInfo;
                  } else{
                     vm.$store.dispatch('get_user_info', vm.userInfo.uuid).then(()=>{
                        vm.info = vm.userInfo;                        
                     });
                  } 
               }
				}
			}
	
	</script>
	
	<style>
	
	</style>