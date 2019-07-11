
	<template>
		<div class="component gallery_page">
      
      
      
         <section class="section gallery">
            <div class="category"  v-for="category in galleryData">
            
               <span class="gallery_title title"  v-text="category.title"></span>
               <div class="item" v-for="item in category.items">
                  <span class="">{{item.file_description}}</span>
                  <span class="image" v-bind:style="{'background-image' : 'url('+galleryLocation + item.file_name+')'}" ></span>
               </div>
               
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
         name        : 'gallery_page',
         
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
      .gallery {
         display: flex;
         flex-direction: column;
      }
      
      .gallery .category {
         display: flex;
         flex-wrap: wrap;
         width: 100%;
      }
      .gallery .gallery_title {
         width: 100%;
         padding: .5rem 0;
         font-size: 1.5rem;
         color: var(--titleColor);
      }
      .gallery .item {
         width: 15rem;
         height: 15rem;      
      }
      .gallery .image {
         display: flex;
         width: 100%;
         height: 100%;
         background-size: cover;   
         background-position: center center;
         overflow: hidden;
      }
	
	</style>