<?php

die_when_site_down();


global $db;

$res = [];
//$res["status"]  = "0";



if(empty($_GET['id'])){

	if(!empty($_GET['count'])){

		$top = $_GET['count'];


		$films = $db->run("SELECT TOP ${count} * FROM concerts WHERE archive=0");

		$res = $films;

	}else{


		$films = $db->select("concerts","archive=0");


		$res = check_concerts($films);
		

	}


}else{


	$id = $_GET['id'];

	$film = $db->select("concerts","id=${id} AND archive=0");


	$res = array_pop(check_concerts($film));
}

echo json_encode($res);

?>