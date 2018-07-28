
	<template>
		<div id="reg_reports">
			<div class="sections"> 
            
            
				<section class="section reg_reports" >
					<div class="slide_in reg_report" :class="showRegReport? 'show' : ''">
                  <button class="close_button fal fa-times" type="button" @click.prevent="showRegReport? showRegReport = false : showRegReport=true" ></button>
					
               <pre>REG REPORT</pre>
               </div>
               
               <div class="report_wrapper">
                  <div class="control_bar">					
                     <button class="control_button fal fa-cog" type="button" @click.prevent="showRegReportSettings? showRegReportSettings = false : showRegReportSettings = true" title="Show Reg. settings"  ></button>
                     <button class="control_button fal fa-file-alt"   type="button" @click="showRegReport? showRegReport = false : showRegReport=true" title="Show registration report" ></button>
                  </div>
                  
                  <div class="reg_lists">
            <pre>
                     [ REG LISTS ]     
               [ select convention or current con ]
               lists menu:
                  [list by name (filter location, attendance, age, price, reg date, ), badge, staff, guest GM (elegable/accepted), contact, volunteer, GM interest, industry guest, transaction, ]
            </pre>
            
            
						<span class="text">Number of Registered Members</span>
						<span class="value" v-text="regReport.registeredMembers || '-'"></span>
                  </div>
               </div>
            </section>   
         </div>
      </div>
	</template>
	
	
	
	<script>
		import {apiDomain} from '../config';
		import { mapGetters} from 'vuex';
		export default{
			name: 'reg_reports_page',
			
			
			data() {
				return {
               showRegReport        : false,
               showRegReportSettings: false,   
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
               conventions		: 'conventions',
               members			: 'members',
               memberTypes		: 'memberTypes',
               departments		: 'departments',
               staffPositions	: 'staffPositions',				
					regReport      : 'regReport',
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
      /* -----------------------------------------------------------------
                        REGISTRATION REPORTS 
         ----------------------------------------------------------------- */
         #reg_reports .sections {
            justify-content: center;
         }
         .section.reg_reports {
            max-width: 80rem;
            overflow: hidden;
            position: relative;
         }
         .section.reg_reports .slide_in {
            position: absolute;
               left: 100%;
               top: .5rem;
               z-index: 25;
            width: calc(100% - 1rem);
            min-height: 20rem;
            transition: left .3s;
            border: solid 1px var(--borderColor2);
            background: rgba(30,30,30,.95);
            border-radius: .15rem;
         }
         .section.reg_reports .slide_in.show {
            left: .5rem;
         }
         .section.reg_reports .report_wrapper {
            display: flex;
            width: 100%;
            min-height: 20rem;
            border-radius: var(--borderRadius);
            background: #2a2b2d;
            box-shadow: var(--blackBoxShadow);
            
         }
         
         .section.reg_reports {
            
         }
         
	</style>
   
   