<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";



if(empty($_GET['id'])){

	if(!empty($_GET['count'])){

		$top = $_GET['count'];


		$users = $db->run("SELECT TOP ${count} * FROM users");

		$res = $users;

	}else{


		$users = $db->select("users");

		$res = $users;
		
	}


}else{

	$id = $_GET['id'];

	$user = array_pop($db->select("users","id=${id}"));

	$res = $user;
}



echo json_encode($res);

?>