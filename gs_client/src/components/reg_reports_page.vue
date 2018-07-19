
	<template>
		<div id="reg_reports">
			<div class="sections">      
            <pre>
               REG REPORTS
               [ select convention or current con ]
               reg report slide-in 
               lists menu:
                  [list by name (filter location, attendance, age, price, reg date, ), badge, staff, guest GM (elegable/accepted), contact, volunteer, GM interest, industry guest, transaction, ]
            </pre>
            
            
					<!-- REG REPORT SLIDE-IN -->
					<div class="slide_in reg_report" :class="showRegreport? 'show' : ''">
               <pre>REG REPORT</pre>
               </div>
            <section class="section reg_lists">
            
            </section>
         </div>
      </div>
	</template>
	
	
	
	<script>
		import {apiDomain} from '../config';
		import { mapGetters} from 'vuex';
		export default{
			name: 'reg_reports',
			
			
			data() {
				return {
					
				}
			},
			
			
			watch: {
				
            
				
			},
			
			components: {
			},
			
			
			computed: {
			...mapGetters({
               conventionInfo	: 'conventionInfo',
               user		   	: 'user',
               statesList		: 'states',
               conventions		: 'conventions',
               members			: 'members',
               memberTypes		: 'memberTypes',
               departments		: 'departments',
               staffPositions	: 'staffPositions',
				
            }),
			},
			
			created() {
				
				
			},
			
			
			mounted: function() {
				
			},
			
			
			methods: {
				
			}
			
		}
	</script>
	
	
	<style>
	
	</style>