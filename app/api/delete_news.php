<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "1";




$id = $_GET['id'];

if(!$db->delete("news","id=${id}")){
	$res['status'] = "0";
}


echo json_encode($res);

?>