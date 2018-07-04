<?php	
	namespace App\Http\Controllers;	
	use Illuminate\HTTP\Request;	
	use Illuminate\Support\Facades\DB;
	use App\Http\Controllers\Controller;
	use Illuminate\Database\Schema\Blueprint;
	use Illuminate\Support\Facades\Schema;
	use Illuminate\Support\Facades\Auth;
	use Validator;
	use Response;
	use App\Convention;
	use App\Events;
	use App\User;
	use App\Locations;
	use Carbon\Carbon;
	use App\Venues;
	
	
	
	class EventsController extends Controller {		
	/*	------------------------------------------------------------
					GET CON EVENTS (current con, for users)
		------------------------------------------------------------	*/
		public function  _get_con_events() {			
			$convention = Convention::where('active','=','1')->first();
			$conNum	= $convention->tag_name;
			//$conNum = 'gs_20'; // -- for testing only
			
			// get events for current con
			$events = DB::table($conNum.'_events')
				-> where($conNum.'_events.event_status', '=','40')
				-> leftJoin('events', 'events.event_id', '=', $conNum.'_events.event_id')
				-> leftJoin($conNum.'_participants', $conNum.'_participants.event_id', '=', $conNum.'_events.event_id')
				-> orderBy('event_track')
				-> orderBy('event_name')
				-> leftJoin('event_types', 'event_types.id', '=', 'events.event_type')
				-> leftJoin('event_tracks', 'event_tracks.id','=','events.event_track')
				-> leftJoin('users', 'users.uuid', '=', $conNum.'_participants.event_uuid')
				->get();			
			return compact('con_events');			
		}
		
		
	/*	------------------------------------------------------------
					GET SCHEDULING DATA (for scheduling)
		------------------------------------------------------------	*/
		public function  _get_scheduling_data(Request $request) {			
			$convention = Convention::where('tag_name','=',request('con'))->first();
			$conNum			= $convention->tag_name;
			$conVenue 	= $convention->venue;		
			$venues 		= Venues::all();
         $allEvents  = Events::all();
			
			// if tables for target con doesn't exist, create them
			if(!Schema::hasTable($conNum.'_events')) {
				Schema::create($conNum.'_events', function(Blueprint $table) {
					$table->increments('id');
					$table->integer('event_id');
					$table->integer('event_status')->nullable()->comment('0 = unapproved, 20 = approved, 30 = pendingAssignment , 31 = scheduled, 32 = has Location, 40 = assigned, 90 = rejected, 91 = canceled');										
					$table->timestamp('created_at')->default(\DB::raw('CURRENT_TIMESTAMP'));
					$table->timestamp('updated_at')->default(\DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
				});
			} 				
			if(!Schema::hasTable($conNum.'_participants')) {
				Schema::create($conNum.'_participants', function(Blueprint $table) {
					$table->increments('id');
					$table->string('event_uuid',150);
					$table->integer('event_id');
					$table->integer('position')->nullable();
					$table->string('member_role', 100);
					$table->timestamp('created_at')->default(\DB::raw('CURRENT_TIMESTAMP'));
					$table->timestamp('updated_at')->default(\DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
				});
			} 	
			if(!Schema::hasTable($conNum.'_locations')) {				
				// get venue locations and seed con_locations table
				Schema::create($conNum.'_locations', function(Blueprint $table) {
					$table->increments('id');
					$table->integer('location_id');
					$table->string('location_type',100);
					$table->integer('location_capacity');
					$table->string('location_name', 150);
					$table->string('location_tag', 25);
					$table->integer('venue');
					$table->integer('location_parent')->nullable();
					$table->string('location_description',255)->nullable();					
					$table->timestamp('created_at')->default(\DB::raw('CURRENT_TIMESTAMP'));
					$table->timestamp('updated_at')->default(\DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
					$table->integer('location_active')->default('1');
				});
				
				$venueLocations = Locations::where('venue','=',$conVenue)->get();		
				
				foreach($venueLocations as $location) {
					DB::table($conNum.'_locations') -> insert(
						[	'location_id' 				=> $location->id,
							'location_type' 			=> $location->location_type,
							'location_capacity'		=> $location->location_capacity,
							'location_name' 			=> $location->location_name,
							'location_tag' 				=> $location->location_tag,
							'venue' 							=> $location->venue,
							'location_parent'			=> $location->location_parent,
							'location_description'=> $location->location_description,
							'location_active' 		=> $location->location_active,
							'updated_at' 					=> $location->updated_at
					]);
				}
			} 	
      // end 'create new tables'
      
			$conLocations = DB::table($conNum.'_locations')
				->where('location_active','=','1')
				->get();
			
			// get all events 
			$conEvents = DB::table($conNum.'_events')
				->leftJoin('events', 'events.event_id', '=', $conNum.'_events.event_id')
				->leftJoin($conNum.'_participants', $conNum.'_participants.event_id', '=', $conNum.'_events.event_id')
				-> orderBy('event_track')
				-> orderBy('event_name')
				-> leftJoin('event_types', 'event_types.id', '=', 'events.event_type')
				-> leftJoin('event_tracks', 'event_tracks.id','=','events.event_track')
				-> leftJoin('users', 'users.uuid', '=', $conNum.'_participants.event_uuid')
				->get();			
			return compact('conEvents', 'venues', 'conLocations', 'allEvents');			
		}
		
		
	/*	------------------------------------------------------------
					GET USER'S EVENTS (and event history)
		------------------------------------------------------------	*/
		
		public function _get_my_events() {
			$response = [];
			
			$response['message'] = "_get_my_events - EMPTY FUNCTION";
			return compact('response');
		}
		
		
		
		
		
	}
	
	
	?>