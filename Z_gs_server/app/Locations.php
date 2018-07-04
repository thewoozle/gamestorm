<?php
	namespace App;
	
	use Illuminate\Database\Eloquent\Model;
	
	class Locations extends Model {
		
		protected $table="event_locations";
		protected $guarded = [ 'id' ];
	}
?>