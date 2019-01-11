
	<template>
		<div class="reset_password">
      
		</div>
	</template>
	
   
	<script>
		import Vue from 'vue'
		import { mapGetters } from 'vuex'
		import Router from 'vue-router'
		
		Vue.use(Router);
			
      export default{
         name: 'reset_password',
         
         data() {
            return{
            
            }
         },
         
         watch: {
            
         },
         
         computed: {
            ...mapGetters({
               
            }),
         },
         
         created() {
            console.log('works');
         },
         methods: {
            
         }
		}
	
	</script>
	
	<style>
	
	</style>