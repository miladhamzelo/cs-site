<?php

//require_once 'source/bank.requests.php';


function check_discount_code($code){

	global $db;
	$res["status"] = "-1";

	$dis = array_pop($db->select("discounts", "code = :code", ["code" => $code]));

	if(!empty($dis)){

	
		$res["status"] = "1";
		$res["value"] = $dis['value'];

	
		$today = new DateTime();
		$date = array_map('intval', explode("/", $dis["expired_date"]));
		$date = jalali_to_gregorian($date[0], $date[1], $date[2], "-");
		$date = new DateTime($date);

		$interval = $today->diff($date);
		if(!$interval->format('%R') == "+"){
			$res["status"] = "-2";
		}
	}

	return $res;
}



function check_movies($movies, $mark = false, $sum = 0){

	global $db;
	$okMovies = [];

	if(!empty($movies)){

		$today = new DateTime();

		if($sum > 0)
			$today = $today->add(new DateInterval('PT'.$sum.'M'));


		foreach ($movies as $movie) {
			$mId = $movie["id"];
			$canShow = false;
			$sans = $db->select("Reserve","m_id=${mId}");
			foreach ($sans as $s) {
				$date = array_map('intval', explode("/", $s["date"]));
				$date = jalali_to_gregorian($date[0], $date[1], $date[2], "-");
				$date = new DateTime($date ." ". $s["time"]);

				$interval = $today->diff($date);
				if($interval->format('%R') == "+"){
					$canShow = true;
					break;
				}
			}
			if($mark){
				if(!$canShow)
					$movie["expire"] = true;
				$okMovies[] = $movie;
			}else{
				if($canShow)
					$okMovies[] = $movie;
			}
		}
	}

	return $okMovies;
}


function check_concerts($concerts, $mark = false, $sum = 0){

	global $db;
	$okConcerts = [];

	if(!empty($concerts)){

		$today = new DateTime();

		if($sum > 0)
			$today = $today->add(new DateInterval('PT'.$sum.'M'));

		foreach ($concerts as $concert) {
			$cId = $concert["id"];
			$canShow = false;
			$sans = $db->select("concertReserve","c_id=${cId}");
			foreach ($sans as $s) {
				$date = array_map('intval', explode("/", $s["date"]));
				$date = jalali_to_gregorian($date[0], $date[1], $date[2], "-");
				$date = new DateTime($date ." ". $s["time"]);

				$interval = $today->diff($date);
				if($interval->format('%R') == "+"){
					$canShow = true;
					break;
				}
			}
			if($mark){
				if(!$canShow)
					$concert["expire"] = true;
				$okConcerts[] = $concert;
			}else{
				if($canShow)
					$okConcerts[] = $concert;
			}
		}
	}

	return $okConcerts;
}



function check_showtimes($showtimes, $delay=30, $a=false, $mark = false){

	global $db;

	$okShowtimes = [];
	$today = new DateTime();

	if($a)
		$today = $today->add(new DateInterval('PT'.$delay.'M'));
	else
		$today = $today->sub(new DateInterval('PT'.$delay.'M'));


	foreach ($showtimes as $st) {

		$date = array_map('intval', explode("/", $st["date"]));
		$date = jalali_to_gregorian($date[0], $date[1], $date[2], "-");
		$date = new DateTime($date ." ". $st["time"]);

		$interval = $today->diff($date);
		if($interval->format('%R') == "+"){
			
			$okShowtimes[] = $st;
			
		}else{

			if($mark){
				
				$st["expire"] = true;
				$okShowtimes[] = $st;
			}
		}
	}


	return $okShowtimes;
}

// ================================================================================================
function _default(){

	global $ctrl;
	global $db;

	$name = $ctrl;

	SERVER("ctrl", "page");

	$data = array_pop($db->select("pages", "uri='${name}'"));


	if(empty($data)) page_404();

	view("page", $data);
}




