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
						<div class="news_item" v-if="articles" v-for="article in articles">
						
							<button type="button" class="news_button" @click="article.open? article.open = false : article.open = true">
								<span class="title" v-text="article.article_title"></span> 
								<span class="date_bullet active" v-html="article_date(article.start_date)"></span> 
							</button>
							
							<article class="news_article" v-if="article.open" v-html="article.article_body"></article>
							<footer class="news_footer">
								
							</footer>
						</div>
					</div>
               
               
					<div class="content_wrapper">	
						<article class="content intro" v-if="pageContent.con_intro" v-html="pageContent.con_intro.content"></article>
					</div>
					
				
				</section> 
				
				
				<section class="section current_con_intro">
            <span class="section_title"><span class="text">GameStorm 22</span></span>
				<p>GS 22 will be at teh Jantzen Beach Red Lion again this year</p>
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
            vm.$store.dispatch('get_news_articles').then(()=>{});
            vm.get_user_info();
				vm.check_logged_in();
         },
         
         methods: {
            
            get_user_info() {
               var vm = this;
               if(vm.user) {
                  vm.$store.dispatch('get_user_info', {'uuid' : vm.user.uuid, 'selectedCon' : vm.currentCon.tag_name}).then(()=>{
                  });
               } else {
                  vm.$router.push('/');
                  
               }
            }
         },
			mounted: function() { 
			},
			
			
			
		}
	</script>
	
	
	<style>	
   
		.section.intro {
			max-width: 50rem;
			margin: 5vh auto 0;
			padding: 0 0 0 1rem;
		}
		.section.intro .intro p {
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
		.news_items {
			position: absolute;
				top: 0;
				left: 0;
			width: 12rem;
		}


	
		
	
	</style>