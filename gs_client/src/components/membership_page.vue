
	<template>
		<div id="membership_page">
         <span class="page_title">MEMBERSHIP PAGE</span>
      
         <div class="sections">
            <section class="section membership_intro ">
               <span class="section_title"><span class="text">Intro</span></span>
               
               <div class="section_content">
                  <p>Four day membership for GameStorm 22.  This membership will grant you access to the entire convention on March 28th thru March 31st.</p>
               </div>               
            </section>
            
            <section class="section membership_pricing ">
               <span class="section_title"><span class="text">Pricing</span></span>
               
               <div class="price_options">
                  <span class="price_title">Discounted pre-registration prices</span>
               
                  <span class="price_option" 
                        v-for="priceBreak in priceBreaks" 
                        v-if="before_date(priceBreak.stopDate)" 
                        v-text="day_date(priceBreak.startDate)+' - ' + day_date(priceBreak.stopDate)+ ' : $' +priceBreak.price">
                  </span>
                  <pre>two columns with clarification in light font</pre>
                  <span class="price_title">At-Con Prices</span>
                  <span class="price_option">Adults and children 15-17: $80</span> 
                  <span class="price_option">Children 6-14 : $25</span> 
                  <span class="price_option">Memberships for children 5 and under are free</span> 
                  <span class="price_title">Single Day Prices</span>
                  <span class="price_option">Thursday: $30</span> 
                  <span class="price_option">Friday: $45</span> 
                  <span class="price_option">Saturday: $45</span> 
                  <span class="price_option">Sunday: $30</span> 

               </div>   
               



               <div class="section_content">
               
               </div>
            </section>
            
            
            
            
            <section class="section membership_purchase">
               <span class="section_title"><span class="text">Purchase Memberships</span></span>
               
               <div class="section_content">
                  <div class="column">
                     <pre>list membership options with +/- counters (update entries for each as added or removed)</pre>
                     
                     <pre>div for each entry showing type and name with expand control for details and icon for doneness </pre>
                  </div>
                  
                  
                  <div class="column">
                  <pre>show memberships purchased</pre>
                  
                  </div>
               </div>               
            </section>
            
            
            
            <section class="section membership_policies ">
               <span class="section_title"><span class="text">Policies</span></span>
               
               <div class="section_content">
               
               </div>
            </section>
            
            
            <section class="section membership_links ">
               <span class="section_title"><span class="text">Links</span></span>
               
               <div class="section_content">
               
               </div>
            </section>
                  <pre>Intro, Price breakdown, policies, code of conduct, waivers, </pre>
                  
                  <pre>
                  Memberships may be transferred or refunded prior to the beginning of the convention. Refunds after that date are at the discretion of the chair. Please see our Membership Refund and Transfer policy for details.
            All memberships are subject to the Code of Conduct.  Memberships for children are subject to the Children Policy and will require a waiver (15 and over or under 15).  Ages are presumed to be the age at the time of the convention.

            GameStorm is a membership event and membership badges must be worn at all times by all members and staff. A badge is only valid for the individual to whom it was issued. Badges may not be shared. GameStorm requires that all individuals  have membership badges for the convention, and that they be clearly visible when at GameStorm.

            Contact Registration with any questions.
                  </pre>
                  
         </div>
      
      </div>
	
	</template>
	
	
	
	<script>
		import {apiDomain} from '../config';
		import { mapState} from 'vuex';
		export default{
			name: 'membership_page',
			
			
			data() {
				return {
               priceBreaks    : [
                  {'startDate': '2019-03-01', 'stopDate' : '2019-05-12','price': '35.00'}, 
                  {'startDate': '2019-05-13', 'stopDate' : '2019-07-28','price': '45.00'}, 
                  {'startDate': '2019-07-29', 'stopDate' : '2019-10-27','price': '55.00'}, 
                  {'startDate': '2019-10-28', 'stopDate' : '2019-12-31','price': '65.00'}, 
                  {'startDate': '2020-01-01', 'stopDate' : '2020-03-01','price': '70.00'}, 
               ],
            }
			},
			
			
			watch: {
				
				
			},
			
			components: {
				
			},
			
			
			computed: {
			...mapState({
               currentCon  : 'currentCon',
				
         }),
			},
			
			created() {
				console.log(this.priceBreaks);
				
			},
			
			
			mounted: function() {
				
			},
			
			
			methods: {
				
			}
			
		}
	</script>
	
	
	<style>
   
   .price_options {
      display: flex;
      flex-direction: column;
   }
   .price_options .price_title {
      display: flex;
      width: 100%;
      font-weight: bold;
   }
   .price_options .privce_option {
      display: flex;
      width: 100%;
   }
	
	</style>