
	<template>
		<div id="partners" class="partners">
         <div class="slideshow " v-for="partner in partners">
            <div class="slide"><img class="img" v-bind:src="'/static/images/partners/'+partner.image" /></div>
         </div>
		</div>
	
	</template>
	
	
	
	<script>
		import {apiDomain} from '@/config';
		import { mapState} from 'vuex';
		export default{
			name: 'partners',
			
			
			data() {
				return {
					
				}
			},
			
			
			watch: {
				
				
			},
			
			components: {
				
				
			},
			
			
			computed: {
			...mapState({
               partners    : 'partners',
         }),
			},
			
			created() {
				let vm = this;
            vm.$store.dispatch('get_partners').then(()=>{});				
			},
			
			
			mounted: function() {
				
			},
			
			
			methods: {
				
			}
			
		}
	</script>
	
	
	<style>
	
	</style>