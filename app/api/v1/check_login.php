<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "0";


$username = $_POST['username'];
$password = $_POST['password'];

$user = array_pop($db->select("admin","username='${username}' AND password='${password}'"));

if(!empty($user)){
	$res['status'] = "1";
	
}


echo json_encode($res);

?>