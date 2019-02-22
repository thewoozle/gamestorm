
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
                  <pre style="color: red">
                  loop through filtered event list (default start_time). 
                  track day and hour variables. 
                  if different day, show DAY line
                  if different hour, show HOUR sidebar
                  </pre>
                  
                  <div class="timeblocks" v-html="timeblocks()"></div>
               
               
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
				timeblocks() {
               var   vm    = this,
                     day   = null,
                     hour  = null,
                     timeblocks = '';   
               
               if(vm.conEvents) {
                  Object.entries(vm.conEvents).forEach(([key, event])=>{
                     
                     var   eventDay       = vm.event_day(event.event_start_time),
                           eventTime      = vm.tag_time(event.event_start_time),
                           eventPresenters= '',
                           conEvent       = '';
                           
                     Object.entries(event.presenters).forEach(([key2, presenter]) => {
                        eventPresenters.length > 1? eventPresenters +=  ', &nbsp; ' : '';
                        eventPresenters += '<span class="presenter">'+presenter.first_name+' '+presenter.last_name+'</span>';
                     });
                     
                           
                     conEvent += '<div class="event '+ event.event_tag+'" style="background-color: '+ event.track_color+'">'; 
                     conEvent += '  <span class="event_name" >'+ event.event_name+'</span>';
                     conEvent += '  <span class="presenters">';
                     conEvent += eventPresenters;
                     conEvent += '</div>';
                     
                     
                     
                     if(eventTime != hour) {
                        hour != null? timeblocks += '</div></div>' : '';   // close both events and timeblock
                        
                        if(eventDay != day) { 
                           //day != null? timeblocks += '</div>' : '';
                           day = eventDay;                        
                           timeblocks += '<div class="day_wrapper">'+vm.event_date(event.event_start_time)+'</div>';
                        }
                           
                        
                        hour = eventTime;
                        timeblocks += '<div class="timeblock">';
                        timeblocks += '   <span class="time">'+eventTime+'</span>';
                        timeblocks += '   <div class="events">';
                     }
                        timeblocks += conEvent;
                  });
               
               }           
               
               
               /*
                  <div class="day_wrapper">
                     <span class="day_name">Thursday</span>,
                     <span class="day_date">Mar 27th</span>
                  </div>
               
                  <div class="timeblock">
                     <span class="time">11:00am</span>
                     <div class="events">
                     
                     
                     
                        <div class="event" :class="'tag_'+event.event_tag" v-for="event in filtered_con_events()" v-bind:style="{'background-color' : event.track_color}">
                           <span class="" v-text="event.event_name"></span>
                           
                           <span class="presenters">
                              <span class="presenter" v-for="presenter in event.presenters" v-text="presenter.first_name+' '+presenter.last_name"></span>
                           </span>
                        </div>
                     </div>   
                  </div>   
               */
               
               
               return timeblocks;
               
            },
            
            
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
         width: 100%;
         background: var(--altBackground)
      }
      .events_display .event_list .day_wrapper {
         display: flex;
         width: 100%;
         justify-content: flex-start;
         color: var(--textColor2);
         padding: 0 0 0 .5rem;
         margin: 1rem 0 .5rem 0;
         font-size: 1.1rem;
      }
      .events_display .day_wrapper .day_name {
         display: flex;
         font-weight: bold;
      }
      .events_display .day_wrapper .day_date {
         display: flex;
         font-weight: 100;
         color: #333;
      }
      .events_display .timeblock {
         display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
         width: 100%;         
      }
      .events_display .timeblock + .timeblock {
         margin-top: .25rem;
      }
      .events_display .timeblock .time {
         display: flex;
         justify-content: flex-end;
         height: 100%;
         width: 4.5rem;
         padding: 1rem .5rem 0 0;
         color: var(--textColor2);
      }
      .events_display .events  {
         display: flex;
         flex-wrap: wrap;
         border-left: solid 1px #c5c5c5;
         width: calc(100% - 6rem);
        
      }
      
      .events_display .events .event {
         display: flex;
            flex-wrap: wrap;
         background: #bbb;
         padding: .25rem .35rem;
         min-height: 3rem;
         border-radius: .25rem;
         margin: .1rem .25rem; 
         cursor: pointer;
         border: solid 1px rgba(0,0,0,0.15);
         box-shadow: 1px 1px 1px rgba(255,255,255,.15);
         transition: opacity .3s;
      }
      .events_display .events .event:hover {
         opacity: .9;
      }
      .events_display .events .event .event_name {
         display: flex;
         width: 100%;
         letter-spacing: .025em;
         text-shadow: -1px -1px 0px rgba(0,0,0,0.25);
      }
      .events_display .events .event .presenters {
         display: flex;
         padding: 0 .25rem;
         margin: .25em 0 0 0;
         background: rgba(255,255,255,.25);
         color: #000;
         font-size: .7rem;
         text-shadow: 1px 1px 1px rgba(255,255,255,.35);
      }
	
	
	
	</style>
	
	