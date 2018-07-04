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
	use App\ConStaff;
	use App\StaffPositions;
	use App\Transactions;
	use App\Articles;
	
	
	class ApiController extends Controller {
		
		
	// 	GET FUNCTIONS	(PUBLIC)
	/*	--------------------------------------------------------------
					GET SITE DATA
		--------------------------------------------------------------	*/
		public function _get_site_data() {
			$convention	= Convention::where('active','=','1')->first();
			$conventions= Convention::all(); 
			$pageContent= PageContent::all();
			$articles = Articles::Where('active','=',1)->get();	
			return compact('pageContent', 'convention', 'conventions', 'articles');
		}	
		
		
		
	/*	--------------------------------------------------------------
					LOGIN
		--------------------------------------------------------------
			multiple users may share password. First validate email and either validate password or 
			return multiple users for user-select dropown. Selecting user posts UUID and password for check. 
		*/		
		public function _login(Request $request) {
			
			$validatedData = $request->validate([
				'email'		=> 'required | email',
				'password'	=> 'required | min: 6 | max: 150',
				'uuid'		=> 'sometimes | nullable'				
			]);
			
			
			
			
			$email 		= request('email');
			$password	= request('password'); 
			$uuid 		= request('uuid');
			$response	= [];
			$user		= [];
			$users		= [];	
			$users 		= User::select('first_name', 'last_name', 'uuid')
							->where('email', '=', $email)
							->get();
			
			// sample: thegillettefive@gmail.com
			
			if ($uuid) {
				// after multi-user select
				if (Auth::attempt(['uuid' => uuid, 'password' => $password])) {
					$user = Auth::user();
				}else {
					$response['message'] = 'Unknown password';
				}
			} else if (sizeof($users) < 1) {
			// no email matches
				$response['message'] = 'Unknown email';
				
			} else if (sizeof($users) == 1) {
			// single user match, check password	
				$users = [];
				if (Auth::attempt(['email' => $email, 'password' => $password])) {
					$user = User::select('first_name', 'last_name', 'uuid', 'show_dev')
							-> where('users.uuid','=', Auth::user()->uuid)
							-> first();
							
					$userPermissions = [];
					
					$permissions = Permissions::select('role', 'level')
							-> where('uuid', '=', Auth::user()->uuid )
							-> get();	
					foreach($permissions as $permission) {
						$userPermissions[$permission->role] = $permission->level;
					}
					
					$user->permissions = $userPermissions;
					
				}else {
					$response['message'] = 'Unknown password';
				}
				
			} else if (sizeof($users) > 1) {
			// multiple users sharing email, return users for user-select dropdown	
				$response['message'] = 'Please select shared account';
					
			}
			
			return compact('user', 'users', 'response');
		}
		
		
		
		
	}
	