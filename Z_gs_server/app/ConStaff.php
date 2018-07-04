<?php 
	namespace App;
	
	use Illuminate\Database\Eloquent\Model;
	
	class ConStaff extends Model {
		protected $table="convention_staff";
		
		protected $guarded = [ 'id'];
	}
	
?>