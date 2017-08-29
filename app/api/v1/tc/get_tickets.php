<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "0";

$uniqe_id = $_GET["uniqe_id"];
//$movie_id = $_GET["movie_id"];

$factors = $db->select("Factors","reserve_id='${uniqe_id}' AND bought=1");

if(!empty($factors)){

	$newFactors = [];
	foreach ($factors as $i => $f) {
		//$uid = $f["user_id"];
		//$user = array_pop($db->select("users", "id=${uid}"));
		$newFactors[$i]["ticket_id"] = $f["id"];
		$newFactors[$i]["ticket_code"] = $f["code"];
		$newFactors[$i]["seats"] = $f["chairs"];
		//$newFactors[$i]["name"] = $user["fullName"];
		//$newFactors[$i]["phone_number"] = $user["phone"];
	}

	$res["tickets"] = $newFactors;
	$res['status'] = "1";
	
}


echo json_encode($res);

?>