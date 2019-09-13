
	<template>
		<div id="membership_page">
         <span class="title page_title">MEMBERSHIP PAGE</span>
      
         <div class="sections">
            <section class="section membership_intro ">
               <div class="section_content">
                  <p>Four day membership for GameStorm 22.  This membership will grant you access to the entire convention on March 28th thru March 31st.</p>
                  
                        <pre> not logged-in? show login button 
                              list membership options with +/- counters (update entries for each as added or removed)
                              
                              div for each entry showing type and name with expand control for details and icon for doneness
                              - if logged-in, have checkbox for auto-fill and show dropdown for linked accounts not purchased. 
                              
                              if not logged-in, on entry, check email against database. 
                         </pre>
                         
               </div>               
            </section>
            
            
            <section class="section membership_purchasing">   
            
                  <span class="section_title"><span class="text" v-text="'Purchase Memberships for '+currentCon.name+' '+currentCon.con_num"></span></span>
                  
               <div class="componant membership_pricing ">
                  <span class="title">Pricing</span>
                  <div class="content">
                     <p>The Adult and Young-Adult (15-17) membership price is discounted for pre-registered memberships, depending on how early a membership is purchased. 
                        Child memberships (6-14) are not discounted. There is no cap on the number 
                        of memberships so it will always be possible to purchase memberships at the door.</p>
                     
                     <div class="price_options"> 
                     
                        <div class="price_option" v-for="item in storeItems" v-if="show_store_item(item, 'none')">
                           <span class="text" v-text="item.description"></span>
                           <span class="price" v-text="'$'+item.price+'.00'"></span>
                           <div class="option_purchase">
                              <button class="option_add fal fa-plus-square" @click.prevent="update_items({type: 'membership',account: '', item: item})" ></button>
                              <span class="option_amount" v-text="number_of_items(item.category)"></span>
                           </div>
                        </div> 
                        
                        <div class="price_option" v-for="item in storeItems" v-if="show_store_item(item, 'discount')">
                           <span class="text" >{{item.description}} <span class="detail">(discounted price, only available through {{day_date(item.end_date)}})</span></span>
                           <span class="price" v-text="'$'+item.price+'.00'"></span>
                           <div class="option_purchase">
                              <button class="option_add fal fa-plus-square" @click.prevent="update_items({type: 'membership', account: '', item: item})" ></button>
                              <span class="option_amount" v-text="number_of_items(item.category)"></span>
                           </div>
                        </div> 
                        
                        
                        <span class="price_title"><span class="text">Single Day Prices</span></span>
                        <p>Single-day memberships are only available at the convention. </p>
                        
                        <div class="price_option" v-for="item in storeItems" v-if="show_store_item(item, 'day')">
                           <span class="text" v-text="item.description"></span>
                           <span class="price" v-text="'$'+item.price+'.00'"></span>
                           
                           <div class="option_purchase disabled">
                              <button disabled class="option_add  fal fa-plus-square " title="remove this item" @click.prevent="update_items({type: 'membership',account: '', item: item})" ></button>
                              <span class="option_amount" v-text="number_of_items(item.category)"></span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>   
               
            
            
            
            
               <div class="componant membership_purchase">
                  
                  <div class="content ">
                     
                        <div class="shopping_cart" >
                           <span class="title">Shopping Cart</span>
                           <div class="content"  v-if="shoppingCart.items">
                              <div class="cart_item" v-for="cartItem in shoppingCart.items">
                                 <div class="cart_item_element type" v-if="cartItem.item">
                                    <span class="description" v-text="cartItem.item? cartItem.item.long_description : null"></span>
                                    <span class="price" v-text="cartItem.item? '$'+cartItem.item.price+'.00' : null"></span>
                                 </div>
                                 
                                 <div class="cart_item_element member" v-if="cartItem.account.uuid">
                                    <span class="name" v-text="cartItem.account.first_name+' '+cartItem.account.last_name"></span>
                                    age: {{cartItem.account.age}}
                                 </div>   
                                 
                                 <div class="cart_item_element member" v-else >
                                    <pre>
                                       linked members:
                                          name, age use-button
                                          name, age use-button
                                          
                                       New member:
                                          popup form with new account form
                                          <new_member_form/>
                                    </pre>
                                    <select class="select member_select">
                                       <option v-for="account in linkedAccounts" v-text="account.first_name+' '+account.last_name"></option>
                                    </select>
                                 
                                 </div>
                                 <div class="buttons">
                                    <button class="control_button fal fa-ban" @click.prevent="remove_cart_item(cartItem)" ></button>
                                 </div>
                              </div>
                           
                              <div class="controls">
                                 <button class="button" >Checkout</button>
                              </div>
                           </div>
                           <p v-else>no items in cart</p>
                        </div>
                     
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
		import { mapState, mapGetters} from 'vuex';
		import new_member_form from '@/components/includes/new_member_form'	
		export default{
			name: 'membership_page',
			
			
			data() {
				return {
            }
			},
			
			
			watch: {
				
				
			},
			
			components: {
            'new_member_form': new_member_form,
				
			},
			
			
			computed: {
			...mapState({
               currentCon  : 'currentCon',
               storeItems  : 'storeItems',
               linkedAccounts: 'linkedAccounts',
            }),
            
            ... mapGetters({
               shoppingCart: 'shoppingCart', 
            }),
            
			},
			
			created() {
				var vm = this;
            vm.get_store_items();
            console.log(Object.keys(vm.linkedAccounts).length);
            if(Object.keys(vm.linkedAccounts).length == 0) { vm.get_linked_accounts();}
			},
			
			
			mounted: function() {
			},
			
			
			methods: {
            get_store_items() {
               var vm  = this;
               
               vm.$store.dispatch('get_store_items').then(()=>{
                 vm.$forceUpdate();
               });               
            },
            
            get_linked_accounts() {
               var vm  = this;
               if(vm.user) {
                  vm.$store.dispatch('get_linked_accounts', vm.user.uuid).then(()=>{
                    vm.$forceUpdate();
                  });
               }
            },
            
            
            
            update_items(data) {
               var vm = this;
               vm.$store.dispatch('update_shopping_cart', data).then(()=>{
                  vm.$forceUpdate();
                  vm.membershipPurchases = false;
                  if(vm.linkedAccounts) {
                  Object.entries(vm.linkedAccounts).forEach((account) => {
                     account[1].purchase? vm.membershipPurchases = true : vm.membershipPurchases = false;
                  });
                  }
               });              
               
            },
            
            number_of_items(category) {
               
               var   vm = this,
                     numberOfItems = 0;
               if(vm.shoppingCart.items) {
                  Object.entries(vm.shoppingCart.items).forEach((item) => {
                     if(item[1].item.category) {
                        item[1].item.category == category? numberOfItems ++ : '';
                     }                     
                  });
               }
               return numberOfItems;
            },
            
            
            show_store_item(item, condition) {
               
               var vm = this;
               let truth = false;
               
               // filter for 'day', 'discount', and dates
               
               switch (condition) {
                  case 'day':
                     item.filter == 'day'? truth = true : '';
                     break;
                     
                  case 'discount':
                     if(item.filter == 'discount' && vm.after_date(item.start_date) && vm.before_date(item.end_date) ) {
                        truth = true;
                     }
                     break;
                  
                  case 'none':
                     if(!item.filter) {
                        if(item.start_date || item.end_date) {
                           if(vm.after_date(item.start_date) && before_date(priceBreak.stopDate)) {
                              truth = true;
                           }
                        } else {                       
                           truth = true;
                        }
                     }
               }
               
              // item.filter != 'discount' && item.filter != 'day'" v-if="after_date(priceBreak.startDate) && 
               return truth;
               
            },
            
            edit_cart_item(itemNumber) {},
            
            // REMOVE CART ITEM
            remove_cart_item(item) {
               var   vm = this;
               
               if(confirm('are you sure you want to remove this item?')) {
                  item.purchase = false;
                  vm.$store.dispatch('update_shopping_cart',item).then(()=>{
                    vm.$forceUpdate();
                  });
               }
            },
			}			
		}
	</script>
	
	
	<style>
   
   .section.membership_purchasing {
      flex-wrap: wrap;
      justify-content: center;
   }
   .membership_purchasing .section_title {
      justify-content: center;
   }
   .membership_purchasing .componant {
      display: flex;
      flex-wrap: wrap;
      min-width: 25rem;
      margin-top: 1rem;
      padding: 0 2.5vw;
   }
   .membership_purchasing .componant.membership_pricing {
      width: 60%;
   }
   .membership_purchasing .componant.membership_purchase {
      width: 40%;
   }
   
   .membership_purchasing .componant .title {
      display: flex;
      width: 50%;
      justify-content: flex-end;
      padding: .25rem 1rem;
      background: #133b4c;
      color: var(--altColor);
   }
   .membership_purchasing .componant .content {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      min-height: 100%;
      padding-top: 1rem;
   }
   .membership_purchasing .componant .content p {
      display: flex;
      width: 100%;
      font-weight: 100;
      line-height: 1.1em;
      padding: .5rem 0 ;
   }
   
   .membership_purchasing .componant .content .controls {
      align-self: flex-end;
      width: 100%;
      justify-content: space-around;
   }
   
   .price_options {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      max-width: 40rem;
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
      width: 100%;
      font-size: 1.5rem;
      line-height: 1.25em;
      justify-content: space-between;
   }
   .price_options .option_breakdown {
      display: flex;
   }
   .price_options .price_option .option_purchase {
      display: flex;
         justify-content: space-between;
         align-items: center;
      font-size: 1.25rem;      
      width: 3.25rem;
   }
   
   .price_options .price_option .option_add {
      background: none;
      font-size: 1.5em;
      cursor: pointer;
   }
   .price_options .price_option .option_amount {
      
      border: solid 1px #000;
      border-radius: .15rem;
      display: flex;
      justify-content: center;
      width: 1.65rem;
      font-size: 1.25em;
      line-height: inherit;
      height: 1em;
      background: rgba(0,0,0,.15);
      color: #fff;
   }
   .price_options .price_option
   .option_breakdown .text{
      justify-content: center;
   }
   .price_options .price_option .detail {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      font-size: .75em;
      padding: 0 .35rem 0 0;
      line-height: 1em;
      font-weight: 100;
      font-style: italic;
   }
   .price_options .price_option .text {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      allign-items: center;
      justify-content: flex-end;
      flex: 1;  
   }
   .price_options .price_option .text:after {
      content: ":";
      position: absolute;
         top: 0;
         left: 100%;
      display: flex;      
         justify-content: center;
         align-items: center;
      height: 100%;   
      width: 1rem;
   }
   .price_options .price_option .price{
      display: flex;
      align-items: center;
      width: 4rem;
      margin: 0 1rem;
      justify-content: flex-end;
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
   
   /* cart */
   .membership_purchase .shopping_cart {
      display: flex;
      flex-direction: column;      
      width: 100%;
      max-width: 30rem;
      margin: 0 auto;
   }
   .membership_purchase .shopping_cart .cart_item {
      display: flex;
      flex-direction: column;
      justify-items: center;
      position: relative;
      width: 100%;
      min-height: 4rem;
   }
   .membership_purchase .shopping_cart .cart_item + .cart_item {
      margin-top: 1rem;
      border-top: solid 1px var(--borderColor);
      padding-top: 1rem;
   }
   
   
   .membership_purchase .shopping_cart .cart_item_element {
      display: flex;
      width: calc(100% - 7rem);
   }
   .membership_purchase .shopping_cart .cart_item .description {
      display: flex;
      flex-wrap: wrap;
      width: 20rem;
   }
   .membership_purchase .shopping_cart .price {
      display: flex;
      width: 7rem;
      justify-content: flex-end;
      padding: 0 .5rem;
   }
   
   .membership_purchase .shopping_cart .cart_item .buttons {
      display: flex;
      justify-content: space-between;
      position: absolute;
      right: 0;
      width: 7rem;
   }
   
	
	</style>