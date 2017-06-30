<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "1";

$table = !empty($_GET['table']) ? $_GET['table'] : "Reserve";

if($_GET['uid']){

	$uid = $_GET['uid'];
	$sansInfo = $db->run("select chairs_sold from $table where uniqe_id='${uid}'");

	if(!empty($sansInfo))
		$res["chairs_sold"] = $sansInfo[0]["chairs_sold"];
	else
		$res["status"]  = "0";
}

echo json_encode($res);

?>