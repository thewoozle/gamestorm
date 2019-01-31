
	<template>
		<div class="component">
		
         <pre>
            show current message queue</br>
            list past messages</br>
            message create/edit form</br>
         </pre>
		</div>
	</template>
	
	<script>
      import Vue from 'vue'
      import { mapState, mapGetters } from 'vuex'
		import Router from 'vue-router'
		import { Datetime } from 'vue-datetime'
			
		Vue.use(Router);
		Vue.use(Datetime);
      
      export default{
         name: 'news_hub',
         
         data() {
            return{
            
            }
         },
         
         watch: {
            
         },
         
         computed: {
            ...mapGetters({
               
            }),
            ...mapState({
               
            }),
         },
         
         created() {
            
         },
         methods: {
            
         }
		}
	
	</script>
   
	
	<style>
	
	</style>