
	<template>
		<div class="component">
         <span class="page_title">INFO</span>
      
      
         <div class="sections">
            <section class="section section_class">
               <span class="section_title"></span>
               
               <div class="section_content"></div>
            
            </section>
         </div>   
            
            
		
		</div>
	</template>
	
	<script>
      import Vue from 'vue'
      import { mapState, mapGetters } from 'vuex'
		import Router from 'vue-router'
			
		Vue.use(Router);
      
      export default{
         name: 'info_page',
         
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