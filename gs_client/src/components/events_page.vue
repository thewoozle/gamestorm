
	<template>
		<div id="events_page">
		
      
			<div class="sections">	
         
				<section class="section events_intro">
					<div class="content_wrapper">	
						<span class="section_title">GameStorm Events</span>
      
						<div class="content intro" v-if="pageContent.events_intro" v-html="pageContent.events_intro.content"></div> 
						<p>Event submissions will be Open from {{day_date(currentCon.event_submissions_open)}} through {{day_date(currentCon.event_submissions_close)}}.</p>
						<p>Event Signups will be Open from {{day_date(currentCon.signups_open)}} through {{day_date(currentCon.signups_close)}}.</p>
					</div>
					
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
                  
                  <div class="events" v-html="filtered_events()"></div>
               
               
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
               eventsFilter      : 'event_day_num',
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
            vm.$store.dispatch('get_news_articles').then(()=> {});
            vm.$store.dispatch('get_events', {'selected_con' : vm.currentCon.tag_name}).then(()=>{ });            
         },
         
			mounted: function() {
				
			},
			
			
			methods: {
				filtered_events() {
               
               // FOR GAMECONAPP_EVENT
               var   vm       = this,
                     day      = null,
                     hour     = null,
                     events   = vm.conEvents,
                     eventList= '';   
               
               
                  Object.entries(events).forEach(([key, event]) => {
                     
                     if (event.start_time) {
                        
                        event.event_day_num = vm.event_dayofweek(event.start_time);
                        event.event_day = vm.event_day(event.start_time);                        
                        event.event_start_time = vm.tag_time(event.start_time);
                     } else {
                        event.event_day = '';
                        event.start_time = '';
                     }
                     
                  });
               
               if(vm.conEvents) {
                  
                  //sort events by vm.eventsfilter
						switch(vm.eventsfilter) {
							case 'event_day_num' :
                     //console.log(vm.memberSort);
								members =  vm.conEvents.sort((a, b) => {
									b[vm.eventsFilter] === null? -1: console.log(b[vm.eventsFilter]);
									return parseInt(a[vm.eventsFilter]) - parseInt(b[vm.eventsFilter]);
								});							
								break;
                        
                     default: 
                        events = vm.conEvents;

                  }
                  
                  
                  Object.entries(events).forEach(([key, event]) => {
                     
                     var  eventPresenters= '',
                           eventCapacity  = null,
                           trackColor     = '',
                           eventDetails   = '',
                           textColor      = '',
                           conEvent       = '';
                           
                     switch (event.track) {
                        case 'BOARD' : 
                           trackColor = '#5cff6c';
                           textColor   = '#222'; 
                           break;
                        case 'RPG' : 
                           trackColor = '#fb94c3';
                           break;
                        case 'LARP' : 
                           trackColor = '#fbbc04';
                           break;
                        case 'LAB' : 
                           trackColor = '#58a3ff';
                           break;
                        case 'CONSL' : 
                           trackColor = '#f0e8db';
                           break;
                        case 'MINIS' : 
                           trackColor = '#828282';
                           break;
                        case 'PANEL' : 
                           trackColor = '#d6aaee';
                           break;
                        case 'SPECL' : 
                           trackColor = '#dedede';
                           break;
                        case 'CCG' : 
                           trackColor = '#98c6ff';
                           break;
                        case 'IH' : 
                           trackColor  = '#795435';
                           break;
                        case 'PAW' : 
                           trackColor = '#e07b03';
                           break;
                        case 'SHADW' : 
                           trackColor = '#ff5761';
                           break;
                        case 'CHAOS' : 
                           trackColor = '#ff5761';
                           break;
                        case 'PATH' : 
                           trackColor = '#ff5761';
                           break;
                        case 'PATH' : 
                           trackColor = '#ff5761';
                           break;
                        case 'AL' : 
                           trackColor = '#ff5761';
                           break;
                        case 'KIDS' : 
                           trackColor = '#f2fb78';
                           break;
                        case 'CREATION' : 
                           trackColor = '#0d96c1';
                           break;
                           
                        default: 
                           trackColor = '#c0c0c0';
                     }      
                     
                     if(event.role == 'GM') {      
                        eventPresenters += '<span class="presenter">'+event.first_name+' '+ event.last_name+'</span>';
                     }
                     
                     eventCapacity = '<span class="event_capacity">'+event.player_max+'</span>';
                     
                     
                     eventDetails = '<div class="event_dropdown">';
                     eventDetails += '  <i class=" caret fas fa-caret-up"></i>';
                     eventDetails +='  <div class="info capacity_info">';
                     eventDetails +='     <span class="detail">this event has x seats available, be the first to sign-up</span>';
                     eventDetails +='     <span class="detail">this event has x seats with x open seats available. </span>';
                     eventDetails +='     <span class="detail">this event is full. </span>';
                     eventDetails +='     <span class="full_message">Adding this event to your schedule will make you #x on the waitlist</span>';
                     eventDetails += ' </div>';
                     eventDetails += ' <div class="info long_description">'+event.long_description+'</div>';
                     eventDetails += ' <div class="info event_location">'+event.name+'</div>';
                     eventDetails += '</div>';
                         
                     conEvent += '<div class="event '+ event.track+'" style="background-color: '+ trackColor+'; color :'+textColor+';">'; 
                     conEvent += '  <span class="event_name" >'+ event.event_name+'</span>';
                     conEvent +=    eventCapacity;
                     conEvent += '  <span class="presenters">';
                     conEvent +=       eventPresenters;
                     conEvent += '  </span>';
                     conEvent +=    eventDetails;
                     conEvent += '  <span class="">'+ event.event_day+' - '+event.event_start_time+'</span>'; 
                     conEvent += '</div>';
                     
                     
                     
                     eventList += conEvent;
                        
                  });
               
               
               }
               
               
               
               
               
               
               
               
               
               
               
               
               
               
               
               /* FOR EVENTS
               var   vm    = this,
                     day   = null,
                     hour  = null,
                     timeblocks = '';   
               
               if(vm.conEvents) {
                  Object.entries(vm.conEvents).forEach(([key, event])=>{
                     
                     var   eventDay       = vm.event_day(event.event_start_time),
                           eventTime      = vm.tag_time(event.event_start_time),
                           eventPresenters= '',
                           eventCapacity  = null,
                           eventDetails   = '',
                           conEvent       = '';
                           
                     Object.entries(event.presenters).forEach(([key2, presenter]) => {
                        eventPresenters.length > 1? eventPresenters +=  ', &nbsp; ' : '';
                        eventPresenters += '<span class="presenter">'+presenter.first_name+' '+presenter.last_name+'</span>';
                     });
                     
                     eventCapacity = '<span class="event_capacity"></span>'
                     
                     
                     eventDetails = '<div class="event_dropdown">';
                     eventDetails += '  <i class=" caret fas fa-caret-up"></i>';
                     eventDetails +='  <div class="info capacity_info">';
                     eventDetails +='     <span class="detial">this event has x seats available, be the first to sign-up</span>';
                     eventDetails +='     <span class="detial">this event has x seats with x open seats available. </span>';
                     eventDetails +='     <span class="detial">this event is full. </span>';
                     eventDetails +='     <span class="full_message">Adding this event to your schedule will make you #x on the waitlist</span>';
                     eventDetails += ' </div>';
                     eventDetails += ' <div class="info long_description">'+event.event_description+'</div>';
                     eventDetails += ' <div class="info event_location">'+event.location+'</div>';
                     eventDetails += '</div>';
                     
                           
                     conEvent += '<div class="event '+ event.event_tag+'" style="background-color: '+ event.track_color+'">'; 
                     conEvent += '  <span class="event_name" >'+ event.event_name+'</span>';
                     conEvent +=    eventCapacity;
                     conEvent += '  <span class="presenters">';
                     conEvent +=       eventPresenters;
                     conEvent += '  </span>';
                     conEvent +=    eventDetails;
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
               */
               vm.$store.dispatch('reset_activity_timer');
               return eventList;
               
            },
            
            
			}
			
		}
	</script>
	
	
	<style>
	
      .events_intro {
         flex-direction: column;
      }
      .events_intro .content_wrapper {
         flex-wrap: wrap;
         padding: 2rem 0;
      }
      .events_intro .section_title {
         width: 100%;
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
      .events_display .events {
         flex-wrap: wrap;
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
      
      .events_display .event_list .event {
         position: relative;
         display: flex;
            flex-direction: column;
         background: #bbb;
         padding: .25rem .35rem;
         height: 4rem;
         border-radius: .25rem;
         margin: .1rem .25rem; 
         cursor: pointer;
         border: solid 1px rgba(0,0,0,0.15);
         box-shadow: 1px 1px 1px rgba(255,255,255,.15);
         transition: opacity .3s;
      }
      .events_display .event_list .event:hover {
         opacity: .9;
         z-index: 25;
      }
      .events_display .event_list .event .event_name {
         display: flex;
         min-width: 6rem;
         letter-spacing: .025em;
         font-size: .9rem;
         color: inherit;
         padding-right: 3.5rem;
         text-shadow: -1px -1px 0px rgba(0,0,0,0.25);
      }
      .events_display .event_list .event .presenters {
         display: flex;
         padding: 0 .25rem;
         margin: .25em 0 0 0;
         background: rgba(255,255,255,.25);
         color: #000;
         font-size: .7rem;
         text-shadow: 1px 1px 1px rgba(255,255,255,.35);
      }
      .events_display .event_list .event .event_capacity {
         position: absolute;
            top: 0;
            right: 0;
            z-index: 10;
            width: 3rem;
            height: 1rem;
            margin: .25rem;
            border-radius: .1rem;
            background: rgba(0,0,0,0.35);
         
      }
      .events_display .event_list .event .event_dropdown {
         display: flex;
            flex-wrap: wrap;
         position: absolute;
            top: calc(100% + .75rem);
            left: -5rem;
            z-index: -1;
         max-height: 0;
         width: 100vw;
         max-width: 30rem;
         opacity: 0;         
         border-radius: .35rem;
         overflow: hidden;
         color: var(--mainColor);
         background: var(--altColor);
         filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.5) );
         padding: .5rem; 
         transition: opacity .3s, position .3s, max-height .3s;
      }
      .events_display .event_list .event:hover .event_dropdown {
         z-index: 10;
         max-height: 30rem;
         overflow: visible;
         opacity: 1;
         color: var(--mainColor);
         border: solid 3px #444;
      }
      .events_display .event_list .event .event_dropdown .caret {
         position: absolute;
            top: -1.4rem;
            left: 5rem;
            z-index: 10; 
         font-size: 2rem;   
         color: #444;
      }
      .events_display .event_list .event .event_dropdown .info {
         display: flex;
            flex-wrap: wrap;
         color: var(--mainColor);
         width: 100%;
      }
      .events_display .event_list .event .event_dropdown .detail {
         color: inherit;
      }
	
	
	
	</style>
	
	