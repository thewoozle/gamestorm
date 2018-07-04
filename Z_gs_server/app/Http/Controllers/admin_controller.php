<?php	
	namespace App\Http\Controllers;

	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\DB;
	use App\Http\Controllers\Controller;
	use Illuminate\Database\Schema\Blueprint;
	use Illuminate\Support\Facades\Schema;
	use Illuminate\Support\Facades\Auth;
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
	
	
	class AdminController extends Controller {

	
		// GET ALL ARTICLES
		public function _get_articles() {
			$articles = Articles::all();
		}
		
		
	}
		