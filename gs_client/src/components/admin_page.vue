
	<template>
		<div id="admin_page">
		
			<div class="sections">
				<section class="section admin_report">
					<p>admin mini-report</p>
					<p>convention, active events, database connection</p>
				</section>
				
				<section class="section conventions">
					<p>CONVENTION SETTINGS PANEL</p>
					<p>[ list of cons with past cons un-editable. active button, edit button ]</br>
                  [ list of venues, active and edit buttons ]</br>
                  [ new convention and venue forms ]
               </p>
               <div class="panel">
                  <div class="slideout" :class="showConventionSlideout? 'show' : ''">
                     <form class="">
                        
                        <div class="form_row">
                           <div class="input_wrapper" title="defaults to full name">
                              <input  class="text_box" type="text" name="convention" v-model="newConvention.name"  v-on:keydown.once="formErrors['convention'] = null"  />
                              <datalist >
                                 <option v-for="convention in unique_conventions()"  v-bind:value="convention" v-text="convention"></option>
                              </datalist>
                              <label>Convention Name</label>
                           </div>
                        </div>
                     
                     </form>
                  </div>
               
                  <div class="" v-for="convention in conventions" >
                     <span class="" v-text="convention.name+' '+convention.con_num"></span>
                     <span class="" v-text="month_day_year(convention.start_date_time) +' - ' + month_day_year(convention.end_date_time) "></span>
                     <button class="toggle_control active_toggle fa-circle" v-bind:class="convention.active? 'fas' : 'fal' " v-bind:title="convention.active? 'deactivate' : 'activate'"></button>
                     <button class="toggle_control edit_toggle fal fa-edit" title="edit convention" ></button>
                  </div>
                  <button class="button" @click="showConventionSlideout ? showConventionSlideout = false : showConventionSlideout = true">New Convention</button>
               </div>
               
               
               <div class="panel">
                  <div class="" v-for="venue in venues" >
                     <span class="" v-text="venue.venue_name"></span>
                     <button class="toggle_control active_toggle fa-circle" v-bind:class="venue.active? 'fas' : 'fal' " v-bind:title="venue.active? 'deactivate' : 'activate'"></button>
                     <button class="toggle_control edit_toggle fal fa-edit" title="Edit venue" ></button>
                  </div>
                  <button class="button">New Venue</button>
               </div>
               
				</section>
				
				<section class="section news_panel">
					<p>NEWS PANEL</p>
					<p>current news items, scheduled items, link to news hub</p>
				</section>
				
				<section class="section users_panel">
					<p>USERS PANEL</p>
					<p>searchable user list with password reset edit info fields, and permissions links</p>
					<p>show all users with default filter of most recent 10. [ Search box ] <br />
						Buttons: [ show all ] [ show inactive (wtih # inactive ] [ del. inactive ] [ requested password]</br>
						each user options: [ deactivate ], [ make admin ], [ send password reset ], [ activate (if deactivated)]
					</p>
					<p>show all admin users buttons: [ admin ] [ manager ] [ scheduler ] </br>
						admin user options: [ change status ] [ set department ] [ demote ]
					</p>
					
					
				</section>
		
			</div>
		
		</div>
	</template>
	
	
	
	<script>
		import Vue from 'vue'
		import { mapGetters } from 'vuex'
		import Router from 'vue-router'
		
		Vue.use(Router);
		
		export default{
			name: 'admin_page',
			
			
			data() {
				return {
					userPass                : false,
					newConvention           : {},
               newVenue                : {},
               showConventionSlideout  : false,
				}
			},
			
			
			watch: {
				
				
			},
			
			
			computed: {
				...mapGetters({
					user			: 'user',
					regReport	: 'regReport',
               conventions : 'conventions',
               venues      : 'venues',
				}),
				
				
				
			},
			
			created() {
				this.check_user();
				this.get_store_data();
			},
			
			mounted: function() {
				
			},
			
			
			methods: {
				
				// GET STORE DATA FOR VUEX  
				get_store_data() {
					var vm = this;
					vm.$store.dispatch('get_reg_report').then(()=>{});
				},
				
				// CHECK USER PAGE PERMISSION
				check_user() {
					var vm = this;					
					if (vm.user) {
						if (vm.user.permissions) {
							if (vm.user.permissions.admin) {
								vm.userPass = true;
							} 
						} 
					}					
					vm.userPass? '' : vm.$router.push('/mainpage');					
				},

            // GET UNIQUE CONVENTION NAMES
            unique_conventions() {
               var   vm       = this,
                     conNames = [];
               
               Object.entries(vm.conventions).forEach((con)=>{
                  conNames.indexOf(con[1].name) === -1? conNames.push(con[1].name) : '';
               });
               
               return conNames;
            },
				
			}
			
		}
	</script>
	
	
	<style>
		.section {
			
		}
      
		#admin_page .section * {
			color: var(--mainColor);
		}
      
      .section.conventions {
         position: relative;
         overflow: hidden;
      }
      .section.conventions .slideout {
         background: var(--altColor);
      }
      
		
	
	</style>