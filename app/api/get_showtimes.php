<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "0";

if($_GET['id']){

	$table = !empty($_GET['table']) ? $_GET['table'] : "Reserve";
	$idField = $table == "Reserve" ? "m_id" : "c_id";

	$dl = empty($_GET['delay']) ? 30 : $_GET['delay'];
	$id = $_GET['id'];

	$sansInfo = $db->run("select * from ${table} where ${idField}=${id}");

	if(empty($_GET["noValidate"]))
		$res = check_showtimes($sansInfo, $dl, true);
	else
		$res = $sansInfo;
	
}

echo json_encode($res);

?>