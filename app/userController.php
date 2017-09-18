<?php


function check_login(){
	empty($_SESSION['user_id']) and redirect("user/login");
}
function index(){
	redirect("user/dashboard");
	//alternative("dashboard");
}
function get_messages($param){
	switch ($param) {
		case 1:
			return 'رمز عبور شما بروز رسانی شد';
			break;
		
		case 2:
			return 'اطلاعات شما بروز رسانی شد';
			break;
		
		case -1:
			return 'رمز عبور جدید را درست وارد کنید';
			break;
		
		case -2:
			return 'رمز عبور وارد وارد شده اشتباه است';
			break;
		
		
		default:
			return "test";
			break;
	}
}



function dashboard(){

	global $db;
	check_login();

	if($msg_status = flash("status")){

		$msg_text = get_messages($msg_status);
		$msg_class = $msg_status > 0 ? "success" : "danger";
	}

	

	$user_id = $_SESSION['user_id'];

	$user = array_pop($db->select("users", "id = :id", ["id" => $user_id]));

	$factors = $db->select("Factors", "user_id = :userId AND bought = 1 AND movie_type = 'film'" , ["userId" => $user["id"]]);

	$all_factors_count = count($factors);
	$is_half_price_factors_count = 0;
	$no_half_price_factors_count = 0;
	$onFactors = [];

	$today = new dateTime();

	foreach ($factors as $i => $f) {

		if($f["is_half_price"] != 0)
			$is_half_price_factors_count++;
		
		$reserve_id = $f["reserve_id"];
		$reserveTable = $f["movie_type"] == "film" ? "Reserve" : "concertReserve";
		$reserve = array_pop($db->select($reserveTable, "uniqe_id = :uniqid", ["uniqid" => $reserve_id]));

		$mid = $f["movie_id"];
		$movieTable = $f["movie_type"] == "film" ? "movies" : "concerts";
		$movie = array_pop($db->run("SELECT id,title FROM $movieTable WHERE id = :mid", ["mid" => $mid]));
		
		$date = array_map('intval', explode("/", $reserve["date"]));
		$date = jalali_to_gregorian($date[0], $date[1], $date[2], "-");
		$date = new DateTime($date ." ". $reserve["time"]);

		$interval = $today->diff($date);
		if($interval->format('%R') == "+"){

			$is_concert = $f["movie_type"] == "film" ? false : true;

			$onFactors[] = [
			"factor" => $f, 
			"reserve" => $reserve, 
			"movie" => $movie,
			"is_concert" => $is_concert
			];
			
		}



	}

	

	$no_half_price_factors_count = $all_factors_count - $is_half_price_factors_count;

	SERVER("onFactors", $onFactors);

	view("user.dashboard", compact([

		"all_factors_count",
		"no_half_price_factors_count",
		"is_half_price_factors_count",
		"onFactors",
		"user",
		"msg_status",
		"msg_text",
		"msg_class",
		"is_concert",

	]));
}

function logout(){

	$_SESSION["user_id"] = null;

	redirect("user/login");
}

function login(){

	global $db;


	$login_err = false;

	if(!empty($_SESSION['user_id'])){

		redirect("user/dashboard");
	}


	if(!empty($_POST['login'])){

		$user = htmlentities($_POST['username']);
		$pass = myhash($_POST['password']);

		$result = $db->select("users","phone='${user}' AND password='${pass}'");

		if(!empty($result)){

			$result = $result[0];

			$_SESSION["user_id"] =  $result["id"];

			redirect("user/dashboard");
		}else{

			$login_err = true;
			
		}


	}


	view("user/login", compact([ 'login_err']));
}



function change_info(){

	check_login();

	global $db;

	$status = 2;

	$user_id = $_SESSION['user_id'];

	$db->update("users", 
		["fullName" => $_POST['name']/*, "phone" => $_POST['mobile']*/],
		 "id = :id", ["id" => $user_id]);

	flash(compact("status"));
	redirect("user/dashboard");
}


function change_pass(){

	check_login();

	global $db;

	$user_id = $_SESSION['user_id'];
	$status = 1;

	if($_POST['password'] != $_POST['confirmPassword'])
		$status = -1;

	$user = array_pop($db->select("users", "id = :id AND password = :pass", 
		["id" => $user_id, "pass" => myhash($_POST['oldPassword'])]));

	if(!empty($user)){

		if( $status == 1)
			$db->update("users", 
			["password" => myhash($_POST["password"])],
			 "id = :id", ["id" => $user_id]);
	}else{

		$status = -2;
	}

	
	SERVER("route", 1);
	flash(compact("status"));
	redirect("user/dashboard");
}




?>