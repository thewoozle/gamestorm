
	<template>
		<div class="component">
         <span class="page_title">At-Con Membership Purchase</span>
      
         <pre style="display: flex; width: 100%;">
            start new order button
          
            an order includes multiple memberships with a single purchase
          
            show list of members on the left with control buttons and 'add member' button 
            
            main section has membership form with save button 
            check email address
            include parental info
            
            have setting for 'next year' memberships 
            
            on submit, update membership info and select paypal payment or inperson payment 
            
            print 3 receipts
            - blank receipts for inperson payments
            
            laptop size screen
         </pre>
         
         <div class="sections">
            <section class="section section_class">
               <span class="section_title"></span>
               
               <div class="section_content"></div>
            
            </section>
            
            
         </div>   
		
		</div>
	</template>
	
	<script>
      import Vue from 'vue'
      import { mapState, mapGetters } from 'vuex'
		import Router from 'vue-router'
			
		Vue.use(Router);
      
      export default{
         name: 'at_con_purchase_page',
         
         data() {
            return{
            
            }
         },
         
         watch: {
            
         },
         
         computed: {
            ...mapGetters({
               
            }),
            ...mapState({
               
            }),
         },
         
         created() {
            
         },
         methods: {
            
         }
		}
	
	</script>
   
	
	<style>
	
	</style>