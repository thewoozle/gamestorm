<?php

	namespace App;

		use Illuminate\Database\Eloquent\Model;

	class SiteSettings extends Model
	{
		protected $table="site_settings";
		protected $guarded=['id', 'created_at'];
			
	   
	}
