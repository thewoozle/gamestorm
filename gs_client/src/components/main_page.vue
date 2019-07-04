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
				<p>Current Convention intro (GS22)</p>
            <pre>show artwork, guests</pre>
				
				</section>
				
				<section class="section previous_con_intro">
				<p>Previous Convention intro (GS21)</p>
				<pre> show some gallery images and a couple comments</pre>
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
					//showMenu		: 'showMenu'
				}),
			},
			
			created: function() { 
				var vm = this;            
            vm.$store.dispatch('get_news_articles').then(()=>{});
			},
			
			mounted: function() { 
			},
			
			
			methods: {	
			}
			
		}
	</script>
	
	
	<style>	
   
		.section.intro {
			max-width: 50rem;
			margin: 8rem auto 0;
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
		
		.news_items {
			position: absolute;
				top: 0;
				left: 0;
			width: 12rem;
		}


	
		
	
	</style>