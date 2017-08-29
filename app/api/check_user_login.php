<?php

global $db;

$res = [];
$res["status"]  = "1";


$user = array_pop($db->select("users","phone=".$_POST['username']));

if(!empty($user) && $user["password"] == myhash($_POST['password'])){

	$res["user_info"]["name"] = $user["fullName"];
	$res["user_info"]["mobile"] = $user["phone"];
	$res["user_info"]["id"] = $user["id"];

}else {

	$res["status"] = "0";
}



echo json_encode($res);

?>