function index(){

	SERVER("ctrl", "index");

	global $db;


	$data = $db->select("movies","archive=0");
	$params["movies"] = check_movies($data, false, 60);

	$data = $db->select("concerts","archive=0");
	$params["concerts"] =  check_concerts($data, false, 60);

	$data = array_pop($db->select("Data","name='setting'"));
	$data =  json_decode($data['data'], true);
	$params["phone"] = $data["contact"]["phone"];
	$params["siteEmail"] = $data["contact"]["siteEmail"];
	$params["telegram"] = $data["contact"]["telegram"];
	$params["instagram"] = $data["contact"]["instagram"];
	$params["bazar"] = $data["contact"]["bazar"];

	$data = array_pop($db->select("Data","name='slider'"));
	$data =  json_decode($data['data'], true);
	$params["slides"] = $data["slides"];


	$data = array_pop($db->select("Data","name='promotions'"));
	$params["promotions"] =  json_decode($data['data'], true);

	$data = array_pop($db->select("Data","name='next_movies'"));
	$params["nextMovies"] =  json_decode($data['data'], true);

	$data = array_pop($db->select("Data","name='movie_trailer'"));
	$params["movieTrailer"] =  json_decode($data['data'], true);

	$data = $db->run("SELECT id,date,title,image FROM news ORDER BY id desc LIMIT 2");
	$params["news"] = $data;

	

	view("index", $params);


}





function finishPay(){

	global $db;

	$fid = $_GET['fid'];
	$f = array_pop($db->select("Factors", "id=${fid}"));
	$uid = $f['user_id'];
	$isConcert = $f["movie_type"] == "concert" ? true : false;
	$status = 1;

	mylog($uid, "finishPay is load");

	//if(empty($f) || (int)$f['bought'] == 0)
	//	$status = 0;

	mylog($uid, "finishPay status is $status");

	//SERVER('status', $status);
	SERVER('fid', $fid);
	//SERVER('mid', $f['movie_id']);


	$mid = $f['movie_id'];

	
	if(empty($f))
		page_404();

	view("finishPay", compact(["status", "isConcert", "mid"]));
	
}


function showLogs(){

	global $db;
	$user_id = $_GET['user_id'];
	$logs = $db->select("logs", "user_id=${user_id}");

	foreach ($logs as $key => $value) {
		$datetime = $value['datetime'];
		$msg = $value['msg'];
		echo "[ <strong>${user_id}</strong> ] : <strong>${msg}</strong> . At <strong>${datetime}</strong> <br><br>";
	}

}



function ticket($p){
	

	global $db;
	global $validator;

	$rules = [

		"id" => "sometimes|required|numeric",
		"cid" => "sometimes|required|numeric",
	];

	if (!$validator->validate($_GET, $rules)){
		die("invalid inputs");
	}


	$film_id = empty($_GET['id']) ? null : $_GET['id'];
	$concert_id = empty($_GET['cid']) ? null : $_GET['cid'];


	if($film_id){

		$data = $db->select("movies","id=${film_id} AND archive=0");
		$data = check_movies($data, false, 60)[0];
		SERVER("movie",$data);
		//SERVER("ctrl","ticket");
		$ticketType = "film";


	}else{

		$data = $db->select("concerts","id=${concert_id} AND archive=0");
		$data = check_concerts($data, false, 60)[0];
		SERVER("concert",$data);
		//SERVER("ctrl","ticket_concert");
		$ticketType = "concert";

	}

	if(empty($data))
		page_404();



	view("ticket",compact("ticketType")+$data);
	


}


function about(){

	global $db;
	

	$data = array_pop($db->select("Data","name='setting'"));
	$content = json_decode($data["data"], true);
	if(!empty($content["about"])){
		$data["des"] = $content["about"];
	}

	view("about", $data);
}




