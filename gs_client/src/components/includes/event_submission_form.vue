
	<template>
		<div class="component">
      
         <form class="event_submission_form"  @submit.prevent="submit_event">	                        
            <input type="hidden" v-model="editEvent.event_id" />
            <input type="hidden" v-model="editEvent.uuid" />
            <input type="hidden" v-model="editEvent.selected_con" />
            <div class="event_meta">
               <input class="input text_box"  type="text" name="event_tag" v-model="editEvent.event_tag" />
            </div>
            
            <div class="form_buttons"> 
               <button type="button" class="form_button fal fa-redo-alt" @click.prevent="clear_event_form"></button>
            </div>	
            
            <div class="submission_intro ">
               <p> GameStorm is dedicated to having practically every kind of game for every kind of gamer. Events are open to signup by any registered
               member. Members are welcome to submit an event that they would like to run. </p>
            </div>
      
            <div class="rows"  >
            
               <div class="form_row">
                  <label class="label" title="This can be a unique name of the event, or the generic name of the a game" >Event Name</label>
                  <div class="input_wrapper">
                     <input class="input text_box" type="text" v-model="editEvent.event_name" @keyup="submitErrors.event_name = null" required /> 
                  </div>	
                  <span class="input_message" v-if="submitErrors.event_name" v-text="submitErrors.event_name[0]"></span> 
               </div>
               
               <div class="form_row">
                  <label class="label">Event Track</label>
                  <div class="input_wrapper">
                     <select class="input select" v-model="editEvent.event_track"  @change="() => {submitErrors.event_track = null; event_has_system();}" required >
                        <option value="" style="display: none">select event track</option>
                        
                        <option :value="track.id" v-for="track in eventTracks" v-if="track.public == 1" v-text="track.track_name"></option>
                        
                     </select>
                  </div>	
                  <span class="input_message" v-if="submitErrors.event_track" v-text="submitErrors.event_track[0]"></span> 														
               </div>               
               
               
               <div class="form_row " >
                  <div class="form_element designer_element">
                     <label class="label">GM is Designer</label>
                     <div class="input_wrapper" >
                        <span class="checkbox_wrapper fal" :class="editEvent.gm_designer? 'fa-check-square' : 'fa-square'">
                           <input class="checkbox " type="checkbox" v-model="editEvent.gm_designer"  :value="1" placeholder="GM is Designer" />
                        </span>
                     </div>
                     <span class="input_message" v-if="submitErrors.gm_designer" v-text="submitErrors.gm_designer[0]"></span> 
                  </div>
                  <div class="form_element system_element expanding_row" :class="eventHasSystem? 'show' : ''">
                     <label class="label">Game System</label>
                     <div class="input_wrapper">
                        <input class="input text_box" type="text"  v-model="editEvent.event_system"  name="event_system" /> 	
                     </div>	
                  </div>														
               </div>
               
               
               <div class="form_row event_time_row">
                  <input type="hidden"  v-model="editEvent.eventDay" />
                  <input type="hidden" v-model="editEvent.event_duration" />
                  <div class="form_element">
                     <label class="label">Event Day / Time </label>
                     <div class="input_wrapper">
                        <datetime type="datetime" v-model="editEvent.event_start_time"  min-datetime="2019-03-01" max-datetime="2019-03-03"  ></datetime> 
                     </div>
                  </div>   
                  <div class="form_element">
                     <label class="label">Event Duration</label>
                     <div class="input_wrapper">
                        <select class="select" v-model="editEvent.event_duration" required>
                           <option value="" style="display: none;">Duration</option>
                           <option value=".5">30 minutes</option>
                           <option value="1">1 Hour</option>
                           <option value="1.5">1&#189; hours </option>
                           <option value="2">2 hours</option>
                           <option value="2.5">2&#189; hours</option>
                           <option value="3">3 hours</option>
                           <option value="4">4 hours</option>
                           <option value="5">5 hours</option>
                           <option value="6">6 hours</option>
                           <option value="8">8 hours</option>
                           <option value="10">10 hours</option>
                           <option value="12">12 hours</option>
                           <option value="16">16 hours</option>
                           <option value="20">20 hours</option>
                           <option value="24">24 hours</option>
                           <option value="99">Special (as noted)</option>
                        </select>
                     </div>
                  </div>
                  <span class="footnote">If you need the event duration greater than 24 hours. use 'notes' below</span> 
                  <span class="input_message" v-if="submitErrors.event_duration">Please include a duration for the event</span>
               </div>
               
               
               <div class="form_row players">
                  <div class="form_element">
                     <label class="label">Number of Players<br/>(besides GM)</label>
                     <div class="input_wrapper">
                        <input class="text_box num_players_box" type="number" min="2" max="100" v-model="editEvent.seats"  placeholder="0"  required />
                     </div>	
                  </div>
                  <div class="form_element " >
                     <label class="label">GM is player</label>
                     
                     <div class="input_wrapper" >
                        <span class="checkbox_wrapper fal" :class="editEvent.gm_player? 'fa-check-square' : 'fa-square'">
                           <input class="checkbox " type="checkbox" v-model="editEvent.gm_player"  :value="1" placeholder="GM is Player" />
                        </span>
                     </div>
                  </div>
               </div>


               <div class="form_row">
                  <div class="form_element">
                     <label class="label">Event Type</label>
                     <div class="input_wrapper">
                        <select class="select" name="event_type" v-model="editEvent.event_type" required >												
                           <option value="" style="display: none">select event type</option>                        
                           <option :value="type.id" v-for="type in eventTypes" v-text="type.type_name"></option>                        
                        </select>
                     </div>
                     <span class="input_message" v-if="submitErrors.event_type" >Please select an Event Type</span> 
                  </div>
                  
                  <div class="form_element">
                     <label class="label">Table Shape</label>
                     <div class="input_wrapper">
                        <select class="select" name="table_requested" v-model="editEvent.table_requested" required  >
                           <option value="" style="display: none">select table shape</option>
                           <option value="none" >None</option>
                           <option value="noPref" >No Preference</option>
                           <option value="round" >Round</option>
                           <option value="square" >Square</option>
                           <option value="long" >Long</option>
                           <option value="custom" >Special (as noted below)</option>
                        </select>	
                     </div>
                     <span class="input_message" v-if="submitErrors.table_requested" >Please select a table, 'none', or 'special'</span>
                  </div>
                  
               </div>  

               <div class="form_row">                  
                  <div class="form_element">
                     <label class="label">Experience Level</label>
                     <div class="input_wrapper">
                        <select class="select" name="experience_level"  v-model="editEvent.experience_level" required  >
                           <option value="" style="display: none">select experience level</option>
                           <option value="none" >No Experience</option>
                           <option value="beginner" >Beginner</option>
                           <option value="experienced" >Experienced</option>
                           <option value="expert" >Expert</option>
                        </select>
                     </div>	
                     <span class="input_message" v-if="submitErrors.experience_level" >Please select an Experience Level</span> 
                  </div>
                  
                  <div class="form_element">  
                     <label class="label">Age Group</label>
                     <div class="input_wrapper">
                        <select class="select" name="age_category" v-model="editEvent.age_category" required  >
                           <option value="" style="display: none">select age group</option>                           
                           <option :value="age.id" v-for="age in ageGroups" v-text="age.age_text"></option>
                        </select>		
                     </div>	
                     <span class="input_message" v-if="submitErrors.age_category" >Select an age category</span> 
                  </div>
               </div>
               
               
               <div class="form_row">
                  <label class="label">Event URL</label>
                  <div class="input_wrapper">
                     <input class="text_box" type="text"  v-model="editEvent.event_url"  placeholder="http://" /> 		
                  </div>
                  <span class="input_message" v-if="submitErrors.event_url" >This URL is not valid according to dns-lookup records</span> 										
               </div>
													
               <div class="form_row">
                  <label class="label">Short Description</label>
                  <div class="input_wrapper"  required >
                     <textarea class="textarea"  placeholder="400 char max."  v-model="editEvent.short_description" maxlength = "400" required  /></textarea> 
                  </div>
                  <span class="input_message" v-if="submitErrors.short_description" v-text="submitErrors.short_description[0]" ></span> 
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
               
               <div class="controls">
                  <span class="presenter" v-text="'Event presenter: '+ user.first_name+' '+user.last_name"></span>
                  <button type="submit" class="button">Submit</button>
               </div>
               
				</div>
			</form>
         
		</div>
	</template>
	
	<script>
		import Vue from 'vue'
		import { mapGetters } from 'vuex'
		import { Datetime } from 'vue-datetime'
      import moment from 'moment'
		import 'vue-datetime/dist/vue-datetime.css'
			
		Vue.use(Datetime);
   
      export default{
         name: 'event_submission_form',
         
         data() {
            return{
               editEvent      : {},
               submitErrors   : {},
               eventHasSystem : false,
            }
         },
         
			components: {
				datetime: Datetime,
			},
         watch: {
            
         },
         
         computed: {
            ...mapGetters({
               currentCon  : 'currentCon',
					conventionInfo	: 'conventionInfo',
               eventTracks : 'eventTracks',
               eventTypes  : 'eventTypes',
               ageGroups   : 'ageGroups',
               user        : 'user',
            }),
         },
         
         created() {
            var vm = this;
            vm.get_scheduling_data();
            vm.editEvent.event_start_time = moment(vm.currentCon.event_submissions_open).format('YYYY-MM-D'); 
            vm.editEvent.event_track   = '';
            vm.editEvent.event_type    = '';
            vm.editEvent.duration      = ''; 
            vm.editEvent.age_category  = ''; 
            vm.editEvent.experience_level= '';
            vm.editEvent.table_requested= '';
            vm.editEvent.uuid = vm.user.uuid;
         },
         
         
         methods: {
            submit_event(e) {
               var vm = this;
               console.log(vm.editEvent.gm_designer);
               vm.editEvent.gm_designer? vm.editEvent.gm_designer = 1: '';
               vm.editEvent.gm_player? vm.editEvent.gm_player = 1: '';
               
               vm.$store.dispatch('submit_event', vm.editEvent).then((response) => {
                  vm.$store.dispatch('get_users_events', vm.user.uuid).then((response)=>{
                     console.log(response);
                  });
                  
                  if(response.errors) {
                     vm.submitErrors = response.errors;
                  } else {
                     vm.submitErrors = {};
                     vm.clear_event_form();
                  }
               });            
            },
            
            event_has_system() {
               var   vm = this,
                     hasSystem = false;
               switch(vm.editEvent.event_track) {
                  case 10:
                  case 14:
                  case 17:
                  case 18:
                  case 19:
                  case 20:
                  case 21:
                     hasSystem = true;
                     break;
                  default:
                     hasSystem = false;
               }
               vm.eventHasSystem = hasSystem;
               console.log(vm.editEvent.event_track);
            },
            
            clear_event_form() {
               var vm = this;
               vm.editEvent = {};
               vm.editEvent.event_track      = '';
               vm.editEvent.duration         = '';
               vm.editEvent.event_type       = '';
               vm.editEvent.age_category     = ''; 
               vm.editEvent.experience_level = '';
               vm.editEvent.table_requested  = '';
            },
            
            
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
            vm.$store.dispatch('get_scheduling_data', vm.selectedCon).then(()=>{
            });	
            // vm.get_con_events();
            // vm.get_timeblocks();
            // vm.get_event_signups();
         },
         
         
         }
      }
	
	</script>
	
	<style>
      .events_placeholder .event_submission_form {
         position: relative;
         margin-bottom: 2rem;
      }
      .events_placeholder .event_submission_form .form_buttons {
         top: -1rem;
      }
      .events_placeholder .rows {
         margin-top: 1.5rem;
      }
      .events_placeholder .title {
         display: flex;
         width: 100%;
      }
      .event_time_row {
         flex-wrap: wrap;
      }
      .event_time_row .footnote {
         text-align: center;
         justify-content: center;
      }
      .form_element {
         width: 50%;
      }
      .form_row label {
         width: 10rem;
      }
      
      .form_element.designer_element {
         width: 30%;
      }
      .form_element.system_element {
         width: 70%;
      }
      .events_placeholder .controls {
         position: relative;
      }
      .events_placeholder .presenter {
         position: absolute;
            top: 0;
            left: 0;
         margin: 1rem;
         font-weight: 100;
         font-size: 1rem;
         color: #c5c5c5;
            
      }
      
	
	</style>