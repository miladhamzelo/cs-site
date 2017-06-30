<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "1";




$id = $_GET['id'];

if(!$db->delete("movies","id=${id}")){
	$res['status'] = "0";
}


$db->delete("Reserve","m_id=${id}");

echo json_encode($res);

?>