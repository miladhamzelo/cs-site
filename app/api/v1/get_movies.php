<?php

global $db;

$res = [];
//$res["status"]  = "0";



if(empty($_GET['id'])){

	if(!empty($_GET['count'])){

		$top = $_GET['count'];


		$films = $db->run("SELECT TOP ${count} * FROM movies WHERE archive=0");

		$res = $films;

	}else{


		$films = $db->select("movies","archive=0");


		$res = check_movies($films);
		

	}


}else{


	$id = $_GET['id'];

	$film = $db->select("movies","id=${id} AND archive=0");


	$res = array_pop(check_movies($film));
}

echo json_encode($res);

?>