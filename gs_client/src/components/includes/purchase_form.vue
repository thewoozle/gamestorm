
	<template>
		<div class="component" id="payment_panel">
         <div class="payment_wrapper">
            <div class="mini_cart">
               <header class="header row">
                  <span class="element item title">Items</span>
                  <span class="element value title">Amount</span>
               </header>
               <div class="cart_body">
                  <div class="row" v-for="cartItem in shoppingCart.items" >
                     <span class="element item" v-text="cartItem.item.description"></span>
                     <span class="element value" v-text="'$'+cartItem.item.price+'.00'"></span>
                     <span class="element member" >
                        <span class="name" v-text="cartItem.account.first_name+' '+cartItem.account.last_name"></span>
                        <span class="age" v-if="cartItem.account.age > 0 && cartItem.account.age <=17" v-text="cartItem.account.age"></span>
                     </span>
                     <button class="cart_control far fa-user-times" @click.prevent="remove_cart_item(cartItem)"></button>
                  </div>
               </div>
               <footer class="totals row">
                  <span class="element item">Total</span>
                  <span class="element value" v-text="'$'+shoppingCart.amount+'.00'"></span>
               </footer>
            </div>
            
            <div class="payment_details">
               <div class="detail_element billing_details">
                  <span class="title">Billing Information</span>
                  
                  if logged-in, show info else option to log-in, use a member's ifo, or enter info
               {{user}}
               </div>
               <div class="detail_element create_account">
                  if user not logged-in, ask to log-in or create account using payment info or new info
               </div>
               <div class="detail_element waivers">
                  <span class="title">Waivers</span>
                  <p class="form-row wavers-checkbox-class form-row-wide validate-required" id="conduct_wavers_field" data-priority=""><span class="woocommerce-input-wrapper"><label class="checkbox ">
                     <input type="checkbox" class="input-checkbox " name="conduct_wavers" id="conduct_wavers" value="1"> 
                     By purchasing this membership I acknowledge that I have read and agree to abide by the <a target="gswaiverpolicy" href="https://gamestorm.org/attend/policies/#cocpolicy">GameStorm Code of 
                     Conduct</a>.&nbsp;<abbr class="required" title="required">*</abbr></label></span>
                  </p>
               </div>
               
               <div class="detail_element additional_info">
                  
               </div>
               <div class="detail_element payment_form">
                  <span class="woocommerce-input-wrapper">
                     <textarea name="order_comments" class="input-text " id="order_comments" placeholder="Notes about your order, e.g. special notes for delivery." rows="2" cols="5"></textarea>
                  </span>
               </div>
            </div>
            
            <div class="controls">
               < view cart >  < checkout with paypal >
            </div>
         </div>
      
		</div>
	</template>
	
	<script>
      import Vue from 'vue'
		import { mapState, mapGetters} from 'vuex';
			
      export default{
         name: 'purchaseForm',
         
         data() {
            return{
                  cartItemType   : null,
            }
         },
         
         watch: {
            
         },
         
         computed: {
      ...mapState({
            currentCon  : 'currentCon',
            statesList	: 'statesList',     
            user        : 'user',
            testData    : 'testData',
            shoppingCart: 'shoppingCart', 
         }),
         
         },
         
         created() {
         },
         methods: {
            
            
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
      #payment_panel {
         display: flex;
         allign-self: flex-start;
         width: 100%;
         
      }
      #payment_panel * {
         color: var(--mainColor);
      }
      
      #payment_panel .payment_wrapper {
         display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-wrap: wrap;
      }
      #payment_panel .mini_cart {
         display: flex;
         flex-wrap: wrap;
         border: solid 1px #999;
         border-radius: .25rem;
         width: calc(50% - 1rem);
      }
      #payment_panel .mini_cart .cart_body {
         display: flex;
         flex-wrap: wrap;
         width: 100%;
      }
      #payment_panel .mini_cart .row {
         position: relative;
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding-right: 2rem;
         width: 100%;
      }
      #payment_panel .mini_cart .totals .item,
      #payment_panel .mini_cart .row .value {
         justify-content: flex-end;
      }
      #payment_panel .mini_cart .totals {         
         font-weight: bold;
         position: relative;
      } 
      #payment_panel .mini_cart .totals:before {
         position: absolute;
         top: 0;
         left: 12.5%;
         content: '';
         width: 75%;
         border-top: solid 3px #999;
      }
      
      #payment_panel .mini_cart .cart_item_type {
         display: flex;
         width: 6rem;
         font-weight: bold;
      }
      #payment_panel .mini_cart .element {
         display: flex;
         padding: .5rem;
      }
      #payment_panel .mini_cart .cart_control {
         position: absolute;
         right: 0;
         margin: 0 .5rem;
         font-size: 1rem;
         color: var(--warningColor);
      }
      #payment_panel .mini_cart .cart_control:hover {
         color: var(--titleColor);
      }
      
      #payment_panel .payment_details {
         display: flex;
         flex-direction: column;
         width: calc(50% - 1rem);         
         min-height: 10rem;
      }
      #payment_panel .payment_details .detail_element {
         display: flex;
         flex-direction: column;
      }
      #payment_panel .payment_details .title {
         display: flex;
         width: 50%;
         justify-content: flex-end;
      }
      
      
      #payment_panel .controls {
         display: flex;
         width: 100%;
      }
	
	</style>