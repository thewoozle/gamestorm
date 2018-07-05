
	<template>

		<div id="scheduling_control_panel" >	
			<div class="mini_report ">
			
				<div class="report_widget event_breakdown">
					<div class="elements"  v-if="conEvents && conEvents.length >0">
                  <span class="widget_title">Events Breakdown {{currentCon.short_name? currentCon.short_name : ''  }}</span>
						<div class="info_wrapper">
							<div class="info_element">
								<div class="info_item">
									<span class="name">Total Events</span>
									<span class="value"  v-text="conEvents.length || 0 "></span>
								</div>
							</div>
							
							<div class="info_element summary">
								<div class="info_item">
									<span class="name">Waiting Approval</span>
									<span class="value"  v-text="eventReport.waitingApproval || 0" ></span>
								</div>
							</div>	
							<div class="info_element summary">
							
								<div class="info_item">
									<span class="name">Pending Assignment</span>
									<span class="value"  v-text="eventReport.pendingAssignment || 0" ></span>
								</div>
							</div>	
							<div class="info_element summary">
								<div class="info_item">
									<span class="name">Approved</span>
									<span class="value"  v-text="eventReport.approved || 0" ></span>
								</div>
							</div>	
							<div class="info_element summary">
								<div class="info_item">
									<span class="name">Assigned</span>
									<span class="value"  v-text="eventReport.assigned || 0" ></span>
								</div>
							</div>	
							<div class="controls"></div>
							</div>	
					</div>
					<div  v-else class="info">
						<span class="widget_title">No Events listed for {{currentCon.short_name}}</span>
					</div>	
				</div>					
				
				<div class="report_widget event_dates">
					<span class="widget_title">{{currentCon.short_name}} Scheduling Deadlines</span>
					
					<div class="elements"  v-if="currentCon">
						<div class="info_wrapper">
							<div class="info_element">
								<div class="info_item">
									<span class="name">Submissions Open</span>
									<span class="date"  v-text="month_day_year(currentCon.event_submissions_open)"></span>
								</div>
							</div>
							<div class="info_element">
								<div class="info_item">
									<span class="name">Submissions Close</span>
									<span class="date"  v-text="month_day_year(currentCon.event_submissions_close)"></span>
								</div>
							</div>
							<div class="info_element">
								<div class="info_item">
									<span class="name">Signups Open</span>
									<span class="date"  v-text="month_day_year(currentCon.signups_open)"></span>
								</div>
							</div>
							<div class="info_element">
								<div class="info_item">
									<span class="name">Signups Close</span>
									<span class="date"  v-text="month_day_year(currentCon.signups_close)"></span>
								</div>
							</div>
							
					
						</div>
					</div>
					<div class="controls"></div>
					
					
				</div>
			</div>	
				
		
		
			<div class="slideout scheduling_settings" :class="showSchedulingSettings? 'show' : '' ">
				<span class="title" >Scheduling settings for {{currentCon.short_name || 'new convention'}} </span>
				<div class="control_bar">
					<button type="button"  class="control_button fal fa-times"@click.prevent="showSchedulingSettings = false" ></button>	
					<button type="button" title="Clear scheduling form" class="control_button fal fa-redo-alt" @click="convention = {}"></button>
				</div>
				
				<div class="section_content">
				
				</div>
			</div>	
		
		
		
		
		
			
		</div>
	</template>				


		<script>
			import Vue from 'vue'
			import { mapGetters } from 'vuex'
			
			export default {
				name: 'scheduling_control_panel',
				
				data() {
					return {						
						eventReport				: {},
						showSchedulingSettings	: false,
					}
				},	
				computed: {
					...mapGetters({
					user        : 'user',
					conEvents   : 'conEvents',
					currentCon  : 'currentCon',
					}),
					
				},
				
				mounted: function() {
					var vm = this;
					vm.get_events_report();
					
				},
			
			
				methods: {
					update_convention() {
						
						console.log('UPDATE CONVENTION FUNCTION NEEDED');
					},
						
					get_events_report() {
						var vm = this;
						
						vm.eventReport.rejected 		=0;
						vm.eventReport.cancelled 		=0;
						vm.eventReport.waitingApproval	=0;
						vm.eventReport.approved 		=0;
						vm.eventReport.scheduled 		=0;
						vm.eventReport.pendingAssignment=0;
						vm.eventReport.hasTable 		=0;
						vm.eventReport.assigned 		=0;
						
						if(vm.conEvents && vm.conEvents.length > 0) {
							vm.conEvents.forEach(function(thisEvent){
								/*	event status: 	0 = unapproved, 20 = approved, 
													30 = pendingAssignment , 31 = scheduled, 32 = has Location,   
													40 = assigned, 90 = rejected, 91 = canceled
								*/
								switch(thisEvent.status) {									
									case 20: 
										vm.eventReport.approved ++;
										break;
										
									case 30: 
										vm.eventReport.pendingAssignment ++;
										break;
										
									case 31: 
										vm.eventReport.scheduled ++;
										break;
										
									case 32: 
										vm.eventReport.hasTable ++;
										break;
										
									case 40: 
										vm.eventReport.assigned ++;
										break;
									
									case 90: 
										vm.eventReport.rejected ++;
										break;
										
									case 91: 
										vm.eventReport.cancelled ++;
										break;
										
									default: 
										vm.eventReport.unapproved ++;
								}
								
							});
						}	
					},
			
					
				},
				
			}
		
		</script>
		
		
		<style scoped>
		
		
			.scheduling_report .report_widget  {
				width: 48%;
			}
			.scheduling_report .info_item  {
				width: 48%;
			}
			
			
			
			
	
		
		</style>
		
		