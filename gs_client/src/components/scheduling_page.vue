
	<template>
		<div id="scheduling_page">
		
		
		<span class="section_title">Scheduling Hub</span>
		
		
		<div class="sections">
			<section class="section scheduling_header">

				<div class="con_controls">
					<convention_select  :_selectedCon = "selectedCon" @setCon = "set_con" />
				</div>
				
				<div class="scheduling_report ">
					<scheduling_control_panel/>
				</div>
			
			</section>
			
			
			<section class="section scheduling_panel">
				<div class="tab_box" >
					<div class="tabs">
						<button type="button" class="tab_button" :class="schedulingTab == 'alerts'? 'active' : '' " @click="schedulingTab='alerts'">Alerts</button>
						<button type="button"  class="tab_button" :class="schedulingTab == 'locations'? 'active' : '' "  @click="schedulingTab='locations'">Locations</button>
						<button type="button"  class="tab_button" :class="schedulingTab == 'events'? 'active' : '' "  @click="schedulingTab='events'">Events</button>
						<button type="button"  class="tab_button" :class="schedulingTab == 'schedule'? 'active' : '' "  @click="schedulingTab='schedule'">Schedule</button>
						<button type="button"  class="tab_button" :class="schedulingTab == 'schedulers'? 'active' : '' "  @click="schedulingTab='schedulers'">Schedulers</button>
					</div>
					<div class="boxes">
						<div class="box alerts"  :class="schedulingTab == 'alerts'? 'active' : '' " >
							ALERTS</br>
							<p> event submissions, conflicts, scheduler area status </p>
						</div>
						
						
                  
                  <!--  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                                LOCATIONS                  
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
                  
						<div class="box locations" :class="schedulingTab == 'locations'? 'active' : '' " >
                     <header class="box_header"> 
                           <span class="title" v-text="currentCon.name+' '+currentCon.con_num+ ' Locations'"></span>   
                        <div class="header_content"></div>
                     </header>
                     
							<div class="list_element">
                        <div class="control_bar">
                           <button type="button" title="Show location settings" class="control_button fal fa-cog" @click="showLocationControls? showLocationControls = false : showLocationControls = true"></button>
                        </div>
                        
                        <div class="slide_in location_controls" :class="showLocationControls? 'show' : ''">
                           <button type="button" class="close_button fal fa-times" @click="showLocationControls? showLocationControls = false : showLocationControls = true"></button>
                           <div class="selects">
                              <select class="select" v-model="selectVenueLocs" @change="copy_venue_locations" title="this will clear the convention's established locations and replace them with the venue's location list">
                                 <option value="0" style="display: none">Venue Locations...</option>
                                 <option v-for="venue in venues" :selected="currentCon.venue == 1"  :value="venue.id" v-text="venue.venue_name"></option>
                              </select> 
                              <select class="select" v-model="copyConLocations" @change="copy_con_locations" title="this will copy the target convention's locations to this convention, it will not replace any established locations">
                                 <option value="0" style="display: none">copy from  Con...</option>
                                 <option v-for="con in conventions" :value="con.tag_name" v-text="con.short_name"></option>
                              </select>
                           </div>
                           
                           <button  type="button" :title="'Reset locations for '+currentCon.name" class="control_button fal fa-redo-alt"><span class="text" v-text="'Reset '+currentCon.short_name"></span></button>
                        </div>
                     
                        <div class="list">                        
                           <span class="title list_title">Con Locations</span>
                           <div class="list_wrapper">
                              <div class="list_item" v-for="location in conLocations">
                                 <button type="button" class="link" @click.prevent="editLocation = location">{{location.location_type}} - {{location.location_name}} - {{location.location_tag}}</button>
                                 <button type="button" class="activate_button fas" :class="location.location_active? 'fa-ban' : 'fa-circle'" @click="deactivate_location(location.id)" ></button>
                              </div>
                           </div>   
                        </div>   
                     </div>
                     
                     <div class="edit_element">
                        <span class="title">Location Details</span>
                        
                        <p class="intro" v-if="editLocation.location_name">
                           {{editLocation.location_tag}} 
                           <span class="loation_detail" v-if="editLocation.location_parent">&nbsp; is in {{location_parent(editLocation.location_parent)}}</span>
                           <span class="location_detail" v-if="editLocation.location_parent && sublocations(editLocation.location_id)">&nbsp; and</span>
                           <span class="location_detail" v-if="sublocations(editLocation.location_id)">&nbsp; has {{editLocation.location_id}} sub-locations</span>.
                        </p>
                        
                        <div class="edit_location_form">   
                           <button class="control_button fal fa-times"   type="button" @click="editLocation = {}" title="Clear Location form" ></button>
                  
                           <input type="hidden" name="con" v-model="currentCon.tag_name" />
                           <input type="hidden" name="location_id" v-model="editLocation.id" />
                           
                           <div class="location_events">
                              [ list of events in location]
                              <button class="link">event</button>
                              
                           </div>
                           
                           <form class="form ">   
                              
                              <div class="form_row">
                                 <label>Location Name</label>
                                 <div class="input_wrapper">
                                    <input class="text_box" name="location_name" v-model="editLocation.location_name" />
                                 </div>
                              </div>
                              <div class="form_row">
                                 <label>Location Tag</label>
                                 <div class="input_wrapper">
                                    <input class="text_box" name="location_tag" v-model="editLocation.location_tag" />
                                 </div>
                              </div>
                              <div class="form_row">
                                 <label>location Type</label>
                                 <div class="input_wrapper">
                                    <input class="text_box" name="location_type" v-model="editLocation.location_type" />
                                 </div>
                              </div>
                              
                              <div class="form_row">
                                 <label>Location Capacity</label>
                                 <div class="input_wrapper">
                                    <input class="text_box" name="location_capacity" v-model="editLocation.location_capacity" />
                                 </div>
                              </div>
                              
                              <div class="form_row" >
                                 <label>Location Parent</label>
                                 <div class="input_wrapper">
                                    <select class="select" name="location_parent" v-model="editLocation.location_parent">
                                       <option value="" style="display: none" >select...</option>
                                       <option v-for="location in conLocations" :value="location.id" :selected="location.id == editLocation.location_parent" v-text="location.location_name"></option>
                                    </select>
                                 </div>
                              </div>
                              
                              <div class="form_row">
                                 <div class="form_section">
                                    <label>Location Active</label>
                                    <div class="input_wrapper">
                                       <input type="checkbox" class="checkbox_box" name="location_active" v-model="editLocation.location_active" />
                                    </div>
                                 </div>
                                 <div class="form_section">
                                    <label>Scheduling Area</label>
                                    <div class="input_wrapper">
                                       <select class="select" name="scheduling_area" v-model="editLocation.scheduling_area">
                                          <option value="" style="display: none" >select...</option>
                                          <option v-for="track in eventTracks" :value="track.id" :selected="track.id == editLocation.scheduling_area" v-text="track.track_name"></option>
                                       </select>
                                    </div>   
                                 </div>
                                 
                              </div>
                              
                              <div class="form_row">
                                    <label>Sublocations have same scheduling area</label>
                                    <div class="input_wrapper">
                                       <input type="checkbox" class="checkbox_box" name="copy_schedule_area" v-model="editLocation.copy_schedule_area" @click="copy_location_schedule_areas(editLocation.location_id)" />                                       
                                    </div>
                              </div>
                              
                              <div class="form_row">
                                 <label>Description</label>
                                 <div class="input_wrapper">
                                    <textarea class="textarea" name="location_description" v-model="editLocation.location_description" ></textarea>
                                 </div>
                              </div>
                              
                              <div class="controls">
                                 <button type="button" class="button" v-text="editLocation.id? 'Update Location' : 'Add Location'" @click.prevent="() =>{set_location_form_data(); $store.dispatch('update_location',editLocation).then(()=>{})}"></button> 
                              </div>
                           </form>
                        </div>   
                     </div>
						</div>
						
						
                  <!--  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                                EVENTS                  
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
						<div class="box events" :class="schedulingTab == 'events'? 'active' : '' " >
                     <header class="box_header">
                        <span class="title">Events</span>
                     </header>
                     
							<div class="list_element">
                     
                        <div class="control_bar">
                           <button type="button" title="Show event settings" class="control_button fal fa-cog" @click="showEventControls? showEventControls = false : showEventControls = true"></button>
                           <button type="button" :title="'show '+selectedCon+'  con events'" class="control_button fal fa-list-alt" :class="showEventsList == 'con'? 'active': '' "  @click="showEventsList == 'con'? showEventsList = 'all' : showEventsList = 'con'" ></button>
                           <button type="button" title="show all events" class="control_button fal fa-file-alt" :class="showEventsList == 'all'? 'active': '' "  @click="showEventsList == 'all'? showEventsList = 'con' : showEventsList = 'all'" ></button>
                        </div>
                        
                        <div class="slide_in event_controls" :class="showEventControls? 'show' : ''">
                           <button type="button" class="close_button fal fa-times" @click="showEventControls? showEventControls = false : showEventControls = true"></button>
                           <div class="selects">
                           
                           
                           
                           
                           
                           
                           </div>
                           
                           <button  type="button" :title="'Reset locations for '+currentCon.name" class="control_button fal fa-redo-alt"><span class="text" v-text="'Reset '+currentCon.short_name"></span></button>
                        </div>
                        
                        <div class="list">
                           <span class="title list_title">Con Events</span>
                           <div class="box_loading" v-if="!conEvents">No Events Found</div>
                           <div class="box_loading" v-else-if="conEvents && conEvents.length < 1">Loading...</div>
                             
                           <div class="list_wrapper" v-else>
                              <div class="list_item"   v-for="event in filtered_con_events">
                                 <button type="button" class="link" @click.prevent="editEvent = event">
                                    <span class="element tag" v-text="event.con_event_tag"></span>
                                    <span class="element track" v-text="event.track"></span>
                                    <span class="element name" v-text="event.event_name"></span>
                                    
                                 </button>
                                 <button type="button" class="activate_button fas" :class="event.event_active? 'fa-ban' : 'fa-circle'" @click="deactivate_event(event.con_event_id)"></button>
                              </div>
                           </div>
                        </div>
                        
                        <div class="list all_list" :class="showEventsList == 'all'? 'show' : ''">  
                           <span class="title list_title">All Events</span>   
                           <div class="list_wrapper">
                              <div class="list_item" v-for="event in filtered_events">
                                 <button type="button" class="link" @click.prevent="() =>{editEvent = event}">
                                    <span class="element name" v-text="event.event_name"></span>
                                    <span class="element track" v-text="event.track"></span>
                                 </button>
                              </div>
                           </div>   
                        </div>                        
                     </div>
                     
                     
                     <div class="edit_element">  
                     
                        <button type="button" class="control_button clear_button fal fa-undo-alt" @click="clear_event"></button>
                         
                        <span class="title">Event Details</span>
                        <event_form  :_editEvent.sync = "editEvent"  :_selected_con = "selectedCon"  @clearEvent = "clear_event" />
                        
                     </div>
                     
						</div>
						
						
                  <!--  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                                SCHEDULE                  
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
						<div class="box schedule" :class="schedulingTab == 'schedule'? 'active' : '' " >
                     <header class="box_header">
                        <span class="title">Schedule</span>
                     </header>
                     
                     <div class="schedule_grid">
                        <div class="control_bar">
                           <button type="button" title="Show schedule settings" class="control_button fal fa-cog" @click="showScheduleControls? showScheduleControls = false : showScheduleControls = true"></button>
                          
                        </div>
                        
                        <div class="slide_in event_controls" :class="showScheduleControls? 'show' : ''">
                           <button type="button" class="close_button fal fa-times" @click="showScheduleControls? showScheduleControls = false : showScheduleControls = true"></button>
                           <div class="selects">
                           </div>
                           
                        </div>
                        <div class="slide_in event_schedule" :class="showEventSchedule? 'show' : ''">
                           <button type="button" class="close_button fal fa-times" @click="showEventSchedule? showEventSchedule = false : showEventSchedule = true"></button>
                           <div class="">
                              <button type="button" class="" >Auto Schedule</button>
                              
                              <div class="">{{scheduleLocationList}}</div>
                           </div>
                           
                        </div>
                        
                     
                        <schedule_grid :_selected_con = "selectedCon"   />
                     
                     </div>
                     
                     <div class="list_element">
                        <div class="schedule_list list">
                           <span class="title list_title">Schedule List</span>
                           <div style="color: red">
                              <p>big schedule grid of locations and timeblocks with list of unscheduled events. </p>
                              <p>color-coded event-type, status-flag, presenter, and info-dropdown. </p>
                              <p>click on event to highlight start-time in area. click on location to place event. event may be copied or moved. </p>
                              <p>ON HOVER, SHOW CONTROLS FOR EDIT, ASSIGN, APPROVE/UNAPPROVE, </p>
                           </div>   
                           <div class="event_list">
                              <span class="title element_title" >Unapproved</span>
                              <div class="event" v-for="event in conEvents" v-if="event.event_status == '0'" :class="'event_0'">
                                 <span class="element tag" v-text="event.con_event_tag.replace(/_/g, ' ')"></span>
                                 <div class="element times">
                                    <span class="element start_time" v-text="day_time(event.event_start_time)"></span>
                                    <span class="element duration" v-text="event_duration(event.event_start_time, event.event_end_time)"></span>
                                 </div>   
                                 <div class="element meta">
                                    <span class="element type" v-text="event.type"></span>
                                    <span class="element track" v-text="event.track.replace(/_/g, ' ')"></span>
                                 </div>
                                 <span class="element name" v-text="event.event_name"></span>
                                 
                                 <div class="event_controls">
                                    <button type="button" class="event_control fal fa-edit" @click.prevent="edit_event(event.con_event_id)"></button>
                                    <button  type="button" 
                                             class="event_control fal" 
                                             :class="event.event_status == '0'? 'fa-thumbs-up' : 'fa-thumbs-down'" 
                                             @click.prevent="handle_event_status(event.con_event_id) "
                                             title="Approve this event"
                                    ></button>
                                    <button  type="button" 
                                             class="event_control fal "
                                             :class="event.con_location? 'fa-minus-circle' : 'fa-list-alt'"
                                             @click="handle_event_location(event.con_event_id)"
                                    ></button>                                 
                                 </div>
                                 
                              </div>
                              
                              
                              <span class="title element_title" >Approved, unscheduled</span>
                              <div class="event" v-for="event in conEvents" v-if="event.event_status >= 20 && event.event_status < 30" :class="'event_20'">
                                  <span class="element tag" v-text="event.con_event_tag.replace(/_/g, ' ')"></span>
                                 <div class="element times">
                                    <span class="element start_time" v-text="day_time(event.event_start_time)"></span>
                                    <span class="element duration" v-text="event_duration(event.event_start_time, event.event_end_time)"></span>
                                 </div>   
                                 <div class="element meta">
                                    <span class="element type" v-text="event.type"></span>
                                    <span class="element track" v-text="event.track.replace(/_/g, ' ')"></span>
                                 </div>
                                 <span class="element name" v-text="event.event_name"></span>
                                 
                                 <div class="event_controls">
                                    <button type="button" class="event_control fal fa-edit" @click.prevent="edit_event(event.con_event_id)"></button>
                                     <button  type="button" 
                                             class="event_control fal" 
                                             :class="event.event_status == '0'? 'fa-thumbs-up' : 'fa-thumbs-down'" 
                                             @click.prevent="handle_event_status(event.con_event_id) "
                                             title="Un-approve this event"
                                    ></button>
                                    <button  type="button" 
                                             class="event_control fal "
                                             :class="event.con_location? 'fa-minus-circle' : 'fa-list-alt'"
                                             @click="handle_event_location(event.con_event_id)"
                                    ></button>                          
                                 </div>
                                 
                              </div>
                              
                              
                           </div>
                           
                           
                        </div>
                     </div>
                     
                     
						</div>
						
						
						<div class="box schedule" :class="schedulingTab == 'schedulers'? 'active' : '' " >
							SCHEDULERS</br>
							<p>list of areas with schedulers and area status. dropdown to add scheduler for area</p>
                     <p>if user has scheduler permission, may add and update list</p>
                     <p>{{user.first_name}} scheduling permission - {{user.permissions.scheduling}}</p>
                     
                     <div class="scheduling_permissions_form">
                        <form class="form" action="" method="post" @submit.prevent="submit_scheduler">
                           <div class="form_row">
                              <div class="input_wrapper">
                              <select class="select" v-model="editScheduler.area">
                                 <option value="">select...</option>
                                 <option value="area.area_id" v-for="area in schedulingAreas" v-text="area"></option>
                              
                              </select>
                              </div>
                           </div>
                     area 
                     scheduler 
                     <button type="submit">Submit</button>
                        </form>
                     
                     </div>
                        <div class="" v-for="scheduler in schedulingPermissions">{{scheduler}}</div>
						</div>
					</div>				
				</div>
			
			
			
			</section>
		
		
		
		
		</div>
		
		
			<p>big tab-box of locations-manager, event-manager, event-grid</p>
			
			
			
			<p>Scheduling Panel (create con, like admin panel)</p>
			<p>select con, show basic events info. and status. </p>
			<p>edit events, add events, schedule events in big grid</p>
			
		
		</div>
		
		
		
		
		

	</template>
	
	
	
	<script>
		import Vue from 'vue'
      import moment from 'moment'
		import { mapGetters, mapState } from 'vuex'
      import event_form from '@/components/includes/event_form'
		import Router from 'vue-router'
		import convention_select from '@/components/includes/convention_select'
      import schedule_grid from '@/components/includes/schedule_grid'
		import scheduling_control_panel from '@/components/includes/scheduling_control_panel'
		
		Vue.use(Router);
		
		export default{
			name: 'scheduling_page',
			
			
			data() {
				return {
					selectedCon		      : null,
					schedulingTab	      : 'alerts',
               selectedVenue        : {},
               editLocation         : {},
               showScheduleControls : false,
               showEventSchedule    : false,
               editEvent            : {},
               formErrors           : [],
               submissionSystem     : {},
					selectVenueLocs      : 0,
               copyConLocations     : 0,
               scheduleLocationList : '',
               editScheduler        : {},
               showLocationControls : false,
               showEventControls    : false,
               eventSort		      : 'event_tag',
               showEventsList       : 'con',
               timeblocks           : [],
               eventSignups         : [],
               presenterSearch      : '',
               presenterSelect      : null,
				}
			},
			
			components: {
				'convention_select'	      : convention_select,
				'scheduling_control_panel' : scheduling_control_panel,
            'event_form'               : event_form,
            'schedule_grid'            : schedule_grid
			},
			
			
			watch: {
				
				
			},
			
			created() {
				var vm = this;
				vm.check_user();
				vm.get_scheduling_data();    
            vm.set_location_form_data();
            vm.get_con_locations();
			},
         
         mounted() {
            var vm = this;
            
         },
			
			computed: {
            ...mapState({
					user        : 'user',  
               venues      : 'venues',
               conventions : 'conventions',
               eventTypes  : 'eventTypes',
               eventTracks : 'eventTracks',
               ageGroups   : 'ageGroups',
               experienceLevels: 'experienceLevels',
					currentCon	: 'currentCon',  
               allEvents   : 'allEvents',    
               memberList  : 'memberList',
               eventDuration:'eventDuration',
               conLocations: 'conLocations',
               schedulingPermissions: 'schedulingPermissions',
               schedulingAreas: 'schedulingAreas',
            }),
            
				...mapGetters({
               conEvents   : 'conEvents'
				}),
            
            
				filtered_events() {          
					var vm = this,
						eventName,
						eventLocation,
						lastName,	
                  eventSort,
                  searchQuery,
                  events,
						eventTag;      
                  
                  vm.searchQuery? searchQuery = vm.searchQuery.toLowerCase() : searchQuery = '';
               if(vm.allEvents ) {   
                  if(vm.allEvents.length > 0) {                     
                     eventSort   = 'event_track';
                     events  =  vm.allEvents.sort((a, b) => a[eventSort].toString().localeCompare(b[eventSort]));	
                     
                     return events.filter(function(events) {
                        events.event_name? eventName	= events.event_name.toLowerCase() : '';
                        //events.last_name? lastName 	= events.last_name : '';
                        events.event_location? eventLocation	= events.event_location.toLowerCase() : '';
                        //events.table_num? tableNumber = events.table_num : '';
                        events.event_tag? eventTag	= events.event_tag.toLowerCase() : '';
                        
                           return 	eventName.indexOf(searchQuery ) !== -1 || 
                                    //lastName.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1 || 
                                    eventLocation.indexOf(searchQuery) !== -1 || 
                                    //tableNumber.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1  || 
                                    eventTag.indexOf(searchQuery) !== -1;
                     });
                     
                  }
                
               } 
				},
            
				filtered_con_events() {          
					var vm = this,
						eventName,
						eventLocation,
						lastName,	
                  events,
                  eventSort,
                  searchQuery,
						eventTag;      
                  
                  vm.searchQuery? searchQuery = vm.searchQuery.toLowerCase() : searchQuery = '';
               
               if(vm.conEvents ) {   
                  if(vm.conEvents.length > 0) {                     
                     eventSort   = 'con_event_tag';
                     events  =  vm.conEvents.sort((a, b) => a[eventSort].toString().localeCompare(b[eventSort]));	
                     
                     return events.filter(function(events) {
                        events.event_name? eventName	= events.event_name.toLowerCase() : '';
                        //events.last_name? lastName 	= events.last_name : '';
                        events.event_location? eventLocation	= events.event_location.toLowerCase() : '';
                        //events.table_num? tableNumber = events.table_num : '';
                        events.event_tag? eventTag	= events.event_tag.toLowerCase() : '';
                        
                           return 	eventName.indexOf(searchQuery ) !== -1 || 
                                    //lastName.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1 || 
                                    eventLocation.indexOf(searchQuery) !== -1 || 
                                    //tableNumber.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1  || 
                                    eventTag.indexOf(searchQuery) !== -1;
                     });
                  }
                
               } 
				},
            
            currentVenue() {
               var   vm = this,
                     currentVenue = {};  
               if(vm.venues) {      
                  Object.entries(vm.venues).forEach(([key, venue]) => {
                     venue.id == vm.currentCon.venue? currentVenue = venue : '';
                  });
               }
               return currentVenue;
            },
			},
			
			
			
			methods: {
            
            
				get_scheduling_data() {
				//GET STORE DATA
					var vm = this;               
               
               if (localStorage) {
						if (localStorage.selectedCon) {
							var vm = this;
							vm.selectedCon = localStorage.selectedCon;
						} else {
                     vm.selectedCon = vm.currentCon.tag_name;
                  }                  
					}	else {
                     vm.selectedCon = vm.currentCon.tag_name;
               }	
					vm.$store.dispatch('get_scheduling_data', vm.selectedCon).then(()=>{});	
					// vm.get_con_events();
               // vm.get_timeblocks();
               // vm.get_event_signups();
				},
            
            // DETERMINE LOCATION PARENT
            location_parent(id) {
               var   vm = this,
                     parentLocation = null;
               vm.conLocations.forEach((location) => {
                  location.id == id? parentLocation = location.location_name : '';
               });
               return parentLocation;
            },
            
            set_location_form_data() {
               var vm = this;
               vm.editLocation.selectedCon = vm.selectedCon;
               vm.editLocation.venue = vm.currentCon.venue;
               vm.get_timeblocks();
            },
            
            
            // DETERMINE LOCATION SUB-LOCATIONS COUNT
            sublocations(id) {
               var   vm = this,
                     sublocations = null;
               // loop through con locations and count parent - id 
               vm.conLocations.forEach((location)=>{
                  location.id == id? sublocations++ : '';
               });
               return sublocations;      
            },
            
            set_presenter_player(uuid) {
               var   vm    = this,
                     target= null,
                     role  = '';
               
               Object.entries(vm.editEvent.presenters).forEach(([key,member]) => {
                 member.uuid == uuid?  target = key : '';
                 member.member_role == 'presenter'? role = '' : role = 'presenter';
               });
               target? vm.editEvent.presenters[target].member_role = role : '';
               vm.$forceUpdate();   
            },
            
            remove_presenter(uuid) {
               var   vm = this,
                     target = null;
               
               Object.entries(vm.editEvent.presenters).forEach(([key,member]) => {
                  if( member.uuid == uuid) {
                     target = key;
                  }
               });
               
               target? vm.editEvent.presenters.splice(target,1): '';
               vm.$forceUpdate();
            },
            
            set_con(con) {
               var vm = this;               
               vm.selectedCon == con? '' : vm.selectedCon = con;
					vm.get_con_locations();
               //vm.get_con_events();
              // vm.get_timeblocks();
              // vm.get_event_signups();
            },
            
            get_con_locations() {
               var vm = this;
					vm.$store.dispatch('get_con_locations', vm.selectedCon).then((response)=>{});	     
            },
            
            copy_location_schedule_areas(locationId) {
               
               console.log('copy_location_schedule_areas(editLocation.location_id)');
            },
            
            
            
            get_timeblocks() {               
               var   vm    = this,
                     times = [],
                     day   = '',
                     con   = {};
               
               if(vm.conventions.length > 0) {
                  vm.conventions.forEach((convention) => {
                     convention.tag_name == vm.selectedCon? con = convention : '' ;         
                  });
                  
                  for(var timeBlock = moment(con.start_date_time); moment(timeBlock).diff(con.end_date_time, 'hours') <=0; timeBlock.add(30, 'minutes') ) { 
                     //var _day = moment(timeBlock).format('ddd');                  
                     if(parseInt(timeBlock.format('HH')) >= 9 || timeBlock.format('HH') == '00') { 
                        times.push(moment(timeBlock));
                     }
                  }
               } 
               vm.timeblocks = times; 
            },
				
				
				check_user() {
					var vm = this;
               vm.user.permissions.scheduling >= 10? '' : vm.$router.go('/'); 
				},
            
            copy_venue_locations(e) {
               console.log('non functioning');
            },
            
            copy_con_locations(e) {
               console.log(e.target.value);
               var   vm = this,
                     targetCon;
               targetCon = e.target.value;      
               console.log(vm.selectedCon, targetCon);
               
               vm.$store.dispatch('copy_con_locations', {'selectedCon' : vm.selectedCon, 'targetCon' : targetCon}).then(()=>{
                  
               });
               // get selected convention [con]_locations table and update current con locations table, replacing or adding copied con's locations
               
               
            },
            
            deactivate_location(id) {
               alert('deactivate '+id+' - future function');
            },
            
            deactivate_event(id) {
               alert('deactivate '+id+' - future function');
            },
            
            clear_event() {
               var vm = this;
               vm.editEvent = {};
               vm.$forceUpdate();
            },
            
            
            // EDIT SCHEDULE EVENT
            edit_event(conEventId) {
               console.log(conEventId);
            },
            
            
            // HANDLE EVENT STATUS  
            handle_event_status(conEventId) {
               var vm = this;
               vm.conEvents.forEach((event) => {
                  if(event.con_event_id == conEventId) {
                     event['selected_con'] = vm.selectedCon;
                     console.log(event);
                     event.event_status == '0'? event.event_status = 20 : event.event_status = 0;
                     vm.$store.dispatch('update_event_status', {'event': event}).then((response) => {});
                  }
               });
            },
            
            // HANDLE EVENT SCHEDULE 
            handle_event_location(conEventId) {
               console.log('handle event location for '+ conEventId);
               // in slideout, create list of locations in event track with clear time between start and stop 
               // create override to show locations in area 
               // create 'auto-schedule' button for first empty 'table' in area. 
               // each event has a tag for track 
               // user has area permissions and can only update events in their area (by track)
               
               var vm = this;
               vm.showEventSchedule? vm.showEventSchedule = false : vm.showEventSchedule = true;
               
               vm.conEvents.forEach((event) => {
                  if(event.con_event_id == conEventId) {
                        console.log('track: '+event.event_track);
                  }
               });
               vm.scheduleLocationList = "<p>list of locations for this track</p>";
            },
            
            submit_scheduler() {
               console.log('this');
            },
            
            
            
            
            // // ADD PRESENTER 
            // add_presenter(e) {
               // var   vm       = this,
                     // uuid     = e.target.value,
                     // presenter= {};
               
               // Object.entries(vm.memberList).forEach(([key,member]) => {
                  // if( member.uuid == uuid) {
                     // presenter = member;
                  // }
               // });
               
               // presenter.member_role = 'presenter';
               
               // if(vm.editEvent.presenters) {
                  // var newUuid = true;
                  // Object.entries(vm.editEvent.presenters).forEach(([key, _presenter]) => {
                     // _presenter.uuid == presenter.uuid? newUuid = false : '';
                  // });
                  // newUuid? vm.editEvent.presenters.push(presenter) : '';
               // } else {
                  // vm.editEvent.presenters = [presenter]
               // }
               
               
               // vm.presenterSelect = null;
            // },
            
            // // SUBMIT EVENT 
            // submit_event() {
               // var vm = this;
               // vm.$store.dispatch('submit_event', vm.editEvent).then(()=>{                  
                  // vm.editEvent = {};
                  // vm.get_con_events();
               // });
               
            // }
			},
			
		}
	</script>
	
	
	<style >
	
	
	
	
	
	
	/*  -----------------------------------------------------------------------------------------------------
                                SCHEDULING PAGE
		-----------------------------------------------------------------------------------------------------    */ 
	#scheduling_page .page_content {
		background: #e0f0f3;
	}
	
	
	.section.scheduling_header {
		justify-content: space-around;
		
		
	}
	.scheduling_header  .con_controls {
		display: flex;
		
	}
	
	.scheduling_report {
		width: 100%;
		max-width: 45rem;
	}
	
	 .section_title {
		display: block;
		text-align: center;
	}
	
	
	.section.scheduling_panel {
		
	}
	
	.scheduling_panel .tab_box {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		width: 100%;
	}
	.scheduling_panel .tab_box .tabs {
		display: flex;
		width: 100%;
		padding: 0 2rem;
	}
	.scheduling_panel .tab_box .tab_button {
		display: flex;
		justify-content: center;
		cursor: pointer;
		margin: 0 .5rem;
		border-radius: .15rem;
		width: 20%;
		font-size: 1.25rem;
		height: 2rem;
		background: rgba(0,118,163,.4);		
		padding: .25rem .5rem;
		color: var(--titleColor);
		letter-spacing: .1em;
		opacity: .85;
		text-shadow: -1px -1px rgba(0,0,0,0.25);
		justify-content: center;
		align-items: center;
	}
	.scheduling_panel .tab_box .tab_button:hover {
		background: rgba(0,118,163,.1);
	}
	.scheduling_panel .tab_box .tab_button.active {
		background: var(--altBackground);
		color: var(--button);
	}
	.scheduling_panel .tab_box .boxes {
		position: relative;
		display: flex;
		width: 100%;
		margin: 1rem 0;
	}
	.scheduling_panel .tab_box .box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
		position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		opacity: 0;
		width: 100%;		
		max-height: 30rem;
		pointer-events: none;
		min-height: 30rem;	
		background: var(--altBackground);
		color: black;
		transition: opacity .3s, max-height .3s;
	}
	.scheduling_panel .tab_box .box.active {
		position: relative;
		z-index: 10;
		opacity: 1;
      pointer-events: auto;
		max-height: 1000rem;
		border: solid 1px var(--button2);
	}
   
	.scheduling_panel .tab_box .box_header {
      display: flex;
         flex-wrap: wrap;
         justify-content: space-around;
      width: 100%;
      background: var(--altBackground2);
      padding: 2rem 3rem;
   }
	.scheduling_panel .tab_box .box_header .title {
      display: flex;
      justify-content: center;
      text-align: center;
      width: 100%;
      color: var(--lightColor);
      font-weight: 100;
      text-transform: uppercase;
      text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
      font-size:2rem;
   }
	.scheduling_panel .tab_box .box_header .header_content {
      display: flex;
      width: 50%;
      color: black;
      
   }
   
	.scheduling_panel .tab_box p {
		color: inherit;
	}
   
   .scheduling_panel .box .list_element {
      position: relative;
      display: flex;
         flex-wrap: wrap;
         justify-content: center;
         align-items: flex-start;
      width: 45%;
      margin: 1rem 0;
      max-height: 50rem;
      overflow: hidden;
   }
   .scheduling_panel .tab_box .box_loading {
      display: flex;
         justify-content: center;
         align-items: center;
      width: 100%;
      font-size: 1.5rem;
      color: var(--warningColor);
   }
   .scheduling_panel .box .list_element .control_bar {
      position: absolute;
         top: 0;
         right: 0;  
      margin: 0 1.5rem 0 0;   
      background: var(--altBackground);
   }
   .scheduling_panel .box .list_element .slide_in {
      position: absolute;
         top: 0;
         right: -22rem;
         z-index: 25;
      width: 22rem;   
      padding: 4rem 1rem 1rem 1rem;
      transition: right .4s;         
   }
   .scheduling_panel .box .list_element .slide_in.show {
      right: 0;
   }
   .scheduling_panel .box .list_element .slide_in .close_button {
      position: absolute;
         top: 0;
         right: 0;
   }
   .scheduling_panel .box .list_element .list {
      display: flex;
         flex-wrap: wrap;
      width: 100%;
      height: 100%;
   }
   .scheduling_panel .box .list_element .list .list_title {
      position: absolute;
         top: 0;
         left: 0;
         z-index: 10;
      color: var(--button);
      display: flex;
      width: calc(100% - 1.5rem);
      text-align: center;
      justify-content: center;
      font-weight: bold;
      background: var(--altBackground);
      line-height: 1.5em;
      padding: .5rem 0;
      height: 2em;
   }
   
   .scheduling_panel .box .edit_element {
      position: relative;
      display: flex;
         flex-wrap: wrap;
         flex-direction: column;
      width: 55%;
      padding: 1rem 3rem 1rem 0;
   }
   
   .scheduling_panel .box .edit_element .control_button {
      position: absolute;
         top: 0;
         right: 0;
   }
   .scheduling_panel .box .list_item {
      display: flex;
      justify-content: space-between;
      width: 100%;      
      margin: .25rem 0;
	}
   .scheduling_panel .box .list_item .link {
      justify-content: space-between;
      background: none;
      cursor: pointer;
      font-size: .9rem;
      font-weight: 300;
      height: 1.5rem;
      width: calc(100% - 2rem);
      color: var(--button);
   }
   .scheduling_panel .box .list_item .link .element.name {
      display: inline-flex;
      width: 14rem;
   }
   .scheduling_panel .box .list_item .link .element.tag {
      display: inline-flex;
      width: 4rem;
      font-weight: bold;
      text-shadow: none;
   }
   .scheduling_panel .box .list_item .link .element.track {
      display: inline-flex;
      width: 6rem;
      line-height: 1.5em;
      overflow: hidden;
   }
   .scheduling_panel .box .list_item .link:hover {
      background: var(--buttonHighlight);
      color: #fff;
   }
   
   .scheduling_panel .box .activate_button  {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 1.5rem;
      width: 1.5rem;
      border-radius: .25rem;
   }
   
   .scheduling_panel .box .event_controls,
   .scheduling_panel .box .location_controls {
      display: flex;
         justify-content: space-around;
         align-items: center;
      width: 24rem;
      background: var(--borderColor);
      border: solid 1px var(--borderColor3);
      border-radius: var(--borderRadius);
      padding: .5rem;      
   }   
   
   .scheduling_panel .box .location_controls .selects {
      display: flex;
         flex-wrap: wrap;
      width: 12rem;   
   }
   .scheduling_panel .box .location_controls .control_button {
      width: auto;
      align-items: center;
      padding: .75rem;
      font-size: 1rem;
      height: auto;
      width: 7rem;
   }
   .scheduling_panel .box .location_controls .control_button:before {
      font-size: 2.5rem;
      opacity: .2;
   }
   .scheduling_panel .box .location_controls .select {
      color: black;
      background: var(--lightColor);
   }
   .scheduling_panel .box.events .list_element {
      justify-content: flex-start;
      padding-top: 0;
   }
   .scheduling_panel .box.events .list {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;      
      height: 100%;
      background: var(--lightColor);
      border: solid 1px var(--borderColor);
      border-radius: .15rem;
      padding: 2rem 5rem 0 1rem;
   }
   .scheduling_panel .box .list .list_wrapper {
      display: flex;
         flex-wrap: wrap;
      max-height: 100%;
      width: 100%;
      padding: 3rem .75rem 0 0;
      overflow: hidden;
      overflow-Y: auto;  
   }
   .scheduling_panel .box.events .list.all_list {
      position: absolute;
         top: 0;
         left: 100%;
         z-index: 10;
      transition: left .3s; 
      overflow: hidden;
      overflow-y: auto;  
   }
   .scheduling_panel .box.events .list.all_list.show {
      left: .25rem;      
   }
   .scheduling_panel .edit_element .title  {
      display: flex;
      width: 100%;
      justify-content: center;
      text-align: center;
      font-size: 1.65rem;
      line-height: 1em;
      height: 1.5em;
      color: var(--button);
   }
   .scheduling_panel .edit_element .intro  {
      display: flex;
      width: 100%;
      color: var(--textColor2);
   }
   .scheduling_panel form .form_error {
      transform: translateY(-.65rem);
      width: auto;
      max-width: 100%;
      background: rgba(255,255,255,.65);
      font-size: .9rem;
      padding: .15rem .5rem;
      font-style: normal;
      color: var(--warningColor);      
   }
   .scheduling_panel form .form_error .text {
      font-size: .9rem;
      font-style: italic;
      margin: 0 .5rem;
   }
   .scheduling_panel form .textarea {
      font-weight: 300;
      color: var(--textColor4);
      font-size: .95rem;
      padding: .5rem;
   }
   .scheduling_panel .edit_element .clear_button {
      position: absolute;
         top: 0;
         right: 0;
      margin: .5rem;   
      
   }
   
   /* --------------------------------------------------------------------------------
                        LOCATIONS BOX
      --------------------------------------------------------------------------------*/
   .scheduling_panel .box.locations  .edit_location_form{
      display: flex;
         flex-wrap: wrap;
      margin: 2rem 0 0 0;   
   }
   .scheduling_panel .box.locations .location_events {
      display: flex;
         flex-direction: column;
      width: 10rem;      
   }
   .scheduling_panel .box.locations .location_events .link {
      width: 100%;
   }
   .scheduling_panel .box.locations .form  {
      display: flex;
         flex-wrap: wrap;
      width: calc(100% - 10rem);
   }
   .scheduling_panel .controls .button {
      color: #fff;
      text-shadow: -1px -1px 1px rgba(0,0,0,0.5);
   }
   
	
	
   .scheduling_panel .box.schedule .schedule_list {
      display: flex;
      width: 100%;      
   }
   .scheduling_panel .box.schedule .list_element{
      display: flex;
      width: 30%;
   }
   .scheduling_panel .box.schedule .schedule_list .event_list {
      display: flex;
      flex-direction: column;
      width: calc(100% - 1rem);
      margin: 0 .5rem;
   }
   .scheduling_panel .box.schedule .schedule_list .event {
      display: flex; 
      flex-wrap: wrap;      
      position: relative;
      width: 100%;   
      cursor: pointer;
      height: 3rem;
      overflow: hidden;
      padding: .5rem 1rem;
   }
   .scheduling_panel .box.schedule .schedule_list .event:hover {
      opacity: .8;
   }
   .scheduling_panel .box.schedule .schedule_list .event_controls  {
      position: absolute;
      right: -10rem;
      bottom: 0;
      z-index: 10;
      background: rgba(0,0,0,0.45);
      cursor: default;
      border-radius: .25rem 0 0 0;
      border: none;      
      width: 10rem;
      transition: right .5s, border-color .5s;
   }
   .scheduling_panel .box.schedule .schedule_list .event:hover .event_controls {
      right: 0;
      border-left: solid 1px #000;
      border-top: solid 1px #000;
   }
   .scheduling_panel .box.schedule .schedule_list .event_controls .event_control  {
      font-size: 1.35rem;
      background: none;
      color: var(--borderColor);
      cursor: pointer;
   }
   .scheduling_panel .box.schedule .schedule_list .event_controls .event_control:hover  {
      color: var(--lightColor);      
   }
   
   .scheduling_panel .box.schedule .schedule_list .event + .event {
      margin-top: .5rem;
   }
   .scheduling_panel .box.schedule .schedule_list .element_title + .event {
      margin-top: .5rem;
   }
   
   .scheduling_panel .box.schedule .schedule_list .element_title {
      display: flex;
      justify-content: center;
      text-align: center;
      
      width: calc(100% - 2rem);
      margin: 0 1rem;
      text-transform: uppercase;
      padding: .25rem 0;      
      border-bottom: solid 1px var(--borderColor);
      color: var(--textColor2);
   }
   .scheduling_panel .box.schedule .schedule_list .event .element {
      display: flex;
      width: 100%;
      color: inherit;
      text-shadow: inherit;
   }
   .scheduling_panel .box.schedule .schedule_list .event .element.tag {
      align-items: center;      
      position: absolute;
         top: 0;
         left: 0;
      height: 100%;
      width: 4rem;
      padding: 0 0 0 .5rem;
      font-size: 1.5rem;
   }
   .scheduling_panel .box.schedule .schedule_list .event .element.times {
      margin-left: 4rem;
      width: 9rem;
   }
   .scheduling_panel .box.schedule .schedule_list .event .element.start_time {
      width: 5rem;
      flex-wrap: nowrap;
      white-space: nowrap;
      font-size: .85rem;
   }
   .scheduling_panel .box.schedule .schedule_list .event .element.duration {
      width: 4rem;
      text-align: right;
      font-size: .85rem;
      padding: 0 .5rem 0 0;
      justify-content: flex-end;
   }
   
   .scheduling_panel .box.schedule .schedule_list .event .element.meta {
      position: absolute;
         top: .35rem;
         right: .5rem;
      flex-wrap: wrap;   
      width: calc(100% - 13rem);
   }
   .scheduling_panel .box.schedule .schedule_list .event .element.type, 
   .scheduling_panel .box.schedule .schedule_list .event .element.track {
      width: 100%;
      font-size: .8rem;
      line-height: 1em;
      padding-left: 1rem;
      justify-content: center;
      text-align: center;
   }
   .scheduling_panel .box.schedule .schedule_list .event .element.name {
      padding-left: 4rem;
      font-weight: 100;
   }
   .scheduling_panel .box.schedule .schedule_list .event_0 {
      background: var(--warningColor);
      color: var(--lightColor);
      text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
   }
   
   .scheduling_panel .box.schedule .schedule_list .event_20 {
      background: #4f7cf8;
      color: var(--lightColor);
      text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
   }
   .schedule_grid .slide_in {
      position: absolute;
         top: 0;
         right: -22rem;
      width: 22rem;
      transition: right .4s;
   }
   .schedule_grid .slide_in.show {
      right: 0;
      z-index: 10;
   }
	
	
	
	</style>