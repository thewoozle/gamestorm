
	<template>
		<div class="component" id="account_page">
         <div class="sections">	
               <section class="section account_section">
                  <div class="section_content main "  >	
                  
                     <div class="user_info">
                     
                        <h3 class="section_title">Account Glance</h3>			
                        <div class="info_wrapper" >
                           
                           <div class="form_row">
                              <span class="title">Name</span>
                              <span class="info" v-text="userInfo.first_name+' '+userInfo.last_name || '-'"></span>
                           </div>                        
                           
                           <div class="form_row">
                              <span class="title">Email</span>
                              <span class="info" v-text="userInfo.email"></span>
                           </div>
                              
                           <div class="form_row">
                              <span class="title">Address</span>
                              <span class="info" >
                                 <span class="address" v-text="userInfo.address"></span>
                                 <span class="address_2" v-if="userInfo.address2" v-text="userInfo.address2"></span>
                                 <span class="city_state_zip" v-text="userInfo.city+', '+userInfo.state+' '+userInfo.zip"></span>								
                              </span>
                           </div>
                           
                           <div class="form_row">
                              <span class="title">Phone</span>
                              <span class="info" v-text="userInfo.phone"></span>
                           </div>
                           
                           <div class="form_row">
                              <span class="title">Badge Name</span>
                              <span class="info">
                                 <span class="badge_name" v-text="userInfo.badge_name"></span>
                                 <span class="badge_name_2" v-text="userInfo.badge_name2"></span>
                              </span>	
                           </div>
                           
                           <div class="form_row info_row">
                                 <span class="info_element" v-if="userInfo.membership_credit">
                                    <span class="title">Account Credits</span>
                                    <span class="info">Credit to attend one GameStorm Convention</span>
                                 </span>
                           </div>
                           <div class="form_row info_row" v-if="user.permissions" >
                                 <span class="info_element" v-if="Object.keys(user.permissions).length > 0">
                                    <span class="title">Account Permissions</span>
                                    <span class="info_group">
                                       <span class="info"  v-for="(value, key) in user.permissions" v-text="">
                                          <span class="role" v-text="key"></span>
                                          <span class="value" v-text="value"></span>
                                       </span>
                                    </span>   
                                 </span>
                           </div>
                           
                        </div>  
                     </div>
                        
                     <div class="links">
                        <button class="link account_button" :class="accountSection=='intro'? 'active' : '' " type="button"   @click="accountSection = 'intro'" >Intro</button>
                        <button class="link account_button" :class="accountSection=='my_profile'? 'active' : '' " type="button"   @click="accountSection = 'my_profile' " >Update profile</button>
                        <button class="link account_button" :class="accountSection=='password'? 'active' : '' " type="button"   @click="accountSection = 'password' "  >Change password</button>						
                        <button class="link status_button" :class="accountSection=='linked_accounts'? 'active' : '' " type="button"  @click="accountSection = 'linked_accounts' "  >My Linked Accounts</button>
                        <button class="link account_button" :class="accountSection=='my_convention'? 'active' : '' " type="button" @click="accountSection = 'my_convention'">My Convention </button>						
                        <button class="link status_button" :class="accountSection=='my_account'? 'active' : '' " type="button" @click="accountSection = 'my_account'"  >My account status</button>
                     </div>					
                  
                  </div>
					
                  <div class="section_content aside">
                  	<div class="aside_section intro" :class="accountSection == 'intro' ? 'show': ''">	
                     
               <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                             INTRO
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                     
							<span class="section_title">Intro</span>
							
                        <div class="content">
                           <p>Hello {{userInfo.first_name+' '+userInfo.last_name}}</p>
                           <div v-if="userInfo.con_status ">
                              <p>You HAVE a membership for {{currentCon.name}} {{currentCon.con_num}}</p>
                              <p v-if="userInfo.badge_name">Your badge name is: 
                                 <span class="badge_name" v-text="userInfo.badge_name"></span>  
                                 <span class="badge_name" v-text="userInfo.badge_name2"></span>                                      
                              </p>
                              <p v-if="userInfo.badge_number" v-text="'your badge number is: '+userInfo.badge_number"></p>
                           </div>
                           <div v-else >
                              <p >You do not have a membership for {{currentCon.name}} {{currentCon.con_num}} </p>
                              <div class="links">
                                 <a class="link" href="membership">{{currentCon.name}} {{currentCon.con_num}} Memberships </a>
                              </div>
                           </div>   
                        </div>   
							</div>
                     
               <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                             EDIT PROFILE
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                     
                  	<div class="aside_section intro" :class="accountSection == 'my_profile' ? 'show': ''">	
                        <span class="section_title">My Profile</span>
                        
                        <edit_profile />
                        
                     </div>
                     
                     
               <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                             ACCOUNT SECURITY (change password)
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                     
                  	<div class="aside_section intro" :class="accountSection == 'password' ? 'show': ''">
                        <span class="section_title">Account Security</span>
                        <changepassword />  
                     </div>	
                     
                     
               <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                             LINKED ACCOUNTS
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                     
                  	<div class="aside_section intro" :class="accountSection == 'linked_accounts' ? 'show': ''">	
                        <span class="section_title">Linked Accounts</span>
                        <div class="content">
                           <p>Accounts may be linked by using a randomly generated five-character code that the linked accounts share. 
                              Linking accounts allow purchasing eachother's convention memberships or scheduling events. 
                           This is particularly useful for the parents of children or if multiple people share an email address. </p>
                        
                           <div v-if="linkCode" class="link_code" >
                              <p>Your curent code is: <span class="code" >{{linkCode}}</span><span class="small_print">( The letters "I", "L", and "O" are not used ) </span></p>
                              
                              <div class="linked_accounts">
                                 <span class="accounts_title">Accounts</span>
                                 
                                 <div class="account_header">
                                    <span class="title name">Name</span>
                                    <span class="title age" >Age</span>
                                    <span class="title type" v-text="currentCon.name+' '+currentCon.con_num"></span>
                                    <span class="title purchase">Purchase Membership</span>
                                 </div>
                                 
                                 <div class="account" v-for="account in linkedAccounts">
                                    <span class="element name" v-text="account.first_name+' '+account.last_name"></span>
                                    <span class="element age" v-text="account.age > 0 && account.age <18? account.age : ''"></span>
                                    <span class="element type"><span class="icon" v-bind:class="account.membership_description? 'fad fa-thumbs-up' : 'fal fa-ban'">
                                       </span><span class="text" v-text="account.membership_description? account.membership_description : 'no membership'"></span>
                                    </span>
                                    <span class="element purchase">
                                       <!--<span class="purchase_membership fal" v-if="!account.membership_description" :class="account.purchase? 'fa-check-square' : 'fa-square' " @click.prevent="set_membership_purchase(account)" ></span>-->
                                       <select class="select" v-if="!account.membership_description" @change.prevent="set_membership_purchase($event, account.uuid)" >
                                             <option value="" style="display: none" >membership type...</option>
                                             <option value="" v-for="item in storeItems" v-if="show_store_item(item, 'none')" v-text="item.description + ' '+ '$'+item.price+'.00'" v-bind:value="item.id"></option>                                             
                                             <option value="" v-for="item in storeItems" v-if="show_store_item(item, 'discount')" v-text="item.description + ' '+ '$'+item.price+'.00'" v-bind:value="item.id"></option>
                                             <option value="" v-for="item in storeItems" v-if="show_store_item(item, 'day')" v-text="item.description + ' '+ '$'+item.price+'.00'" v-bind:value="item.id"></option>
                                       </select>
                                    </span>
                                 </div>
                              </div>
                           </div>
                           
                           <router-link class="button" :to="'/membership'"  @click="scroll_to_top()" v-if="membershipPurchases" >Buy memberships</router-link>
                           
                           <div v-else class="link_code" >
                              <p>enter a link-code from another account: <input type="text" v-model="addLinkCode"/></p>
                              <button class="button" @click.prevent="add_link_code">Submit</button>
                           </div>
                           
                           <div>
                              
                              <p>Click to generate a link code to share with accounts that you would like to link to this account. </p>
                              <button class="button" @click.prevent="create_link_code()">Create Code</button>
                              <button class="button" v-if="linkCode" @click.prevent="clear_link_code()">Clear link code</button>
                           </div>
                        </div>
                     </div>
                     
                     
               <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                             MY CONVENTION
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                     
                  	<div class="aside_section intro" :class="accountSection == 'my_convention' ? 'show': ''">	
							<span class="section_title">My Convention</span>
                     <pre>
                        - show membership type with description 
                        - show users events with icons for type, presenter, seat-of with buttons to cancel (unless presenting)
                        - separate section or events user is presenting with additional controls, player list (if opt-in) and notes
                        - link  to signup for events
                     </pre>
                        <div class="section_element" v-if="between_dates(currentCon.event_submissions_open, currentCon.event_submissions_close)">
                        
                        
								<router-link :to="'/events'" class="nav_link">Submit an Event</router-link>
                        
                        </div>
                        
                        
                        <div class="section_element" v-if="between_dates(currentCon.signups_open, currentCon.signups_close)">
                        
                        
                           <router-link :to="'/events'" class="nav_link">Sign-up for Events</router-link>
                        </div>
                     </div>
                     
                     
               <!--  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                             MY ACCOUNT (transactions)
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                     
                  	<div class="aside_section intro" :class="accountSection == 'my_account' ? 'show': ''">	
							<span class="section_title">My Account</span>
                     
                     </div>
                  
                  </div>
               </section>
               
            
         </div>
      
		</div>
	</template>
	
	<script>
      import Vue from 'vue'
      import { mapGetters, mapState } from 'vuex'
      import edit_profile from '@/components/includes/edit_profile'
      import changepassword from '@/components/includes/change_password'
			
      export default{
         name: 'account_page',
         
         data() {
            return{
               accountSection    : 'intro',
               addLinkCode       : null,
               membershipPurchases: false,
            }
         },
         
         watch: {
            
         },
         
         components: {
            'edit_profile'    : edit_profile,
            'changepassword'  : changepassword,
         },
         
         computed: {            
            ...mapState({
               currentCon     : 'currentCon',
               linkCode       : 'linkCode',
               linkedAccounts : 'linkedAccounts',
               storeItems  : 'storeItems',
            }),
         
            ...mapGetters({
               user              : 'user',
               userInfo          : 'userInfo',
            }),
            
         },
         
         created() {
            var vm = this;
            if(vm.user.uuid) {
               vm.$store.dispatch('get_user_info', {'uuid' : vm.user.uuid, 'selectedCon' : vm.currentCon.tag_name}).then(()=>{
               });
            
               vm.$store.dispatch('get_link_code', vm.user.uuid).then(()=>{
                 vm.$forceUpdate();
               });
            
               if(Object.keys(vm.linkedAccounts).length == 0) { 
                  vm.$store.dispatch('get_linked_accounts', vm.user.uuid).then(()=>{
                    vm.$forceUpdate();
                  });
               
                  vm.$store.dispatch('get_store_items').then(()=>{
                     vm.$forceUpdate();
                  });
               }
            } else {
                  vm.$router.push('/');
            }
         },
         
         methods: {
            
            /* -------------------------------------------------------------
                     LINKED ACCOUNT HANDLING
               -------------------------------------------------------------  */
               // a five-digit code may be used to link accounts. these functions handle getting, creating, adding, or clearing the link code
            create_link_code() {
               var vm = this;
               if(vm.linkCode) {
                  if(confirm('are you sure you want to remove this code from your account and create a new code with no accounts linked to it?')) {
                     vm.$store.dispatch('create_link_code', vm.user.uuid).then(()=>{
                        vm.$forceUpdate();
                     });
                  } 
               } else {
                  vm.$store.dispatch('create_link_code', vm.user.uuid).then(()=>{
                        vm.$forceUpdate();
                  });
               }
            },
            
            add_link_code() {
               var vm  = this;
               vm.$store.dispatch('add_link_code', {'uuid': vm.user.uuid, 'code': vm.addLinkCode}).then(()=>{
                  vm.$forceUpdate();                        
               });
            },
            
            
            clear_link_code() {
               var vm  = this;
               vm.$store.dispatch('clear_link_code', vm.user.uuid).then(()=>{
                  vm.$forceUpdate();                        
               });
            },
            
           
            
            
            
            set_membership_purchase(event, uuid) {
               var   vm = this,
                     item = {};
               console.log(event.target.value+' - ' + uuid);      
               
               Object.entries(vm.storeItems).forEach((storeItem) => {
                  if(storeItem[1].id == event.target.value) {
                     item.item = storeItem[1]; 
                     item.price = item.item.price;
                  }
               });
               Object.entries(vm.linkedAccounts).forEach((account) => {
                  //account[1].purchase? vm.membershipPurchases = true : vm.membershipPurchases = false;
                  if(account[1].uuid == uuid) { item.account = account[1] } 
               });
               
               
               vm.$store.dispatch('update_linked_account', item, uuid).then(() => {
                  vm.$forceUpdate();
                  // vm.membershipPurchases = false;
                  // Object.entries(vm.linkedAccounts).forEach((account) => {
                     // account[1].purchase? vm.membershipPurchases = true : vm.membershipPurchases = false;
                  // });
               });
               vm.membershipPurchases = true;
            },
         }
      }
	
	</script>
	
	<style>
   
	
	/*		-----------------------	SECTION ACCOUNT	----------------------- 	*/
	.section.account_section {
		border-radius: var(--borderRadius);
      background: #2a2b2d;
      box-shadow: var(--blackBoxShadow);
		padding: 1rem 0;
      justify-content: space-between;
	}
	.section.account_section .section_content {
		color: var(--backgroundColor);
	}
   
	.section.account_section .section_content.main{
      display: flex;
      position: relative;
      width: 45%;
      
   }
	.section.account_section .section_content.aside {
		position: relative;
		display: flex;
         justify-content: flex-start;
         flex-wrap: wrap;
		width: 50%;
	}
	.section.account_section .section_content.main{
      
	}
	.section.account_section .user_info {
      display: flex;
      flex-wrap: wrap;
      padding: 0 1rem;
      width: 100%;
      max-width: 25rem;
      margin: 0 0 auto 0;
	}
	.section.account_section .user_info .section_title  {
      font-size: 1.25rem;
		text-align: center;
      justify-content: center;
      margin: 0 2rem;
      width: 100%;
		border-bottom: solid 1px var(--textColor2);
	}
	.section.account_section .info_wrapper {
      display: flex;
         flex-wrap: wrap;
		padding: 1rem .5rem;
      width: 100%;
		
	}
	.section.account_section .info_wrapper .row {
		font-size: 0;
	}
	.section.account_section .info_wrapper .title{
		display: flex;
      align-items: center;
		width: 5rem;
		font-size: .8rem;
		text-align: right;
      justify-content: flex-end;
		padding-right: 1rem;
      margin-right: 1rem;
		line-height: 1.5rem;
      text-transform: uppercase;
		color: var(--textColor3);
      border-right: solid 1px var(--borderColor);
	}
   
	.section.account_section .info_wrapper .info_group,
	.section.account_section .info_wrapper .info {
		display: flex;
      flex-wrap: wrap;
		width: 60%;
		color: var(--textColor);
		font-size: 1.15rem;
		line-height: 1.5rem;		
      font-weight: 300;
	}
	.section.account_section .info_wrapper .info_group .info {
      width: 100%;
      height: 1.5rem;
      flex-wrap: nowrap;
      justify-content: space-between;
   }
	.section.account_section .info_wrapper .info_group .info .role {
      display: flex;
      font-weight: bold;   
      height: inherit;   
      line-height: 1.5rem;      
   }
	.section.account_section .info_wrapper .info_group .info .value {
      display: flex;
      padding: 0 1rem;
      justify-content: flex-end;
      height: 1em;
      line-height: 1em;
   }
   
	.section.account_section .info_wrapper .info.full {
		width: 100%;
	}
	.section.account_section  .info_wrapper .address,
	.section.account_section  .info_wrapper .address_2,
	.section.account_section  .info_wrapper .badge_name,
	.section.account_section  .info_wrapper .badge_name_2,
	.section.account_section  .info_wrapper .city_state_zip {
		display: flex;
      width: 100%;
      font-size:.9rem;
	}
	.section.account_section .info_wrapper .info .info_element {
		display: flex;
	}
	.section.account_section .info_wrapper .info .info_element .title {
		display: block;
		padding: 0;
		width: 100%;
		line-height: 1em;
		border-bottom: solid 1px #ccc;
	}
	.section.account_section .info_wrapper .info .info_element .role {
		display: block;
		
	}
	
	.section.account_section .links {
      display: flex;
         flex-direction: column;
      margin: 2rem 0 auto .75rem;   
      padding: .25rem .5rem .75rem .5rem;
      background: rgba(30,77,95,.85);
      border-radius: .2rem;
      
	}
	
	
	.section.account_section .links .link {
      display: flex;
      font-weight: 100;
      font-size:.9rem;
		cursor: pointer;
      background: none;
      width: 8rem;
      padding: 0 0 0 .5rem;
      line-height: 1.5rem;
	}
	.section.account_section .links .link:hover,
	.section.account_section .links .link.active {
      color: var(--passColor);
	}
	.section.account_section .links .link.active {
      border-bottom: 0;
	}
	.section.account_section .links .link + .link {
		
	}
	
	.section.account_section .section_content.aside {
      
	}
	
	.section.account_section .section_content.aside .aside_section {
		position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		width: 100%;
		opacity: 0;
		height: 100%;		
		padding: 0 2rem;
		overflow: hidden;
		overflow-Y: auto;
		transition: opacity .4s, z-index .4s;
	}
	.section.account_section  .section_content.aside .aside_section .content  {
		color: var(--textColor);
		font-size: 1.25rem;
      font-weight: 300;
		text-shadow: none;
		text-align: left;
	}
	.section.account_section  .section_content.aside .aside_section .content p {
		text-shadow: inherit;
      font-size: 1rem;
		color: inherit;
	}
	.section.account_section  .section_content.aside .aside_section.show {
		position: relative;
		opacity: 1;
		z-index: 10;
		color: black;
		min-height: 15rem;
	}.section.account_section  .section_content.aside .link_code {
      margin-top: .65rem;
      padding: 0 .5rem;
   }
	.section.account_section  .section_content.aside .link_code p {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      line-height: 1.5rem;      
   }
	.section.account_section  .section_content.aside .link_code .code {
      font-size: 1.5rem;      
      color: var(--titleColor);
      font-weight: 500;
      padding: 0 .5rem;
   }
	.section.account_section  .section_content.aside .link_code .small_print {
      font-size: .8rem;      
      line-height: 1em;
      width: 100%;
      display: flex;
      color: #ddd;
      justify-content: center;
      font-style: italic;
   }
   .section.account_section .linked_accounts .accounts_title {
      font-size: 1.35rem;
      font-weight: 300;
      letter-spacing: .05em;
   }
   .section.account_section .linked_accounts .title {
      font-weight: bold;
   }
   .section.account_section .linked_accounts .account_header {
      display: flex;      
   }
   .section.account_section .linked_accounts .account_header .title {
      display: flex;
      font-size: .85rem;
      line-height: 1em;
      padding: 0 .25rem;
      font-family: 'Source Sans Pro', Arial, sans-serif;
      justify-content: center;
      text-align: center;
      text-transform: uppercase;
   }
   .section.account_section .linked_accounts .account {
      display: flex;    
      justify-content: space-between;
      padding: .25rem;
      margin: .35rem 0;
      background: rgba(255,255,255,.05);
   }
   .section.account_section .linked_accounts .name {
      width: 10rem;
   }
   .section.account_section .linked_accounts .age {
      width: 2rem;
   }
   .section.account_section .linked_accounts .purchase,
   .section.account_section .linked_accounts .type {
      width: 6rem;
      margin-left: .5rem;
   }
   .section.account_section .linked_accounts .account .name, 
   .section.account_section .linked_accounts .account .type {
      display: flex;
      flex-wrap: wrap;
   }
   .section.account_section .linked_accounts .account .type .icon {
      display: flex;
      width: 3rem;
      justify-content: center;
   }
   .section.account_section .linked_accounts .element .text {
      display: flex;
      width: 100%;
      font-size: .65rem;
      line-height: 1em;
   }
   .section.account_section .linked_accounts .purchase_membership {
      cursor: pointer;
      justify-content: center;
   }
   
   
   
   
   .section.account_section .linked_accounts {
      
   }
	.section.account_section .aside_section form {
		padding: 1rem 0;
		margin: 0 auto;
	}	
	.section.account_section .aside_section form label {
		width: 12rem;
	}
	
	.section.account_section  .form_element {
		width: 100%;
	}
	.section.account_section  .section_content.aside .aside_section .content .links  {
		display: flex;
		width: 20rem;
		margin: 0 auto;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		background: none;
		border: 0;
	}
	.section.account_section  .section_content.aside .aside_section .content .link  {
		display: flex;
		margin: .5rem 0;
		padding: .25rem 1rem;
		text-shadow: none;
		margin-top: 1rem;
	}
	
	
	.section.account_section .my_convention_report {
		display: flex;
		flex-wrap: wrap;
		border: solid 1px var(--borderColor);
		border-radius: var(--borderRadius);
		background: #fff;
		color: var(--button);
		
	}
	
	.section.account_section .my_convention p {
		color: inherit;
		
	}
	
	.section.account_section .my_convention .slideout {
		position: absolute;
		top: 0;
		left: 100%;
		opacity: 0;
		z-index: 10;
		background: var(--textColor);
		transition: left .5s cubic-bezier(0.475, 0.200, 0.850, 0.675);
		
	}
	.section.account_section .my_convention .slideout.show {
		left: 1rem;
		opacity: 1;		
	}
	
	.section.account_section .my_convention .gm_info  {
		font-size: 1.25rem;
		color: #333;
		
	}
	
	.section.account_section .my_convention {
		
		
	}
	
	.section.account_section .my_convention {
		
		
	}
	
	
	
	
	.section.account_section .user_form .controls {
		margin-top: 1rem;
		display: flex;
		padding: 0 1rem;
		justify-content: flex-end;
	}
	.section.account_section .user_form .button {
		color: var(--lightColor);
	}
	
	
	</style>