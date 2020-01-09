
	<template>
		<div class="component" id="payment_panel">
      
         <div class="checkout_wrapper " :class="checkout? 'show' : ''"  >
            <div class="paypal_content" ref="paypal"></div>
            <button class="button return_button" @click.prevent="checkout=false">Return to cart</button>
         </div>
         
         <div class="payment_wrapper" :class="checkout? '' : 'show'" >   
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
               
               <div class="controls">
                  <button class="button" v-if="shoppingCart.items.length > 0" @click.prevent="checkout = true">Checkout with PayPal</button>                   
               </div>
               
               
               
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
               
               <div class="detail_element Code_of_conduct">
                  <span class="title">Code of Conduct</span>
                  <div class="content" >
                     <span class="checkbox_wrapper">
                        <span class="check_box fal" :class="acknowledgeCoc? 'fa-check-square' : 'fa-square'" @click.prevent="update_order_coc()"></span> 
                     </span>
                     <p>By purchasing this membership I acknowledge that I have read and agree to abide by the 
                        <a target="gswaiverpolicy" href="https://gamestorm.org/attend/policies/#cocpolicy">GameStorm Code of Conduct</a>
                     </p>
                  </div>
               </div>
               
               <div class="detail_element children">
                  <span class="title">Minors</span>
                  <div class="content" >                  
                     <p>A completed waiver signed by a parent or legal guardian is required for all children age 17 and under. The waiver form must include contact information 
                        for the parent or guardian, which will only be used in relation to care of the child. <br />
                        Please see the complete policy for Minors in the GameStorm Code of Conduct. 
                     </p>   
                        <a target="gswaiverpolicy" href="https://gamestorm.org/attend/policies/#cocpolicy">GameStorm Code of Conduct</a>
                     </p>
                     <span class="links">
                        <a class="internal-link" href="https://gamestorm.org/attend/policies/waiver-child-15-and-over/" title="Child Waiver: 15 and over">Child Waiver: 15 and over</a>
                        <a class="internal-link" href="https://gamestorm.org/attend/policies/waiver-child-under-15/" title="Child Waiver: Under 15">Child Waiver: Under 15</a>
                     </span>
                  </div>
               </div>
               
               <div class="detail_element additional_info">
                  <span class="title">Additional Information</span>                  
                  <span class="input_wrapper">
                     <textarea class="textarea"placeholder="Notes about your order, e.g. special notes for delivery." ></textarea>
                  </span>
               </div>
               
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
               acknowledgeCoc : false, 
               checkout       : false,
               loaded         : false,
               paidFor        : false,
               product: {
                  price: 1.01,
                  description: "description describing the thing",
                  
               },
               
            }
         },
         
         components: {
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
         
         props: {
            checkoutReturn: {
               type: Object,
            },
         },
            
         
         mounted() {
            const script = document.createElement("script");
            
            script.src = "https://www.paypal.com/sdk/js?client-id=ATufJRcU7JeB6B0IDxKEIAPT2H15TWJU4XkgD1oNJP--tnn5IGlB4DFKhq7_8awDylXKYZUOIXKwuQOX";
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);
         },
         
         
         methods: {
            
            
            setLoaded() {
               var vm = this;
               vm.loaded = true;
               
               console.log('create itemized description of items');
               
               
               
               window.paypal.Buttons({
                  createOrder: (data, actions) => {
                     return actions.order.create({
                        application_context : { 
                           shipping_preference: 'NO_SHIPPING'
                        },
                        purchase_units: [{
                           description: this.product.description,
                           noshipping: 1,
                           amount: {
                              currency_code: 'USD',
                              value: vm.shoppingCart.amount,
                           }
                        }], 
                          
                        
                     });
                  },
                  onApprove: (data, actions) =>{
                     return actions.order.capture().then((details) =>{
                        
                        //update memberships - transaction - email
                          
                          
                        // close slideout
                        
                        vm.$emit('checkoutReturn', details.status );
                        
                        //show on-screen notification
                        
                        // clear cart 
                        // vm.$refs.paypal = [];
                        // console.log(vm.$refs.paypal);
                        // vm.setLoaded();
                        
                        console.log(data, details);
                        
                        // data: {orderID: "3SL20545SH089880T", payerID: "C89FKD8WKQSW2", facilitatorAccessToken: "A21AAFOoOIGrTmkRZ3LjoCgmVKWcksaf1UnGkJtjofq2UxF-x8kcFyjZSFfunwqL0SbARYGlFl9hicGHqKmfwJamPBPPD0DTQ"}
                        
                        // details: {create_time: "2020-01-09T18:41:02Z", update_time: "2020-01-09T18:43:21Z", id: "3SL20545SH089880T", intent: "CAPTURE", status: "COMPLETED", payer: 
                        /*
                        {  email_address: "mmcgu1966@gmail.com"
                           payer_id: "C89FKD8WKQSW2"
                           address: {country_code: "US"}
                           name: {given_name: "Michael", surname: "McGuire"}
                           __proto__: Object
                           purchase_units: [{…}]
                           links: [{…}]
                           }
                        */
                       /* 
                        submit_member(e) {
                        var vm = this;
                        
                        vm.formErrors = [];
                        
                        if(!vm.member.badge_name) {
                           vm.member.badge_name = vm.member.first_name;
                        }
                        
                        if(!vm.member.display_name) {
                           vm.member.display_name = vm.member.first_name + ' ' + vm.member.last_name;
                        }
                                       
                        if (vm.member.con_status > 0) {
                           vm.member.membership_description = vm.memberTypes.find(type => type.id == vm.member.con_status).membership_description;
                        } else {
                           vm.membership_description = null;
                        }
                        
                        vm.$store.dispatch('submit_member', {'selectedCon':vm.selectedCon, 'member':vm.member}).then((response)=> {
                           
                           if (response.errors) {
                              var errors = {};
                              vm.formMessage = response.message;
                              setTimeout(function() {
                                 vm.formMessage = null;
                              },3000);
                              Object.entries(response.errors).forEach((error) => {
                                 let errorKey = error[0].replace('member.', '');
                                 let errorText = error[1][0].replace('member.', '');
                                errors[errorKey] = errorText;
                              });
                              
                              vm.formErrors = errors;
                              console.log(errors);
                           } else {
                              if (vm.formErrors.length <1) {
                                 console.log(response.member);
                                 console.log(response.message);
                                 vm.regSettings.reg_mode > 0? vm.print_badge(response.member.member)  : '';
                                 vm.member = {};
                                 vm.searchQuery = '';
                                 vm.memberSort = 'last_name';   
                                 vm.formMessage = response.message;     
                                 setTimeout(function() {
                                    vm.formMessage = null;
                                 },2000);
                              }
                              
                              
                              vm.get_filtered_members();
                              vm.member.state = '';
                           }
                        });
                     }
            
            */
                        
        
                     });
                  }
               }).render(vm.$refs.paypal);
            },
            
            
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
            
            // UPDATE ORDER CODE OF CONDUCTE
            update_order_coc() {               
               var vm = this;
               vm.acknowledgeCoc? vm.acknowledgeCoc = false : vm.acknowledgeCoc = true;
               vm.$store.dispatch('update_order_coc', vm.acknowledgeCoc).then(()=>{});               
            },
            
         }
      }
	
	</script>
	
	<style>
      #payment_panel {
         align-self: flex-start;
         flex-direction: column;
         width: 100%;
         
      }
      #payment_panel * {
         color: var(--mainColor);
      }
      
      #payment_panel .payment_wrapper {
            align-items: flex-start;
            justify-content: space-between;
            flex-wrap: wrap;  
            background: var(--lightColor);
         overflow: hidden;
         padding: 1rem 2rem;
         overflow-Y: auto;
         height: 100%;
         opacity: 0;
         transition: opacity .3s;
      }
      #payment_panel .payment_wrapper.show {
         opacity: 1;
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
      #payment_panel .payment_details .detail_element + .detail_element {
         margin-top: 1.25rem;
      }
      #payment_panel .payment_details .title {
         display: flex;
         width: 50%;
         font-size: 1.1rem;
         margin: .25rem 0;
         color: var(--textColor3);
         justify-content: flex-end;
      }
      
      #payment_panel .payment_details .Code_of_conduct .content {
         display: flex;
         align-items: center;
      }
      #payment_panel .payment_details .Code_of_conduct .checkbox_wrapper {
         width: 6.5rem;         
      }
      #payment_panel .payment_details .Code_of_conduct  .check_box {
         color: var(--borderColor2);
      }
      
      
      #payment_panel .payment_details .detail_element .textarea {
         margin: 0;
      }
      #payment_panel .payment_details .detail_element {
      }      
      
      #payment_panel .controls {
         display: flex;
         width: 100%;
      }
      
      #payment_panel .checkout_wrapper {
         position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
         justify-content: center;   
         opacity: 0;
         background: var(--lightColor);
         height: 100%;
         transition: z-index .3s, opacity .3s, 
      }
      #payment_panel .checkout_wrapper.show {
         z-index: 10;
         opacity: 1;
      }
      #payment_panel .checkout_wrapper .return_button {
         height: 4rem;
         margin: 1rem;
         width: 6rem;
      }
      #payment_panel .checkout_wrapper .paypal_content  {
         width: calc(100% - 12rem);
      }
	
	</style>