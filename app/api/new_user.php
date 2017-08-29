<?php

global $db;
global $validator;

$res = [];
$res["status"]  = "1";

$rules = [

	"mobile" => "required|numeric|exact_len,11",
	
];

$v = $validator->validate($_POST, $rules, true);

if ( $v !== true){
	
	$res["erros"] = $v;
	$res["status"] = "0";
	echo json_encode($res);
	die();
}


$user = array_pop($db->select("users","phone = :phone", ["phone" => $_POST['mobile']]));

if(empty($user)){

	$pass = mt_rand(12345,98765);
	$hashPass = myhash($pass);

	$fields = array(
		"fullName" => $_POST['name'],
		"phone" => $_POST['mobile'],
		"username" => $_POST['mobile'],
		"password" => $hashPass,
	);


	if(!$db->insert("users", $fields)){

		$res["status"]  = "-2";
	}


	$user_id = array_pop($db->run("SELECT LAST_INSERT_ID();")[0]);

	$res["user_info"]["name"] = $_POST["name"];
	$res["user_info"]["mobile"] = $_POST["mobile"];
	$res["user_info"]["id"] = $user_id;
	$res["user_info"]["pass"] = $pass;
	
}else if(!empty($user) && empty($user["username"])){
	
	$pass = mt_rand(12345,98765);
	$hashPass = myhash($pass);

	$res["user_info"]["name"] = $_POST['name'];
	$res["user_info"]["mobile"] = $_POST['mobile'];
	$res["user_info"]["id"] = $user["id"];
	$res["user_info"]["pass"] = $pass;


	$fields = array(
		"fullName" => $_POST['name'],
		"username" => $_POST['mobile'],
		"password" => $hashPass,
	);

	$db->update("users", $fields, "id=".$user['id']);
	

}else {

	$res["status"] = "-1";
}


if(!empty($pass) && $res['status'] == "1"){

	$mobileNumber = $_POST['mobile'];
	// newslatter
	//$number = array_pop($db->select("numbers", "number = :number", ["number" => $mobileNumber]));

	// send pass to user 
	$_SESSION['user_registred_pass'] = $pass;
	$_SESSION['user_registred_mobile'] =  $mobileNumber;
	send_password($mobileNumber, $pass);

	if($_POST['sms'])
		$db->insert("numbers",["number" => $mobileNumber]);
}


echo json_encode($res);

?>