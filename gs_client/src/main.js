// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
	import Vue from 'vue'
	import App from './App'
	import Vuex from 'vuex'
	import router from './router'
	import Axios from 'axios'
	import VueAxios from 'vue-axios'
	import moment from 'moment'
	import store from './store'
	import Storage from 'vue-ls'
	import options from './ls_options'
	
	Vue.use(VueAxios, Axios)
	Vue.use(Vuex)	
	//new Vue(Vue.util.extend({ router }, App)).$mount('#app');
	Vue.config.productionTip = false;
   
   
	Vue.prototype.$log = console.log;
   
   
	Vue.mixin({
		created: function() {},
		methods: {
         
         
         
         /*	----------------------------------------------------------- 
                     CHECK TAGS	
            -----------------------------------------------------------	*/
         check_tags() {
            // var vm = this;
            // if (Vue.ls.get('user') && Vue.ls.get('user').length > 0) {
            // console.log(Vue.ls.get('user').length);
               //vm.$store.dispatch('update_user', Vue.ls.get('user') );						
            // } else {
               // if (vm.$route.name != 'mainpage') {
                  // vm.$router.replace({name: 'mainpage'});
               // }
            // }					
			},	
            
            
            scroll_to_top() {
                window.scrollTo(0,0);
           },
           
			handle_data_view(e) {
				e.target.classList.contains('show')? e.target.classList.remove('show') : e.target.classList.add('show');
			},
         
         
         
         /* -----------------------------------------------------------------------
               SHOW STORE ITEMS
               // removed to use membertypes instead - may need for non-membership items
            ----------------------------------------------------------------------- */
         // show_store_item(item, condition) {               
            // var vm = this;
            // let truth = false;               
            // // filter for 'day', 'discount', and dates               
            // switch (condition) {
               // case 'day':
                  // item.filter == 'day'? truth = true : '';
                  // break;
                  
               // case 'discount':
                  // if(item.filter == 'discount' && vm.after_date(item.start_date) && vm.before_date(item.end_date) ) {
                     // truth = true;
                  // }
                  // break;
               
               // case 'none':
                  // if(!item.filter) {
                     // if(item.start_date || item.end_date) {
                        // if(vm.after_date(item.start_date) && before_date(priceBreak.stopDate)) {
                           // truth = true;
                        // }
                     // } else {
                        // truth = true;
                     // }
                  // }
            // }
            
           // // item.filter != 'discount' && item.filter != 'day'" v-if="after_date(priceBreak.startDate) && 
            // return truth;
         // },
            
            
            
            
         /* -----------------------------------------------------------------------
               DATE FUNCTIONS
            ----------------------------------------------------------------------- */
			event_date(date) {
            // Thursday, Mar 12th
            let formattedDate = '';
            date? formattedDate = '<span class="day_name">'+ moment(date).format('dddd')+'</span><span class="day_date">, '  + moment(date).format('MMM Do')+'</span>' : '';
            return formattedDate;
			},	
         
         event_day(date) {
            // Thu
            let formattedDate = '';
            date? formattedDate = moment(date).format('dd') : '';
            return formattedDate;
         },
         
			article_date(date) {
            // Mar 12th
            let formattedDate = '';
            date? formattedDate = '<span class="month">'+ moment(date).format('MMM')+'</span> <span class="day"> '+ moment(date).format('Do')+'</span>' : '';
				return  formattedDate;
			},	
			month_day_year(date) {
            // Mar, 12th, 2019
            let formattedDate = '';
            date? formattedDate = moment(date).format('MMM, Do YYYY') : '';
            return formattedDate
			},
			
         iso_date(date) {
            // 2019-03-12
            let formattedDate = '';
            date? formattedDate = moment(date).toISOString() : '';
            return formattedDate;
         },
			day_date(date) {
            // Mar 12th
            let formattedDate = '';
            date? formattedDate = moment(date).format('MMM Do') : '';
				return formattedDate;
			},
         
         // Feb 8th 12:18pm
         date_time(date) {
            let formattedDate = '';
            date? formattedDate = moment(date).format('MMM Do hh:mm a') : '';            
            return formattedDate;
         },
         
         tag_time(date) {
            // 05:00 am
            let formattedDate = '';
            date? formattedDate = moment(date).format('hh:mm a') : '';
            return formattedDate;
         },
         tag_day(date) {
            let formattedDate = '';
            date? formattedDate = moment(date).format('ddd') : '';
            return formattedDate;
         },
         
         day_time(date) {
            let formattedDate = '';
            date? formattedDate = moment(date).format('ddd hh:mm a') : '';
            return formattedDate;
         },
         
         sql_date_time(date) {
            let formattedDate = '';
            date? formattedDate = moment(date).format('YYYY-MM-DD HH:MM:SS') : ''; 
            return formattedDate;
         },
         
         between_dates(startDate, endDate) {
            return moment().isBetween(moment(startDate), moment(endDate));
         },
         
         
         before_date(targetDate) {
            return moment(moment()).isBefore(moment(targetDate));
         },
         
         after_date(targetDate) {
            return moment(moment()).isAfter(moment(targetDate));
         },
         
         /* -----------------------------------------------------------------
                  VALIDATE EMAIL
            ----------------------------------------------------------------- */
         validate_email(email) {
            var pass = false;
            if(email) {            
               if(email.indexOf("@") >0 && email.indexOf(".") >0) { pass = true; }               
            }
            return pass;
         },
         
         event_duration(startTime, endTime) {
            var returnTime, hours, minutes;
            startTime= moment(startTime);
            endTime  = moment(endTime);   
            
            minutes = endTime.diff(startTime, 'minutes');
            
            if (minutes > 180) {
               hours    = parseInt(minutes/60);
               minutes  = minutes % 60; 
               returnTime = hours +' hrs';
               minutes? returnTime+= ', '+minutes+' min' : '';
               
            } else {
               returnTime = minutes+' min';
            }           
            
            return returnTime;
         },
         
         
         
		}
	});

	/* eslint-disable no-new */
	new Vue({
	  el: '#app',
	  router,
	  store,
	  options,
	  components: { App },
	  template: '<App/>'
	});
