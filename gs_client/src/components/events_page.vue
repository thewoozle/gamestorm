
	<template>
		<div id="events_page">
		
      
			<div class="sections">	
         
				<section class="section events_intro">
					<div class="content_wrapper">	
						<span class="section_title">GameStorm Events</span>
      
						<article class="content intro" v-if="pageContent.events_intro" v-html="pageContent.events_intro.content"></article> 
						<p>Event submissions will be Open from {{day_date(currentCon.event_submissions_open)}} through {{day_date(currentCon.event_submissions_close)}}.</p>
						<p>Event Signups will be Open from {{day_date(currentCon.signups_open)}} through {{day_date(currentCon.signups_close)}}.</p>
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
            
            
				<section class="section events_display">
               <div class="control_bar">
                  <button type="button" class="control_button" 
                     @click="eventsDisplayOption== 'list'? eventsDisplayOption = 'grid' : eventsDisplayOption = 'list'" 
                     v-text="eventsDisplayOption== 'list'? 'grid' : 'list'"
                  ></button>
               </div>
               
               <div class="event_list" :class="eventsDisplayOption">
                           
                  <div class="timeblock">
                     <span class="time">11:00am</span>
                     <div class="events">
                        <div class="event" :class="'tag_'+event.event_tag" v-for="event in conEvents" v-bind:style="{'background-color' : event.track_color}">
                           <span class="" v-text="event.event_name"></span>
                           
                           <span class="presenters">
                              <span class="presenter" v-for="presenter in event.presenters" v-text="presenter.first_name+' '+presenter.last_name"></span>
                           </span>
                        </div>
                     </div>   
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
					showEventForm	   : null,
					newGm			      : null,
               eventsDisplayOption: 'list',
				}
			},
			
			
			watch: {
				
				
			},
			
			
			computed: {
				...mapGetters({
					pageContent 	: 'pageContent',
					articles		   : 'articles',
					conventionInfo	: 'conventionInfo',
               currentCon     : 'currentCon',
               conEvents      : 'conEvents',
				}),
			},
			
			created() {
            var vm = this;
            vm.$store.dispatch('get_con_events').then(()=>{});            
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
      
      .events_display .event_list {
         display: flex;
         flex-direction: column;
         padding: .5rem;
         background: var(--altBackground)
      }
      .events_display .timeblock {
         display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
         width: 100%;         
      }
      .events_display .timeblock .time {
         display: flex;
         justify-content: flex-end;
         height: 100%;
         width: 6rem;
         padding: .5rem .5rem 0 0;
         color: var(--textColor2);
      }
      .events_display .events  {
         display: flex;
         flex-wrap: wrap;
         padding: .25rem;
         border-left: solid 1px #c5c5c5;
         width: calc(100% - 6rem);
        
      }
      
      .events_display .events .event {
         background: #bbb;
         padding: .5rem;
         min-height: 3rem;
         border-radius: .25rem;
         margin: .25rem; 
      }
	
	
	
	</style>
	
	