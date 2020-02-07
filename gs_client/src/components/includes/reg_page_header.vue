
	<template>
		
			<div id="reg_page_header" class="header_inner"> 
				<nav class="reg_menu">
					<router-link class="nav_link" :to="'/'" >Exit</router-link>
					<router-link class="nav_link" :to="'/registration_hub'" >Registration Hub</router-link>
					<router-link class="nav_link" :to="'/at_con_purchase_form'" >At-Con purchase form</router-link>
					<router-link class="nav_link" :to="'/registration_reports'" >Reg. Reports</router-link>
				</nav> 
				
				<h2 class="section_title">Registration Panel</h2>
				
				<div class="report_box reg_mini_report"v-if="regReport.registeredMembers" >
					<span class="item">
						<span class="text">Number of Registered Members</span>
						<span class="value" v-text="regReport.registeredMembers || '-'"></span>
					</span>	
				</div>
				<div class="response_message reg_form_response"></div>			
			</div>
							
			
	</template>
	
	
	
	<script>
		import Vue from 'vue'
		import { mapGetters, mapState } from 'vuex'
		
		export default{
			name: 'reg_page_header',
			
			
			data() {
				return {
				}
			},
			
			
			watch: {},
					
			filters: {},
			 
			
			computed: {
            ...mapState({    
					regReport         : 'regReport',
				}),
            
            registeredMembers: function () {
               var   vm = this,
                     numMembers = 0;
                     
                  Object.entries(vm.members).forEach((member) => {
                     member[1].badge_number? numMembers++: '';
                  });
               
               
               return numMembers;
            },
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
	
	#reg_page_header .section_title {
		display: flex;
		justify-content: center;
		font-size: 2.25rem;
		height: 2rem;
		line-height: 1em;
		align-items: center;
		width: 100%;
	}
	#reg_page_header .reg_mini_report {
		position: absolute;
			top: 0;
			right: 0;		
		margin: 0 1rem;	
		background: #1c4455;
		min-width: 18rem;
		border-color: var(--titleColor);
	}
	
	
	
	</style>