
	<template>
		
			<div id="reg_page_header" class="header_inner"> 
				<nav class="reg_menu">
					<router-link class="nav_link" :to="'/'" >Exit</router-link>
				</nav> 
				
				<div class="response_message reg_form_response"></div>			
			</div>
							
			
	</template>
	
	
	
	<script>
		import Vue from 'vue'
		import { mapGetters } from 'vuex'
		
		export default{
			name: 'scheduling_page_header',
			
			
			data() {
				return {
				}
			},
			
			
			watch: {},
					
			filters: {},
			 
			computed: {
				...mapGetters ({
				}),
			},
		  
			created() {},
			
			
			mounted: function() {},
			
			
			methods: {}
		}
	</script>
	
	
	<style>
	

    /*  -----------------------------------------------------------------------------------------------------
                                    PAGE HEADER
        -----------------------------------------------------------------------------------------------------    */ 
    #reg_page_header {
		display: flex;
		flex-wrap: wrap;	
		width: calc(100% - 1rem);
		padding: .5rem 0;
		height: 3rem;
		margin: .5rem auto 0;
	}
		
	#reg_page_header .header_inner {
		position: relative;
		z-index: 80;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		font-size: 1em;
		height: 100%; 
		height: 5rem;
		background: rgba(30,30,30,.85);
		width: 100%;	
		transition: height .5s, background .5s;
	}	
	
	#reg_page_header .reg_menu {
		display: flex;
		width: 100%;
		justify-content: flex-start;
	}
	
	
	
	</style>