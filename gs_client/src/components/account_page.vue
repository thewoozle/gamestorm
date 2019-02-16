
	<template>
		<div class="component">
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
                           <div class="form_row info_row" >
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
                        <button class="link account_button" type="button"   @click="accountSection = 'intro'" >Intro</button>
                        <button class="link account_button" type="button"   @click="accountSection = 'my_profile' " >edit profile</button>
                        <button class="link account_button" type="button"   @click="accountSection = 'password' "  >change password</button>						
                        <button class="link status_button" type="button"  @click="accountSection = 'linked_accounts' "  >My Linked Accounts</button>
                        <button class="link account_button" type="button" @click="accountSection = 'my_convention'">My Convention </button>						
                        <button class="link status_button" type="button" @click="accountSection = 'my_account'"  >My Account status</button>
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
      import { mapGetters } from 'vuex'
      import edit_profile from '@/components/includes/edit_profile'
      import changepassword from '@/components/includes/change_password'
			
      export default{
         name: 'account_page',
         
         data() {
            return{
               accountSection    : 'intro',
               
            }
         },
         
         watch: {
            
         },
         
         components: {
            'edit_profile' : edit_profile,
            'changepassword'  : changepassword,
         },
         
         computed: {
            ...mapGetters({
               user        : 'user',
               userInfo    : 'userInfo',
               currentCon  : 'currentCon',
            }),
         },
         
         created() {
            var vm = this;
            vm.get_user_info();
         },
         
         methods: {
            get_user_info() {
               var vm = this;
               if(vm.user.uuid) {
                  vm.$store.dispatch('get_user_info', vm.user.uuid).then(()=>{
                  });
               } else {
                  vm.$router.push('/');
                  
               }
            }
         }
      }
	
	</script>
	
	<style>
   
	
	/*		-----------------------	SECTION ACCOUNT	----------------------- 	*/
	.section.account_section {
		border-radius: var(--borderRadius);
      background: #2a2b2d;
      box-shadow: var(--blackBoxShadow);
		padding: 3rem 2rem 1rem 2rem;
      justify-content: space-between;
	}
	.section.account_section .section_content {
		color: var(--backgroundColor);
	}
   
	.section.account_section .section_content.main{
      display: flex;
         flex-wrap: wrap;
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
      padding: 0 2rem;
      width: 100%;
	}
	.section.account_section .user_info .section_title  {
		font-size: 1.25rem;
		text-align: center;
      justify-content: center;
      margin: 0 2rem;
		border-bottom: solid 1px var(--textColor2);
	}
	.section.account_section .info_wrapper {
      display: flex;
         flex-wrap: wrap;
		padding: 1rem 2rem;
      width: 100%;
		
	}
	.section.account_section .info_wrapper .row {
		font-size: 0;
	}
	.section.account_section .info_wrapper .title{
		display: flex;
      align-items: center;
		width: 40%;
		font-size: .9rem;
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
		border: solid 1px var(--borderColor);
		border-radius: .15rem;
		overflow: hidden;
		width: 15rem;
      margin: 2rem 6rem;
		background: var(--lightColor);
	}
	
	
	.section.account_section .links .link {
      display: flex;
      width: 15rem;
		color: var(--textColor3);
		padding: .5rem 1rem;
		cursor: pointer;
		font-size: 1.15rem;
		height: auto;
		text-transform: capitalize;
		text-align: left;
		border-radius: 0;
	}
	.section.account_section .links .link:hover,
	.section.account_section .links .link.active {
		background: var(--textColor3);
		color: var(--lightColor);
	}
	.section.account_section .links .link + .link {
		margin-top: .1rem;
		
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
		color: var(--textColor2);
		font-size: 1.5rem;
		text-shadow: none;
		text-align: left;
	}
	.section.account_section  .section_content.aside .aside_section .content p {
		text-shadow: inherit;
		color: inherit;
	}
	.section.account_section  .section_content.aside .aside_section.show {
		position: relative;
		opacity: 1;
		z-index: 10;
		color: black;
		min-height: 15rem;
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