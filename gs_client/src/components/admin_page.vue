
	<template>
		<div id="admin_page">
		
			<div class="sections">
				<section class="section admin_report">
					<p>admin mini-report</p>
					<p>convention, active events, database connection</p>
				</section>
				
				<section class="section convention_panel">
					<p>CONVENTION SETTINGS PANEL</p>
					<p>basic con settings, like dates, names, venue</p>
				</section>
				
				<section class="section news_panel">
					<p>NEWS PANEL</p>
					<p>current news items, scheduled items, link to news hub</p>
				</section>
				
				<section class="section users_panel">
					<p>USERS PANEL</p>
					<p>searchable user list with password reset edit info fields, and permissions links</p>
					<p>show all users with default filter of most recent 10. [ Search box ] <br />
						Buttons: [ show all ] [ show inactive (wtih # inactive ] [ del. inactive ] [ requested password]</br>
						each user options: [ deactivate ], [ make admin ], [ send password reset ], [ activate (if deactivated)]
					</p>
					<p>show all admin users buttons: [ admin ] [ manager ] [ scheduler ] </br>
						admin user options: [ change status ] [ set department ] [ demote ]
					</p>
					
					
				</section>
		
			</div>
		
		</div>
	</template>
	
	
	
	<script>
		import Vue from 'vue'
		import { mapGetters } from 'vuex'
		import Router from 'vue-router'
		
		Vue.use(Router);
		
		export default{
			name: 'admin_page',
			
			
			data() {
				return {
					userPass : false,
					
				}
			},
			
			
			watch: {
				
				
			},
			
			
			computed: {
				...mapGetters({
					user			: 'user',
					regReport		: 'regReport'
				}),
				
				
				
			},
			
			created() {
				this.check_user();
				this.get_store_data();
			},
			
			mounted: function() {
				
			},
			
			
			methods: {
				
				// GET STORE DATA FOR VUEX  
				get_store_data() {
					var vm = this;
					vm.$store.dispatch('get_reg_report').then(()=>{});
				},
				
				// CHECK USER PAGE PERMISSION
				check_user() {
					var vm = this;					
					if (vm.user) {
						if (vm.user.permissions) {
							if (vm.user.permissions.admin) {
								vm.userPass = true;
							} 
						} 
					}					
					vm.userPass? '' : vm.$router.push('/mainpage');					
				}				
				
			}
			
		}
	</script>
	
	
	<style>
		.section {
			
		}
		.section * {
			color: var(--mainColor);
		}
		
	
	</style>