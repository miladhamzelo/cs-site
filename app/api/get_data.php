<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "0";


if($_GET['name']){

	$name = $_GET['name'];

	$data = array_pop($db->run("select * from Data where name='${name}'"));

	if(empty($data))
		$res = [];
	else
		$res = $data;
	
}

echo json_encode($res);

?>