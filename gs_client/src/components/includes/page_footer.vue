
	<template>
		<div id="page_footer" ref="page_footer">
		
					<div class="footer_wrapper"> 
               
						<div class="footer_inner clearfix">
							<div class="footer_element sitemap">
								<h3 class="title">SiteMap</h3>
								<div class="content">
                           <router-link :to="'/'" class="link">Home</router-link>
								<router-link :to="'/account'" class="link" v-if="user.uuid"  >My Account</router-link>
								<router-link :to="'/my_convention'" class="link" v-if="user.uuid"  >My Convention</router-link>								
								<router-link  :to="'/signin?action=register'" class="link" v-if="!user.uuid">New Account</router-link>	
								
								<router-link :to="'/shop'" class="link"   >Merch</router-link>
								<router-link :to="'/connect'" class="link"   >Connect</router-link>
                        
                        
								<router-link class="link" :to="'/gallery'" >Gallery</router-link>								
								<router-link class="link " :to="'/venue'" >Venue</router-link>
								<router-link class="link " :to="'/membership'"  >Convention Membership</router-link>
								<router-link class="link " :to="'/dealers'" >Dealers</router-link>
								<router-link class="link " :to="'/orpg'"  title="Adventures League, Pathfinder Society, Cult of Chaos, Shadowrun Organized Play" >Organized RolePlaying</router-link>
								<router-link class="link " :to="'/gamelab'"  >GameLab</router-link>
								<router-link class="link " :to="'/paw'"  >Play &amp; Win</router-link>
								<router-link class="link " :to="'/events'"  >Event List</router-link>
								<router-link class="link " :to="'/events'"  >Submit an Event</router-link>
								<router-link class="link " :to="'/events'"  >My Events</router-link>
								</div>
							</div>
							<div class="footer_element links ">
								<h3 class="title">Links</h3>
								<div class="content"><a class="link" href="">Contact Us</a>
								</div>	
							</div>
                     
						</div>
							<p class="copyright">Oregon Science Finction Conventions inc. ©2007 - {{currentYear}}</p>				
					</div>
		</div>
	</template>
	
	
	
	<script>
		import { mapGetters } from 'vuex';
		export default{
			name: 'page_footer',
			
			
			data() {
				return {
               currentYear : new Date().getFullYear(),
				}
			},
			
			
			watch: {				
			},
			
			
			
			computed: {
				...mapGetters({
					user 	: 'user',
				}),
			},
			
			
			mounted: function() {
			},
			
			
			methods: {
			}
			
		}
	</script>
	
	
	<style>
	
		
	
    /*  -----------------------------------------------------------------------------------------------------
                                    PAGE FOOTER
        -----------------------------------------------------------------------------------------------------    */ 
    #page_footer {
		position: relative;
		width: 100%;
      margin-top: 2rem;
	}
   
	#page_footer .footer_wrapper {
      width: 100%;
      flex-direction: column;
		background: rgba(146,0,0,.25);
   }
   
	#page_footer .footer_inner { 
      justify-content: space-between;
		width: 100%;
		padding: .5rem 2rem;
      flex-wrap: wrap;
	}
	#page_footer .title {
		color: #3D7D52;
		font-size: 1.1em;
		line-height: 1.5em;
		border-bottom: solid 1px #666;
		display: inline-block;
		letter-spacing: .1em;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
	}
	#page_footer .footer_element {
      flex-direction: column;
      background: rgba(0,0,0,0.25);
		border-radius: 3px;
		padding: 6px 12px;
      max-width: 33rem;
      
	}
	#page_footer .footer_element + .footer_element {
		margin-left: 1rem;
	}
   #page_footer .footer_element .content {
      flex-wrap: wrap;
      padding: 1rem 0;
   }
	
	
	#page_footer .sitemap .content {
      justify-content: space-between;
	}
	#page_footer .sitemap .item{
		width: 25%;
		min-width: 100px;
	}
	#page_footer .footer_footer {
		padding: 5px 15px 0 0;		
	}
	#page_footer .footer_footer p {
		display: inline-block;
		line-height: 1.5em;		
		color: #444;
		text-shadow: 0 1px 1px rgba(0,0,0,0.25);
	}
	#page_footer .link {
		font: inherit;    
      margin: .1rem .5rem;   
      font-size: .95rem;      
	}
	#page_footer .footer_footer .copywrite {
		color: #666;
		letter-spacing: .25em;
		font-size: .8em;
		text-shadow: none;
	}
	
	#page_footer .copyright {
      width: 100%;
      justify-content: flex-end;
      text-align: right;
      padding: .5rem 2rem;
      font-size: .9rem;
   }
	
	
	</style>