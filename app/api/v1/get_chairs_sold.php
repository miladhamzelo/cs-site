<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "1";

$table = $_GET['type'] == 'film' ? "Reserve" : "concertReserve";

if($_GET['uniqe_id']){

	$uid = $_GET['uniqe_id'];
	$sansInfo = array_pop($db->run("select chairs_sold from $table where uniqe_id='${uid}'"));

	$chairsSold = json_decode($sansInfo["chairs_sold"], true);

	$formatedChairssold = [];
	
	if(!empty($chairsSold))
		foreach ($chairsSold as $c) {
			$formatedChairssold[] = $c['id'];
		}

	if(!empty($sansInfo))
		$res["chairs_sold"] = implode(',', $formatedChairssold);
	else
		$res["status"]  = "0";
}

echo json_encode($res);

?>