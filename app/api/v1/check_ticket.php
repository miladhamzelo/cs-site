<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "0";

$code = $_GET["code"];

$factor = array_pop($db->select("Factors","code='${code}'"));

if(!empty($factor)){

	$newFactor = [];

	$newFactor["chairs"] = $factor["chairs"];
	$newFactor["chairs_count"] = count(explode(" ", $factor["chairs"]));

	$uid = $factor["user_id"];
	if($uid != 0){

		$user = array_pop($db->select("users", "id=${uid}"));
		$newFactor["fullName"] = $user["fullName"];
		$newFactor["mobile"] = $user["phone"];
		
	}


	$res = $newFactor;
	$res['status'] = "1";
	
}


echo json_encode($res);

?>