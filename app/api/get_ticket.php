<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "0";


if($_GET['fid']){

	$ticket = [];

	$fid = $_GET['fid'];

	$factor = array_pop($db->select("Factors", "id=${fid}"));
	$id = $factor['movie_id'];
	$movieType = $factor['movie_type'];
	$table = $movieType == "concert" ? "concerts" : "movies";
	$Reservetable = $movieType == "concert" ? "concertReserve" : "Reserve";
	$isConcert = $movieType == "concert" ? true : false;

	$urid = $factor['reserve_id'];
	$movie = array_pop($db->select($table , "id=${id}"));
	$reserve = array_pop($db->select($Reservetable, "uniqe_id='${urid}'"));



	$ticket['chairs'] = $factor['chairs'];
	$ticket['total_price'] = $factor['total_price'];
	$ticket['movie_name'] = $movie['title'];
	$ticket['time'] = $reserve['time'];
	$ticket['date'] = $reserve['date'];
	$ticket['code'] = $factor['code'];
	$ticket['is_concert'] = $isConcert;




	$res = $ticket;
	
}

echo json_encode($res);

?>