
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
                           <span class="loading">Loading . . .</span>
                           
                           <div class="grid">
                              <span class="title list_title">Schedule Grid</span>
                              <div class="times">
                                 <span class="time" v-for="timeblock in get_timeblocks()" v-text="tag_time(timeblock)"></span>
                              </div>
                              
                              <div class="locations">
                                 <div class="location_list"></div>
                                 <div class="location_blocks"></div>
                              
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
            }
         },
         
         props: {            
            _selected_con: {
               type: String
            }
         },
         
         created() {
            var vm = this;
            vm.selectedCon = vm._selected_con;
         },
         watch: {
            '_selected_con': function(newVal, oldVal) {this.selectedCon = newVal},
         },
         
         computed: {
            ...mapGetters({
               conventions : 'conventions',
               eventTypes  : 'eventTypes',
               eventTracks : 'eventTracks',
               ageGroups   : 'ageGroups',
               experienceLevels: 'experienceLevels',
					currentCon	: 'currentCon',  
               allEvents   : 'allEvents',    
               
            }),
            
         },
         
         methods: {
            
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
      width: 60%;
      max-height: 50rem;
      overflow: hidden;
   }
   .scheduling_panel .box.schedule .schedule_grid .slide_in {
      position: absolute;
         top: 0;
         right: -22rem;
      width: 22rem;
      transition: right .4s;
   }
   .scheduling_panel .box.schedule .schedule_grid .slide_in.show {
      right: 0;
   }
   .scheduling_panel .box.schedule .schedule_grid .grid_wrapper {
      display: flex;
      width: 100%;
      min-height: 25rem;
      overflow: hidden;
      overflow-X: auto;
   }
   .scheduling_panel .box.schedule .schedule_grid .grid_wrapper .grid {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      width: 100%;
   }
   .scheduling_panel .box.schedule .schedule_grid .grid_wrapper .grid .title {
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
   
   .scheduling_panel .box.schedule .schedule_grid .times {
      display: flex;
      min-width: 100%;
      height: 3rem;
   }
   .scheduling_panel .box.schedule .schedule_grid .times .time {
      display: flex;
      width: 3rem;
      justify-content: flex-end;
      height: 2rem;
      line-height: 2rem;
      padding: .5rem; 
      color: var(--button2);
   }
	
   .scheduling_panel .box.schedule .schedule_grid .locations {
      display: flex;
      width: 100%;
   }
   .scheduling_panel .box.schedule .schedule_grid .location_list {
      display: flex;
      width: 5rem;
   }
   .scheduling_panel .box.schedule .schedule_grid .location_blocks {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
   }
	
   
	
	
	
   .scheduling_panel .box.schedule .schedule_list {
      display: flex;
      width: 40%;      
   }
   </style>