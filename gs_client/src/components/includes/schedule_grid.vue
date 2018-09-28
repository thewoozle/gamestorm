
   <template>
   
                     <div class="schedule_grid">
                        <div class="control_bar">
                           <button type="button" title="Show schedule settings" class="control_button fal fa-cog" @click="showScheduleControls? showScheduleControls = false : showScheduleControls = true"></button>
                          
                        </div>
                        
                        <div class="slide_in event_controls" :class="showScheduleControls? 'show' : ''">
                           <button type="button" class="close_button fal fa-times" @click="showScheduleControls? showScheduleControls = false : showScheduleControls = true"></button>
                           <div class="selects">
                           </div>
                           
                        </div>
                        
                        
                        
                        <div class="grid_wrapper"  >                        
                           <div class="box_loading" v-if="!conEvents">No Events Found</div>
                           <div class="box_loading" v-else-if="conEvents && conEvents.length < 1">Loading...</div>
                                                        
                           <div class="grid" v-else>
                              <span class="title list_title">Schedule Grid</span>
                              <div class="times">
                                 <span class="time" v-for="timeblock in get_timeblocks()" v-text="tag_time(timeblock)"></span>
                              </div>
                              
                              <div class="locations">
                                 <div class="location_list" >
                                    <span class="location" v-for="location in conLocations" v-bind:title="location.name">{{location.location_tag}}</span>
                                 </div>
                           
                                 <div class="timeblock_list" v-for="location in conLocations">
                                    <span class="time_block" v-for="timeblock in get_timeblocks()" >{{display_event(timeblock, location.location_tag) || '-'}}</span>
                                 </div>
                              
                              </div>
                           
                           </div>
                        
                        </div>
                     </div>
   
   </template>
   
   <script>
   
		import Vue from 'vue'
      import moment from 'moment'
		import { mapGetters, mapState } from 'vuex'
      
      export default {
         name : 'schedule_grid',
         
         data() {
            return{
					selectedCon		      : null,
               showScheduleControls : false,
               timeblocks           : [],  
               conLocations         : [],
            }
         },
         
         props: {            
            _selected_con: String,
            _conLocations : Array,
         },
         
         created() {
            var vm = this;
            vm.selectedCon = vm._selected_con;
         },
         watch: {
            '_selected_con': function(newVal, oldVal) {this.selectedCon = newVal},
            '_conLocations': function(newVal, oldVal) {this.conLocations = newVal},
         },
         
         computed: {
            ...mapGetters({
               conventions : 'conventions',
               eventTypes  : 'eventTypes',
               eventTracks : 'eventTracks',
               ageGroups   : 'ageGroups',
               experienceLevels: 'experienceLevels',
               conEvents   : 'conEvents',
					currentCon	: 'currentCon',  
               allEvents   : 'allEvents',    
               
            }),
            
         },
         
         methods: {
            
            display_event(timeblock, location) {
               var   vm = this,
                     displayEvent = false;
               if(vm.conEvents.length > 0) {   
                  vm.conEvents.forEach((event) => {
                     
                     
                     if(vm.sql_date_time(event.event_start_time) == vm.sql_date_time(timeblock)) {
                        if(event.event_location == location) {
                           displayEvent = event;                           
                        }
                     }
                  });
               }
               //console.log(timeblock+' / ' + location);
               return displayEvent;
            },
            
            get_timeblocks() {
               var   vm    = this,
                     timeblocks;
               
               if(vm.timeblocks.length < 1) {
                  var   times = [],
                        day   = '',
                        con   = {};
                  if(vm.conventions.length > 0) {
                     vm.conventions.forEach((convention) => {
                        convention.tag_name == vm.selectedCon? con = convention : '';
                     });
                     
                     for(var timeBlock = moment(con.start_date_time); moment(timeBlock).diff(con.end_date_time, 'hours') <=0; timeBlock.add(30, 'minutes') ) { 
                        //var _day = moment(timeBlock).format('ddd');
                        if(parseInt(timeBlock.format('HH')) >= 9 || timeBlock.format('HH') == '00') { 
                           times.push(moment(timeBlock));
                        }
                     }
                  } 
                  timeblocks = times;
               } else {
                  timeblocks = vm.timeblocks;
               }
               
               return timeblocks;   
            },
            
            
         }
      }   
         
   </script>
   
   <style>
   
   /* --------------------------------------------------------------------------------
                        SCHEDULE BOX
      --------------------------------------------------------------------------------*/
   .scheduling_panel .box.schedule .schedule_grid {
      position: relative;
      display: flex;
      width: 70%;
      max-height: 50rem;
      overflow: hidden;
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
   }
   .schedule_grid .grid_wrapper {
      display: flex;
      width: 100%;
      min-height: 25rem;
      overflow: hidden;
      overflow-X: auto;
   }
   .schedule_grid .grid_wrapper .grid {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      width: 100%;
   }
   .schedule_grid .grid_wrapper .grid .title {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      color: var(--button);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      text-align: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-weight: bold;
      line-height: 1.5em;
      padding: .5rem 0;
      height: 2em;      
   }
   
   .schedule_grid .times {
      display: flex;
      min-width: 100%;
      height: 3rem;
      padding-left: 5rem;
   }
   .schedule_grid .times .time {
      display: flex;
      width: 4rem;
      justify-content: flex-end;
      flex-wrap: nowrap;
      white-space: nowrap;
      height: 2rem;
      line-height: 2rem;
      padding: .5rem; 
      color: var(--button2);
   }
	
   .schedule_grid .locations {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-Y: auto;
      padding: 0 1rem;
   }
   .schedule_grid .location_list {
      display: flex;
         flex-wrap: wrap;
      width: 5rem;
   }
   .schedule_grid .location_list .location {
      display: flex;
      width: 5rem;
      color: black;
   }
   .schedule_grid .locations .list_item {
      display: flex;
      flex-wrap: nowrap;
      width: auto;
   }
   
   .schedule_grid .locations .time_block {
      display: flex;
      width: 4rem;
      color: red;
   }
   
   
   
	
   
	
	
   </style>