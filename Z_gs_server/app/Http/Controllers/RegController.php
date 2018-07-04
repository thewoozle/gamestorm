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
	use App\PageContent;
	use App\Events;
	use App\User;
	use App\Permissions;
	use App\MemberTypes;
	use App\RegSettings;
	use App\StaffPositions;
	use App\Departments;
	use App\Transactions;
	use App\PaymentMethods;
	use Carbon\Carbon;
	use App\BadgeCategories;
	
	
	class RegController extends Controller {
		
		
	/*	------------------------------------------------------------
					GET REG DATA
		------------------------------------------------------------	*/
		public function  _get_reg_data() {
			$memberTypes	= MemberTypes::all();
			$departments 	= Departments::all();
			$paymentMethods	= PaymentMethods::all();
			$staffPositions = StaffPositions::all();
			return compact('memberTypes', 'departments', 'paymentMethods', 'staffPositions');
		}
		
		
	/*	------------------------------------------------------------	
					GET REG SETTINGS
		------------------------------------------------------------	*/
		public function  _get_reg_settings() {
			$regSettings 	= RegSettings::orderBy('id')->first();
			
			return compact('regSettings');
		}
		
		
	/*	------------------------------------------------------------
								UPDATE REG SETTINGS
		------------------------------------------------------------	*/
		public function _update_reg_settings(Request $request) {
			$regSettings 	= RegSettings::orderBy('id')->first();
			$settingRequest	= request('setting');
			$settingValue	= request('value'); 
			
			
			if($settingRequest == 'reg_mode') 	{ 
				if ($regSettings -> reg_mode == '1') {
					$regSettings -> reg_mode = '0';
				} else {
					$regSettings -> reg_mode = '1';
				}	
			}
			if(request('add_badge_number'))	{ $regSettings -> add_badge_number = request('add_badge_number');}
			if($settingRequest == 'convention') 		{ 
				$regSettings -> convention = $settingValue;
				$convention = Convention::where('active','=','1' ) -> first();
				$convention -> active = '0';
				$convention -> save();
				
				$conventionNew = Convention::where('tag_name', '=', $settingValue)->first();		
				$conventionNew -> active = '1';
				$conventionNew -> save();
				
			}
			$regSettings->save();
			return $request;
		}
		
		
	/*	--------------------------------------------------------------
					GET ALL MEMBERS (for registration)
		--------------------------------------------------------------	*/		
		public function _get_members() {
			
			$convention = Convention::where('active','=','1')->first();
			$conNum	= $convention->tag_name;
			
			// if table doesn't exist, create it
			if(!Schema::hasTable($conNum.'_membership')) {
				Schema::create($conNum.'_membership', function(Blueprint $table) {
					$table->increments('id');
					$table->string('con_uuid', 150);
					$table->integer('con_status')->nullable();	
					$table->integer('con_department')->nullable();					
					$table->integer('con_position')->nullable();
					$table->integer('badge_number')->nullable();
					$table->integer('locked')->nullable();
					$table->integer('badge_received')->nullable();
					$table->string('barcode', 50)->nullable();		
					$table->date('email_conf')->nullable();
					$table->timestamps();
				});
			} 
			
			$members = User::orderBy('last_name')
				-> leftJoin($conNum.'_membership' , $conNum.'_membership'.'.con_uuid','=', 'users.uuid')
				-> leftJoin('member_types', 'member_types.id','=', $conNum.'_membership'.'.con_status')
				-> leftJoin('departments', 'departments.id','=',$conNum.'_membership'.'.con_department')
				-> leftJoin('staff_positions','staff_positions.id','=',$conNum.'_membership'.'.con_position')
				-> get();
				
			foreach($members as $member) {
				$transactions = Transactions::where('uuid', '=', $member->uuid)
				-> leftJoin('payment_methods', 'payment_methods.id','=','transactions.transaction_method')
				-> get();
				$member->transactions = $transactions;
			}
			return compact('members');
		}
		
		
		
	/*	------------------------------------------------------------
					REMOVE MEMBER
		------------------------------------------------------------	*/
		public function _remove_member(Request $request) {
			$response=[];
			$message = '';
			$uuid = request('uuid');
			
			$convention	= Convention::where('active', '=', '1')->first();
			$conNum	= $convention->tag_name;
			$conTable = DB::table($conNum.'_membership')
				-> where('con_uuid','=', $uuid)
				-> update ([
					'badge_number' => null,
					'con_status' => 0
				]);
				
			$member = User::where('uuid','=',$uuid)->first();
			$message .= $member->first_name.' '.$member->last_name.' is Inactive ';
			 
			$response['message'] = $message;
			return compact('response');
		}
	
	
	
		
		
	/*	--------------------------------------------------------------
					GET REG REPORT 
		--------------------------------------------------------------	*/		
		public function _get_reg_report() {
			
			$regReport = [];
			$convention = Convention::where('active','=',1)->first();
			$conNum		= $convention->tag_name;
			$memberTypes= memberTypes::all();
			//$regMembers	= DB::table($conNum)->where('con_status','>=',1)->get();
			
			$regReport['registeredMembers'] = DB::table($conNum.'_membership')	-> where('con_status','>=',1)->count();	
			
			foreach($memberTypes as $memberType) {
				$regReport[$memberType->type] = DB::table($conNum.'_membership')	-> where('con_status','=',$memberType->id )->count();
			}
			
			return compact('regReport');
		}
		
		
		
	/*	------------------------------------------------------------
									SUBMIT MEMBER
		------------------------------------------------------------	*/
		public function _submit_member(Request $request) {
			$response=[];
			
			$convention= Convention::where('active', '=', '1')->first();			
			$conNum	= $convention->tag_name;
			
		
			if (request('uuid')) {
				$uuid = request('uuid');		
				$new = null;
			} else {
				$uuid = gen_uuid();
				$new = 'new';
			}
			
			if (request('conf_date') ) { 
				$confDate = request('conf_date');
			} else {
				$confDate = Carbon::today()->toDateString();
			}
			
			// VALIDATE FORM INPUT	
			$validated = $request -> validate (			
				[	'status'		=> 'nullable',
					'first_name'		=> 'required | min: 2 | max: 50',
					'last_name'			=> 'required | min: 2 | max: 50',
					'bus_name'			=> 'nullable | max: 150',
					'badge_name'		=> 'nullable | max: 150',
					'badge_name2'		=> 'nullable | max: 150',
					'email'				=> 'email | max: 254',
					'address'			=> 'required | min: 1 | max :100',
					'address2'			=> 'nullable | max: 50',
					'state' 			=> 'required',
					'zip'				=> 'required | min: 5 | max: 11',
					'city'				=> 'required | min: 2 | max: 50',
					'notes'				=> 'nullable | max: 500',
					'transaction_method'=> 'required',
				]
			);
			
			// UPDATE USER INFORMATION
			$member = User::updateOrCreate(
				['uuid' 			=> $uuid ],
				[
				'updated_at'	=>Carbon::now(), 
				'uuid' 			=> $uuid, 
				'first_name' 	=> request('first_name'),
				'last_name'		=> request('last_name'),
				'bus_name'		=> request('bus_name'),
				'badge_name'	=> request('badge_name'),
				'badge_name2'	=> request('badge_name2'),
				'email' 		=> request('email'),
				'phone' 		=> request('phone'),
				'address' 		=> request('address'),
				'address2' 		=> request('address2'),
				'state' 		=> request('state'),
				'zip' 			=> request('zip'),
				'notes' 		=> request('notes'),
				'city' 			=> request('city'),
				]
			);
			
			if (request('con_status')) {
				if (!request('badge_number')) {
					$badgeNumber = determine_badge_number(request('con_status'), null);
				} else {
					$badgeNumber = request('badge_number');
				}	
				$member->badge_number = $badgeNumber;
			}
			
			// UPDATE CON TABLE WITH MEMBER
			if (request('con_status') > 0) {
				$conTable = DB::table($conNum.'_membership')-> where('con_uuid','=',$uuid)->update([
						'con_status' 	=> request('con_status'),
						'con_position' 	=> request('position'),
						'con_department'=> request('department'),
						'badge_number' 	=> $badgeNumber,
						'locked'		=> request('loged'),
						'updated_at' 	=> Carbon::now(),
						'barcode' 		=> $conNum.'-'.request('badge_number')
					]);
				if ($conTable == 0) {
					DB::table($conNum.'_membership') -> insert([
						['con_uuid' 	=> $uuid,
						'con_status' 	=> request('con_status'),
						'con_department'=> request('department'),
						'con_position' 	=> request('position'),
						'badge_number' 	=> $badgeNumber,
						'updated_at' 	=> Carbon::now(),
						'barcode' 		=> $conNum.'-'.request('badge_number')
						]
					]);				
				}
			} else {
				$conTable = DB::table($conNum.'_membership')-> where('con_uuid','=',$uuid)->update([ 
					'con_status' 	=> null,
					'con_position' 	=> null,
					'con_department'=> null,
					'badge_number' 	=> null,
					'locked'		=> null,
					'updated_at' 	=> Carbon::now(),
					'barcode' 		=> null
				]);
			}
			
			
			// UPDATE TRANSACTIONS (transaction_method < 10 is tracked. )
			if (request('transaction_method') <= 10) {
				$transaction = new Transactions;
					$transaction -> transaction_method = request('transaction_method');
					$transaction -> transaction_type = 'membership';
					$transaction -> order_method = 'manual';
					$transaction -> status = 1; 
					$transaction -> order_date = Carbon::now();
					$transaction -> updated_at = Carbon::now(); 
					$transaction -> transaction_id = null;
					$transaction -> uuid = $uuid;
					$transaction -> transaction_amount = request('transaction_amount');
					$transaction -> transaction_record = request('transaction_record'); 
					$transaction -> CC_last_4 = request('cc_last_4'); 
				$transaction -> save();
			}
			
			
			// SEND EMAIL CONF
			if (request('send_email_conf')) {
				if (request('conf_date') ) { 
				} else {
					send_confirmation_email($uuid);
				}
			} 
			
			$response['message'] = request('first_name')." ".request('last_name')." Saved" ;			
			$response['uuid'] = $uuid;
			
			$response['member'] = compact('member');
			return compact('response');
		}
		
		
		
	/*	------------------------------------------------------------
									MEMBERSHIP CSV for reg 
		------------------------------------------------------------	*/
		public function _membership_csv() {
			
				
				$access = (int)Auth::user()->admin_access;
				if ($access >= 7) {
					$convention	= Convention::where('active', '=', '1')->first();
					$columns	= [];
					$filename 	= $convention->tag_name.'_membership';
					$handle = fopen($filename, 'w+');				
					$conMembers = [];
					$output = '';
					$headers = array(
						"Content-type" => "text/csv",
						"Content-Disposition" => "attachment; filename=".$convention->tag_name."_con_members.csv",
						"Pragma" => "no-cache",
						"Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
						"Expires" => "0"
					);
					$columns = ["first name", "last name","email", "type", "department","position","status","address","uuid","badge name", "badge name 2", "age","email_contact","volunteer interest","gm interest","notes"];
					$members 	= CurrentCon::orderBy('users.last_name')
								-> leftJoin('users', 'users.uuid','=',$convention->tag_name.'.con_uuid')								
								-> leftJoin('member_types', 'member_types.id', '=',$convention->tag_name.'.con_status')	
								-> leftJoin('departments', 'departments.id','=',$convention->tag_name.'.con_department')
								-> leftJoin('staff_positions', 'staff_positions.id','=',$convention->tag_name.'.con_position') 
								-> get();
					foreach($members as $member) {;
						//dd($member);
							$newMember = [];
							array_push(	$newMember, 
										$member -> first_name, 
										$member -> last_name, 
										$member -> email,
										$member -> type,
										$member -> department_name,
										$member-> position,
										$member-> con_status,
										$member -> address.' '.$member -> address2.', '.$member -> city.' '.$member -> state.' '.$member -> zip,
										$member -> uuid, 
										$member -> badge_name, 
										$member -> badge_name2,
										$member -> age,
										$member -> email_contact,
										$member -> volunteer_interest,
										$member -> gm_interest,
										$member -> notes
										); 
							array_push($conMembers, $newMember);
					}
					
					$handle = fopen($filename, 'w+');
					fputcsv($handle, $columns);

					foreach($conMembers as $row) {
						fputcsv($handle, $row);
					}

					fclose($handle);
					
					return Response::download($filename, $filename.'.csv', $headers);
				}else {
					return redirect()->intended('/');
				}	
			
		}
		
		
		
		
		
		
		
	}
	
	/*	------------------------------------------------------------
								GENERATE UUID
		------------------------------------------------------------	*/
	function gen_uuid() {
		 $uuid = array(
		  'time_low'  => 0,
		  'time_mid'  => 0,
		  'time_hi'  => 0,
		  'clock_seq_hi' => 0,
		  'clock_seq_low' => 0,
		  'node'   => array()
		 );

		 $uuid['time_low'] = mt_rand(0, 0xffff) + (mt_rand(0, 0xffff) << 16);
		 $uuid['time_mid'] = mt_rand(0, 0xffff);
		 $uuid['time_hi'] = (4 << 12) | (mt_rand(0, 0x1000));
		 $uuid['clock_seq_hi'] = (1 << 7) | (mt_rand(0, 128));
		 $uuid['clock_seq_low'] = mt_rand(0, 255);

		 for ($i = 0; $i < 6; $i++) {
		  $uuid['node'][$i] = mt_rand(0, 255);
		 }

		 $uuid = sprintf('%08x-%04x-%04x-%02x%02x-%02x%02x%02x%02x%02x%02x',
		  $uuid['time_low'],
		  $uuid['time_mid'],
		  $uuid['time_hi'],
		  $uuid['clock_seq_hi'],
		  $uuid['clock_seq_low'],
		  $uuid['node'][0],
		  $uuid['node'][1],
		  $uuid['node'][2],
		  $uuid['node'][3],
		  $uuid['node'][4],
		  $uuid['node'][5]
		 );

		 return $uuid;
	}
	
	
	
	
	/*	------------------------------------------------------------
								DETERMINE BADGE NUMBER
		------------------------------------------------------------	*/
	function determine_badge_number($conStatus, $badgeCategory) {	
		$convention= Convention::where('active', '=', '1')->first();			
		$conNum	= $convention->tag_name;
		// find badge number group for member  if attending and not already badge number
		if (!$badgeCategory) {
			$badgeCategory = null;
			switch (request('con_status')) {
				// CONCOM
				case '21': 
					$badgeCategory = 1;
					break;
				
				// staff
				case '15': 
					$badgeCategory = 2;
					break;
					
				// guest, press
				case '18': 
				case '20': 
					$badgeCategory = 3;
					break;
					
				// guest GM
				case '14':
					$badgeCategory = 4;
					break;
					
				// dealers
				case '17': 
				case '19': 
					$badgeCategory = 5;
					break;
					
				default: 	
					$badgeCategory = 6;
			}	
		} 
		//determine first unused number for badge category
		$badgeGroup = BadgeCategories:: where('badge_category','=', $badgeCategory) -> first();
		$lowestBadge = intval($badgeGroup->badge_first);
		$highestBadge = intval($badgeGroup->badge_last);
		$badgeCounter = intVal($lowestBadge);
		$badgeNumber = $lowestBadge;	
		
		// find next open badge number in con  table or change category to '6'
		$badgeNumbers = DB::table($conNum.'_membership') 
				-> orderBy('badge_number')
				-> select('badge_number') 
				-> whereBetween('badge_number',[$lowestBadge,$highestBadge])
				-> get();
		if ($badgeNumbers->isEmpty()) {
			$badgeNumber = $lowestBadge;
		} else {
			foreach($badgeNumbers as $badgesNumber) {
				$badgesNumber = intval($badgesNumber->badge_number);
				if ( $badgesNumber == $badgeCounter) {
					$badgeCounter++;
				}	
			}
			$badgeNumber = $badgeCounter;
		}	
		if ($badgeNumber > $highestBadge) {
			$badgeNumber = determine_badge_number($conStatus, 6);			
		}
		return $badgeNumber;
	}
	
	
	