function contactUs(){

	global $db;
	
	$data = array_pop($db->select("Data","name='setting'"));
	$content = json_decode($data["data"], true);
	if(!empty($content["contact"])){
		$address = $content["contact"]["address"];
		$phone = $content["contact"]["phone"];
	}

	$errName = $errEmail = $errMessage = $errHuman ="";

	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
		$from = 'یک پیغام جدید'; 
		$to = 'info@cinemasetareh.ir'; 
		$subject = 'Message from Contact Demo ';
		
		//$body = "From: $name <br> E-Mail: $email <br> Message: <br> $message";
		$body = "email body";
 
		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'لطفا نام را وارد کنید';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'لطفا ایمیل صحیح وارد کنید';
		}
		
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'لطفا پیغام خود را وارد کنید';
		}
		//Check if simple anti-bot test is correct
		if ($human !== 5) {
			$errHuman = 'کد ضد ربات را وارد کنید';
		}

		$headers = 'From: ${email}' . "\r\n" .
    'Reply-To: ${email}' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

 
		// If there are no errors, send the email
		if (!$errName && !$errEmail && !$errMessage && !$errHuman) {
			if (mail ($to, $subject, $body, $headers )) {
				$result='<div class="alert alert-success">ممنون از نظر/پیشنهاد شما.</div>';
			} else {
				$result='<div class="alert alert-danger">با عرض پوزش خطایی در ارسال رخ داده. لطفا بعدا امتحان کنید</div>';
			}
		}
	}

	view("contactus" , compact([ "errName", "errHuman", "errMessage", "errEmail", "address", "phone" ]));
}





function admin_panel(){

	global $db;

	if(!empty($_COOKIE['cinema-setareh-admin-id'])){

		$id = $_COOKIE['cinema-setareh-admin-id'];


		$admin = $db->select("admin","id=${id}");

		SERVER("ctrl", "admin");
		SERVER("user_id", $id);
		SERVER("access", $admin["access"]);

		
		view("admin");

	}else{

		redirect("login");
	}
}



function self_service(){

	//redirect("siteUpdating");

	global $db;

	if(!empty($_COOKIE['cinema-setareh-admin-id'])){

		SERVER("entity", "film");
		view("self_service");


	}else{

		redirect("login?back=self-service");
	}
	
}


function self_service_concert(){

	//redirect("siteUpdating");

	global $db;

	if(!empty($_COOKIE['cinema-setareh-admin-id'])){

		SERVER("entity", "concert");
		SERVER("ctrl", "self_service");
		view("self_service");


	}else{

		redirect("login?back=self-service-concert");
	}
	
}


function page($p){

	global $db;
	global $validator;

	if(!$validator->validate($_GET, ["id" => "required|numeric"]))
		page_404();

	$pageId = $_GET["id"];
	$data = array_pop($db->select("pages","id=${pageId}"));

	if(empty($data)) page_404();

	view("page", $data);


}




function news($p){

	global $db;

	if($_GET["id"]){

		$newsId = $_GET["id"];
		$data = array_pop($db->select("news","id=${newsId}"));
		view("page", $data);

	}else{

		$data = $db->run("select * from news order by id asc");
		view("news", ["news" => $data]);
	}


}






function login($p){

	global $db;

	$back = !empty($_GET['back']) ? $_GET['back'] : "admin-panel";
	$action = $back != "admin-panel" ? (root=="/"?"":root)."/login?back=${back}" : (root=="/"?"":root)."/login";
	$login_err = false;


	if(!empty($_COOKIE['cinema-setareh-admin-id'])){

		redirect($back);
	}


	if(!empty($_POST['login'])){

		$user = htmlentities($_POST['username']);
		$pass = htmlentities($_POST['password']);

		$result = $db->select("admin","username='${user}' AND password='${pass}'");

		if(!empty($result)){

			$result = $result[0];

			setcookie('cinema-setareh-admin-id', $result["id"], time() + (86400 * 15), "/");

			redirect($back);
		}else{

			$login_err = true;
			view("login", compact(['action', 'login_err']));
		}


	}else{

		view("login", compact(['action', 'login_err']));

	}

	
}







function api($p){

	//header('Content-Type: application/json');

	empty($p[0]) and die("page not found api1");
	$path = implode($p, '/');
	$name = array_pop($p);


	if(file_exists("app/api/${path}.php")){

		require("app/api/${path}.php");
	}
	elseif(file_exists("app/api/${name}.php")){

		require("app/api/${name}.php");
	}else{
		header("HTTP/1.0 404 Not Found");
		exit;
	}

}







