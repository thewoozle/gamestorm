
	<template>
		<div id="news_hub" class="news_hub admin_page">
         <span class="title admin_title">News Hub</span>
               
         <section class="section articles">                        
            <div class="articles_list">
               <div class="article" :class="article.active? 'active' : 'inactive'" v-for="article in allArticles">
                  <div class="header" @click.prevent="article.show? article.show = false : article.show = true">
                     <div class="content">
                        <span class="active_icon" :class="article.active? 'active fas fa-circle':'inactive fal fa-power-off'"></span>
                           <span class="article_title" v-text="article.article_title"></span>
                           <div class="dates">
                              <span class="" v-text="article.start_date? 'start: '+date_time(article.start_date) : 'start: auto'"></span>
                              <span class="" v-text="article.end_date? 'end: '+ date_time(article.end_date): 'end: open'"></span>
                           </div>
                           <div class="controls">
                              <button class="control_button fal" :class="article.active? 'fa-power-off' : 'fa-circle'" v-bind:title="article.active? 'force-deactivate this article' : 'force-activate this article'"></button>
                              <button class="control_button fal fa-trash-alt"></button>
                           <button class="control_button">clear</button>
                           <button class="control_button">edit/save</button>
                           </div>   
                        </div>
                        <div class="controls">
                           <span class="control_button fal " :class="article.show? 'active fa-arrow-square-up' : 'fa-arrow-square-down'"></span>
                        </div>   
                     </div>   
                     <div class="article_body" :class="article.show? 'show' : ''" >
                        <textarea class="text_box" v-text="article.body" ></textarea>
                     </div>
                     <span class="" v-text="article.article_tags"></span>
               </div >
            </div>
         </section>

		</div>
	</template>
	
	<script>
      import Vue from 'vue'
      import { mapState, mapGetters } from 'vuex'
		import Router from 'vue-router'
		import { Datetime } from 'vue-datetime'
			
		Vue.use(Router);
		Vue.use(Datetime);
      
      export default{
         name: 'news_hub',
         
         data() {
            return{
            }
         },
         
         watch: {
            
         },
         
         
			computed: {
				...mapGetters({
               allArticles       : 'allArticles',
					user			      : 'user',
				}),
            
				
			},
         
         created() {
            var vm = this;
				vm.check_user();
				vm.$store.dispatch('get_all_articles').then(() => {});
         },
         methods: {
            
				// CHECK USER PAGE PERMISSION
				check_user() {
					var vm = this;					
					if (vm.user) {
						if (vm.user.permissions) {
							if (vm.user.permissions.admin) {
								vm.userPass = true;
							} 
						} 
					}		          
					vm.userPass? '' : vm.$router.push('/mainpage');					
				},
            
                        
         }
		}
	
	</script>
   
	
	<style>
      .news_hub .admin_title {
         justify-content: center;
      }
      .news_hub .active_title {
         display: flex;
         width: 100%;
         font-weight: bold;
      }
      .news_hub .articles_list {
         flex-direction: column;
      }
      .news_hub .article {
         padding: .5rem;
         flex-wrap: wrap;
      }
      .news_hub .article + .article{
         margin-top: .5rem;
         position: relative;
      }
      .news_hub .article.active {
         background: rgba(255,255,255,.25);
         
      }
      .news_hub .article.inactive {
         background: rgba(0,0,0,0.15);
      }
      
      .news_hub .article .header {
         display: flex;
         justify-content: space-between;
         width: 100%;
         cursor: pointer;
         align-items: center;
         justify-content: space-between;
      }
      .news_hub .article .header .content {
         
      }
      .news_hub .article .article_title {
         display: flex;
         flex: 1;
         padding: 0 .5rem;
      }
      .news_hub .article .active_icon {
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 50%;
         margin: 0 .5rem;
         width: 1.25rem;
         height: 1.25rem;
         font-size: 1.15rem;
         overflow: hidden;
      }
      .news_hub .article .active_icon.active {
         color: var(--passColor);
         border: solid 2px var(--button2);
      }
      .news_hub .article .active_icon.inactive {
         color: var(--button);
      }
      .news_hub .article .dates {
         display: flex;
         flex-direction: column;
         font-size: .9rem;
      }
      .news_hub .controls .control_button {
         display: flex;
         color: var(--lightColor);
         align-items: center;
         justify-content: center;
         font-size: 1.5rem;
         width: 1.5rem;
         height: 1.5rem;
         margin: 0 .5rem;
      }
      .news_hub .controls .control_button.active,
      .news_hub .controls .control_button:hover {
         color: var(--button);
      }
      .news_hub .article .article_body {
         max-height: 0;         
         overflow: hidden;
         width: 100%;
         transition: max-height .3s;
      }
      .news_hub .article .article_body.show {
         max-height: 30rem;
         border: solid 1px #aaa;
         border-radius: .25rem;
      }
	
	</style>