	<script>
	/*	------------------------------------------------------------------------------
						MAIN PAGE VIEW
						
			- Site intro blurb, and current-con graphic. 
		------------------------------------------------------------------------------	*/
	</script>
	
	<template>
		<div id="main_page">
			<div class="page_background" :style="{'background-image': 'url('+siteContent[this.$route.name].backgroundPlaceholder+')'}" >
				<video	playsinline="" 
						autoplay="autoplay" 
						muted="muted" 
						preload="auto" 
						:poster="siteContent[this.$route.name].backgroundPlaceholder" 
						onended="this.style.visibility='hidden'; this.play()" 
						oncanplay="d = this;setTimeout(function() {d.style.visibility= 'visible'},250);" 
						class="video" 
						style="visibility: visible;">
						<source :src="this.siteContent[this.$route.name].background" type="video/mp4">
				</video>
			</div>
			
         

			<div class="sections">
         
				<section class="section  site_intro">
					<div class="content" v-if="pageContent.title_blurb" v-html="pageContent.title_blurb.content"></div>
               		
				</section> 
            
            
            <section class="section con_info next_con"  v-if="pageContent.next_con_blurb" v-html="pageContent.next_con_blurb.content"></section>
            
				<section class="section news">        

               <div class="news_list">
                  <span class="article_button news_date" :class="article.show_post? 'open': ''" v-if="articles" @click="$store.dispatch('show_article', article.post_id).then(()=>{$forceUpdate()});" v-for="article in articles">
              			<span class="date_bullet"  v-html="article_date(article.start_date)">
                     </span> <span class="title" v-text="article.post_title"></span>
                     <span class="arrow fal fa-caret-right"></span>
                  </span>
               </div>
               
               <div class="news_items">
                  <div class="news_item" :class="article.show_post? 'show' : ''" v-if="articles" v-for="article in articles">
								<span class="title" v-text="article.post_title"></span> 
                        <div class="content" v-html="'<div>'+article.body+'</div>'"></div>                     
							<footer class="news_footer"></footer>
                  </div>   
					</div>
               
				</section> 
            
				
				<section class="section con_info prev_con">
               <div class="content" v-if="pageContent.prev_con_blurb" v-html="pageContent.prev_con_blurb.content"></div>
				</section>
				
				
				<partners class="section" />
			</div>
		
		
		
		</div>
	</template>
	
	
	
	<script>
		import Vue from 'vue'
		import moment from 'moment'
		import partners from '@/components/includes/partners'
		import { mapGetters, mapSate } from 'vuex';
		import Router from 'vue-router'
		import Storage from 'vue-ls'
		
		export default{
			name: 'main_page',
			
			
			data() {
				return {
				}
			},
			
			
			
			watch: {
				
			},
			
			components: {
				'partners' : partners, 
			},
			
			
			computed: {
				...mapGetters({
					pageContent 	: 'pageContent',
					siteContent 	: 'siteContent',
					articles		   : 'articles',
               userInfo       : 'userInfo',
               currentCon     : 'currentCon',
               user           : 'user',
					//showMenu		: 'showMenu'
				}),
			},
			
			created: function() { 
				var vm = this;
            vm.get_user_info();
         },
         
         methods: {
            
            get_user_info() {
               var vm = this;
               if(vm.user) {
                  vm.$store.dispatch('get_user_info', {'uuid' : vm.user.uuid, 'selectedCon' : vm.currentCon.tag_name}).then(()=>{});
               } 
            }
         },
			mounted: function() { 
			},
			
			
			
		}
	</script>
	
	
	<style>	
   
      .main_view .section,
      .main_view .section  .content {
         flex-wrap: wrap;
      }
      .main_view .section + .section {
         margin-top: 2rem;
      }
      
		.main_view .section_title {
      }
      
		.section.site_intro {
			width: 100%;
			margin: 5vh auto 0;
		}
		.section.site_intro .content,
		.section.con_info .content {
         font-size: 1.75rem;
         font-weight: 300;
      }
      .section.con_info .content {
         flex-wrap: wrap;
      }
      .section.con_info .section_title {
         width: 100%;
      }
      .section.con_info .section_title {
         width: 100%;
      }
      
      .section.news {
         justify-content: space-between;
         padding: 0 1rem;
      }
      .section.news .news_list {
         width: 20rem;
         flex-direction: column;
         justify-content: space-between;
      }
      .section.news {
         border: solid 1px #555;
         border-radius: .25rem;
         padding: 1.5rem 2rem;
         background: rgba(0,0,0,0.1);
      }
      .section.news .news_items {
         position: relative;
         width: calc(100% - 22rem);
         padding-left: 1rem; 
         flex-direction: column;         
      }
      .section.news .news_items .news_item {
         position: absolute;
         top: 0;
         width: 100%;
         max-height: 0;
         overflow: hidden;
         padding: 0 1rem;
         flex-wrap: wrap;
         opacity: 0;
         transition: opacity .4s, max-height .5s, overflow .4s;
      }
      .section.news .news_items .news_item .title {
         color: var(--titleColor);
         width: 100%;
         font-weight: bold;
         font-size: 1.25rem;
      }
      .section.news .news_items .news_item .content {
         padding-left: .5rem;
      }
      .section.news .news_items .news_item .content * {
         flex-wrap: wrap;
         display: inline;
      }
      .section.news .news_items .news_item .content p {
         margin: .25rem 0;
         font-weight: 300;
      }
      .section.news .news_items .news_item + .news_item {
         margin-top: 1rem;
      }
      .section.news .news_items .news_item.show {
         max-height: 25rem;
         position: relative;
         overflow: auto;
         opacity: 1;
      }
      
      




      /*  ---------------------------------------------------------------------------------
								RESPONSIVE LAYOUT
			---------------------------------------------------------------------------------  	*/
		@media (max-width:800px) { /* tablet, large phone */ 
			
         .section.intro {
            justify-content: space-between;
            width: 100%;
            margin: 5vh auto 1vw;
         }
         
         .section.intro .news_items,
         .section.intro .site_intro {
            width: 100%
         } 
         .section.intro .site_intro {
            margin-top: 2rem;
         } 
      
		}
		
		@media (max-width:400px) { /* small phone */ 
		
		}
	
   
   
   

	
      
		
	
	</style>