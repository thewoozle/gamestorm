
	<template>
		<div class="component" v-if="userEvents.length >0">
         <span class="title">Events I've submitted</span>
         <div class="events">
            <div class="event" v-for="event in userEvents">
               <div class="element"><span class="label">Name: </span><span class="value" v-text="event.event_name"></span></div>
               <div class="element"><span class="label">Submitted: </span><span class="value" v-text="event.submitted_on"></span></div>
               <div class="element"><span class="label">Type:</span><span class="value" v-text="event.type_name"></span></div>
               <div class="element"><span class="label">Track</span><span class="value" v-text="event.track_name"></span></div>
               <div class="element"><span class="label">System: </span><span class="value" v-text="event.event_system"></span></div>
               <div class="element"><span class="label">Description: </span><span class="value" v-text="event.short_description"></span></div>
               <div class="element"><span class="label">Seats :</span><span class="value" v-text="event.seats"></span></div>
               <div class="element"><span class="label">Experience: </span><span class="value" v-text="event.experience_level"></span></div>
               <div class="element"><span class="label">Presenter Player: </span><span class="value" v-text="event.gm_player == 1? 'Yes' : 'No'"></span></div>
               <div class="element"><span class="label">Presenter Designer: </span><span class="value" v-text="event.gm_designer == 1 ? 'Yes' : 'No'"></span></div>
               <div class="element"><span class="label">Age Category: </span><span class="value" v-text="event.age_category"></span></div>
               <div class="element"><span class="label">Table: </span><span class="value" v-text="event.table_requested"></span></div>
               <div class="element"><span class="label">Notes: </span><span class="value" v-text="event.event_notes"></span></div>
            
            </div>
         </div>
      </div>   
      <span class="events_message" v-else>No events submitted</span>
	</template>
	
	<script>
			import Vue from 'vue'
			import { mapGetters } from 'vuex'
			
			export default{
				name: 'user_events_list',
				
				data() {
					return{
					}
				},
				
				watch: {
					
				},
				
				computed: {
					...mapGetters({
						user        : 'user',
                  userEvents  : 'userEvents',
					}),
				},
				
				created() {
					var vm = this;
               vm.get_user_events();
				},
            
				methods: {
               get_user_events() {
                  var vm = this;
                  vm.$store.dispatch('get_users_events', vm.user.uuid).then((response)=>{
                     console.log(response);
                  });
                  
               },
               
				}
			}
	
	</script>
	
	<style>
   
      .event_display .component {
         display: flex;
         flex-direction:column;
         width: 100%;
      }
      .event_display .events {
         display: flex;
         width: 100%;
         flex-direction:column;
         margin: 1rem 0 0 0;
      }
      .event_display .event {
         display: flex;
         flex-wrap: wrap;
         padding: .5rem .75rem .5rem 0;
         border-top: 1px solid var(--borderColor);
      }
      .event_display .event + .event {
         margin-top: 1rem;
      }
      .event_display .element {
         display: flex;
            flex-wrap: nowrap;
         width: 100%;         
      }
      .event_display .element .label{
         display: flex;
         justify-content: flex-end;
         width: 10rem;
         padding-right: .5rem;
         text-transform: uppercase;
         font-size: .85rem;
         font-weight: 300;
      }
      .event_display .element .value {
         display: flex;
            justify-content: flex-start;
            flex-wrap: nowrap;
         white-space: nowrap;   
         text-overflow: ellipsis;
         overflow: hidden;
         padding: 0 0 0 .5rem;
         width: calc(100% - 10rem);
         letter-spacing: .05em;
      }
      .event_display .events_message {
         display: flex;
         justify-content: center;
         width: 100%;
         color: #777;
         margin: 1rem 0;
      }
      .event_display .element {
         
      }
      .event_display .element {
         
      }
      .event_display .element {
         
      }
      .event_display .element {
         
      }
	
	</style>
   
   