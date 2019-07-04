
	<template>
		<div class="component gallery_page">
      
      
      
         <section class="section gallery">
            <div class="" v-for="image in galleryData">
               <span class="">{{image.file_description}}</span>
               <img class="image" v-bind:src="galleryLocation + image.file_name" />
            </div>
         </section>
		
		</div>
	</template>
	
	<script>
      import Vue from 'vue'
      import { mapState, mapGetters } from 'vuex'
		import Router from 'vue-router'
			
		Vue.use(Router);
      
      export default{
         name: 'gallery_page',
         
         data() {
            return{
               galleryLocation : '/static/images/gallery/',
            }
         },
         
         watch: {
            
         },
         
         computed: {
            ...mapGetters({
               
            }),
            ...mapState({
               galleryData : 'galleryData',
               
            }),
         },
         
         created() {
            let vm = this;
            
            vm.get_gallery_data();
         },
         methods: {
            get_gallery_data() {
               let vm = this;
               vm.$store.dispatch('get_gallery_data').then(()=>{});               
            }
            
         }
		}
	
	</script>
   
	
	<style>
	
	</style>