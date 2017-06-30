<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";


$mid = $_GET['mid'];
$urid = $_GET['urid'];
$type = empty($_GET['type']) ? "film" : $_GET['type'];

$pur = $db->select('Factors', "movie_id=${mid} AND reserve_id='${urid}' AND movie_type='${type}' AND bought=1");

//print_r($pur);

foreach ($pur as $i => $p) {
	$pur[$i]['user']['fullName'] = "";
	$pur[$i]['user']['phone'] = "";

	if($p['user_id'] != 0){

		$userId = $p['user_id'];
		$user = array_pop($db->select("users", "id=${userId}"));
		if(!empty($user)){

			$pur[$i]['user']['fullName'] = $user['fullName'];
			$pur[$i]['user']['phone'] = $user['phone'];
		}
	}
}



$res["purchases"] = $pur;

echo json_encode($res);

?>