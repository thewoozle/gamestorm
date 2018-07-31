
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
            
            <div class="">
               <span>FILTER BY STATE</span>
               <div v-for="state in memberFilter('state')" >{{state.name}} - {{state.num}}</div>
            </div>
            
            
						<span class="text">Number of Registered Members</span>
						<span class="value" v-text="regReport.registeredMembers || '-'"></span>                  
               {{regReport}}
               <p style="color: white" v-for="(item, key) in regReport">{{key}} - {{item}}</p>
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
				
            memberFilter: function(filter)  {
               var   vm = this,
                     inState = false,
                     states = [];
               vm.members.forEach((member)=>{
                  if(member.con_status) {
                     //check to see if state is in array and wither ++ or append
                     states.forEach((state)=>{
                        if(state.name == member.state) {
                           state.num ++;
                           inState = true;
                        }
                     });   
                     inState? '' : states.push({"name": member.state, 'num' : 1});
                         
                     inState = false;
                  }   
               });
               return states;
            }
            
			},
         
         errorCaptured(err, component, info) {
            console.log('error: ', err);
            console.log('component: ',component);
            console.log('info: ',info);
            return false;
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
   
   