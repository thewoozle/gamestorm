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
         
				<section class="section intro">
				
					<div class="news_items">
						<div class="news_item" v-bind:class="article.open? 'open' : ''" v-if="articles" v-for="article in articles">
						
							<span class="news_date" >
								<span class="date_bullet active" v-html="article_date(article.start_date)"></span> 
							</span>
							
							<article class="news_article" :class="article.show_post? 'show' : ''"  >
								<span class="title" v-text="article.post_title"></span> 
                        <div class="content" v-html="article.body"></div>
                        </article>
                     <button class="article_button fal" v-bind:class="article.show_post? 'fa-arrow-alt-square-up':'fa-arrow-alt-square-down'" @click="$store.dispatch('show_article', article.post_id).then(()=>{$forceUpdate()});"></button>
						</div>
							<footer class="news_footer">
								
							</footer>
					</div>
               
               
					<div class="site_intro" v-if="pageContent.con_intro" v-html="pageContent.con_intro.content">
					</div>
					
				
				</section> 
				
				
				<section class="section current_con_intro">
            <span class="section_title"><span class="text">GameStorm 22</span></span>
				<p>GS 22 will be at the Jantzen Beach Red Lion again this year</p>
            <pre>show artwork, guests as available, number of registered members (not staff)</pre>
            
            
            <pre>Membership registration for GS22 is now open</pre>
            
            

               <pre>Event Registration / submit events</pre>               
                           
                           
				</section>
				
				<section class="section previous_con_intro">
            <span class="section_title"><span class="text">GameStorm 21 was another smash hit</span></span>
				<pre> show some gallery images and a couple comments, number of guest GM memberships</pre>
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
            
            vm.$store.dispatch('get_news_articles').then(()=> {});
            
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
   
		.section.intro {
         jsutify-content: space-between;
			width: 100%;
			margin: 5vh auto 0;
			padding: 0 0 0 1rem;
		}
      
		.section.intro .news_items {
         flex-direction: column;
      }
		.section.intro .site_intro {
         flex-direction: column;
      }
		.section.intro .site_intro p {
			font-size: 1.75rem;
			line-height: 1.35em;
			letter-spacing: .025em;
			font-weight: 300;
			margin: .75rem 0;
			text-align: center;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.35);
		}
      .main_view .section {
         flex-wrap: wrap;
      }
      .main_view .section + .section {
         margin-top: 2rem;
      }
		.main_view .section_title {
      }
      


	
		
	
	</style>