
	<template>
		<div id="membership_page">
         <span class="title page_title">MEMBERSHIP PAGE</span>
      
         <div class="sections">
            <section class="section membership_intro ">
               <div class="section_content">
                  <p>Four day membership for GameStorm 22.  This membership will grant you access to the entire convention on March 28th thru March 31st.</p>
               </div>               
            </section>
            
            <section class="section membership_pricing ">
               <span class="section_title"><span class="text">Pricing</span></span>
               <p>The Adult and Young-Adult (15-17) membership price is discounted for pre-registered memberships, depending on how early a membership is purchased. 
                  Child memberships (6-14) are not discounted. There is no cap on the number 
                  of memberships so it will always be possible to purchase memberships at teh door.</p>
               
               <div class="price_options"> 
                  <span class="price_option"><span class="text">Children 5 and under:</span><span class="price">free</span></span> 
                  <span class="price_option"><span class="text">Children 6-14 :</span><span class="price">$25</span></span>
                  <span class="price_option"><span class="text">Adults and Young Adults(15-17):</span><span class="price"> $80</span> </span>
                  <span class="price_title">Discounted Adult and Young Adult(15-17) pre-registration prices</span>
                  
                  <p> VALID UNTIL PRE_REG CLOSES on {{day_date(currentCon.prereg_close)}}</p>
                  
                  <span class="price_option option_breakdown" 
                        v-for="priceBreak in currentCon.price_breaks" 
                        v-if="before_date(priceBreak.stopDate)"
                  >
                  
                     <span class="text" v-text="day_date(priceBreak.startDate)+' - ' + day_date(priceBreak.stopDate)+ ' :'"></span>
                     <span class="price" v-text="'$' +priceBreak.price"></span>                        
                  </span>
                  
                  
                  
                  <span class="price_title"><span class="text">Single Day Prices</span></span>
                  <p>Single-day memberships are only available at the convention. </p>
                  <span class="price_option"><span class="text">Thursday:</span><span class="price"> $30</span></span> 
                  <span class="price_option"><span class="text">Friday:</span><span class="price"> $45</span></span> 
                  <span class="price_option"><span class="text">Saturday:</span><span class="price"> $45</span></span> 
                  <span class="price_option"><span class="text">Sunday:</span><span class="price"> $30</span></span> 

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
      width: 100%;
      max-width: 30rem;
      margin: 0 auto;
   }
   .price_options .price_title {
      display: flex;
      width: 100%;
      margin-top: .5rem;
      font-weight: bold;
   }
   .price_options .price_option {
      display: flex;
      justify-content: space-between;
      width: 100%;
   }
   .price_options .option_breakdown {
      display: flex;
   }
   .price_options .price_option
   .option_breakdown .text{
      justify-content: center;
   }
   .price_options .price_option .text {
      display: flex;
      justify-content: flex-end;
      min-width: 60%;      
   }
   .price_options .price_option .price{
      display: flex;
   }
   .price_options p {
      display: flex;
      width: 100%;
      font-weight: 100;
      font-size: .8rem;
      margin-top: .1rem;
      padding: 0 2rem;
      font-style: italic;
      color: var(--altColor);
   }
   
	
	</style>