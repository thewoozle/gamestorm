
	<template>
		<div class="component">
		<span class="title">Events I've submitted</span>
      <div class="event" v-for="event in userEvents">
         <div class="element"><span class="label">Updated: </span><span class="value" v-text="event.updated_at"></span></div>
         <div class="element"><span class="label">Type:</span><span class="value" v-text="event.event_type"></span></div>
         <div class="element"><span class="label">Track</span><span class="value" v-text="event.event_track"></span></div>
         <div class="element"><span class="label">Name: </span><span class="value" v-text="event.event_name"></span></div>
         <div class="element"><span class="label">System: </span><span class="value" v-text="event.event_system"></span></div>
         <div class="element"><span class="label">Description: </span><span class="value" v-text="event.short_description"></span></div>
         <div class="element"><span class="label">Seats :</span><span class="value" v-text="event.seats"></span></div>
         <div class="element"><span class="label">Experience: </span><span class="value" v-text="event.experience_level"></span></div>
         <div class="element"><span class="label">Presenter Player: </span><span class="value" v-text="event.gm_player"></span></div>
         <div class="element"><span class="label">Presenter Designer: </span><span class="value" v-text="event.gm_designer"></span></div>
         <div class="element"><span class="label">Age Category: </span><span class="value" v-text="event.age_category"></span></div>
         <div class="element"><span class="label">Table: </span><span class="value" v-text="event.table_requested"></span></div>
         <div class="element"><span class="label">Notes: </span><span class="value" v-text="event.event_notes"></span></div>
      
      </div>
		</div>
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
      .event_display .event {
         display: flex;
         flex-wrap: wrap;
      }
      .event_display .event + .event {
         
      }
      .event_display .element {
         
      }
      .event_display .element {
         
      }
      .event_display .element {
         
      }
      .event_display .element {
         
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
   
   