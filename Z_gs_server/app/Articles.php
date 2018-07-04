<?php
	namespace App;
	
	use Illuminate\Database\Eloquent\Model;
	
	class Articles extends Model {
		
    protected $guarded = [ 'article_id' ];
	protected $primaryKey = 'article_id';
	
	}
?>