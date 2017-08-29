<?php

global $db;


$res = [];
$res["status"]  = "0";

$number = $_GET['number'];

$user = array_pop($db->select("users", "phone = :phone",["phone" => $number]));

if(!empty($user) && !empty($number)){

	$pass = mt_rand(12345,99999);
	$hashPass = myhash($pass);

	$_SESSION['user_registred_pass'] = $pass;
	$_SESSION['user_registred_mobile'] =  $_GET['number'];

	$res["sms_status"] = send_password($number, $pass);


	$fields = array(
		"password" => $hashPass,
	);
	$db->update("users", $fields, "id=".$user['id']);


	$res["status"]  = "1";
}


echo json_encode($res);

?>