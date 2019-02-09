
	<template>
		<nav id="main_menu" :class="showMenu? 'show' : ''"  :showMenu = 'showMenu'>
		
			<button class="menu_button" id="menu_button" @click="showMenu? showMenu = false : showMenu = true" v-text="showMenu? 'Close' : 'Menu'"></button>
			
			<div class="nav_content">
					<div class="nav_section">
						<div class="nav_link_wrapper" >					
							
							<router-link :to="'/'" class="nav_link nav_link_tile convention_link" >
								<span class="image_wrapper">
									<img class="image" src="/static/images/GameStormGarage_i.jpg"/>
								</span>
								<span class="text_wrapper"><span class="text">GameStorm</span></span>
							</router-link>
							
							<div class="nav_sublinks">
								<router-link :to="'/'" class="nav_link">Home Page</router-link>
								
											
								<router-link :to="'/account'" class="nav_link" v-if="user.uuid" >My Account</router-link>
								<router-link :to="'/my_convention'" class="nav_link" >My Convention</router-link>
								
								<router-link  :to="'/signin?action=register'" class="nav_link" v-if="!user.uuid">New Account</router-link>	
								
								<router-link :to="'/shop'" class="nav_link"  >Merch</router-link>
								<router-link :to="'/connect'" class="nav_link"  >Connect</router-link>
								
							</div>					
						</div>				
					</div>			
					
					<div class="nav_section">
						<div class="nav_link_wrapper" >
							<router-link class="nav_link nav_link_tile convention_link" :to="'/convention'">
								<span class="image_wrapper">
									<img class="image" src="/static/images/gs_19_dealers_room-i.jpg"/>
								</span>
								<span class="text_wrapper"><span class="text">Convention</span></span>
							</router-link>
							<div class="nav_sublinks">
								<router-link class="nav_link" :to="'/gallery'">Gallery</router-link>								
								<router-link class="nav_link" :to="'/venue'">Venue</router-link>
								<router-link class="nav_link" :to="'/membership'" >Convention Membership</router-link>
								<router-link class="nav_link" :to="'/dealers'">Dealers</router-link>
								<router-link class="nav_link" :to="'/orpg'" title="Adventures League, Pathfinder Society, Cult of Chaos, Shadowrun Organized Play" >Organized RolePlaying</router-link>
								<router-link class="nav_link" :to="'/gamelab'" >GameLab</router-link>
								<router-link class="nav_link" :to="'/paw'" >Play &amp; Win</router-link>
							</div>					
						</div>				
					</div>	
               
               
					<div class="nav_section">
						<div class="nav_link_wrapper" >
							<router-link class="nav_link nav_link_tile" :to="'/events'">
								<span class="image_wrapper">
									<img class="image" src="/static/images/GameStormGarage_i.jpg"/>
								</span>
								<span class="text_wrapper"><span class="text">Events</span></span>
							</router-link>
							<div class="nav_sublinks">
								<router-link  :to="'/events'" class="nav_link">Event List</router-link>
								<router-link  :to="'/events'" class="nav_link">Submit an Event</router-link>
								<router-link  :to="'/events'" class="nav_link">My Events</router-link>
							</div>					
						</div>				
					</div>	

               
				<!--
					<div class="nav_section">
						<div class="nav_link_wrapper" >
							<router-link :to="'/info" class="nav_link nav_link_tile">
								<span class="image_wrapper">
									<img class="image" src="/static/images/GameStormGarage_i.jpg"/>
								</span>
								<span class="text_wrapper"><span class="text">Info</span></span>
							</router-link>
							<div class="nav_sublinks">
								<router-link class="nav_link" :to="'/'">Press</router-link>
								<router-link class="nav_link" :to="'/'">News center</router-link>
								<router-link class="nav_link" :to="'/'">Gallery</router-link>
								<router-link class="nav_link" :to="'/policies'" >Policies</router-link>
								<router-link class="nav_link" :to="'/'" >Benifits of Volunteering</router-link>
							</div>					
						</div>				
					</div>
					
					
					<div class="nav_section">
						<div class="nav_link_wrapper" >
							<router-link :to="'/connect'"class="nav_link nav_link_tile">
								<span class="image_wrapper">
									<img class="image" src="/static/images/GameStormGarage_i.jpg"/>
								</span>
								<span class="text_wrapper"><span class="text">Connect</span></span>
							</router-link>
							<div class="nav_sublinks">
								
							</div>					
						</div>				
					</div>
				-->
				</div>
		
		
		</nav>
	</template>
	
	
	
	<script>
		import { mapGetters } from 'vuex'
		export default{
			name: 'main_menu',
			
			
			data() {
				return {
					showMenu	: false,					
				}
			},
			
			
			watch: {
				$route() {
					this.showMenu = false;
				},				
			},
			
			
			
			computed: {
				...mapGetters({
					conventionInfo	: 'conventionInfo',
					user			   : 'user',
				}),
			},
			
			mounted: function() {
				
			},
			
			
			methods: {
			}
			
		}
	</script>
	
	
	<style>
	
		/* -----------------------------------------------------------------------------------------------------
										MAIN MENU
			-----------------------------------------------------------------------------------------------------	*/	
		
		#main_menu {		
			position: fixed;
			top: 0;
			left: -22rem;
			z-index: 100;
			width: 100%;
			max-width: 22rem;
			max-height: 100vh;
			transition: left .4s;
		}
		#main_menu.show {
			left: 0;
		} 
		#main_menu .menu_button {	
			position: absolute;
				top: 1rem;
				right: -8rem;;
				z-index: 90;
			display: flex;	
			font-size: 1.25rem;
			letter-spacing: .05em;
			color: var(--titleColor);
			border: solid 1px var(--button2);
			border-radius: .2rem;
			cursor: pointer;
			padding: .65rem 1.5rem;
			font-weight: 300;
			font-size: 1.65rem;
			letter-spacing: .05em;
			text-transform: uppercase;
			justify-content: center;
			background: rgba(24,44,53,.65);
			transition: color .4s, top .4s, background .4s, right .4s, padding .4s, font-size .4s;
		}
		#main_menu.show .menu_button,
		#main_menu .menu_button:hover {	
			border: transparent;
			color: var(--highlightColor);
		}
		#main_menu.show .menu_button {
			font-size: 1.25rem;
			top: .65rem;
			right: .65rem;
			padding: .25rem .5rem;
		}
		#main_menu.show .menu_button:hover {
			color: var(--titleColor);
		}
			
		#main_menu .nav_content {
			width: 100%;
			position: relative;
			padding: .5rem;
			height: 100vh;		
			overflow: hidden;
			overflow-Y: auto;
		}
		#main_menu .nav_section {
			width: 100%;
			min-height: 10rem;		
		}
		#main_menu .nav_section + .nav_section {
			margin-top: .5rem;
		}
		#main_menu .nav_link_wrapper {
			display: flex;
			flex-direction: column;
			border: solid 2px #ccc;
			border-radius: .25rem;
			font-size: 0;
			min-height: 6rem;
			background: rgba(30,77,95,.85);		
		} 
		#main_menu .nav_link_wrapper .nav_link_tile {
			display: flex;		
			justify-content: flex-start;
			height: 5rem;
			color: var(--textColor3);
			transition: background .2s;
		}
		
		#main_menu .nav_link_wrapper .image_wrapper {
			display: flex;
			width: 10rem;
			height: 100%;
			background: #333;
			padding: 0 1px 1px 0;
			border-radius: 0 0 .2rem 0;
		}
		#main_menu .nav_link_wrapper .image {
			width: 100%;
			display: block;
			opacity: .5;  
		}
		#main_menu .nav_link_wrapper .text_wrapper {
			display: flex;
			width: 60%;
			height: 100%;
			justify-content: center;
		}
		#main_menu .nav_link_wrapper .text_wrapper .text {
			display: flex;
			width: 100%;
			padding: 0 0 0 1rem;
			align-items: center;		
			text-transform: uppercase;
			letter-spacing: .05em;
			font-size: 1.5rem;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
			transition: color .2s;
		}
		#main_menu .nav_link_tile:hover {
			background: rgba(0,118,163,.4);
		}
		#main_menu .nav_link_tile:hover .text_wrapper .text {
			color: var(--lightColor);
		}
		#main_menu .nav_link_tile:hover .image {
			opacity: .6;
		}
		#main_menu .nav_sublinks {
			padding: .5rem 2.5rem;
			display: flex;
			width: 20rem;
			margin-left: auto;
			flex-wrap: wrap;
		}
		#main_menu .nav_sublinks .nav_link {
			display: flex;
			align-items: center;		
			color: var(--lightColor);
			width: 6rem;
			white-space: normal;
			border: solid 1px var(--altColor);
			border-radius: .2rem;
			padding: .5rem ;
			margin: .5rem;
			margin-left: auto;
			height: 2.6em;
			font-size: .85rem;
			line-height: 1em;
			font-weight: lighter;
			background: var(--button);
			opacity: .9;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.35);
			box-shadow: 1px 1px 3px rgba(0,0,0,0.45);
			transition: opacity .2s, border-color .2s, background  .2s;		
		}
		#main_menu .nav_sublinks .nav_link:hover {
			opacity: 1;
			color: var(--highlightColor);
			box-shadow: none;
			background: none;
			border-color: transparent;
		}
		#main_menu .nav_sublinks .nav_link:active {
			box-shadow: 0 -1px 2px rgba(0,0,0,0.5);
		}

		.convention_page .convention_link {		
			color: var(--button);
			text-shadow: 0 1px 1px rgba(255,255,255,.5);
		}
		
		
	
	</style>