
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
                     <p>Current Discount: $00. Available until [date]</p>
                     <div class="price_options"> 
                     
                     
                        <div class="price_option" v-for="type in memberTypes" v-if="type.store_item == 1">
                           <span class="text" v-text="type.short_description"></span>
                           <span class="price" v-text="'$'+type.price+'.00'"></span>
                           <div class="option_purchase">
                              <button class="cart_control fal fa-plus-square" @click.prevent="update_items({account: {}, item: type})" ></button>
                              <span class="option_amount" v-text="number_of_items(type.membership_description)"></span>
                           </div>
                        </div> 
                        
                        
                     </div>
                  </div>
               </div>   
               
            
            
            
            
               <div class="componant membership_purchase">
                  
                  <div class="content ">
                     
                        <div class="shopping_cart" >
                           <span class="title">Shopping Cart</span>
                           <div class="content"  v-if="shoppingCart.items.length > 0">
                           
                              <div class="cart_item" v-for="(cartItem,index) in shoppingCart.items">
                              
                                 <div class="row">
                                 
                                    <div class="header">
                                       <span class="description" v-text="cartItem.item? cartItem.item.long_description : null"></span>
                                       <span class="age" v-if="cartItem.account.age " v-text="'Age: '+cartItem.account.age"></span>
                                    </div>  
                                    
                                    <div class="element_wrapper">                                    
                                       <div class="item_element member" >
                                          <div class="cart_info info" >   
                                             <div class="info_wrapper" v-if="cartItem.account.uuid">
                                                <span class="element name"  v-if="cartItem.account.first_name && cartItem.account.last_name" v-text="cartItem.account.first_name+' '+cartItem.account.last_name"></span>
                                                <span class="element email"  v-if="cartItem.account.email"v-text="cartItem.account.email"></span>
                                                <span class="element account_details" v-if="cartItem.account.uuid"v-text="cartItem.account.city+ ', '+ cartItem.account.state"></span>
                                                <div class="additional">
                                                   <span class="element phone"  v-if="cartItem.account.phone"v-text="cartItem.account.phone"></span>
                                                   <span class="element address"  v-if="cartItem.account.address"v-text="cartItem.account.address"></span>
                                                   <span class="element address2"  v-if="cartItem.account.address2" v-text="cartItem.account.address2"></span>                                       
                                                   <span class="element city_state_zip"  v-if="cartItem.account.city && cartItem.account.state && cartItem.account.zip "v-text="cartItem.account.city+', '+cartItem.account.state+' '+cartItem.account.zip"></span>
                                                </div>
                                                <span class="change_account control_link" @click.prevent="reset_account_choice(cartItem.item_order_number)">Change Account</span>
                                             </div>
                                             
                                             <div class="info_wrapper" v-else>
                                                <div class="" v-if="user.uuid">
                                                   <span class="wrapper_title">select membership option</span>
                                                   
                                                   <div class="select_attendee">
                                                      <select class="select member_select"  @change.prevent="select_account_option($event, cartItem) ">
                                                         <option value="" style="display: none" >account...</option>
                                                         <option :value="user.uuid" v-if="user.uuid" v-text="'Myself : '+user.first_name+' '+user.last_name"></option> 
                                                         <option  v-for="account in linkedAccounts" :value="account.uuid" v-text="'linked account: '+account.first_name+' '+account.last_name" v-if="account.uuid != user.uuid"></option>
                                                         <option value="" >Enter member info</option>
                                                      </select>
                                                   </div>
                                                   
                                                </div>
                                                
                                                <div class="" v-else >
                                                   <span class="wrapper_title">
                                                      If you have an account, please log-in to purchase your membership and access any linked accounts. </br>
                                                   </span>                                                
                                                </div>
                                                
                                                <button class="control_button edit_membership_control fal fa-edit" 
                                                   v-bind:class="showInfoForm == cartItem.item_order_number? 'show' : '' " 
                                                   @click.prevent="showInfoForm == cartItem.item_order_number? showInfoForm = '' : showInfoForm = cartItem.item_order_number" 
                                                ></button>
                                                
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div class="item_element price" v-if="cartItem">
                                          <span class="value" v-text="cartItem.item? '$'+cartItem.item.price+'.00' : null"></span>
                                          <span class="remove control_link" @click.prevent="remove_cart_item(cartItem)" title="Remove this item from the cart" >Remove</span>
                                       </div>
                                    </div>
                                 </div>   
                                    
                                 <div class="info_form" v-bind:class="cartItem.account.uuid? '' : 'show'">
                                    <div class="form_wrapper">
                                    <p>Please enter this person's information</p>
                                    <div class="" v-if="cartItem.submitErrors" >
                                       <span class="" v-if="cartItem.submitErrors.account" v-text="cartItem.submitErrors.account"></span>
                                    </div>
                 
                 
                                       <form class="cart_member_form">
                                          <div class="form_wrapper" >      
                                          
                                             
                                             <div class="form_row email_check_row">
                                                <label for="last_name">Email</label>
                                                <div class="input_wrapper">
                                                   <input class="input text_box" type="text" name="email" id="email" 
                                                      v-model="cartItem.account.email"
                                                      @keyup="check_email(cartItem.item_order_number, cartItem.account.email); clear_submit_error(cartItem.item_order_number, 'email')" 
                                                      @change="update_items(cartItem)" 
                                                   />
                                                </div>
                                                
                                                <div v-if="cartItem.checkedEmail " class="email_check fail">
                                                   <span class="icon fas fa-user-plus"  :title="'This email address already in use'" >
                                                   </span> 
                                                   <div class="message_wrapper">
                                                      <p>This email address has {{cartItem.checkedEmail.length}} user account{{cartItem.checkedEmail.length >1? 's' : ''}} associated with it. 
                                                         You can use the SIGN-IN link to access your account and link their accounts to yours for your membership purchase. You may also choose to purchase this membership for 
                                                         <span v-text="cartItem.checkedEmail.length >1? 'one of the members using this email address' : 'the member using this email address'"></span> from this list: 
                                                      </p>

                                                      <select class="select" @change.prevent="select_account_option($event, cartItem) ">
                                                         <option value="" style="display: none;">select...</option>
                                                         <option v-bind:value="email.uuid" v-for="email in cartItem.checkedEmail">{{email.first_name +' '+email.last_initial}} {{email.age != null? 'age: '+email.age : ''}}</option>
                                                      </select> 
                                                      
                                                      <p>You may also enter the information for a new member, sharing this email address. </span></p>
                                                   </div>
                                                </div>
                                                
                                                <div v-else  class="email_check ">
                                                   <span v-if="validate_email(cartItem.account.email) && cartItem.submitErrors.email != '1'" class="icon fal fa-thumbs-up" title="This email address is not in use" ></span> 
                                                </div> 
                                                
                                                <span class="input_message " :class="cartItem.checkedEmail? 'show' : ''">Email address already in use</span>    
                                                <span class="input_message" v-bind:class="cartItem.submitErrors.email? 'show' : ''" v-text="cartItem.submitErrors.email"></span> 				  
                                             </div>
               
                                             
                                             <div class="form_row">
                                                <label for="first_name">First Name</label>
                                                <div class="input_wrapper">
                                                   <input class="input text_box" type="text" name="first_name" id="first_name" 
                                                      v-model="cartItem.account.first_name"  
                                                      @change="update_items(cartItem)" @keyup="clear_submit_error(cartItem.item_order_number, 'first_name')" 
                                                   />
                                                </div>
                                                <span class="input_message" v-bind:class="cartItem.submitErrors.first_name? 'show' : ''" v-text="cartItem.submitErrors.first_name"></span>
                                             </div>
                                             
                                             <div class="form_row">
                                                <label for="last_name">Last Name</label>
                                                <div class="input_wrapper">
                                                   <input class="input text_box" type="text" name="last_name" id="last_name"  v-model="cartItem.account.last_name" 
                                                      @change="update_items(cartItem)" @keyup="clear_submit_error(cartItem.item_order_number, 'last_name')" 
                                                   />
                                                </div>
                                                <span class="input_message" v-bind:class="cartItem.submitErrors.last_name? 'show' : ''" v-text="cartItem.submitErrors.last_name"></span>
                                             </div>
                                             
                                             
                                             <div class="form_row">
                                                <label for="last_name">Badge Name </label>
                                                <div class="input_wrapper">
                                                   <input class="input text_box" type="text" name="badge_name" id="last_name"  v-model="cartItem.account.badge_name" title="OPTIONAL, badge Name defaults to your first name" 
                                                      @change="update_items(cartItem)" @keyup="clear_submit_error(cartItem.item_order_number, 'badge_name')" 
                                                   />
                                                </div>
                                                <span class="input_message" v-bind:class="cartItem.submitErrors.badge_name? 'show' : ''" v-text="cartItem.submitErrors.badge_name"></span> 					
                                             </div>
                                             
                                             
                                             
                                             <div class="form_row">
                                                <label for="last_name">Address</label>
                                                <div class="input_wrapper">
                                                   <input class="input text_box" type="text" name="address" id="address"  v-model="cartItem.account.address" 
                                                      @change="update_items(cartItem)" @keyup="clear_submit_error(cartItem.item_order_number, 'address')" 
                                                   />
                                                </div>
                                                <span class="input_message" v-bind:class="cartItem.submitErrors.address? 'show' : ''" v-text="cartItem.submitErrors.address"></span> 					
                                             </div>
                                             
                                             
                                             <div class="form_row">
                                                <label for="last_name">Address 2</label>
                                                <div class="input_wrapper">
                                                   <input class="input text_box" type="text" name="address2" id="address2"  v-model="cartItem.account.address2"   
                                                      @change="update_items(cartItem)" @keyup="clear_submit_error(cartItem.item_order_number, 'address2')" 
                                                   />
                                                </div>
                                                <span class="input_message" v-bind:class="cartItem.submitErrors.address2? 'show' : ''" v-text="cartItem.submitErrors.address2"></span> 					
                                             </div>
                                             
                                             
                                             <div class="form_row">
                                                <label for="last_name">City</label>
                                                <div class="input_wrapper">
                                                   <input class="input text_box" type="text" name="city" id="city"  v-model="cartItem.account.city" 
                                                      @change="update_items(cartItem)" 
                                                      @keyup="clear_submit_error(cartItem.item_order_number, 'city')" 
                                                   />
                                                </div>
                                                <span class="input_message" v-bind:class="cartItem.submitErrors.city? 'show' : ''" v-text="cartItem.submitErrors.city"></span> 					
                                             </div>
                                             
                                             
                                             <div class="form_row">
                                                <div class="form_element">
                                                   <div class="input_wrapper">
                                                      <select class="select" name="state" id="state"  v-model="cartItem.account.state" 
                                                         @change="update_items(cartItem)" @keyup="clear_submit_error(cartItem.item_order_number, 'state')" 
                                                      >
                                                         <option value="" style="display: none" >State...</option>
                                                         <option :value="state.state" v-for="state in statesList" >{{state.name}}</option>	
                                                      </select>
                                                      <label>State or Territory</label>
                                                      <span class="form_error" v-if="cartItem.submitErrors.state" v-text="cartItem.submitErrors.state? 'State or Territory is required' : ''"></span>
                                                   </div>   
                                                </div> 
                                                
                                                <div class="form_element">
                                                   <div class="input_wrapper" title="leave blank if over 18 at time of next convention">
                                                   <datetime type="date" @set="update_cart_account($event, cartItem.item_order_number)"   ></datetime>
                                                   <input type=""  v-model="cartItem.account.birthdate" name="birthdate"  />
                                                   </div>				
                                                   <label for="country">Birthdate</label>
                                                   <span class="input_message" v-bind:class="cartItem.submitErrors.birthDate? 'show' : ''" v-text="cartItem.submitErrors.birthDate"></span>
                                                </div>
                                             </div>	
                                             
                                             
                                             <div class="form_row">
                                                <div class="form_element">
                                                   <label for="last_name">Postal Code</label>
                                                   <div class="input_wrapper">
                                                      <input class="input text_box" type="text" name="zip" id="zip"  
                                                         v-model="cartItem.account.zip" 
                                                         @change="update_items(cartItem)" 
                                                         @keyup="clear_submit_error(cartItem.item_order_number, 'zip')" 
                                                   />
                                                   </div>
                                                   <span class="input_message" v-bind:class="cartItem.submitErrors.zip? 'show' : ''" v-text="cartItem.submitErrors.zip"></span> 	
                                                
                                                </div>      
                                                <div class="form_element">
                                                   <label for="last_name">Phone</label>
                                                   <div class="input_wrapper">
                                                      <input class="input text_box" type="text" name="phone" id="phone"   
                                                         v-model="cartItem.account.phone" 
                                                         @change="update_items(cartItem)" 
                                                         @keyup="clear_submit_error(cartItem.item_order_number, 'phone')" 
                                                       />
                                                   </div>                                    
                                                </div>
                                             </div>
                                             
                                             <p>All information will be confidential and used only in relation to having website access and for convention membership. </p>
                                             
                                          </div>
                                             
                                       </form>
      
                                       
                                    </div>   
                                 </div>
                              </div>
                              
                              <span class="total_price"  v-text="'$'+shoppingCart.amount+'.00'"></span>
                           
                              <div class="controls">
                                 <button class="button" @click.prevent="submit_shopping_cart()" >Checkout</button>
                              </div>
                           </div>
                           <p v-else>no items in cart</p>
                        </div>
                     
                  </div>    
               </div>
               
               <div class="cart_checkout" :class="showCheckout? 'show' : ''">
                     <button type="button" class="close_button fal fa-times" @click.prevent="showCheckout ? clear_paypal() : showCheckout = true"></button>
                  <div class="checkout_wrapper">
                     <purchase_form v-on:checkoutReturn = "handle_checkout_return" :key="paypalKey"/>
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
		import Vue from 'vue'
		import {apiDomain} from '../config';
		import purchaseForm from '@/components/includes/purchase_form'
		import { mapState, mapGetters} from 'vuex';
      import { Datetime } from 'vue-datetime'
      import 'vue-datetime/dist/vue-datetime.css'      
      Vue.use(Datetime);
      
		export default{
			name: 'membership_page',
			
			
			data() {
				return {
               showInfoForm   : false,
               showCheckout   : false,
               paypalKey      : 0,
            }
			},
			
			
			watch: {
				
				
			},
			
			
            components: {
               datetime    : Datetime,
               purchase_form: purchaseForm
            },
				
			
			
			computed: {
			...mapState({
               currentCon     : 'currentCon',
               storeItems     : 'storeItems',
               linkedAccounts : 'linkedAccounts',
               statesList		: 'statesList',
               user           : 'user',
               testData       : 'testData',
               memberTypes    : 'memberTypes',
            }),
            
            ... mapGetters({
               shoppingCart: 'shoppingCart', 
            }),
            
			},
			
			created() {
				var vm = this;
            vm.$store.dispatch('get_store_items').then(()=>{
               vm.$forceUpdate();
            });
            
            vm.$store.dispatch('get_reg_data').then(()=>{});
            
            if(vm.user) {                  
               vm.$store.dispatch('get_linked_accounts', vm.user.uuid).then(()=>{
                 vm.$forceUpdate();
               });
            }
			},
			
			
			mounted: function() {
			},
			
			
			methods: {
           
            /* -----------------------------------------------------------
                        CHECK EMAIL
               ----------------------------------------------------------- */
            check_email(orderNumber, email) {
               var vm = this;
               email = email.replace(/ /g, '');
               
                  vm.$store.dispatch('check_email',{orderNumber: orderNumber, email: email}).then((response) => {
                     vm.$forceUpdate();
                  }, (err) => {
                        vm.submitErrors = err;
                     vm.showLoginLoading = false;
                  });
                  
            },
            
            
            
            /* -----------------------------------------------------------
                        SELECT ACCOUNT OPTION
                        show form and create new, blank account entry
               ----------------------------------------------------------- */
           select_account_option(event, item) {
               var   vm = this,
                     _cartItem = item;          
               
                if(event.target.value) { 
                  vm.showInfoForm = false;
                  
                  vm.$store.dispatch('get_cart_account', event.target.value).then((response) => {
                     _cartItem.account = response;
                     console.log(_cartItem);
                     vm.$store.dispatch('update_shopping_cart', _cartItem).then(()=>{
                        vm.showInfoForm = item.item_order_number;
                     }); 
                  });      
                  
               } else { 
               _cartItem.account = {uuid: ''};
               _cartItem.uuid = '';
               
               console.log('show form');
                  // vm.showInfoForm = itemNumber;
               }; 
            },
            
            
            set_new_member(e) {
               console.log(e);
            },
            
            // HANDLE CHECKOUT RETURN            
            handle_checkout_return(checkoutReturn) {
               var vm = this;
               if(checkoutReturn == 'COMPLETED') {
                  vm.$store.dispatch('update_system_messages', 'Membership purchase successful').then(()=>{});
                  vm.$store.dispatch('reset_shopping_cart');
                  vm.clear_paypal()
                  vm.$forceUpdate();
               }
            },
            
            
            
            clear_paypal() {               
               var vm = this;
               vm.paypalKey +=1; 
               vm.showCheckout = false;
            },
            
            
            
            // reset cart account choice
            reset_account_choice(itemNumber) {
               var   vm = this,
                     _cartItem = {};
               Object.entries(vm.shoppingCart.items).forEach((item) =>{                  
                  if(item[1].item_order_number == itemNumber) {
                     _cartItem = item[1];
                     _cartItem.account = {                        
                        'uuid'      :'',
                        'first_name':'',
                        'last_name' :'',
                        'email'     :'',
                        'phone'     :'',
                        'address'   :'',
                        'address2'  :'',
                        'state'     :'',
                        'city'      :'',
                        'zip'       :'',
                        'membership_description': '',
                        'age'       :''
                        };
                     
                     vm.$store.dispatch('update_shopping_cart', _cartItem).then(()=>{});
                  }     
                     
               });
            },
            
            
            
            
            update_items(data) {
               var vm = this;
               data.purchase = true;
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
                     if(item[1].category) {
                        item[1].category == category? numberOfItems ++ : '';
                     }                     
                  });
               }
               return numberOfItems;
            },
            
            
            
            clear_submit_error(itemNumber, field) {
               var vm = this;
               vm.$store.dispatch('clear_submit_error', {'item_order_number': itemNumber, 'field':field}).then(()=>{
                  vm.$forceUpdate();
               });
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
            
            
            // SUBMIT CHECKOUT
            submit_shopping_cart() {
               var   vm = this;
                
               if(vm.shoppingCart.items) {
                  
                  
                  vm.$store.dispatch('submit_shopping_cart').then((response) => {
                     // show checkout panel with summary and payment info
                     vm.showCheckout = true;
                  });
               }   
               vm.$forceUpdate();
            }
			}			
		}
	</script>
	
	
	<style>
   
   .section.membership_purchasing {
      position: relative;
      flex-wrap: wrap;
      padding-bottom: 2rem;
      justify-content: space-between;
      overflow: hidden;
   }
   .membership_purchasing .section_title {
      justify-content: center;
   }
   .membership_purchasing .componant {
      display: flex;
      flex-wrap: wrap;
      min-width: 25rem;
      margin-top: 1rem;
   }
   .membership_purchasing .componant.membership_pricing {
      width: 50%;
   }
   .membership_purchasing .componant.membership_purchase {
      width: 49%;
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
      flex-direction: column;
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
   
   .membershippage .cart_control {
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
      max-width: 32rem;
      margin: 0 auto;
   }
   .membership_purchase .shopping_cart .cart_item {
      display: flex;
      flex-direction: column;
      justify-items: center;
      position: relative;
      background: rgba(255,255,255,.035);
      width: 100%;
      padding: .5rem .75rem;
      min-height: 4rem;
   }
   .membership_purchase .shopping_cart .cart_item + .cart_item {
      margin-top: 1rem;
      border-top: solid 1px var(--borderColor);
      padding-top: 1rem;
   }
   
   .membership_purchase .cart_item .row {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
   } 
   
   .membership_purchase .shopping_cart .cart_item .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
   }
   .membership_purchase .shopping_cart .cart_item .header .description {
      display: flex;
      flex-wrap: wrap;
      font-size: 1.15rem;
      font-weight: 300;
      margin: .5rem 0;
      text-transform: uppercase;
      border-bottom: solid 2px var(--borderColor);
      line-height: 1.1em;
      width: calc(100% - 4rem);
   }
   .membership_purchase .shopping_cart .cart_item .header .age {
      display: flex;
      justify-content: flex-end;
      
      
      width: 4rem;
   }
   
   
   
   
   .membership_purchase .cart_item .row .control_link {
      display: flex;
      cursor: pointer;
      font-size: .95rem;
      margin-top: .5rem;
      color: var(--titleColor);
   }
   .membership_purchase .cart_item .row .remove:hover {
      color: var(--highlightColor);
   }
   .membership_purchase .cart_item .row .member {
      
   } 
   .membership_purchase .cart_item .row .member .additional {
      display: flex;
      flex-wrap: wrap;
      max-height: 0;
      transition: max-height .3s;
      overflow: hidden;
      width: 100%;      
   }
   .membership_purchase .cart_item .row .member .additional.show {
      max-height: 6rem;
   }
   .membership_purchase .cart_item .row .wrapper_title {
      font-weight: 300;
      max-height: 3rem;
      padding: .5rem 0;
      overflow: hidden;
      transition: max-height .3s, padding .3s;
   } 
   .membership_purchase .cart_item .row .wrapper_title.hide {
      max-height: 0;
      padding: 0;
   } 
   
   .membership_purchase .cart_item .row .control_button {
   }
   
   .membership_purchase .shopping_cart .item_element {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
   }
   
   .membership_purchase .cart_item .row .element_wrapper {
      display: flex;
      justify-content: space-between;
      padding: .35rem;
      border-radius: .25rem;
      width: 100%;
      background: rgba(255,255,255,.05);
   }
   .membership_purchase .shopping_cart .item_element.member {
      width: 70%;
   }
   .membership_purchase .shopping_cart .item_element.member .info,
   .membership_purchase .shopping_cart .item_element.member .info_wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
   }
   .membership_purchase .shopping_cart .item_element.member .element {
      display: flex;
      flex-wrap: wrap;
      line-height: 1.1em;
      width: 50%;
   }
   .membership_purchase .shopping_cart .item_element.member .element {
      
   }
   .membership_purchase .shopping_cart .item_element.member .account_details{
      
   }
   .membership_purchase .shopping_cart .item_element.price {
      width: 30%;
      align-items: center;
   }
   .membership_purchase .shopping_cart .item_element.price .value,
   .membership_purchase .shopping_cart .item_element.price .remove {
      display: flex;
      width: 100%;
      justify-content: flex-end;
   }
   .membership_purchase .shopping_cart .item_element.price .value {
      font-size: 1.35em;
   }
   
   
   
   
   
   
   .membership_purchase .shopping_cart .item_element .cart_info .age {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
   }
   .membership_purchase .shopping_cart .item_element .cart_info .age .label {
      color: inherit;
      width: auto;
   }
   
   .membership_purchase .shopping_cart .cart_item .description {
      display: flex;
      flex-wrap: wrap;
      font-size: .9rem;
   }
   .membership_purchase .shopping_cart .price {
      display: flex;
      width: 7rem;
      justify-content: flex-end;
      padding: 0 .5rem;
      font-size: 1.25rem;
   }
   
   
   
   .membership_purchase .shopping_cart .info_form {
      display: flex;
      width: 100%;
      max-height: 0;
      overflow: hidden;
      transition: max-height .4s;
   }
   .membership_purchase .shopping_cart .info_form.show {
      max-height: 35rem;
      overflow: auto;
   }
   .membership_purchase .shopping_cart .info_form .form_wrapper {
      display: flex;
      flex-wrap: wrap;
      max-height: 0;
      overflow: hidden;
      transition: max-height .3s;
   }
   .membership_purchase .shopping_cart .info_form.show .form_wrapper {
      max-height: 50rem;
      padding-top: 1rem;
   }
   
   .membership_purchase .shopping_cart .info_form .input_message {
      color: var(--highlightColor);
      opacity: 0;
      z-index: -1;
   }
   .membership_purchase .shopping_cart .info_form .input_message.show {
      opacity: 1;
      z-index: 10;
   }
   
   
   .membership_purchase .shopping_cart .info_form .email_check {
      display: flex;
      position: absolute;
         top: 0;
         z-index: 25;
         right: .75rem;
      color: var(--passColor);
      height: 100%;
      width: 2rem;
   }
   .membership_purchase .shopping_cart .info_form .email_check.fail {
      color: var(--warningColor);
   }
   .membership_purchase .shopping_cart .info_form .email_check .icon {
      color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      width: 100%;
      transition: color .5s;
   }
   .membership_purchase .shopping_cart .info_form .email_check .message_wrapper {
      position: absolute;
         top: -1rem;
         right: -35rem;
      width: 29rem;
      flex-direction: column;
      background: var(--altBackground2);
      padding: .75rem 1rem;
      transition: right .5s;
   }   
   .membership_purchase .shopping_cart .info_form .email_check:hover .message_wrapper {
      right: 0;
   }   
   .membership_purchase .shopping_cart .info_form .email_check .message_wrapper p {
      font-size: 1.1;
      color: var(--textColor4);
      font-weight: 400;
      flex-wrap: wrap;
   }
   .membership_purchase .shopping_cart .info_form .email_check_row {
      position: relative;
      z-index: 10;
   }
   
   .membership_purchase .shopping_cart .email_check .select {
      color: var(--mainColor);      
      margin: 0;
   }
   
   /* ----- CART CHECKOUT ----- */
   .section.membership_purchasing .cart_checkout {
      position: fixed;
         top: 0;
         right: -100%;
         z-index: 90;
      display: flex;      
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
      padding: 2rem 1.5rem;
      max-width:50rem;
      background: var(--lightColor);      
      transition: right .4s cubic-bezier(0.65, 0, 0.41, 0.99);
      
   }
   .section.membership_purchasing .cart_checkout.show {
      right: 0;
   }
   .section.membership_purchasing .cart_checkout .checkout_wrapper {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
   }
   
   .section.membership_purchasing .cart_checkout .close_button {
      position: absolute;
         top: 0;
         right: 0;
         z-index: 50;
      margin: .75rem;
      border-radius: .25rem;      
   }
   .section.membership_purchasing .cart_checkout .return_memberships {
      position: absolute;
         bottom: 0;
         left: 0;
         z-index: 10;
      margin: .75rem;   
      width: auto;
      padding: .15rem .5rem;
      text-shadow: none;
      font-size: .75rem;
      color: var(--button);
   }
   
   
	
	</style>