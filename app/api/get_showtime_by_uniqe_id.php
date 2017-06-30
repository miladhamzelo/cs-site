<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "0";

$table = empty($_GET['table']) ? "Reserve" : $_GET['table'];

if($_GET['urid']){

	$urid = $_GET['urid'];

	$sansInfo = array_pop($db->run("select * from $table where uniqe_id='${urid}'"));


	$res = $sansInfo;
	
}

echo json_encode($res);

?>