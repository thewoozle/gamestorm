
	<template>
		<div class="component gallery_page">
         <div class="show_image" v-bind:class="showImage? 'show' : ''" @click.prevent="showImage = null">
            <span class="image"  v-bind:style="{'background-image' : 'url('+showImage+')'}" ></span>
         </div>
      
      
         <section class="section gallery">
            <div class="category"  v-for="category in galleryData">
            
               <span class="gallery_title title"  v-text="category.title"></span>
               <div class="item" v-for="item in category.items" @click.prevent="showImage = galleryLocation + item.file_name">
                  <span class="description">{{item.file_description}}</span>
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
               galleryLocation: '/static/images/gallery/',
               showImage      : null,    
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
      .gallery_page .show_image {
         position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
         display: flex;
         opacity: 0;
         pointer-events: none;
         height: 100vh;
         width: 100vw;
         cursor: pointer;
         transition: opacity .3s, z-index .3s;
      }
      .gallery_page .show_image.show {
         opacity: 1;
         z-index: 100;
         pointer-events: auto;
         background: rgba(0,0,0,0.75);
      }
      .gallery_page .show_image .image{
         height: 100%;
         width: 100%;
         background-position: center center;
         background-size: contain;
      }
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
         position: relative;
         width: 15rem;
         height: 15rem;      
         padding: .35rem;         
         cursor: pointer;
         transition: padding .3s;
      }
      .gallery .item:hover {
         padding: 0;
      }
      .gallery .item .description {
         display: flex;
         position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
         width: 100%;   
         opacity: 0;
         
      }
      .gallery .image {
         display: flex;
         width: 100%;
         height: 100%;
         border-radius: .15rem;
         background-size: cover;   
         background-position: center center;
         box-shadow: .1rem -.1rem .15rem rgba(0,0,0,0.3memspector5);
         overflow: hidden;
      }
	
	</style>