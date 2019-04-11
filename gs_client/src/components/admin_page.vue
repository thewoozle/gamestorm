
	<template>
		<div id="admin_page">
		
			<div class="sections">
				<section class="section admin_report">
					<p>admin mini-report</p>
					<p>convention, active events, database connection, message</p>
				</section>
				
				<section class="section site_settings">
               <span class="title admin_title">Admin Dashboard</span>
               
               <div class="panel_display">
                  <div class="buttons">
                     <button type="button" class="button":class="siteSetting== 'news'? 'active' : ''" @click="siteSetting = 'news'">News</button>
                     <button type="button" class="button":class="siteSetting== 'permissions'? 'active' : ''" @click="siteSetting = 'permissions'">Permissions</button>
                     <button type="button" class="button":class="siteSetting== 'conventions'? 'active' : ''" @click="siteSetting = 'conventions'">Conventions</button>
                     <button type="button" class="button":class="siteSetting== 'venues'? 'active' : ''" @click="siteSetting = 'venues'">Venues</button>
                     <button type="button" class="button":class="siteSetting== 'users'? 'active' : ''" @click="siteSetting = 'users'">Users</button>
                  </div>
                  
                  <div class="panels">
                  
                     <div class="panel conventions" v-if="siteSetting == 'conventions'">
                        <div class="slideout" :class="showConventionSlideout? 'show' : ''">
                           <button type="button" class="close_button fal fa-times" @click="showConventionSlideout ? showConventionSlideout = false : showConventionSlideout = true"></button>
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
                        
                        <span class="title panel_title">Conventions</span>
                        <button class="button new_con_button" @click="showConventionSlideout ? showConventionSlideout = false : showConventionSlideout = true">New Convention</button>
                     
                        <div class="list_names">
                           <span class="name active_con">Active</span>
                           <span class="name con_name">Convention</span>
                           <span class="name con_date">Date</span>
                        </div>
                        <div class="convention_list">
                           <div class="convention_item" v-for="convention in conventions" >                           
                              <button class="toggle_control active_con fa-circle" v-bind:class="convention.active? 'fas' : 'fal' " v-bind:title="convention.active? 'deactivate' : 'activate'"></button>
                              <span class="list_item con_name" v-text="convention.name+' '+convention.con_num"></span>
                              <span class="list_item con_date" v-text="month_day_year(convention.start_date_time) +' - ' + month_day_year(convention.end_date_time) "></span>
                              <button class="toggle_control edit_toggle fas fa-caret-down" title="convention details" ></button>
                           </div>
                        </div>   
                     </div>
                     
                     
                     <div class="panel venues"  v-if="siteSetting == 'venues'">
                        <div class="" v-for="venue in venues" >
                           <span class="" v-text="venue.venue_name"></span>
                           <button class="toggle_control active_toggle fa-circle" v-bind:class="venue.active? 'fas' : 'fal' " v-bind:title="venue.active? 'deactivate' : 'activate'"></button>
                           <button class="toggle_control edit_toggle fal fa-edit" title="Edit venue" ></button>
                        </div>
                        <button class="button">New Venue</button>
                     </div>
                     
                     <div class="panel news"  v-if="siteSetting == 'news'">
                        <p>NEWS PANEL</p>
                        <p>current news items, scheduled items, link to news hub</p>
                     </div>

                     <div class="panel users" v-if="siteSetting == 'users'">
                        <p>USERS PANEL</p>
                        <p>searchable user list with password reset edit info fields, and permissions links</p>
                        <p>show all users with default filter of most recent 10. [ Search box ] <br />
                           Buttons: [ show all ] [ show inactive (wtih # inactive ] [ del. inactive ] [ requested password]</br>
                           each user options: [ deactivate ], [ make admin ], [ send password reset ], [ activate (if deactivated)]
                        </p>
                        <p>show all admin users buttons: [ admin ] [ manager ] [ scheduler ] </br>
                           admin user options: [ change status ] [ set department ] [ demote ]
                        </p>
                        
                     </div>
                     
                     <div class="panel permissions" v-if="siteSetting == 'permissions'">
                        <p>USER PERMISSIONSfor admins, departments, and other access</p>
                     </div>
                  </div>   
                  
               </div>
               
               
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
               siteSetting             : "news",
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
      
		#admin_page .sections {
         
      }
      
      .panel_display {
         display: flex;
            justify-content: space-between;            
         width: 100%;
         margin-top: 2rem;
         padding: 0 2vw;
         max-width: 70rem;         
      }
      .panel_display .panel {
         display: flex;
            flex-wrap: wrap;
         position: relative;
         padding: 1rem;
      }
      .panel_display .panel_title {
         display: flex;
         justify-content: center;
         font-size: 1.25rem;
         width: 100%;         
      }      
      .panel_display .list_names {
         display: flex;
         width: 100%;         
      }
      .panel_display .convention_list {
         display: flex;
         flex-direction: column;
         width: 100%;         
      }
      
      .panel_display .panel .slideout {
         position: absolute;
         background: var(--altColor);
         max-height: 100%;
         transition: max-height .3s, right .6s;
      }
      .panel_display .panel .slideout.show {
         max-height: 80rem;
      }
      
      .panel_display  .buttons {
         display: flex;
            flex-direction: column;
         width: 8rem;   
      }
      .panel_display  .panels {
         display: flex;
         width: calc(100% - 9rem);
         border: solid 1px var(--borderColor);
         border-radius: .2rem;
         height: 100%;
         overflow: hidden;
         overflow-y: auto;
      }
		#admin_page .section * {
			color: var(--mainColor);
		}
      
      
      .site_settings .admin_title {
         justify-content: center;
      }
      .site_settings {
         display: flex;
         flex-direction: column;
      }
      .site_settings .buttons .button {
         width: 100%;
         font-size: 1.25rem;
      }
      .site_settings .buttons .button + .button {
         margin-top: .75rem;
      }
      
      .section.conventions {
         position: relative;
         overflow: hidden;
      }
      .panel_display .convention_item {
         display: flex;
         width: 100%;
      }
      .panel_display .convention_item + .convention_item {
         margin-top: .5rem;
      }
      .list_names .active_con,      
      .convention_list .active_con {
         display: flex;
            justify-content: center;
         width: 3rem;
      }
      .list_names .con_name,      
      .convention_list .con_name {
         display: flex;
            justify-content: center;
         width: 15rem;
      }
      .convention_list .con_name {
         justify-content: flex-start;
         padding-left: 2rem;
      }
      .list_names .con_date,      
      .convention_list .con_date {
         display: flex;
            justify-content: center;
         width: 15rem;
      }
      
      .panel.conventions .new_con_button {
         position: absolute;
            top: 0;
            right: 0;
         font-size: 1rem;   
         cursor: pointer;
         margin: .5rem;
      }
      .convention_list .edit_toggle {
         border: solid 1px var(--borderColor);
         border-radius: .1rem;
         width: 1em;
         cursor: pointer;
         color: var(--borderColor);
      }
      .convention_list .edit_toggle:hover {
         background: #045f04;
      }
      .convention_list .edit_toggle:hover:before {
        color: #fff;
      }
      
      
      
      .section.conventions .slideout {
         background: var(--altColor);
      }
      
		
	
	</style>