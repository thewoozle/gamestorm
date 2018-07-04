
	<template>
		<div id="events_page">
		
				
			<div class="sections">	
				<section class="section events_intro">
					<div class="content_wrapper">	
						<span class="section_title">GameStorm Events</span>
						
						<article class="content intro" v-if="pageContent.con_intro" v-html="pageContent.events_intro.content"></article> 
						<p>Event submissions open on {{day_date(conventionInfo.event_submissions_open)}}</p>
					</div>
					
					<div class="news_items">
							<span class="subsection_title">Events News</span>
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
				
				</section> 
				
				
				
				
				
				
				<section class="section slideout event_submission_slideout" :class="showEventForm? 'show' : ''">		
					<div class="control_bar">
						<button type="button" class="control_button fal fa-times"></button>
						<button type="button" class="control_button fal fa-redo-alt"></button>
					</div>
					<div class="section_content">
						<div class="coming_soon_message editable" v-if="pageContent.submissions_closed_message">{{pageContent.submissions_closed_message.content}}</div>
					
				
						
						<div class="gm_tos" v-bind:class="newGm? 'show' : ''">
							<div class="tos_content_wrapper">
								<div class="tos_content">
									<article class="content editable" ></article>
									<div class="accept">
										<span class="checkbox_wrapper"><input type="checkbox" class="checkbox" name="gm_acknowledge" @click="newGm = false" /></span>
										<span class="text">I acknowledge and accept these terms</span>
									</div>	
								</div>	
							</div>	
						</div>
					</div>
				
				</section>
		
			</div>
		</div>
	</template>
	
	
	
	<script>
		import Vue from 'vue'
		import moment from 'moment'
		import { mapGetters } from 'vuex';
		import Storage from 'vue-ls'
		
		export default{
			name: 'events_page',
			
			
			data() {
				return {
					showEventForm	: null,
					newGm			: null,
				}
			},
			
			
			watch: {
				
				
			},
			
			
			computed: {
				...mapGetters({
					pageContent 	: 'pageContent',
					articles		: 'articles',
					conventionInfo	: 'conventionInfo',
				}),
			},
			
			
			mounted: function() {
				
			},
			
			
			methods: {
				
			}
			
		}
	</script>
	
	
	<style>
	
		.news_items {
			position: absolute;
				top: 0;
				left: 0;
			width: 12rem;
		}
	
	
	
	</style>
	
	