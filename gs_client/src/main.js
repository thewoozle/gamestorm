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
			article_date(date) {
				return  '<span class="month">'+ moment(date).format('MMM')+'</span> <span class="day">'+ moment(date).format('Do')+'</span>';
			},	
			month_day_year(date) {
				return moment(date).format('MMM, Do YYYY');
			},
			
			day_date(date) {
				return moment(date).format('MMM Do');
			},
         
         date_time(date) {
            return moment(date).format('MMM Do hh:mm a');
         },
         
         sql_date_time(date) {
           return moment(date).format('YYYY-MM-DD HH:MM:SS'); 
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
