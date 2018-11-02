
   <template>
      <div class="grid_wrapper"  >
         <span class="fake_slider grid_slider" @scroll="grid_scroll"><span class="content" ref="grid_scroll" :style="{'width': grid_width()+'px'}" ></span></span>                        
         <div class="box_loading" v-if="!conEvents">No Events Found</div>
         <div class="box_loading" v-else-if="conEvents && conEvents.length < 1">Loading...</div>
            
         
         <div class="grid" v-else ref="grid">
            <span class="title list_title">Schedule Grid</span>
            <div class="times">
               <div class="time_wrapper" v-for="timeblock in get_timeblocks()" >
                  <span class="time"v-text="tag_time(timeblock)"></span>
                  <span class="day" v-text="tag_day(timeblock)"></span>
               </div>
            </div>
            
            <div class="locations" v-html="create_locations()"> </div>
            
            <span class="fake_slider location_slider"><span class="content"></span></span>
            
           
         
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
               timeblocks           : [],  
               gridSCroll           : 0,
            }
         },
         
         props: {            
            _selected_con: String,
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
               conEvents   : 'conEvents',
					currentCon	: 'currentCon',  
               conLocations: 'conLocations',
               allEvents   : 'allEvents',    
               
            }),
            
         },
         
         methods: {
            
            grid_width() {
               if(this.$refs.grid) {
                  return this.$refs.grid.clientWidth;
               }
            },
            
            grid_scroll() {
               var vm = this;
               
               console.log(vm.$refs);
               vm.gridSCroll = 0;
               
            },
            
            create_locations() {
               var   vm          = this,
                     locations   = '<div>',
                     timeblocks  = vm.get_timeblocks(),
                     parent      = null;
                     
                  vm.conLocations.forEach((location) => {
                     if(!location.location_parent) {
                        locations += '</div><div class="location_title">'+location.location_name+'</div><div class="accordion">';
                     } 
                     
                        vm.conLocations.forEach((location2) => {
                           if (location2.location_parent == location.id) {
                              locations += '<div class="location">';
                              locations += '<span class="location_name">'+location2.location_tag.replace(/_/gi, ' ')+'</span>';
                              
                              //console.log(location2.location_parent +' - '+location.id);
                              //console.log(timeblocks.length);
                              timeblocks.forEach((timeblock) => {
                                 var conEvent = ' - ';
                                 if(vm.conEvents.length > 0) {   
                                    vm.conEvents.forEach((event) => {
                                       
                                       
                                       if(vm.sql_date_time(event.event_start_time) == vm.sql_date_time(timeblock)) {
                                          if(event.event_location == location) {
                                             conEvent = event;
                                          }
                                       }
                                    });
                                 }
                                 locations+= '<span class="time_block" >'+ conEvent +'</span>';
                                 
                              });
                              locations += '</div>';
                           }
                        });
                    
                     
                  });
               
               
               return locations;
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
      padding: 0 0 0 5rem;
   }
   .schedule_grid .times .time_wrapper {
      display: flex;
      position: relative;
         align-items: flex-end;
      width: 4rem;
      height: 100%;
   }
   
   .schedule_grid .times .time {
      display: flex;
         justify-content: flex-end;
         flex-wrap: nowrap;
      white-space: nowrap;
      height: 1rem;
      width: 100%;
      padding: 0 .5rem; 
      line-height: 1rem;
      font-size: .9rem;
      color: var(--button2);
   }
   .schedule_grid .times .day {
      position: absolute;
         top: 1rem; 
         left: 0;
      width: 500%;
      padding: 0 0 0 1rem;
      color: #d5d5d5;
      text-transform: uppercase;
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
   .schedule_grid .location_title {
      display: flex;
      width: 100%;
      color: var(--titleColor);
   }
   
   .schedule_grid .accordion {
      display: flex;
      flex-wrap: wrap;
      width: auto;
   }
   .schedule_grid .accordion .location {
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;
      width: 100%;
   }
   .schedule_grid .accordion .location_name {
      display: flex;
      justify-content: flex-end;
      text-align: right;
      padding: 0 .5rem 0 0;
      width: 5rem;
      color: var(--contrastColor);
   }
   .schedule_grid .locations .accordion .time_block {
      display: flex;
      width: 4rem;
      color: red;
   }
   
   .fake_slider.grid_slider {
         top: 3rem;
         height: 1rem;
      left: 0;
      width: 100%;
   }
   .fake_slider.grid_slider .content {
   }
   
   
   
	
   
	
	
   </style>