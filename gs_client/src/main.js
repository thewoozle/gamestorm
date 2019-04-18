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
   
   
	
	Vue.mixin({
		created: function() {},
		methods: {
			handle_data_view(e) {
				e.target.classList.contains('show')? e.target.classList.remove('show') : e.target.classList.add('show');
			},
         
			event_date(date) {
            // Thursday, Mar 12th
				return  '<span class="day_name">'+ moment(date).format('dddd')+'</span><span class="day_date">, '  + moment(date).format('MMM Do')+'</span>';
			},	
         
         event_day(date) {
            // Thu
            return moment(date).format('dd');
         },
         
			article_date(date) {
            // Mar 12th
				return  '<span class="month">'+ moment(date).format('MMM')+'</span> <span class="day"> '+ moment(date).format('Do')+'</span>';
			},	
			month_day_year(date) {
            // Mar, 12th, 2019
				return moment(date).format('MMM, Do YYYY');
			},
			
         iso_date(date) {
            // 2019-03-12
            //return moment(date).format('YYYY-M-DD'); 
            return moment(date).toISOString();
         },
			day_date(date) {
            // Mar 12th
				return moment(date).format('MMM Do');
			},
         
         // Feb 8th 12:18pm
         date_time(date) {
            return moment(date).format('MMM Do hh:mm a');
         },
         
         tag_time(date) {
            // 05:00 am
            return moment(date).format('hh:mm a');
         },
         tag_day(date) {
            return moment(date).format('ddd');
         },
         
         day_time(date) {
            return moment(date).format('ddd hh:mm a');
         },
         
         sql_date_time(date) {
           return moment(date).format('YYYY-MM-DD HH:MM:SS'); 
         },
         
         between_dates(startDate, endDate) {
            return moment().isBetween(moment(startDate), moment(endDate));
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
