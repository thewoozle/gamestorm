
	<template>
		<div id="admin_page" class="admin_page">
		
			<div class="sections">
				<section class="section admin_report">
					<p>admin mini-report</p>
					<p>convention, active events, database connection, message</p>
				</section>
				
				<section class="section site_settings">
               <span class="title admin_title">Admin Dashboard</span>
               
               <div class="panel_display">
                  <div class="buttons">
                     <button type="button" v-if="user.permissions.admin >=3" class="button" :class="siteSetting== 'conventions'? 'active' : ''" @click="siteSetting = 'conventions'">Conventions</button>
                     <button type="button" v-if="user.permissions.admin >=3" class="button" :class="siteSetting== 'venues'? 'active' : ''" @click="siteSetting = 'venues'">Venues</button>
                     <button type="button" v-if="user.permissions.admin >=5" class="button" :class="siteSetting== 'users'? 'active' : ''" @click="siteSetting = 'users'">Users</button>
                     <button type="button" v-if="user.permissions.admin >=5" class="button" :class="siteSetting== 'permissions'? 'active' : ''" @click="siteSetting = 'permissions'">Permissions</button>
                     <button type="button" v-if="user.permissions.admin >=3" class="button" :class="siteSetting== 'messages'? 'active' : ''" @click="siteSetting = 'messages'">Messages</button>
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
                                       <input type="text" class="text_box" title="typically the initials of the convention name" v-model="editConvention.short_name" @input="set_con_tag()" />
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
                                 <button type="submit" class="button" @click.prevent="()=>{save_convention(); showConventionSlideout = false;}">Submit</button>
                              </div>
                           </form>
                        </div>
                        
                        <span class="title panel_title">Conventions</span>
                        <button class="button new_con_button" @click="showConventionSlideout ? showConventionSlideout = false : showConventionSlideout = true">New Convention</button>
                     
                        <div class="list_names">
                           <span class="name current_con" title="clock = past convention, highlighted = currently active convention, circle is future convention">Status</span>
                           <span class="name con_name">Convention</span>
                           <span class="name con_date">Dates</span>
                        </div>
                        <div class="convention_list">
                           <div class="convention_item" v-bind:class="past_con(convention.end_date_time)? 'past_con' : '' "  v-for="convention in conventions" >                           
                              <button  class="toggle_control control_button current_con " 
                                       v-bind:class="[convention.current_con? 'current fas' : 'fal',past_con(convention.end_date_time)? 'fa-clock' : 'fa-circle' ]" 
                                       v-bind:title="convention.current_con? 'Is current con' : 'Make current con'"
                                       @click.prevent="set_current_con(convention)"
                              ></button>
                              
                              <span class="list_item con_name" v-text="convention.name+' '+convention.con_num"></span>
                              <span class="list_item con_date" v-text="month_day_year(convention.start_date_time) +' - ' + month_day_year(convention.end_date_time) "></span>
                               
                                 <div class="buttons">
                                    <button class="control_button fas" v-bind:class="showConventionDetails == convention.tag_name? 'fa-caret-up' : 'fa-caret-down'" title="convention details" @click = "showConventionDetails == convention.tag_name?showConventionDetails = null : showConventionDetails = convention.tag_name" ></button>
                                    <button class="control_button fal fa-edit" title="Edit Convention" @click="()=>{showConventionDetails = null; editConvention = convention; showConventionSlideout = 'show'}" ></button>
                                    <button class="control_button fal fa-ban" title="deactivate" @click="()=>{showConventionDetails = null; deactivate_con(convention.tag_name);}" ></button>
                                 </div>
                              
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
                                         USERS 
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~            -->
                     <div class="panel users" v-if="siteSetting == 'users'">
                        <p>USERS</p>
                        <p>searchable user list with password reset edit info fields, and permissions links</p>
                        <p>show all users with default filter of most recent 10. [ Search box ] <br />
                           Buttons: [ show all ] [ show inactive (wtih # inactive ] [ del. inactive ] [ requested password]</br>
                           each user options: [ deactivate ], [ make admin ], [ send password reset ], [ activate (if deactivated)]
                        </p>
                        <div class="" style="flex-direction: column;">
                           <p v-for="user in allUsers" style="width=100%;">{{user}}</p>
                        </div>
                        
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
                                 
                                 <select class="select role" v-model="permission.admin"  @change="$store.dispatch('update_admin_permission', permission)">
                                    <option :value="0">none</option>
                                    <option :value="1">basic</option>
                                    <option :value="2">advanced</option>
                                    <option :value="3">Manage</option>
                                    <option :value="5">Full</option>
                                 </select>
                                 <select class="select role" v-model="permission.news"  @change="$store.dispatch('update_admin_permission', permission)">
                                    <option :value="0">none</option>
                                    <option :value="1">basic</option>
                                    <option :value="2">advanced</option>
                                    <option :value="3">Manage</option>
                                    <option :value="5">Full</option>
                                 </select>
                                 <select class="select role" v-model="permission.scheduling"  @change="$store.dispatch('update_admin_permission', permission)">
                                    <option :value="0">none</option>
                                    <option :value="1">basic</option>
                                    <option :value="2">advanced</option>
                                    <option :value="3">Manage</option>
                                    <option :value="5">Full</option>
                                 </select>
                                 <select class="select role" v-model="permission.registration" @change="$store.dispatch('update_admin_permission', permission)">
                                    <option :value="0">none</option>
                                    <option :value="1">basic</option>
                                    <option :value="2">advanced</option>
                                    <option :value="3">Manage</option>
                                    <option :value="5">Full</option>
                                 </select>
                                 <button class="control_button fal fa-ban" title="remove '+permission.first_name+' admin privilages" @click.prevent="$store.dispatch('remove_admin_permission', permission)"></button> 
                              </div>
                           </div>
                           <div class="new_admin_permission">
                              <span class="title">New Admin Permission</span>
                              <select class="select" v-model="newAdminPermission" @change="set_new_permission()" >
                                 <option value="">select user...</option>
                                 <option v-bind:value="member" v-for="member in members" v-if="member_not_already_admin(member.uuid)" v-text="member.first_name+' '+member.last_name"></option>
                              </select>
                           </div>
                           
                        </div>   
                     </div>
                     
                     
                     
                     
                  <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                         MESSAGES
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~            -->
                     <div class="panel messages" v-if="siteSetting == 'messages'">
                        <p>MESSAGES</p>
                        <p>email blast center. select user-type and select message. create editable list and send. </p>
                        <div class="buttons message_buttons">
                           <button class="button" :class="userFilter == 'all'? 'selected' : ''" @click.prevent="set_filtered_users('all')" >All users</button>
                           <button class="button" :class="userFilter == 'members'? 'selected' : ''"  @click.prevent="set_filtered_users('members')" >All Con membership</button>
                           <button class="button" :class="userFilter == 'email'? 'selected' : ''"  @click.prevent="set_filtered_users('email')" >Yes Email</button>
                           <button class="button" :class="userFilter == 'volunteer'? 'selected' : ''"  @click.prevent="set_filtered_users('volunteer')" >Volunteer Interest</button>
                           <button class="button" :class="userFilter == 'GM'? 'selected' : ''"  @click.prevent="set_filtered_users('GM')" >GM Interest</button>
                           <button class="button" :class="userFilter == 'guest_GM'? 'selected' : ''"  @click.prevent="set_filtered_users('guest_GM')" >Guest GM</button>
                           <button class="button" :class="userFilter == 'staff'? 'selected' : ''" @click.prevent="set_filtered_users('staff')" >All Staff</button>
                        </div>
                        <div class="messages_wrapper">
                           <div class="users" >
                              <div class="user_wrapper" v-if="filteredUsers">
                                 <p>users: {{filteredUsers.length}}</p>
                                 <p class="user" v-for="user in filteredUsers" > {{user.first_name+' '+user.last_name }}</p>
                              </div>  
                           </div>
                        
                           <div class="messages">
                              <div class="message_wrapper" v-for="message in messages">
                                 <span class="title" v-text="message.title"></span>
                                 <div class="message" v-html="message.message"></div>
                              </div>   
                           </div>
                        </div> 
                        
                        <button class="button" @click.prevent="$store.dispatch('send_messages', userFilter)">Send Messages</button>
                        
                     </div>
                     
                     
                     
                  </div>   
                  
               </div>
               
				</section>
				
				
			</div>
		
		</div>
	</template>
	
	
	
	<script>
		import Vue from 'vue'
		import { mapState } from 'vuex'
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
               siteSetting             : "conventions",
               userFilter              : null,
               formErrors              : {},
               filteredUsers           : null,
               newAdminPermission      : '',
				}
			},
			
			components: {
				datetime: Datetime,
			},
			
			watch: {
				
				
			},
			
			
			computed: {
				...mapState({
					user			      : 'user',
					regReport	      : 'regReport',
               conventions       : 'conventions',
               venues            : 'venues',
               adminPermissions  : 'adminPermissions',
               allArticles       : 'allArticles',
               messages          : 'messages',
               allUsers          : 'allUsers',
				}),
            
            
			},
			
			created() {
            var vm = this;
				vm.check_user();
				vm.$store.dispatch('get_reg_report').then(()=>{});
				vm.$store.dispatch('get_admin_permissions').then(()=>{});
				vm.$store.dispatch('get_all_articles').then(() => {});
            vm.$store.dispatch('get_messages').then((response) => {});
            vm.$store.dispatch('get_all_users').then((response) => {});
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
            
            
            // SET FILTERED USERS 
            set_filtered_users(filter) {
               
               var vm = this;
               vm.userFilter = filter;
               vm.filteredUsers = [];
               
               switch (filter) {
                  case 'all': 
                     vm.filteredUsers = vm.allUsers;
                     break;
                     
                  case 'members': 
                     vm.allUsers.forEach((user)=> {
                        user.con_status > 0? vm.filteredUsers.push(user) : '';
                     });
                     break;
                  
                  case 'email': 
                     vm.allUsers.forEach((user)=> {
                        user.email_contact? vm.filteredUsers.push(user) : '';
                     });
                     break;
                  
                  case 'volunteer': 
                     vm.allUsers.forEach((user)=> {
                        user.volunteer_interest? vm.filteredUsers.push(user) : '';
                     });
                     break;
                  
                  case 'GM': 
                     vm.allUsers.forEach((user)=> {
                        user.gm_interest? vm.filteredUsers.push(user) : '';
                     });
                     break;
                  
                  case 'guest_GM': 
                     vm.allUsers.forEach((user)=> {
                        user.con_status == '14'? vm.filteredUsers.push(user) : '';
                     });
                     break;
                     
                  case 'staff':
                     vm.allUsers.forEach((user)=> {
                        user.con_status == '15' || user.con_status == '21' ? vm.filteredUsers.push(user) : '';
                     });
                     break;
                  
                  default: 
                  
               }
               
               vm.$forceUpdate();
               
               
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
                  console.log(vm.editConvention.tag_name+' saved');
               });
            },
            
            // SET CURRENT CON 
            set_current_con(con) {
               var vm = this;
               if(confirm('Are you sure you want to change the current convention shown on the website to '+con.short_name+'?') == true) {
                  vm.$store.dispatch('update_current_con', con).then((response)=>{
                     console.log(response);
                  }); 
               }
               
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
            
            // DEACTIVATE CON
            deactivate_con(tag_name) {
               console.log('non-funtional');
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
      
      .panel.messages .message_buttons {
         flex-wrap: wrap;
         flex-direction: row;
         width: 100%;
      }
      .panel.messages .message_buttons .button {
         width: 10rem;
         margin: .75rem;         
         align-items: center;
      }
      .panel.messages .message_buttons .button:hover,
      .panel.messages .message_buttons .button.selected {
         background: none;
         color: var(--contrastColor);
      }
            
      .panel.messages .messages_wrapper .users {
         width: 12rem;
         flex-direction: column;
      }
      .panel.messages .messages_wrapper .users .user_wrapper {
         width: 100%;
         flex-direction: column;
         max-height: 40rem;
         overflow:hidden;
         overflow-Y: auto;
      }
      .panel.messages .messages_wrapper .users .user {
         width: 100%;
      }
      
      .panel.messages .messages_wrapper .messages {
         width: calc(100% - 12rem);
         padding: 0 1rem;
         flex-direction: column;
      }
      .panel.messages .messages_wrapper .message_wrapper {
         width: 100%;
         flex-direction: column;
      }
      .panel.messages .messages_wrapper .message_wrapper +.message_wrapper {
         margin-top: 2rem;
      }
      .panel.messages .messages_wrapper .title {
         width: 100%;
      }
      .panel.messages .messages_wrapper {
         
      }
      .panel.messages .messages_wrapper {
         
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
         cursor: pointer;
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
            justify-content: space-between;
         width: 100%;
      }
      .panel_display .convention_item.past_con{
         font-size: .95rem;
         opacity: .7;
      }
      .panel_display .convention_item + .convention_item {
         margin-top: .5rem;
      }
      .list_names .current_con,
      .convention_list .current_con {
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
      
      .convention_list .buttons {
         display: flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: nowrap;
      }
      .convention_list .control_button {
         display: flex;
            justify-content: center;
            align-items: center;
         border-radius: .1rem;
         width: 2rem;
         height: 2rem;
         font-size: 1.5rem;
         border-color: rgba(0,0,0,0);
         border-radius: .2rem;
         background: none;
         cursor: pointer;
         color: var(--borderColor);
      }
      .convention_list .control_button:hover {
         background: var(--borderColor3);
         border-color: var(--borderColor);
      }
      .convention_list .control_button:hover:before {
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