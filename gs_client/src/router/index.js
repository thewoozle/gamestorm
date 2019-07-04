
	import Vue from 'vue'
	import Router from 'vue-router'
	import main_page from '@/components/main_page'
   import reset_password from '@/components/reset_password'
	import gamestorm_page from '@/components/gamestorm_page'
	import convention_page from '@/components/convention_page'
   import account_page from '@/components/account_page'
	import events_page from '@/components/events_page'
	import community_page from '@/components/community_page'
	import connect_page from '@/components/connect_page'
   import gallery_page from '@/components/gallery_page'
   
	import admin_page from '@/components/admin_page'
	import registration_page from '@/components/registration_page'
	import reg_reports_page from '@/components/reg_reports_page'
	import scheduling_page from '@/components/scheduling_page'
   import news_hub_page from '@/components/news_hub_page'
   
	Vue.use(Router)

	export default   new Router({
		mode: 'history',
	  routes: [
		{
			path		: '/',
			name		: 'mainpage',
			component: main_page
		}, {
			path		: '/gamestorm',
			name		: 'gamestormpage', 
			component: gamestorm_page
		}, {
			path		: '/events',
			name		: 'eventspage',
			component: events_page
		}, {
			path		: '/community',
			name		: 'communitypage', 
			component: community_page
		}, {
			path		: '/connect',
			name		: 'connectpage', 
			component: connect_page
		}, {
         path     : '/account',
         name     : 'accountpage',
         component: account_page   
      }, {
         path     : '/gallery',
         name     : 'gallerypage',
         component: gallery_page   
      },
      
      // FORGOT PASSWORD 
      {
         path     : '/reset_password',
         name     : 'resetpassword',
         component: reset_password
      },
      

		//	ADMIN LINKS
		{
			path		: '/admin',
			name		: 'adminpage',
			component: admin_page
		}, {
			path		: '/registration_hub',
			name		: 'registrationpage', 
			component	: registration_page
		}, {
			path		: '/scheduling_hub',
			name		: 'schedulingpage',
			component: scheduling_page
		}, {
			path		: '/departments_hub',
			name		: 'departmentspage',
			component: scheduling_page
		}, {
			path		: '/news_hub',
			name		: 'newspage',
			component: news_hub_page
		}, {
         path     : '/registration_reports',
         name     : 'regreportspage',
         component: reg_reports_page 
      }
      
		
	  ]
	})
