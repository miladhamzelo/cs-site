<?php

global $db;

$res = [];
$res["status"]  = "1";


$user = array_pop($db->select("users","phone=".$_POST['mobile']));
//die($user['id']);
if(!empty($user)){

	$res["user_id"] = $user['id'];

	$fields = array(
		"fullName" => $_POST['name']
	);

	$db->update("users", $fields, "id=".$user['id']);
		//$res["status"]  = "USER UPDATE FAILD!";
	

}else{

	$fields = array(
		"fullName" => $_POST['name'],
		"phone" => $_POST['mobile'],
	);


	if(!$db->insert("users", $fields)){

		$res["status"]  = "USER INSERTION FAILD!";
	}


	$user_id = array_pop($db->run("SELECT LAST_INSERT_ID();")[0]);

	$res["user_id"] = $user_id;
	
}



echo json_encode($res);

?>