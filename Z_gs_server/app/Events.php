<?php
	namespace App;
	
	use Illuminate\Database\Eloquent\Model;
	
	class Events extends Model {
		
		protected $guarded = [ 'event_id' ];
		protected $primaryKey = 'event_id';
	}
?>