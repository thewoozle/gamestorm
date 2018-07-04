<?php

	use Illuminate\Http\Request;

	/*
	|--------------------------------------------------------------------------
				| API Routes
	|--------------------------------------------------------------------------*/
	
	// SITE ROUTES	
	Route::get('_get_site_data',      'ApiController@_get_site_data');
	//Route::get('_get_page_content', 		'ApiController@_get_page_content');
	Route::get('_get_news',           'ApiController@_get_news');
	Route::get('_get_gallery',        'ApiController@_get_gallery');
	Route::get('_get_articles',       'ApiController@_get_articles');
	
	
	// LOGIN ROUTES
	Route::post('_login',             'ApiController@_login');
	
	
	
	// REGISTATION ROUTES
	Route::get('_get_members',        'RegController@_get_members');
	Route::post('_remove_member',     'RegController@_remove_member');
	Route::get('_get_reg_report',     'RegController@_get_reg_report');
	Route::get('_get_reg_settings',   'RegController@_get_reg_settings');
	Route::get('_get_reg_data',       'RegController@_get_reg_data');
	Route::get('_membership_csv',     'RegController@_membership_csv');
	Route::post('_submit_member',     'RegController@_submit_member');
	
	// ACCOUNT ROUTES
	Route::post('_get_user_account',  'ApiController@_get_user_account');
	
	// EVENTS ROUTES 
	Route::get('_get_con_events',      'EventsController@_get_con_events');
	Route::post('_get_scheduling_data','EventsController@_get_scheduling_data');
	
	
		
		
		
	

	Route::middleware('auth:api')->get('/user', function (Request $request) {
		return $request->user();          
	});

	