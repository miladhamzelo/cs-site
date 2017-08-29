<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "0";


$username = $_GET['username'];
$password = $_GET['password'];

$user = array_pop($db->select("admin","username='${username}' AND password='${password}'"));

if(!empty($user)){
	$res['status'] = "1";
	
}


echo json_encode($res);

?>