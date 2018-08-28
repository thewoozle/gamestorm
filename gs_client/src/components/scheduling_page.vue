
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
                           <div class="list_item" v-for="location in conLocations">
                              <button type="button" style="color: #222;" @click.prevent="editLocation = location">{{location.location_type}} - {{location.location_name}} - {{location.location_tag}}</button>
                              <button type="button" class="activate_button fas" :class="location.location_active? 'fa-ban' : 'fa-circle'" ></button>
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
                                    <select class="select" name="location_parent" v-model="editLocation.location_parent || ''">
                                       <option value="" style="display: none" >select...</option>
                                       <option v-for="location in conLocations" :value="location.id" :selected="location.id == editLocation.location_parent" v-text="location.location_name"></option>
                                    </select>
                                 </div>
                              </div>
                              
                              <div class="form_row">
                                 <label>Location Active</label>
                                 <div class="input_wrapper">
                                    <input type="checkbox" class="checkbox_box" name="location_active" v-model="editLocation.location_active" />
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
						
						
                  
                  
						<div class="box events" :class="schedulingTab == 'events'? 'active' : '' " >
                     <header class="box_header">                        
                        <span class="title">Events</span>
                     </header>
                     
							<div class="list_element">
                        <pre style="color: red"> paginate</pre>
                        <div class="list_item" v-for="event in allEvents">
                           <button type="button" style="color: #222;" @click.prevent="editEvent = event">{{event.event_name}} - {{event.track}} </button>
                           <button type="button" class="activate_button fas" :class="event.event_active? 'fa-ban' : 'fa-circle'" ></button>
                        </div>
                     </div>
                     
                     <div class="edit_element">
                        <span class="title">Event Details</span>
                        
                        <form class="form edit_event_form">
                           <button class="control_button fal fa-times"   type="button" @click="editEvent = {}" title="Clear Event form" ></button>
                           <p style="color: red;">add or update event for master Events table. Does not schudule unless event is deactivated.</p>
                           <input type="hidden" name="event_id" v-model="editEvent.event_id" />
                           
									event tag: <span class="text"  v-text="editEvent.event_tag || '-'"></span>
                           
                           
                           <div class="form_row">
                              <label>Event Name</label>
                              <div class="input_wrapper">
                                 <input class="text_box" name="event_name" v-model="editEvent.event_name" />
                              </div>
                              <span class="form_error" v-if="formErrors.event_name" v-text="formErrors.event_name? 'Event Name!' : ''"></span>
                           </div>
                              
                           <div class="form_row">
                              <label class="label">Event Track</label>
                              <div class="input_wrapper">
                                 <select class="input select" name="event_track" v-model="editEvent.event_track"   >
                                    <option value="" style="display: none">select event track...</option>
                                    <option v-for="track in eventTracks" :value="track.id" v-text="track.track_name" :selected="editEvent.event_track == 1" ></option>
                                 </select>
                              </div>	
                              <span class="input_message" v-if="formErrors.event_track" v-text="formErrors.event_track"></span> 		
                           </div>
                           
                           <div class="form_row" >
                              <div class="form_element">	
                                 <label class="label">GM is Designer</label>
                                 <div class="checkbox_wrapper input_wrapper">
                                    <input class="checkbox" type="checkbox" name="gm_designer" v-model="editEvent.gm_designer"  value="1" /> 
                                 </div>
                                 <span class="input_message" v-if="formErrors.gm_designer" v-text="formErrors.gm_designer"></span> 
                              </div>
                              <div class="form_element expanding_row" v-bind:class="submissionSystem">
                                 <label class="label">Game System</label>
                                 <div class="input_wrapper">
                                    <input class="input text_box" type="text"  v-model="editEvent.event_system"  name="event_system" /> 	
                                 </div>	
                              </div>
                           </div>
                           
                           
                           <div class="form_row event_time_row">
                              <div class="form_element">	
                                 <div class="input_wrapper">
                                    <select class="select"  v-model="editEvent.event_start_time" name="event_start_time">
                                    <option value="" style="display: none">select start time...</option>
                                       <option v-for="timeblock in timeblocks" :value="sql_date_time(timeblock)" v-text="date_time(timeblock)"></option>
                                    </select>
                                    <div class="buttons">
                                    </div>
                                 </div>
                              </div>   
                              <div class="form_element">	
                                 <select class="select" v-model="editEvent.duration" name="event_duration">
                                    <option value="" style="display: none">select duration...</option>
                                    <option value="30" >30 minutes</option>
                                    <option value="60" >one hour</option>
                                    <option value="90" >90 minutes</option>
                                    <option value="120" >Two hours</option>
                                    <option value="180" >Three hours</option>
                                    <option value="240" >Four hours</option>
                                    <option value="300" >Five hours</option>
                                    <option value="360" >Six hours</option>
                                    <option value="480" >Eight hours</option>
                                    <option value="600" >Ten hours</option>
                                    <option value="720" >Twelve hours</option>
                                 </select>
                              </div>
                           </div>
                           
                           
                           <div class="form_row players ">
                              <div class="form_element">
                                 <label class="label">Total number of players<br/>(including presenter)</label>
                                 <div class="input_wrapper">
                                    <input class="text_box num_players_box" type="number" min="1" max="100" v-model="editEvent.seats"  name="event_players" placeholder="1"   />
                                 </div>	
                              </div>
                              <div class="form_element " >
                                 <label class="label">Presenter is player</label>
                                 <div class="checkbox_wrapper" >
                                    <div class="input_wrapper">
                                       <input class="checkbox" type="checkbox" name="gm_player" v-model="editEvent.gm_player" value="1" placeholder="will you be playing the game" /> 
                                    </div>
                                    <span class="input_message" v-if="formErrors.event_duration">Event duration may not be greater than 24 hours</span>
                                 </div>
                              </div>
                           </div>	
                           
                           
                           
                           
                           
                           <div class="controls">
                              <button type="submit" class="button" v-text="editEvent.event_id? 'Update Event' : 'Add Event'"></button> 
                           </div>
                        </form>   
                        
                     </div>
                     
						</div>
						
						
						<div class="box schedule" :class="schedulingTab == 'schedule'? 'active' : '' " >
							SCHEDULE</br>
							<p>big schedule grid of locations and timeblocks with list of unscheduled events. </p>
							<p>color-coded event-type, status-flag, presenter, and info-dropdown. </p>
							<p>click on event to highlight start-time in area. click on location to place event. event may be copied or moved. </p>
						</div>
						
						
						<div class="box schedule" :class="schedulingTab == 'schedulers'? 'active' : '' " >
							SCHEDULERS</br>
							<p>list of areas with schedulers and area status. dropdown to add scheduler for area</p>
						</div>
					</div>				
				</div>
			
			
			
			</section>
		
		
		
		
		</div>
		
		
			<p>big tab-box of locations-manager, event-manager, event-grid</p>
			
			
			
			<p>Scheduling Panel (create con, like admin panel)</p>
			<p>select con, show basic events info. and status. </p>
			<p>edit events, add events, schedule events in big grid</p>
			
			<p>{{conEvents}}</p>
			<p>{{filteredEvents}}</p>
			
		
		</div>
		
		
		
		
		

	</template>
	
	
	
	<script>
		import Vue from 'vue'
      import moment from 'moment'
		import { mapGetters, mapState } from 'vuex'
		import Router from 'vue-router'
		import convention_select from '@/components/includes/convention_select'
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
               editEvent            : {},
               formErrors           : [],
               submissionSystem     : {},
					selectVenueLocs      : 0,
               copyConLocations     : 0,
               showLocationControls : false,
				}
			},
			
			components: {
				'convention_select'	: convention_select,
				'scheduling_control_panel' : scheduling_control_panel,
			},
			
			
			watch: {
				
				
			},
			
			created() {
				var vm = this;
				vm.check_user();
				vm.get_scheduling_data();    
            vm.set_location_form_data();
			},
         
         mounted() {
            var vm = this;
            
         },
			
			computed: {
            ...mapState({
					user        : 'user',  
               venues      : 'venues',
               conventions : 'conventions',
               conLocations: 'conLocations',
               eventTypes  : 'eventTypes',
               eventTracks : 'eventTracks',
               ageGroups   : 'ageGroups',               
            }),
            
				...mapGetters({
					conEvents	: 'conEvents',
					currentCon	: 'currentCon',
               allEvents   : 'allEvents',
				}),
            
				filteredEvents:  () => {
					var vm = this;
					
					return vm.events;
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
            
            timeblocks() {
               var   vm = this,
                     times = [];
               for(var timeBlock = moment(vm.currentCon.start_date_time); moment(timeBlock).diff(vm.currentCon.end_date_time, 'hours') <=0; timeBlock.add(30, 'minutes') ) {
                  if(parseInt(timeBlock.format('HH')) >= 9 || timeBlock.format('HH') == '00') { 
                     times.push(moment(timeBlock));
                  }
               }
                     
               return times;
            }
				
				
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
					vm.$store.dispatch('get_con_locations', vm.selectedCon).then(()=>{});	               
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
            
            
            
            set_con(con) {
               var vm = this;               
               vm.selectedCon == con? '' : vm.selectedCon = con;                  
					vm.$store.dispatch('get_con_locations', vm.selectedCon).then(()=>{});	  
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
               
               
            }
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
      width: 45%;
      margin: 1rem 0;
      padding: 1rem 0;
      max-height: 50rem;
      overflow: hidden;
      overflow-y: auto;
   }
   .scheduling_panel .box .list_element .control_bar {
      position: absolute;
         top: 0;
         right: 0; 
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
      width: 25rem;
   }
   
   .scheduling_panel .box .edit_element {
      display: flex;
         flex-wrap: wrap;
         flex-direction: column;
      width: 55%;
      padding: 1rem 3rem 0 0;
   }
   .scheduling_panel .box .edit_element form {
      position: relative;
   }
   
   .scheduling_panel .box .edit_element .control_button {
      position: absolute;
         top: 0;
         right: 0;
   }
   .scheduling_panel .box .list_item {
      display: flex;
      width: 100%;
	}
   
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
   
   
   
   /* --------------------------------------------------------------------------------
                        EVENTS BOX
      --------------------------------------------------------------------------------*/
   .scheduling_panel .box.events .event_time_row {
      position: relative;
   }
   .scheduling_panel .box.events .event_time_row .buttons {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
         top: 0;
         left: 0;
      width: 12rem;
      max-height: 1.5rem;
      overflow: hidden;
      transition: max-height .3s;
   }
   .scheduling_panel .box.events .event_time_row .buttons:hover {
      max-height: 25rem;
      overflow-y: auto;
   }
   .scheduling_panel .box.events .event_time_row .time_button {
      display: flex;
      width: 100%;
      color: var(--button);
      font-size: .95rem;
      height: 1.5rem;
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
   
   
	
	
	
	
	
	/*
	 .schedule_controls {
		position: absolute;
		top: 0;
		right: 0;		
	}
	 .main_content_inner {
		padding-top: 0;
	}
	
	
	
	
	.section.event_manager .search_bar {
		width: 100%;
		height: 6rem;
		border: solid 1px var(--borderColor);
		border-radius: var(--borderRadius);
		background: #7c8390;
	}
	.section.event_manager .search_bar .sort_button {
		color: var(--borderColor2);
	}
	.section.event_manager .event_list_wrapper {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		margin-top: 1rem;
	}
	
	/*	------	EVENT WRAPPER	------	* /
	.section.event_manager .event_list,
	.section.event_manager .event_wrapper {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.section.event_manager .event_list {
		max-height: calc(100vh - 6rem);
		padding: 0 1rem;
		overflow: hidden;
		overflow-y: auto;		
		border: solid 1px #aaa;
		padding: .5rem 0 .5rem 0;
		background: #7c8390;
		border-radius: var(--borderRadius);
	}
	.section.event_manager .event_list .event {
		border-top: solid 1px #ccc;
		padding-top: .5rem;
	}
	.section.event_manager .event_wrapper + .event_wrapper {
		margin-top: 1rem;
	}
	.section.event_manager .event_wrapper  .event {
		position: relative;
		display: flex;
		width: 100%;
	}
	.section.event_manager .event_wrapper .status_title {
		position: relative;
		display: flex;
		align-items: flex-end;
		width: 5%;
	}
	.section.event_manager .event_wrapper .status_title .title {
		display: flex;
		font-weight: bold;
		text-transform: uppercase;
		transform: rotate(-90deg);		
		transform-origin: 5% 25%;
	}
	.section.event_manager .event_wrapper.Unapproved .status_title {
		background: #4e2f06;
	}
	
	.section.event_manager .event_wrapper .event_content {
		display: flex;
		width: 95%;
		padding-left: .5rem;
		flex-wrap: wrap;
	}
	.section.event_manager .event_wrapper  .event {
		max-height: 10rem;
		transition: max-height .4s;
		overflow: hidden;
		padding: 0 .5rem 0 0;
		flex-wrap: wrap;
	}
	.section.event_manager .event_wrapper.active .event {
		max-height: 10rem;
	}
	.section.event_manager .event_wrapper.active .status_title ~ .event {
		max-height: 50rem;
		overflow-Y: auto;
	}
	
	
	
	
	.section.event_manager .event_wrapper .fields {
		display: flex;
		width: 70%;
		flex-wrap: wrap;
	}
	.section.event_manager .event_wrapper .element {
		display: flex;
	}
	.section.event_manager .event_wrapper .event_top {
		position: relative;
		display: flex;
		width: 100%;
		border-bottom: solid 1px var(--textColor);
		padding: .25rem 0;
		margin: 0 0 .5rem 0;
		justify-content: space-between;
	}
	.section.event_manager .event_wrapper .presenter {
		width: 35%;
		align-items: center;
		font-size: .9rem;
		line-height: 1.1em;
	}
	.section.event_manager .event_wrapper .event_name {
		width: 65%;
		align-items: center;
		font-weight: bold;
		font-size: .9rem;
		line-height: 1.1em;
	}
	.section.event_manager .event_wrapper .event_track,
	.section.event_manager .event_wrapper .event_type,
	.section.event_manager .event_wrapper .event_time,
	.section.event_manager .event_wrapper .event_seats {
		width: 50%;
		font-size: .85rem;
		padding: 0 .25rem;
	}
	.section.event_manager .event_list_wrapper .controls {
		display: flex;
		width: 30%;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}
	.section.event_manager .event_list_wrapper .controls .text {
		display: flex;
	}
	.section.event_manager .event_list_wrapper .header {
		padding: 0 1rem;
	}
	.section.event_manager .event_list_wrapper .header span {
		text-transform: uppercase;
	}
	.section.event_manager .event_list_wrapper .header .event_top {
		border: none;
	}
	.section.event_manager .event_list_wrapper .header .event_type,
	.section.event_manager .event_list_wrapper .header .event_time,
	.section.event_manager .event_list_wrapper .header .event_seats,
	.section.event_manager .event_list_wrapper .header .event_track,
	.section.event_manager .event_list_wrapper .header .controls {
		justify-content: center;
		font-weight: bold;
		
	}
	.section.event_manager .event_wrapper .controls .control {
		display: flex;
		width: 48%;
		cursor: pointer;
		background: #fff;
		border: solid 1px var(--textColor3);
		color:  var(--textColor3);
		border-radius: .25rem;
		padding: .25rem .5rem;
		margin: .15rem 0;
		align-items: center;
		justify-content: center;
		font-size: .9rem;
	}
	.section.event_manager .event_wrapper .controls .control:hover {
		background: var(--glowColor);
		color: #fff;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
	}
	
	.section.event_manager .event_wrapper .controls .control .control {
		border: none;
		padding: 0;
		margin: 0;
		background: none;
	}
	.section.event_manager .event_edit_wrapper {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: .5rem;
		border: solid 1px var(--borderColor);
		background: var(--textColor);
	}
	.section.event_manager .event_submission_form {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: .5rem;
		margin-top: 1.5rem;
	}
	.section.event_manager .section_title {
		display: flex;
		width: 100%;
		height: 2rem;
		font-size: 1.5rem;
	}
	.section.event_manager .event_submission_form .section_title,
	.section.event_manager .event_submission_form .subission_intro {
		display: none;
	}
	
	.section.event_manager  .new_event_button {
		position: absolute;
		top: 0;
		left: 0;
	}
	.section.event_manager .event_submission_form .close_button {
			
	}
	.section.event_manager .event_submission_form .controls,
	.section.event_manager .event_submission_form .rows {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	
	.section.event_manager .event_submission_form .select, 
	.section.event_manager .event_submission_form .text_box, 
	.section.event_manager .event_submission_form .textarea {
		max-width: 25rem;
	} 
	.section.event_manager .event_submission_form .checkbox_wrapper {
		width: 60%;
	}
	.section.event_manager .event_submission_form .checkbox_wrapper .checkbox {
		width: 1.5rem;
		height: 1.5rem;
		transform-origin: 0 0;
		margin: 0 4rem 0 1rem;
	}
	.section.event_manager .event_submission_form .label {
		width: 30%;
	}
	.section.event_manager .event_submission_form .form_row {
		flex-wrap: wrap;
	}
	.section.event_manager .event_submission_form .button {
		color: #fff;
	}
	
	.schedule_settings_section .tab_box  .form .schedulers,
	.section.event_manager .event_submission_form .presenters {
		display: flex;
		width: 100%;
		align-items: center;
	}
	.schedule_settings_section .tab_box  .form .schedulers .select,
	.section.event_manager .event_submission_form .presenters .select {
		width: calc(100% - 3rem);
	}
	.schedule_settings_section .tab_box  .form .schedulers .remove_button,
	.section.event_manager .event_submission_form .presenters .remove_button {
		display: flex;
		height: 2rem;		
		width: 2rem;
		background: var(--warningColor);
		color: #fff;
		border-radius: .2rem;
		margin-left: 2rem;
		justify-content: center;
		font-size: 1.75rem;
		text-shadow: -1px -1px 1px rgba(-1px -1px 1px );
		text-shadow: 1px 1px 2px rgba(0,0,0,0.25);
	}
	.schedule_settings_section .tab_box  .form .schedulers_row .buttons, 
	.section.event_manager .event_submission_form .presenter_row .buttons {
		display: flex;
		width: 100%;
		justify-content: center;
	}
	
	.section.event_manager .event_submission_form .form_element {
		width: 100%;
		flex-wrap: nowrap
	}
	.section.event_manager .event_submission_form .split_row .form_element,
	.section.event_manager .event_submission_form .event_time_element,
	.section.event_manager .event_submission_form .time_picker_element {
		width: 50%;
	}
	.section.event_manager .event_submission_form  .event_time_row .input_message {
		display: flex;
		width: 100%;
		position: relative;
		top: 0;
	}
	.section.event_manager .event_submission_form .event_time_row {		
		background: #fff;
		padding: .25rem;
		border: solid 1px #ccc;
		border-radius: .1rem;
	}
	.section.event_manager .event_submission_form .event_time_row .title {
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.section.event_manager .event_submission_form .event_time_element {
		flex-wrap: wrap;
	}
	.section.event_manager .event_submission_form .event_time_element p {
		display: flex;
		width: 100%;
		font-size: 1.15rem;
		text-shadow: none;
		color: var(--button);
	}
	.section.event_manager .event_submission_form .form_element + .form_element {
		margin-top: .75rem;
	}
	
	
	
	
	
	
	
	  .event_list .status_form { 
		width: 1rem;
	}
	  .event_list .element .icon_button { 
		cursor: pointer;
		width: 100%;
		height: 1rem;
	}
	  .event_list .element .icon_button .icon_label  { 
		position: relative;		
		width: 100%;
		height: 100%;
		margin: 0;
		border: 0;
	}
	  .event_list .element .icon_button .checkbox  { 
		position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
		opacity: 0;	
	}
	
	/*edit button* /
	  .event_list .element .icon{ 
		display: inline-block;
	}	
	  .event_list_wrapper.edit .element.edit .fa-pencil-square-o,
	  .event_list .element.edit .fa-chevron-up { 
		display: none;
	}
	  .event_list_wrapper.edit .element.edit .fa-chevron-up { 
		display: inline-block;
	}
	
	
	  .event_list .event_form  { 
		max-height: 0;
		overflow: hidden;
		transition: max-height .4s;
	}
	  .event_list_wrapper.edit .event_form  { 
		max-height: 50rem;
	}
	  .event_list{ 
		
	}
   
    
   
   
	
	/*  -----------------------------------------------------------------------------------------------------
                                SCHEDULING GRID
		-----------------------------------------------------------------------------------------------------    * / 
		
	_grid_page _grid {
		visibility: hidden;
	}
	_grid_page.loaded _grid  {
		visibility: visible;
	}
	
	_grid_page .main_content {
		padding: 0;
		height: calc(100% - 6rem);
		min-height: auto;
		margin-top: 6rem;
	}
	_grid_page .page_header {
		margin-top: 0;
	}
	_grid_page .page_content {
		overflow-y: hidden;
		padding: 0;
	}
	_grid_page .main_content_inner,
	_grid_page .sections,
	_grid_page .section_content,
	.section_grid {
		max-width: 100%;
		width: 100%;
		height: 100%;
		padding: 0;
	} 
	_grid_page .section_wrapper {
		height: 100%;
	}
	
	_grid_page .section_content{
		display: flex;
		padding-bottom: 5rem;
	}
	
	.section_grid .location_wrapper {
		position: relative;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.section_grid .location_wrapper + .location_wrapper {		
		margin-top: .5rem;
		border-top: solid px var(--borderColor);
		padding-top: 1rem;
	}
	.section_grid .location_wrapper .location {
		padding: .73rem 0;
		width: 100%;
	}
	.section_grid .grid_wrapper {
		display: flex;
		position: relative;
		justify-content: space-between;
		overflow: hidden;
		overflow: auto;
		width: 100%;
		height: 100%;
	}
	
	.section_grid .grid_wrapper .loading {
		position: fixed;
			top: 6rem;
			left: 0;
			z-index: 100;
		width: 100vw;
		height: calc(100vh - 6rem);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 4rem;
		color: #f0f0f0;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
		background: rgba(0,0,0,0.25);
	}
	.section_grid .grid_wrapper.show .loading {
		display: none;
	}
	.section_grid .event_grid {
		position: relative;
		display: none;		
		flex-wrap: wrap;
		width: 100%;
		overflow: hidden;
	}
	.section_grid .grid_wrapper.show .event_grid {
		display: flex;
		align-items: flex-start;
	}
	.section_grid .event_grid .grid_content {
		flex-wrap: wrap;
		position: relative;
		overflow: hidden;
		overflow-Y: auto;
	}
	.section_grid  {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: auto;
		flex-wrap: wrap;
		padding: 0 0 1rem 0;
		background: #fff;
		border-radius: .2rem;
		border: solid 1px var(--borderColor);
	}
	.section_grid .grid {
		position: absolute;
			top: 0;
			left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-left: solid 2px #555;
		background: #ffffe7;
	}	
	.section_grid .grid .location_names {
		display: flex;
		flex-direction: column;
		width: 8rem;	
		padding-bottom: 1rem;
		margin-bottom: .25rem;
	}
	.section_grid .grid .location_names .location_wrapper {
		width: 100%;
	}
	.section_grid .grid .location_names .sub_location_wrapper {
		display: flex;
		width: 100%;
	}
	
	.section_grid .location_wrappers {
		display: flex;
		overflow: hidden;
		overflow-x: auto;
		padding-bottom: 1rem;
		margin-bottom: .25rem;
		width: calc(100% - 8rem);
	}
	.section_grid .scroller {
		position: relative;
			top: 0;
			left: 8rem;
			z-index: 10;
		overflow: hidden;
		overflow-x: auto;
		height: 1rem;
		background: #666;
		border: solid 1px var(--borderColor);
		border-radius: .25rem;
		width: calc(100% - 9rem);
	}
	.section_grid .scroller .scroll_body {
		width: 100rem;
		display: inline-block;
	}
	.section_grid .location_wrappers .wrappers {
		display: flex;
		flex-direction: column;
	}
	.section_grid .location_wrapper {
		display: flex;
		width: 80%;
		color: #333;
		flex-wrap: wrap;
	}
	
	.section_grid .location_title {
		display: flex;
		width: 100%;
		font-size: 1rem;
		height: 1.5rem;
		font-weight: bold;
		align-items: center;
		white-space: nowrap;
		color: var(--button);
		text-transform: uppercase;
		border-top: solid 1px var(--highlightColor);
		border-bottom: solid 1px var(--highlightColor);
		line-height: 1.5rem;
		padding: .25rem .5rem;
	}
	.section_grid .sublocation_title {
		color: #333;
		display: flex;
		width: 100%;
		padding: 0 0 0 1rem;
	}
	
	.section_grid .grid_header {
		display: flex;
		width: 100%;
		position: relative;
		height: 4.5rem;
		flex-wrap: nowrap;
		border-bottom: solid 2px #ccc;
	}
	.section_grid .grid_header .title {
		align-items: flex-end;
	}
	.section_grid .grid_header .grid_row {
		display: flex;
		flex-wrap: nowrap;
	}
	.section_grid .grid_header .days {
		display: flex;
		background: #777;
	}
	.section_grid .grid_header .day {
		display: flex;
		flex-wrap: wrap;
	}
	.section_grid .grid_header .day_name {
		display: flex;
		width: 100%;
		background: var(--highlightColor);
		padding: .15rem 0;
		justify-content: space-around;
	}
	.section_grid .grid_header .days {
		position: absolute;
		top: 0;
		left: 0;
	}
	.section_grid .grid_header .day_name .day_wrapper {
		display: flex;
		color: #5a5a5a;
	}
	.section_grid .grid_header .day_name .text{
		display:flex;
		text-transform: uppercase;
		letter-spacing: .1rem;
		font-weight: bold;
	}
	.section_grid .grid_header .day_name .date{
		display: flex;
		padding: 0 .35rem;
		font-style: italic;
		white-space: nowrap;
	}
	.section_grid .grid_header .times {
		display: flex;
		width: 100%;
	}
	.section_grid .grid_header .day .time_wrapper {
		display: flex;	
		background: var(--button);
	}
	.section_grid .grid_header .time_wrapper .time {		
	display: flex;
		width: 4rem;
		font-size: .75rem;
		align-items: center;
		justify-content: flex-end;
		color: #fff;
	}
	.section_grid .grid_content {
		display: flex;
		width: 100%;
		height: calc(100% - 4.5rem);
		margin-top: auto;
	}
	.section_grid .location_row {
		display: flex;
		height: 1.5rem;
		flex-wrap: nowrap;
		justify-content: flex-start;
		border-top: solid 1px #ccc;
		border-bottom: solid 1px #ccc;
	}
	.section_grid .location_row + .location_row {
		margin-top: .25rem;
	}
	.section_grid .grid_header .title,	
	.section_grid .location_row .sublocation_title {
		display: flex; 
		width: 100%;
		justify-content: flex-end;
		padding: 0 1rem 0 0;
		color: var(--borderColor2);
	}
	.section_grid .times {
		display: flex;
		
	}
	.section_grid .sub_location_wrapper,
	.section_grid .days {
		display: flex;
		height: 1.5rem;
	}
	.section_grid .day {
		display: flex; 
		border-right: solid 1px #eee;
		border-left: solid 1px #eee;
	}
	.section_grid .day + .day{
		margin-left: 4px;
		
	}
	.section_grid  .day .time_wrapper {
		position: relative;
		display: flex; 
		width: 5rem;
		height: 1.5rem;		
		padding-right: .5rem;
		justify-content: center;
		background: #fff;
		color: black;
	}
	.section_grid  .day .time_wrapper + .time_wrapper {
		border-left: solid 1px #ccc;
	}
	
	.section_grid   .event_card {
		position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
		display: flex;
		height: 100%;
		z-index: 10;
		border: solid 1px red;
		color: black;
		background: #f9f9e5;		
		transition:z-index .4s;
	}
	.section_grid .event_card:focus,
	.section_grid .event_card:hover {
		z-index: 100;
	}
	.section_grid   .event_card .buttons {
		position: absolute;
		top: -1rem;
		left: 100%;
		display: none;
		padding: .5rem .5rem 5.rem 0 ;
		width: 2rem;
		flex-wrap: wrap;
	}
	
	.section_grid .event_card:focus .buttons,
	.section_grid .event_card:hover .buttons {
		display: flex;
		cursor: pointer;
	}
	.section_grid   .event_card .buttons .event_button {
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		margin: .1rem;
		box-shadow: 1px 1px 2px rgba(0,0,0,0.25);
		border-radius: .2rem;
	}	
	.section_grid   .event_card .buttons .edit_button {
		color: #fff;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.1);
		background: var(--textColor3);
	}
	.section_grid  .card_content {
		max-height: 100%;
		overflow: hidden;	
height: 10rem;		
		transition: max-height .4s		
	}
	.section_grid   .event_card:focus .card_content,
	.section_grid   .event_card:hover .card_content {
		z-index: 100;
		max-height: 25rem;
	}
	.section_grid   .event_card .event_name {
		display: flex;
		width: 100%;
		color: var(--button);
		flex-wrap: wrap;
	}
	.section_grid   .event_card {
		
	}
	.section_grid .events_wrapper {
		display: flex;
		flex-direction: column;
		width: 20%;
		height: (100vh - 6rem);
		overflow: hidden;
		overflow-Y: auto;
		flex-wrap: wrap;
	}
	.section_grid .event_wrapper {
		display: flex;
		width: 100%;
		align-items: flex-start;
	}
	.section_grid .event_wrapper + .event_wrapper {
		margin-top: .5rem;
	}
	.section_grid .event_wrapper .event {
		border-top: solid 1px var(--borderColor);
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		width: 100%;
		padding: .5rem;
		margin: .5rem 0;
		color: black;
	}
	.section_grid .event_wrapper .event .row {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		color: var(--mainColor);
	}
	.section_grid .event_wrapper .event .row + .row {
		margin-top: .25rem;
	}
	.section_grid .event_wrapper .name_row {
		justify-content: space-between;
	}
	.section_grid .event_wrapper .event_title {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-size: .85rem;
		line-height: 1em;		
		font-weight: bold;
		width: 74%;
		padding-bottom: .15rem;
	}
	.section_grid .event_wrapper .event_tag {
		display: flex;
		align-items: center;
		width: 25%;
		justify-content: center;
	}
	.section_grid .event_wrapper .event_location {
		display: flex;
		width: 100%;
		color: #000;		
	}
	.section_grid .event_wrapper .event_location .select {
		border: solid 1px var(--borderColor);
		width: 100%;
		border-radius: .15rem;
		color: #333;
	}
	.section_grid .event_wrapper .event_location .select optgroup,
	.section_grid .event_wrapper .event_location .select option {
		color: inherit;
	}
	.section_grid .event_wrapper .event .event_time {
		display: flex;
		width: 100%;
		font-size: .85rem;
		justify-content: center;
	}
	
	
	
	/*  -----------------------------------------------------------------------------------------------------
                                SCHEDULING SETTINGS PAGE
		-----------------------------------------------------------------------------------------------------    * / 
	.schedule_settings_section .tab_box {
		display: flex;
		flex-wrap: wrap;		
	}
	.schedule_settings_section .tab_box .tabs {
		position: relative;
		z-index: 10;
		display: flex;		
		transform:translateY(1px);
	}
	.schedule_settings_section .tab_box .tabs .tab {
		display: flex;
		border: solid 1px #a1a8b6;
		border-radius: .15rem .15rem 0 0;
		cursor: pointer;
		color: #fff;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
		padding: .25rem .5rem;		
		background: #c1c9da;
		transition: border-bottom .3s, background .3s, color .3s, text-shadow .3s;
	}
	.schedule_settings_section .tab_box .tabs .tab + .tab{
		margin-left: .2rem;
	}
	.schedule_settings_section .tab_box .boxes {
		display: flex;
		position: relative;
		min-height: 25rem;
		width: 100%;
		border: solid 1px #a1a8b6;
		border-radius: 0 .25rem .25rem .25rem;
		background: #fff;
	}	
	.schedule_settings_section .tab_box .boxes .box {
		position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		width: 100%;
		min-height: 25rem;
		display: flex;
		flex-wrap: wrap;
		opacity: 0;
		padding: 1rem 2rem;
		transition: opacity .3s, z-index .3s, position.3s;
	}
	.schedule_settings_section .tab_box .box_title {
		display: flex;
		width: 100%;
		justify-content: center;
		font-size: 3rem;
		line-height: 1em;
		color: var(--textColor2);
	}
	
	.schedule_settings_section .tab_box .form_wrapper {
		display: flex;
		flex-direction: column;
		width: 60%;
		padding: .5rem;
		border: solid 2px #ccc;
		border-radius: .25rem;
	}
	.schedule_settings_section .tab_box .form_wrapper .message {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 20;
		color: #c00;
		padding: .25rem 0;
		background: rgba(255,255,0,.5);
		text-align: center;
	}
	.schedule_settings_section .tab_box .form {
		display: flex;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
		padding: .5rem 1rem;
	}
	.schedule_settings_section .tab_box .form_content {
		display: flex;
		flex-wrap: wrap; 
		flex-direction: column;
		width: 70%;
	}
	.schedule_settings_section .tab_box  .form .controls {
		position: relative;
		display: flex;
		justify-content: flex-start;
		width: 25%;
		margin: 0 0 0 5%;
		padding: 0;
		flex-direction: column;
	}
	.schedule_settings_section .tab_box  .form .controls .button {
		width: 100%;
		color: var(--button);
	}
	.schedule_settings_section .tab_box  .form .controls .button:hover {
		color: #fff;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.25);
	}
	.schedule_settings_section .tab_box  .form .controls .button + .button {
		margin-top: 1rem;
	}
	.schedule_settings_section .tab_box  .form .controls .save_button {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.schedule_settings_section .tab_box  .form .label {
		width: 7rem;
	}	
	.schedule_settings_section .tab_box  .form .select,
	.schedule_settings_section .tab_box  .form .textarea,
	.schedule_settings_section .tab_box  .form .text_box {
		
	}
	.schedule_settings_section .tab_box .button_wrapper {
		display: flex;
		width: 40%;
		justify-content: center;
		max-height: 35rem;
		overflow: hidden;
		overflow-Y: auto;
	}
	.schedule_settings_section .tab_box .button_wrapper .buttons {
		display: flex;
		flex-direction: column;
	}
	.schedule_settings_section .tab_box .option_button {
		display: flex;
		width: 100%;
		color: var(--button);
		cursor: pointer;
		flex-shrink: 0;
		padding: .25rem .5rem;
		justify-content: space-between;
		border: solid 1px #a1a8b6;
		border-radius: .25rem;
	}
	.schedule_settings_section .tab_box .option_button:hover {
		background: #ccc;
		color: #fff;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.25);
	}
	.schedule_settings_section .tab_box .option_button + .option_button {
		margin-top: .25rem;
	}
	.schedule_settings_section .tab_box .option_button .text{
		display: flex;
	}
	
	
	
	.schedule_settings_section .tab_box.tracks .tab.tracks,
	.schedule_settings_section .tab_box.schedulers .tab.schedulers
	.schedule_settings_section .tab_box.types .tab.types,
	.schedule_settings_section .tab_box.tables .tab.tables,
	.schedule_settings_section .tab_box.locations .tab.locations,
	.schedule_settings_section .tab_box.areas .tab.areas {		
		border-bottom: solid 1px #fff;
		background: #fff;
		color: #818cc3;
		text-shadow: none;
	}
	.schedule_settings_section .tab_box.schedulers .box.schedulers,
	.schedule_settings_section .tab_box.types .box.types,
	.schedule_settings_section .tab_box.tracks .box.tracks,
	.schedule_settings_section .tab_box.tables .box.tables,
	.schedule_settings_section .tab_box.locations .box.locations,
	.schedule_settings_section .tab_box.areas .box.areas {		
		opacity: 1;
		z-index: 10;
		position: relative;
	}
	
	*/
	
	
	</style>