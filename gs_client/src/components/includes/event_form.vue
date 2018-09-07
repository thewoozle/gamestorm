
   <template>
   
                        <form class="form edit_event_form">
                        
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
                              <div class="form_element">
                                 <label class="label">Event Track</label>
                                 <div class="input_wrapper">
                                    <select class="input select" name="event_track" v-model="editEvent.event_track"   >
                                       <option value="" style="display: none">event track...</option>
                                       <option v-for="track in eventTracks" :value="track.id" v-text="track.track_name" :selected="editEvent.event_track == 1" ></option>
                                    </select>
                                 </div>	
                                 <span class="input_message" v-if="formErrors.event_track" v-text="formErrors.event_track"></span> 		
                              </div>
                              <div class="form_element">
                                 <label class="label">Event Type</label>
                                 <div class="input_wrapper">
                                    <select class="input select" name="event_type" v-model="editEvent.event_type"   >
                                       <option value="" style="display: none">event type...</option>
                                       <option v-for="type in eventTypes" :value="type.id" v-text="type.type_name" :selected="editEvent.event_type == 1" ></option>
                                    </select>
                                 </div>	
                                 <span class="input_message" v-if="formErrors.event_type" v-text="formErrors.event_type"></span> 		
                              </div>
                           </div>
                           
                           
                           <div class="form_row">
                              <div class="form_element select_presenter">	
                                 <label class="label">Presenter(s)</label>
                                 <div class="input_wrapper">
                                    <select class="select" @change="add_presenter" v-model="presenterSelect"  >
                                       <option value="" style="display: none">presenter...</option>
                                       <option v-for="member in memberList" :value="member.uuid" v-text="member.first_name+' '+member.last_name"></option>
                                    </select>
                                    
                                    
                                 </div>
                              </div>
                              
                              <div class="form_element presenters" v-if="editEvent.presenters">
                                 <div class="titles">
                                    <span class="name">Name</span>
                                    <div class="buttons">
                                       <span class="cntrl">email</span>
                                       <span class="cntrl">remove</span>
                                       <span class="cntrl">player</span>
                                    </div>   
                                 </div>
                              
                                 <div v-if="editEvent.presenters" v-for="presenter in editEvent.presenters" class="presenter">
                                    <span class="text" v-text="presenter.first_name+' '+presenter.last_name"></span>
                                    <div class="buttons">
                                       <button type="button" class="list_button fal fa-envelope" title="email presenter NON WORKING"></button>   
                                       <button type="button" class="list_button fal fa-ban" title="remove presenter" @click="remove_presenter(presenter.uuid)"></button> 
                                       <button type="button" class="list_button fal" 
                                          :class="presenter.member_role=='presenter'? 'fa-check-square' : 'fa-square'" 
                                          title="presenter is seated player" 
                                          @click="set_presenter_player(presenter.uuid)"
                                       ></button>   
                                    </div>   
                                 </div>
                                 
                                 
                              </div>
                              <div class="form_element" v-else ><span class="text">This event has no presenter</span></div>
                           </div>
                           
                           
                           
                           <div class="form_row"  v-if="editEvent.event_track == '14'" >
                              <div class="form_element expanding_row" :class="editEvent.event_track == '14'? 'show' : ''">
                                 <label class="label">Game System</label>
                                 <div class="input_wrapper">
                                    <input class="input text_box" type="text"  v-model="editEvent.event_system"  name="event_system" /> 	
                                 </div>	
                              </div>
                           </div>
                           
                           
                           <div class="form_row event_time_row">
                              <div class="form_element">	
                                 <div class="input_wrapper">
                                    <label class="label top">Start Time</label>
                                    <select class="select"  v-model="editEvent.event_start_time" name="event_start_time">
                                       <option value="" style="display: none" >select start time...</option>
                                       <option v-for="timeblock in timeblocks" :selected="editEvent.event_start_time == sql_date_time(timeblock)" :value="sql_date_time(timeblock)" v-text="date_time(timeblock)"></option>
                                    </select>
                                    <div class="buttons">
                                    </div>
                                 </div>
                              </div>   

                              <div class="form_element">	
                                 <label class="label top">Event Duration</label>
                                 <select class="select" v-model="editEvent.event_duration" name="event_duration">
                                    <option value="" style="display: none"  >select duration...</option>
                                    <option v-for="duration in eventDuration" :selected="editEvent.duration == duration" :value="duration.time" v-text="duration.text"></option>
                                 </select>
                              </div>
                           </div>
                           
                           
                           <div class="form_row players ">
                              <div class="form_element">
                                 <label class="label">Total player positions</label>
                                 <div class="input_wrapper">
                                    <input class="text_box num_players_box" type="number" min="1" max="100" v-model="editEvent.seats"  name="event_players" placeholder="1"   />
                                 </div>	
                              </div>
                              
                              <div class="form_element">
											<label class="label">Requested Table</label>
                                    <div class="input_wrapper">
                                       <select class="select" name="table_requested" v-model="editEvent.table_requested" >
                                          <option value="" style="display: none">select table shape</option>
                                          <option value="none" >None</option>
                                          <option value="noPref" >No Preference</option>
                                          <option value="round" >Round</option>
                                          <option value="square" >Square</option>
                                          <option value="long" >Long</option>
                                          <option value="custom" >Special (as noted below)</option>
                                       </select>	
                                    </div>
                                    <span class="input_message" v-if="formErrors.table_requested" >Please select a table, 'none', or 'special'</span>
										</div>
                           </div>	
                              
                              
                           <div class="form_row players ">
                              <div class="form_element">
                                 <label class="label top">Recommended experience level</label>
                                 <select class="select" v-model="editEvent.experience_level" >
                                    <option value="" style="display: none"  >select experience level...</option>
                                    <option v-for="level in experienceLevels" :selected="editEvent.experience_level == level.level" :value="level.level" v-text="level.text"></option>
                                 </select>
                              </div>
                              
                              <div class="form_element">
                                 <label class="label top">Recommended age level</label>
                                 <select class="select" v-model="editEvent.age_category" >
                                    <option value="" style="display: none"  >select age group...</option>
                                    <option v-for="group in ageGroups" :selected="editEvent.age_category == group.id" :value="group.id" v-text="group.age_text"></option>                                 
                                 </select>
                              </div>
                           </div>	
                           
                           <div class="form_row">
                              <label class="label">Short Description</label>
                              <div class="input_wrapper">
                                 <textarea class="textarea" name="short_description" placeholder="400 char max."  v-model="editEvent.short_description" maxlength = "400"  /></textarea> 
                              </div>
                              <span class="input_message" v-if="formErrors.short_description" v-text="formErrors.short_description" ></span> 
                           </div>
                              
                           <div class="form_row">
                              <label class="label">Description</label>
                              <div class="input_wrapper">
                                 <textarea class="textarea" name="event_description"  v-model="editEvent.event_description" placeholder="2500 char max. uses Short Description if blank" maxlength = "2500" /> </textarea>		
                              </div>
                           </div>
                              
                           <div class="form_row">
                              <label class="label">Notes for Scheduler</label>
                              <div class="input_wrapper">
                                 <textarea class="textarea" name="event_notes"  v-model="editEvent.event_notes" placeholder="400 char max." maxlength="400" /></textarea>
                              </div>	
                           </div>
                           
                           
                           
                           <div class="form_row">
                              <label class="label">Event Link</label>                                 
                              <div class="input_wrapper">
                                 <input class="text_box"  v-model="editEvent.event_url" />
                              </div>
                              <span class="form_error" v-if="formErrors.event_url" v-text="formErrors.event_url? 'Event URL!' : ''"></span>
                           </div>
                           <label>FIX THE BLOODY CHECK BOXES</label>
                           <div class="form_row ">
                              <div class="form_element event_active ">
                                 <label class="label">Event Active</label>
                                 <div class="checkbox_wrapper input_wrapper">
                                    <input type="checkbox" class="checkbox" :class="editEvent.event_active? 'checked' : ''" value="1" :checked = "editEvent.event_active? 'checked' : ''"  />
                                 </div>
                              </div>
                              <div class="form_element event_active ">
                                 <label class="label">Add to [con]</label>
                                 <div class="checkbox_wrapper input_wrapper">
                                    <input type="checkbox" class="checkbox" :class="editEvent.in_con? 'checked' : ''" v-model="editEvent.in_con"  />
                                 </div>
                              </div>
                           </div>
                           
                           <div cass="controls">                            
                           
                              <button type="button" @click="submit_event()" class="button"  v-text="editEvent.event_id? 'Update Event' : 'Add Event'"></button> 
                           </div>
                        </form>   
   </template>
   
   <script>
   
		import Vue from 'vue'
      import moment from 'moment'
		import { mapGetters, mapState } from 'vuex'
      
      export default {
         name : 'event_form',
         
         data () {
            
				return {
					selectedCon		      : null,
					schedulingTab	      : 'alerts',
               selectedVenue        : {},
               editLocation         : {},
               formErrors           : [],
               submissionSystem     : {},
					selectVenueLocs      : 0,
               copyConLocations     : 0,
               showLocationControls : false,
               showEventControls    : false,
               showEventsList       : 'con',
               conLocations         : [],
					conEvents	         : null,
               timeblocks           : [],
               eventSignups         : [],
               presenterSearch      : '',
               presenterSelect      : null,
				}
         },
         
         props : {
            _editEvent: {
               type: Object
            }
         },
         
			created() {
				var vm = this;
				vm.check_user();
				vm.get_scheduling_data();    
            vm.set_location_form_data();
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
            }),
            
            editEvent() { return this._editEvent},
            
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
      
         methods : {
            
            
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
               vm.get_con_locations();              
               vm.get_con_events();
               vm.get_timeblocks();
               vm.get_event_signups();
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
               vm.get_con_events();
               vm.get_timeblocks();
               vm.get_event_signups();
            },
            
            get_con_locations() {
               var vm = this;
               vm.conLocations = [];
               vm.$store.dispatch('get_con_locations', vm.selectedCon).then((response)=>{
                  console.log(response);
                  vm.conLocations = response.locations;
               });	     
            },
            
            get_con_events() {
               var vm = this;
               vm.conEvents = [];
               vm.$store.dispatch('get_con_events', vm.selectedCon).then((response)=>{
                  vm.get_timeblocks();
                  if(response.events && response.events.length > 0) {
                     vm.conEvents = response.events;
                  } else {
                     vm.conEvents = null;
                  }
               });	                
            },
            
            get_event_signups() {
               var vm = this;
               
               vm.$store.dispatch('get_event_signups', vm.selectedCon).then((response)=>{
                  console.log(response);
               });
               
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
            
            // ADD PRESENTER 
            add_presenter(e) {
               var   vm       = this,
                     uuid     = e.target.value,
                     presenter= {};
               
               Object.entries(vm.memberList).forEach(([key,member]) => {
                  if( member.uuid == uuid) {
                     presenter = member;
                  }
               });
               
               presenter.member_role = 'presenter';
               
               if(vm.editEvent.presenters) {
                  var newUuid = true;
                  Object.entries(vm.editEvent.presenters).forEach(([key, _presenter]) => {
                     _presenter.uuid == presenter.uuid? newUuid = false : '';
                  });
                  newUuid? vm.editEvent.presenters.push(presenter) : '';
               } else {
                  vm.editEvent.presenters = [presenter]
               }
               
               
               vm.presenterSelect = null;
            },
            
            // SUBMIT EVENT 
            submit_event() {
               var vm = this;
               vm.editEvent.selected_con = vm.selectedCon;
               vm.$store.dispatch('submit_event', vm.editEvent).then((response)=>{                  
                  vm.editEvent = {};
                  console.log(response);
                  vm.$emit('clearEvent', 'clearEvent');
                  vm.get_con_events();
               });
               
            }
         },
         
      }
      
   
   </script>
   
   <style>
   
  .edit_event_form {
      position: relative;
   }
   .edit_event_form .select,
   .edit_event_form .text_box {
      color: var(--textColor4);
   }
   .edit_event_form .select {
      font-size: .95rem;      
   }
   
   
   .edit_event_form .event_time_row {
      position: relative;
   }
   .edit_event_form .event_time_row .buttons {
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
   .edit_event_form .event_time_row .buttons:hover {
      max-height: 25rem;
      overflow-y: auto;
   }
   .edit_event_form .event_time_row .time_button {
      display: flex;
      width: 100%;
      color: var(--button);
      font-size: .95rem;
      height: 1.5rem;
   }
   .edit_event_form .select_presenter  .input_wrapper {
      align-items: center;
   }
   .edit_event_form  .select_presenter .text_box{
      border: solid 1px var(--mainColor);
      border-radius: .15rem;
   }
   
   
   
   
   .edit_event_form .presenters {
      display: flex;
         flex-direction: column;  
      padding: .25rem;
      border-radius: .1rem;
      border: solid 1px var(--borderColor);   
   }
   
   .edit_event_form .presenters .titles {
      display: flex;
         justify-content: space-between;
      width: 100%;
      color: var(--textColor2);
   }
   .edit_event_form .edit_element .presenters .name  {
      display: flex;
      padding-left: 2rem;
      color: inherit;
      font-size: .85rem;
   }
   .edit_event_form .presenters .buttons {
      display: flex;
      justify-content: space-between;
      color: inherit;
      width: 7rem;
   }
   .edit_event_form .presenters .cntrl {
      display: flex;
      color: inherit;
      width: 2rem;
      font-size: .65rem;
      justify-content: center;      
   }
   .edit_event_form .presenters .presenter {
      display: flex;
         align-items: center;
      height: 1.65rem;
      justify-content: between;
      width: 100%;      
   }
   .edit_event_form .presenters .text {
      display: flex;
      width: auto;
      padding-left: .5rem;
      margin-right: auto;
      color: var(--textColor4);
   }
  .edit_event_form .presenters .buttons {
      display: flex;
      justify-content: space-between;
      width: 7rem;
   }
  .edit_event_form .controls {
     justify-content: space-between;
  }
  .edit_event_form .controls .form_element {
     width: 40%;
     padding: 0;
     margin-top: 2rem;
  }
  
   
   
   </style>