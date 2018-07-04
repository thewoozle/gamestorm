
	<template>
		<div id="slideout">
			<div class="slideout_content">
				SLIDEOUT
			</div>
		
		</div>
	</template>
	
	
	
	<script>
		export default{
			name: 'slideout',
			
			
			data() {
				return {
					
				}
			},
			
			
			watch: {
				
				
			},
			
			
			computed: {
				
				
			},
			
			
			mounted: function() {
				
			},
			
			
			methods: {
				
			}
			
		}
	</script>
	
	
	<style>
	/*	---------------------------------------------------------------------	
				SLIDEOUT
		---------------------------------------------------------------------	*/
		
		#slideout { background: rgba(255,255,0,.25);
			position: fixed;
				top: 0;
				right: -100%;
				z-index: 75;
			height: 100%;
			overflow: hidden;
			overflow-Y: auto;
			width: 100%;
			max-width: 30rem;
			transition: right .4s;
		}
		
		#app.show_slideout #slideout{
			right: 0;
		}
	
	
	</style>
	
	
	