
	<template>
		<div class="component" id="at_con_page">
         <span class="page_title">At-Con Membership Purchase</span>
         
         <div class="call_to_action">
            <p class="intro">Onscreen membership purchase. You may purchase up to ten memberships by selecting an existing member or creating a new membership. 
               The membership purchase may be handled directly through paypal or payed in person at the registration desk. 
            </p>
            <button class="button start_purchase_button" v-if="!membershipPurchase" @click.prevent="create_new_membership_purchase()" >Start new membership purchase</button>
         </div>
      
         
         <div class="sections at_con_purchase" v-if="membershipPurchase">
         
            <button class="close_button" @click.prevent="membershipPurchase=null" >Cancel order</button>
            
            <section class="section glance">
               <span class="section_title">Glance</span>
               
               <div class="section_content">
               
                  <span class="transaction_number" v-text="'Transaction Number: '+membershipPurchase.transactionNumber"></span>
                  
                  <div class="memberships">
                  {{membershipPurchase}}
                  </div>
               </div>
            
            </section>
            
            <section class="section purchase_form">
               <span class="section_title">Membership Purchase</span>
                              
               <div class="section_content">
                  
                  <div class="member_wrapper"  v-for="member in membershipPurchase " >
                  
                     <div class="header">
                        <span class="member_title title" :class="member.first_name && member.last_name? 'show' : ''" v-text="member.first_name+' '+member.last_name"></span>
                        
                        <button class="header_button expand_button fal" 
                           :class="member.open? 'fa-arrow-alt-square-up' : 'fa-arrow-alt-square-down'" 
                           @click.prevent="open_close_member(member.index)"
                        ></button>
                        
                        <button class="header_button remove fal fa-times-square" title="remove member" ></button>
                     </div>   
                     
                     <at_con_member_form :account="member" class="member" :class="member.open? 'open' : ''"  v-on:accountUpdate = "update_members" />
                     
                  </div>
                  
                  <button class="add_member_button button" @click="add_member_to_purchase()">Add Member</button>
               </div>
            
            </section>
            
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
         
         </div>   
		
		</div>
	</template>
	
	<script>
      import Vue from 'vue'
      import { mapState, mapGetters } from 'vuex'
		import Router from 'vue-router'
		import at_con_member_form from '@/components/includes/at_con_member_form'
			
		Vue.use(Router);
      
      export default{
         name: 'at_con_purchase_page',
         
         data() {
            return{
               membershipPurchase   : null,
               
            }
         },
			components: {
				'at_con_member_form' : at_con_member_form, 
			},
         
         watch: {
            
         },
         
         computed: {
            ...mapState({
               transactions   : 'transactions',
               lastTransaction: 'lastTransaction',
            }),
         },
         
         created() {
            var vm = this;
            
            vm.$store.dispatch('get_transactions').then(()=>{});
         },
         methods: {
            create_new_membership_purchase() {
               var vm = this;
               vm.membershipPurchase = [];
               vm.membershipPurchase.transactionNumber = parseInt(vm.lastTransaction)+1;
               
            },
            
            add_member_to_purchase() {
               var vm = this;
               let member = {open: true, index: vm.membershipPurchase.length};
               vm.membershipPurchase.push(member); 
            },
            
            open_close_member(index) {
               var vm = this;
               vm.membershipPurchase[index].open?  vm.membershipPurchase[index].open = false :  vm.membershipPurchase[index].open = true;
            },
            
            update_members(account) {
               var vm = this;
               vm.$forceUpdate();
            },
         }
		}
	
	</script>
   
	
	<style>
      #at_con_page {
         flex-direction: column;
         justify-content: flex-start;
         align-items: center;
      }
      #at_con_page  .at_con_purchase * {
         color: var(--mainColor);         
      }
      
      #at_con_page .at_con_purchase {
         flex-wrap: wrap;
         position: relative;
         justify-content: space-between;
         margin-top: 2rem;
         background: var(--altBackground);
      }
      #at_con_page .at_con_purchase .close_button {
         position: absolute;
         top: 0;
         right: 0;
         z-index: 10;
         margin: 1rem;
         width: 5rem;
         font-size: 1.25rem;
      }
      #at_con_page .call_to_action {
         flex-wrap: wrap;
         padding: 0 5vw ;
         max-width: 66rem;
         justify-content: center;
      }
      #at_con_page .section_title {
         justify-content: center;
         color: var(--titleColor);
         width: 100%;
      }
      #at_con_page .intro {
         font-size: 1.5rem;
         font-weight: 300;
      }
      #at_con_page .start_purchase_button {
         width: 20rem;
         margin: 2rem 0;
      }
      #at_con_page .glance {
         width: 30%;
         min-width: 25rem;
         flex-direction: column;
      }
      #at_con_page .glance .section_content {
         flex-wrap: wrap;
         
      }
      #at_con_page .glance .transaction_number {
         width: 100%;
         font-size: 1.15rem;
         font-weight: bold;
         justify-content: flex-end;
         margin: .5rem 0;
      }
      #at_con_page .glance .memberships {
         width: 100%;
         order: solid 1px var(--borderColor);
         
      }
      
      #at_con_page .purchase_form{
         width: 65%;
         min-width: 30rem;
         flex-direction: column;
         position: relative;
      }
      #at_con_page .purchase_form .section_content {
         flex-direction: column;
         margin: 1rem 0;
      }
      #at_con_page .purchase_form .member_wrapper {
         flex-wrap: wrap;
      }
      #at_con_page .purchase_form .member_wrapper .header {
         width: 100%;
         justify-content: space-between;
      }
      #at_con_page .purchase_form .member_wrapper .header .member_title{
         opacity: 0;
         transition: opacity .1s;
         padding: 0 2vw;
         justify-content: center;
         width: calc(100% - 8rem);
      }
      #at_con_page .purchase_form .member_wrapper .header .member_title.show {
         opacity: 1;
      }
      #at_con_page .purchase_form .member_wrapper .header {
         
      }
      #at_con_page .purchase_form .member_wrapper .header .header_button {
         font-size: 2rem;
         width: 1.65rem;
         height: 1.65rem;
      }
      
      #at_con_page .purchase_form .member_wrapper .member {
         overflow: hidden;
         max-height: 0;
         opacity: 0;
         transition: max-height .4s, opacity .4s, overflow .4s;
      }
      #at_con_page .purchase_form .member_wrapper .member.open {
         opacity: 1;
         max-height: 50rem;
         overflow-Y: auto;
      }
      
      #at_con_page {}
      #at_con_page {}
      
      #at_con_page {}
      #at_con_page {}
      
      #at_con_page {}
      #at_con_page {}
      
      #at_con_page {}
      #at_con_page {}
      
      #at_con_page {}
      #at_con_page {}
      
      pre {
         padding: 2rem;
         border: solid 1px red;
      }
	</style>
   
   