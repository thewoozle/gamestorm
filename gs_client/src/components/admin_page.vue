
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
                     <button type="button" v-if="user.permissions.admin >=2"class="button":class="siteSetting== 'news'? 'active' : ''" @click="siteSetting = 'news'">News</button>
                     <button type="button" v-if="user.permissions.admin >=3"class="button":class="siteSetting== 'conventions'? 'active' : ''" @click="siteSetting = 'conventions'">Conventions</button>
                     <button type="button" v-if="user.permissions.admin >=3"class="button":class="siteSetting== 'venues'? 'active' : ''" @click="siteSetting = 'venues'">Venues</button>
                     <button type="button" v-if="user.permissions.admin >=5"class="button":class="siteSetting== 'users'? 'active' : ''" @click="siteSetting = 'users'">Users</button>
                     <button type="button" v-if="user.permissions.admin >=5" class="button":class="siteSetting== 'permissions'? 'active' : ''" @click="siteSetting = 'permissions'">Permissions</button>
                  </div>
                  
                  <div class="panels">
                  
                  <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                         CONVENTIONS 
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~            -->
                     <div class="panel conventions" v-if="siteSetting == 'conventions'">
                     
                        <div class="slideout" :class="showConventionSlideout? 'show' : ''">
                        
                           <div class="control_buttons">      
                              <button type="button" class="control_button fal fa-redo-alt" @click.prevent="editConvention = {};"></button>
                              <button type="button" class="close_button fal fa-times" @click.prevent="showConventionSlideout ? showConventionSlideout = false : showConventionSlideout = true"></button>
                           </div>
                           <form class="">
                              
                              <div class="form_row">
                                 <div class="form_element">
                                    <label>Convention Name</label>
                                    <div class="input_wrapper" >
                                       <input  class="text_box" type="text" list="conventions" name="convention" v-model="editConvention.name"  v-on:keydown.once="formErrors['convention'] = null"  />
                                       <datalist id="conventions" >
                                          <option v-for="convention in unique_conventions()"  v-bind:value="convention" v-text="convention"></option>
                                       </datalist>
                                    </div>
                                 </div>
                              </div>
                                 
                              <div class="form_row">
                                 <div class="form_element">
                                    <label>Con Number</label>
                                    <div class="input_wrapper" >
                                       <input class="text_box" type="number" min="1" max="2050" v-model="editConvention.con_num" />
                                    </div>
                                 </div>   
                                 
                                 <div class="form_element">
                                    <label>Con Short Name</label>
                                    <div class="input_wrapper" >
                                       <input type="text" class="text_box" v-model="editConvention.short_name" @input="set_con_tag()" />
                                    </div>
                                 </div>
                              </div>
                              
                              <div class="form_row">
                                 <div class="form_element">
                                    <label>Start Date/Time</label>
                                    <div class="input_wrapper" >
                                       <datetime type="datetime" v-model="editConvention.start_date_time" v-bind:placeholder="editConvention.start_date_time? date_time(editConvention.start_date_time) : ''"  min-datetime="2019-01-01" max-datetime="2049-12-31"  ></datetime> 
                                    </div>
                                 </div>                                 
                                 
                                 <div class="form_element">
                                    <label>End Date/Time</label>
                                    <div class="input_wrapper" >
                                       <datetime type="datetime" v-model="editConvention.end_date_time" v-bind:placeholder="editConvention.end_date_time? date_time(editConvention.end_date_time) : ''" min-datetime="2019-01-01" max-datetime="2049-12-31"  ></datetime> 
                                    </div>
                                 </div>
                              </div>
                                 
                              <div class="form_row">
                                 <div class="form_element">
                                    <label>Pre-reg Opens</label>
                                    <div class="input_wrapper" >
                                       <datetime type="datetime" v-model="editConvention.registration_opens" v-bind:placeholder="editConvention.registration_open? date_time(editConvention.registration_open) : ''" min-datetime="2019-01-01" max-datetime="2049-12-31"  ></datetime> 
                                    </div>
                                 </div>                                 
                                 
                                 <div class="form_element">
                                    <label>Pre-reg Closes</label>
                                    <div class="input_wrapper" >
                                       <datetime type="datetime" v-model="editConvention.prereg_close" v-bind:placeholder="editConvention.prereg_close? date_time(editConvention.prereg_close) : ''" min-datetime="2019-01-01" max-datetime="2049-12-31"  ></datetime> 
                                    </div>
                                 </div>
                              </div>
                                 
                              <div class="form_row">
                                 <div class="form_element">
                                    <label>Eventy Submissions Open</label>
                                    <div class="input_wrapper" >
                                       <datetime type="datetime" v-model="editConvention.submissions_open" v-bind:placeholder="editConvention.event_submissions_open? date_time(editConvention.event_submissions_open) : ''"  min-datetime="2019-01-01" max-datetime="2049-12-31"  ></datetime> 
                                    </div>
                                 </div>                                 
                                 
                                 <div class="form_element">
                                    <label>Event Submissions Close</label>
                                    <div class="input_wrapper" >
                                       <datetime type="datetime" v-model="editConvention.event_submissions_close" v-bind:placeholder="editConvention.event_submissions_close? date_time(editConvention.event_submissions_close) : ''" min-datetime="2019-01-01" max-datetime="2049-12-31"  ></datetime> 
                                    </div>
                                 </div>
                              </div>
                                                                  
                              <div class="form_row">
                                 <div class="form_element">
                                    <label>Signups Open</label>
                                    <div class="input_wrapper" >
                                       <datetime type="datetime" v-model="editConvention.signups_open" v-bind:placeholder="editConvention.signups_open? date_time(editConvention.signups_open) : ''" min-datetime="2019-01-01" max-datetime="2049-12-31"  ></datetime> 
                                    </div>
                                 </div>                                 
                                 
                                 <div class="form_element">
                                    <label>Signups Close</label>
                                    <div class="input_wrapper" >
                                       <datetime type="datetime" v-model="editConvention.signups_close" v-bind:placeholder="editConvention.signups_close? date_time(editConvention.signups_close) : ''" min-datetime="2019-01-01" max-datetime="2049-12-31"  ></datetime> 
                                    </div>
                                 </div>
                              </div>
                                 
                                 
                              <div class="form_row">
                                 <div class="form_element">
                                    <label>Venue</label>
                                    <div class="input_wrapper" >
                                       <select class="select" v-model="editConvention.venue">
                                          <option style="display: none;" value="">Select Venue...</option>
                                          <option v-for="venue in venues" :value="venue.id" v-text="venue.venue_name"></option>
                                       </select>
                                    </div>
                                 </div>   
                                 
                              </div>
                              
                              <div class="controls">
                                 <button type="submit" class="button" @click.prevent="save_convention()">Submit</button>
                              </div>
                           </form>
                        </div>
                        
                        <span class="title panel_title">Conventions</span>
                        <button class="button new_con_button" @click="showConventionSlideout ? showConventionSlideout = false : showConventionSlideout = true">New Convention</button>
                     
                        <div class="list_names">
                           <span class="name current_con" title="X = past convention, highlighted = currently active convention">Current</span>
                           <span class="name con_name">Convention</span>
                           <span class="name con_date">Dates</span>
                        </div>
                        <div class="convention_list">
                           <div class="convention_item" v-bind:class="past_con(convention.end_date_time)? 'past_con' : '' "  v-for="convention in conventions" >                           
                              <button class="toggle_control current_con " v-bind:class="[convention.current_con? 'current fas' : 'fal',past_con(convention.end_date_time)? 'fa-times-circle' : 'fa-circle' ]" v-bind:title="convention.current_con? 'deactivate' : 'activate'"></button>
                              <span class="list_item con_name" v-text="convention.name+' '+convention.con_num"></span>
                              <span class="list_item con_date" v-text="month_day_year(convention.start_date_time) +' - ' + month_day_year(convention.end_date_time) "></span>
                              <button class="edit_button fas" v-bind:class="showConventionDetails == convention.tag_name? 'fa-caret-up' : 'fa-caret-down'" title="convention details" @click = "showConventionDetails == convention.tag_name?showConventionDetails = null : showConventionDetails = convention.tag_name" ></button>
                              
                              <div class="con_details" :class="showConventionDetails == convention.tag_name? 'open' : ''">
                                 <div class="details">
                                    <div class="column">
                                       <span class="name">Registration Open</span>
                                       <span class="con_detail" v-text="month_day_year(convention.registration_open)"></span>
                                       
                                       <span class="name">Online Pre-reg Close</span>
                                       <span class="con_detail" v-text="month_day_year(convention.prereg_close)"></span>
                                    </div>   
                                    
                                    <div class="column">
                                       <span class="name">Submissions Open</span>
                                       <span class="con_detail" v-text="month_day_year(convention.event_submissions_open)"></span>                                    
                                       
                                       <span class="name">Submissions Close</span>
                                       <span class="con_detail" v-text="month_day_year(convention.event_sibmissions_close)"></span>                                 
                                    </div>
                                    <div class="column">
                                       <span class="name">Signups Open</span>
                                       <span class="con_detail" v-text="month_day_year(convention.signups_open)"></span>
                                       
                                       <span class="name">Signups Close</span>
                                       <span class="con_detail" v-text="month_day_year(convention.signups_close)"></span>                                    
                                    </div>                                    
                                    
                                    <span class="con_venue" v-text="'Venue: '+convention.venue_name"></span>
                                 </div>   
                                 <div clss="buttons">
                                    <button class="edit_button fal fa-edit" title="Edit Convention" @click="()=>{editConvention = convention; showConventionSlideout = 'show'}" ></button>
                                    <button class="" title="Set as current convention" @click.prevent="set_current_con(convention.tag_name)" >set as current con</button>
                                    <button class="" title="deactivate" >deactivate</button>
                                 </div>
                              </div>
                           </div>
                        </div>   
                     </div>
                     
                     
                  <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                         VENUES 
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~            -->
                     <div class="panel venues"  v-if="siteSetting == 'venues'">
                        <div class="" v-for="venue in venues" >
                           <span class="" v-text="venue.venue_name"></span>
                           <button class="active_toggle fa-circle" v-bind:class="venue.active? 'fas' : 'fal' " v-bind:title="venue.active? 'deactivate' : 'activate'"></button>
                           <button class="edit_button fal fa-edit" title="Edit venue" ></button>
                        </div>
                        <button class="button">New Venue</button>
                     </div>
                     
                     
                  <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                         NEWS 
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~            -->
                     <div class="panel news"  v-if="siteSetting == 'news'">
                        <p>NEWS PANEL</p>
                        <p>current news items, scheduled items, link to news hub</p>
                     </div>

                     
                     
                  <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                         USERS 
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~            -->
                     <div class="panel users" v-if="siteSetting == 'users'">
                        <p>USERS</p>
                        <p>searchable user list with password reset edit info fields, and permissions links</p>
                        <p>show all users with default filter of most recent 10. [ Search box ] <br />
                           Buttons: [ show all ] [ show inactive (wtih # inactive ] [ del. inactive ] [ requested password]</br>
                           each user options: [ deactivate ], [ make admin ], [ send password reset ], [ activate (if deactivated)]
                        </p>
                        
                     </div>
                     
                     
                  <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                         ADMIN PERMISSIONS 
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~            -->
                     <div class="panel permissions" v-if="siteSetting == 'permissions'">
                        <p>USER PERMISSIONSfor admins, departments, and other access</p>
                        <p>show all admin users buttons: [ admin ] [ manager ] [ scheduler ] </br>
                           admin user options: [ change status ] [ set department ] [ demote ]
                        </p>
                        
                        <div class="admin_permissions">
                           <div class="titles">
                              <span class="name">Name</span>
                              <span class="role">Admin</span>
                              <span class="role">News</span>
                              <span class="role">Scheduling</span>
                              <span class="role">Registration</span>
                           </div>
                           <div class="users" >
                              <div class="user" v-for="permission in adminPermissions">
                                 <span class="name" v-text="permission.first_name + ' ' + permission.last_name"></span>
                                 <span class="role" v-text="permission.roles.admin"></span>
                                 <span class="role" v-text="permission.roles.news"></span>
                                 <span class="role" v-text="permission.roles.scheduling"></span>
                                 <span class="role" v-text="permission.roles.registration"></span>
                              </div>
                           </div>
                           <div class="new_admin_permission">
                              <select class="select" v-model="newAdminPermission" @change="set_new_permission()" >
                                 <option value="">select user...</option>
                                 <option v-bind:value="member" v-for="member in members" v-if="member_not_already_admin(member.uuid)" v-text="member.first_name+' '+member.last_name"></option>
                              </select>
                           </div>
                           
                        </div>   
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
		import { Datetime } from 'vue-datetime'
      import moment from 'moment'
		import 'vue-datetime/dist/vue-datetime.css'
      
		Vue.use(Datetime);		
		Vue.use(Router);
		
		export default{
			name: 'admin_page',
			
			
			data() {
				return {
					userPass                : false,
					editConvention          : {},
               editVenue               : {},
               showConventionDetails   : null,
               showConventionSlideout  : false,
               siteSetting             : "news",
               formErrors              : {},     
               newAdminPermission      : '',
				}
			},
			
			components: {
				datetime: Datetime,
			},
			
			watch: {
				
				
			},
			
			
			computed: {
				...mapGetters({
					user			      : 'user',
					regReport	      : 'regReport',
               conventions       : 'conventions',
               venues            : 'venues',
               adminPermissions  : 'adminPermissions',
               members           : 'members',
				}),
            
				
			},
			
			created() {
            var vm = this;
				vm.check_user();
				vm.$store.dispatch('get_reg_report').then(()=>{});
				vm.$store.dispatch('get_admin_permissions').then(()=>{});
				vm.$store.dispatch('get_members').then(() => {});
            vm.clear_edit_convention();
			},
			
			mounted: function() {
				
			},
			
			
			methods: {
				
				
				
            // CLEAR EDIT CONVENTION 
            clear_edit_convention() {
               var vm = this;
               vm.editConvention = {};
               vm.editConvention.venue = '';
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
            
            // SET CON TAG 
            set_con_tag() {
               var   vm = this,
                     conTag;
               if(vm.editConvention.short_name) {
                  conTag = vm.editConvention.short_name.toUpperCase();
                  conTag = conTag.replace(' ', '_');
               }
               vm.editConvention.tag_name =  conTag;				
            },
            
            // PAST CON 
            past_con(endDate) {
               return moment().isAfter(endDate);
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
            
            // SAVE/UPDATE CONVENTION 
            save_convention() {
               var vm = this;
               vm.$store.dispatch('save_convention',vm.editConvention).then(()=>{
                  console.log(convention.tag_name+' saved');
               });
            },
            
            // SET CURRENT CON 
            set_current_con(con) {
               if(confirm('wana?') == true) {
                  console.log('setting '+con+' to current.. but not really');
               }
               console.log(con);
            },
            
            // MEMBER NOT ALREADY ADMIN 
            member_not_already_admin(uuid) {
               var   vm    = this,
                     found = true;
               Object.entries(vm.adminPermissions).forEach((permission) => {
                  if(permission[1].uuid == uuid) {
                     found = false;
                  } 
               });
               
               return found;
            },
            
            // SET NEW ADMIN PERMISSION 
            set_new_permission() {
               var   vm = this,
                     newPermission = {},
                     found = true;
                     
               Object.entries(vm.adminPermissions).forEach((permission) => {
                  if(permission[1].uuid == vm.newAdminPermission) {
                     found = false;
                  } 
               });  

               newPermission = {'last_name' : vm.newAdminPermission.last_name, 'first_name': vm.newAdminPermission.first_name, 'uuid': vm.newAdminPermission.uuid, 'roles' : {}};
               
               found? vm.$store.dispatch('update_admin_permission', newPermission).then(()=>{
                  vm.newAdminPermission = '';
               }) : '';    
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
         min-height: 25rem;         
      }
      .panel_display .panel {
         display: flex;
            flex-direction: column;
         position: relative;
         padding: 2rem;
         width: 100%;
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
         width: 100%;
         max-width: 100%;
         transition: max-height .3s, right .6s;
      }
      
      .panel_display .panel .control_buttons {
         position: absolute;
            top: 0;
            right: 0;
         display: flex;
         margin: .5rem;
      }
      .panel_display .panel .control_buttons .control_button {
         margin: 0 .25rem;
         background: rgba(0,118,163,.4);
      }
      .panel_display .panel .control_buttons .control_button:hover {
         background: none;
      }
      .panel_display .panel .slideout label {
         justify-content: flex-end;
         text-align: right;
         width: 10rem;
         padding-right: 1rem;
      }
      .panel_display .panel .slideout input {
         font-size: .9rem;
         color: var(--mainColor);
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
         min-height: 35rem;
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
         position: relative;
         display: flex;
            align-items: center;
            flex-wrap: wrap;
         width: 100%;
      }
      .panel_display .convention_item.past_con{
         font-size: .85rem;
      }
      .panel_display .convention_item + .convention_item {
         margin-top: .5rem;
      }
      .list_names .current_con,
      .convention_list .current_con {
         display: flex;
            justify-content: center;
         width: 2em;
         border-radius: 50%;
         font-size: 1em;
      }  
      .convention_list .current_con.current:before {
         color: var(--activeColor);
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
      
      
      .convention_list .con_details {
         display: flex;
            justify-content: space-between;
         width: 100%;
         max-height: 0;
         overflow: hidden;
         background: var(--altColor);
         transition: max-height .2s, border .2s, padding .2s;
      }
      .convention_list .con_details .details{
         display: flex;
            flex-wrap: wrap;
            min-width: calc(100% = 6rem);
      }
      .convention_list .con_details.open {
         max-height: 25rem;     
         padding: .5rem 1rem;
         border: solid 1px var(--borderColor);
      }
      .convention_list .con_details .column {
         display: flex;
            flex-direction: column;
         padding: .5rem 1rem;   
      }
      
      .convention_list .con_details .name {
         display: flex;
         font-weight: bold;
      }
      
      .convention_list .con_details .buttons {
         display: flex;
         width: 6rem;
      }
      
      .convention_list .edit_button {
         display: flex;
            justify-content: center;
         border: solid 1px var(--borderColor);
         border-radius: .1rem;
         width: 3rem;
         height: 3rem;
         font-size: 2rem;
         border-radius: .2em;         
         cursor: pointer;
         color: var(--borderColor);
      }
      .convention_list .edit_button:hover {
         background: #045f04;
      }
      .convention_list .edit_button:hover:before {
        color: #fff;
      }
      .convention_list .con_details .con_detail{
         display: flex;
      }
      .convention_list .con_details .con_venue {
         display: flex;
         width: 100%;
      }
      
      
      .admin_permissions  {
         display: flex;
         flex-direction:column;
      }
      .admin_permissions .titles {
         display: flex;
         font-weight: bold;
      }
      .admin_permissions .users {
         display: flex;
         flex-direction: column;
      }
      .admin_permissions .user {
         display: flex;
         
      }
      .admin_permissions .name {
         display: flex;
         flex-wrap: none;
         overflow: hidden;
         white-space: nowrap;
         width: 10rem;
      }
      .admin_permissions .role {
         display: flex;
         justify-content: center;
         width: 6rem;
      }
      .admin_permissions  {
         
      }
      
      
      .section.conventions .slideout {
         background: var(--altColor);
      }
      
      
      
		
	
	</style>