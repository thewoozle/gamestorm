
	<template>
		<div class="component edit_profile">
		
      
							<form class="user_form" v-if="info.email" method="POST" action="" @submit.prevent="$store.dispatch('update_user_info', info) ">
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
											<label for="state">State</label>
											<select class="select" name="state" id="state" v-model="info.state" >
												<option value="" style="display: none">select...</option>										
												@include('includes.states')	
											</select>
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
			import { mapGetters } from 'vuex'
         import Router from 'vue-router'
			
			export default{
				name: 'edit_profile',
				
				data() {
					return{
                  info  : [],
					}
				},
				
				watch: {
					
				},
				
				computed: {
					...mapGetters({
						userInfo    : 'userInfo'
					}),
				},
				
				created() {
               this.set_user_info();
				},
				methods: {
					set_user_info() {
                  var vm = this;
                  vm.userInfo.email? vm.info = vm.userInfo : vm.$router.push('/');
               },
				}
			}
	
	</script>
	
	<style>
	
	</style>