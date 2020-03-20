
	<template>
		<div id="reg_reports">
			<div class="sections"> 
            
            
				<section class="section reg_reports" >
					<div class="slide_in reg_report" :class="showRegReport? 'show' : ''">
                  <button class="close_button fal fa-times" type="button" @click.prevent="showRegReport? showRegReport = false : showRegReport=true" ></button>
					
                  <span class="section_title">REG REPORTS</span>
                  <div class="report_content">
                  
                     <div class="report_element">
                        <span class="element_title">FILTER BY STATE</span>
                        <div class="report_row" v-for="state in memberFilter('state')" >{{state.name}} - {{state.num}}</div>
                     </div>
                     
                     
               
                     <div class="report_element">
                        <span class="element_title">FILTER BY PRICE POINT</span>
                        
                        <p  class="report_row" v-for="(item, key) in regReport.price_points" >${{key}} - {{item}}</p>
                        <p  class="report_row">Average Membership Purchase: {{average_membership_price(regReport.price_points)}}</p>
                     </div>
                     
               
               
               
                     <div class="report_element">
                        <span class="element_title">REG  REPORT</span>
               
                        <span class="text">Number of Registered Members</span>
                        <span class="value" v-text="regReport.registeredMembers || '-'"></span><br />    
                        
                        <div  class="report_row" v-for="(item, key) in regReports.regReport">
                           <span class="item key" v-text="key"></span> <span class="item value" v-text="item"></span>
                        </div>
                     </div>
                     
                  </div>
               
               </div>
               
               <div class="report_wrapper">
                  <div class="buttons">
                     <button type="button" class="button" @click="showReport = 'regReport'" :title="conventionInfo.short_name+' Reg. Report'">Registration Report</button>
                     <button type="button" class="button" @click="showReport = 'volunteers'" :title="conventionInfo.short_name+' members that checked VOLUNTEER INTEREST'">Volunteers</button>
                  </div>
               
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
            
               
                  <p>----------------------------------------------------------------------------------------------</p>
                  <p>GUEST GMs REPORT</p>
                  <p style= "color: white">{{(regReports.guestGm.length)+1}}</p>
                  <p style="color: white" v-for="person in regReports.guestGm">{{person.first_name+' '+person.last_name}} - {{person.email}}</p>
                  
                               
                  
                  <p>----------------------------------------------------------------------------------------------</p>
                  <p>STAFF  REPORT</p>
                  <p style= "color: white">{{(regReports.staffList.length)+1}}</p>
                  <p style="color: white" v-for="person in regReports.staffList">{{person.department_name+' - ' +person.first_name+' '+person.last_name}} - {{person.email}}</p>
                  
                  <p>----------------------------------------------------------------------------------------------</p>
                  <p>GM INTEREST REPORT</p>
                  <p style="color: white" v-for="person in regReports.gmInterest">{{person.email}}</p>
                  
                  <p>----------------------------------------------------------------------------------------------</p>
                  <p>VOLUNTEERS INTEREST REPORT</p>
                  <p style="color: white" v-for="person in regReports.volunteers">{{person.email}}</p>
                  
                  <p>----------------------------------------------------------------------------------------------</p>
                  <p>DEALERS REPORT</p>
                  <p style="color: white; flex-wrap: nowrap;" v-for="person in regReports.dealers"><span style="display: flex" v-text="person.first_name+' '+person.last_name"></span><span style="display: flex" v-if="person.notes"  v-text="', '+person.notes"></span></p>
               
               
                  <p>----------------------------------------------------------------------------------------------</p>
                  <p>INDUSTRY GUESTS REPORT</p>
                  <p style="color: white; flex-wrap: nowrap;" v-for="person in regReports.industryGuests"><span style="display: flex" v-text="person.first_name+' '+person.last_name"></span><span style="display: flex" v-if="person.notes"  v-text="', '+person.notes"></span></p>
               
               
                  </div>
               </div>
               
            </section> 
         </div>
      </div>
	</template>
	
	
	
	<script>
		import {apiDomain} from '../config';
		import { mapState,mapGetters} from 'vuex';
		export default{
			name: 'reg_reports_page',
			
			
			data() {
				return {
               showRegReport        : false,
               showRegReportSettings: false,   
               showReport           : 'regReport',
				}
			},
			
			
			watch: {
				
            
				
			},
			
			components: {
			},
         
         
			
			computed: {
         ...mapState({
               conventionInfo	   : 'conventionInfo',
					regReport         : 'regReport',
               regReports        : 'regReports',
               memberTypes		   : 'memberTypes',
               departments		   : 'departments',
               staffPositions	   : 'staffPositions',	
            
         }),   
			...mapGetters({
               user		   	   : 'user',
               conventions		   : 'conventions',
               members			   : 'members',
            }),
            
			},
			
			created() {
				
				
			},
			
			
			mounted: function() {
				
			},
			
			
			methods: {
				
            // FILTER BY STATE
            memberFilter: function(filter)  {
               var   vm = this,
                     inState = false,
                     states = [];
               vm.members.forEach((member)=>{
                  if(member.con_status) {
                     //check to see if state is in array and wither ++ or append
                     
                     states.forEach((state)=>{
                        //console.log(member.state);
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
            },
            
            average_membership_price(pricePoints) {
               var   vm = this,
                     numMemberships = 0,
                     totalPrice     = 0,
                     avgPrice       = 0;
               Object.entries(pricePoints).forEach((item)=> {  
                  numMemberships += item[1];
                  totalPrice += (parseInt(item[0]) * parseInt(item[1]));
               });
               
               return ('$'+(totalPrice / numMemberships).toFixed(2));
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
         #reg_reports {
            height: 100%;
         }
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
            height: calc(100% - 1rem);
            flex-direction: column;
            overflow: hidden;
            overflow-y: auto;
            min-height: 20rem;
            transition: left .3s;
            border: solid 1px var(--borderColor2);
            background: rgba(30,30,30,.95);
            border-radius: .15rem;
         }
         .section.reg_reports .slide_in.show {
            left: .5rem;
         }
         
         .section.reg_reports .report_content {
            flex-wrap: wrap;
            padding: 1rem 5vw;
         }
         .section.reg_reports .report_wrapper {
            display: flex;
            width: 100%;
            min-height: 30rem;
            overflow: hidden;
            overflow-y: auto;
            border-radius: var(--borderRadius);
            background: #2a2b2d;
            box-shadow: var(--blackBoxShadow);            
         }
         .section.reg_reports .report_wrapper .buttons {
            flex-direction: column;
         }
         .section.reg_reports .report_wrapper .buttons .button {
            height: 4rem;
            display: flex;
            align-items: center;
         }
         .section.reg_reports .report_wrapper .buttons .button + .button {
            border-top: solid 1px var(--mainColor);
         }
         
         .section.reg_reports .reg_lists {
            display: flex;
            flex-direction: column;
         }
         .section.reg_reports .element_title {
            font-size: 1.2em;
            font-weight: bold;
            width: 100%;
            margin: .5rem 1rem;
         }
         .section.reg_reports .report_element {
            width: 100%;
            flex-wrap: wrap;
         }
         .section.reg_reports .report_element + .report_element {
            margin-top: 2rem;
            border-top: solid 2px var(--glowColor);
         }
         .section.reg_reports .report_row {
            width: 100%;
            flex-wrap: nowrap;
         }
         .section.reg_reports .report_row .item {
            width: 12rem;
         }
         
	</style>
   
   