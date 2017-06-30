<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";



if(empty($_GET['id'])){


	$users = $db->select("users");

	foreach ($users as $i => $user) {
		
		$uid = $user["id"];
		$countBuy = $db->run("SELECT COUNT(*) FROM Factors  WHERE user_id=${uid}");
		$countBuy = array_pop(array_pop($countBuy));

		$users[$i]["countBuy"] = $countBuy;
	}

	$res = $users;
	

}else{

	$id = $_GET['id'];

	$user = array_pop($db->select("users","id=${id}"));

	$uid = $user["id"];
	$countBuy = $db->run("SELECT COUNT(*) FROM Factors  WHERE user_id=${uid}");
	$countBuy = array_pop(array_pop($countBuy));

	$user["countBuy"] = $countBuy;

	$res = $user;
}



echo json_encode($res);

?>