	
	<template>
			<div id="admin_page_header" class="header_inner"> 
				<div class="admin_menu">			
					<router-link :to="'/'" class="nav_link ">Exit</router-link>
					<router-link :to="'/registration_hub'" class="nav_link ">Registration Hub</router-link>
					<router-link :to="'/scheduling_hub'" class="nav_link ">Scheduling Hub</router-link>
					<router-link :to="'/departments_hub'" class="nav_link ">Departments Hub</router-link>
					<router-link :to="'/news_hub'" class="nav_link ">News Hub</router-link>
				</div>
				
			</div>			
			
	</template>
	
	
	
	<script>
	
		export default{
			name: 'admin_page_header',
			
			
			data() {
				return {
				}
			},
			
			
			watch: {
			},
					
			filters: {	
			},
			 
			computed: {
			},
		  
			created() {
				
				
			},
			
			
			mounted: function() {
				
			},
			
			
			methods: {

			}
		}
	</script>
	
	
	<style>
	

    /*  -----------------------------------------------------------------------------------------------------
                                    PAGE HEADER
        -----------------------------------------------------------------------------------------------------    */ 
 	#admin_page_header .header_inner {
		position: relative;
		z-index: 80;
		display: flex;
		justify-content: center;
		font-size: 1em;
		height: 100%; 
		min-height: 6.5rem;
		background: rgba(30,30,30,.85);
		width: 100%;	
		transition: height .5s, background .5s;
	}	
	.page_header .admin_menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100%;
	}
	.page_header .nav_link {
		display: flex;
		color: #eee;
		
	}
	
	
	
	
	</style>