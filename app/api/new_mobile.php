<?php

global $db;

$res = [];
$res["status"]  = "1";


if(!empty($_POST)){

	
	

	$fields =[
		"sms" => true,
		"phone" => $_POST["number"],
		"fullName" => ""
	];
	if(!$db->insert("users", $fields)){

		$res["status"]  = "MOBILE NUMBER INSERTION FAILD!";
	}



}




echo json_encode($res);

?>