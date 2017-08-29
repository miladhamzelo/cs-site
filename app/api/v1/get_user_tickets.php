<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "0";

$user_id = $_GET["user_id"];


$factors = $db->select("Factors","user_id = :userId AND bought=1", ["userId" => $user_id]);

if(!empty($factors)){

	$newFactors = [];
	foreach ($factors as $i => $f) {
		
		$mid = $f['movie_id'];
		$table = $f['movie_type'] == "film" ? "movies" : "concerts";
		
		$movie = array_pop($db->run("select id,image,bg_image,title from $table where id=${mid}"));
		$newFactors[$i]["total_cost"] = $f["total_price"];
		$newFactors[$i]["factor_id"] = $f['id'];
		$newFactors[$i]["factor_code"] = $f['code'];
		$newFactors[$i]["title"] = $movie["title"];
		$newFactors[$i]["cover"] = $movie["bg_image"];

		$urid = $f['reserve_id'];
		$ReserveTable = $f['movie_type'] == "film" ? "Reserve" : "concertReserve";
		$reserve = array_pop($db->run("select id,time,date,chairs_sold from $ReserveTable where uniqe_id='${urid}'"));
		$newFactors[$i]["showtime_time"] = $reserve['time'];
		$newFactors[$i]["showtime_date"] = $reserve['date'];

		
		//$newFactors[$i]["pay_status"] = $f['bought'];
		$newFactors[$i]["all_seats"] = $f['chairs'];
		$newFactors[$i]["seats_count"] = count(explode(" ", $f['chairs']));



	}

	$res = array_filter($newFactors, function($v, $k) {
		
	    return !empty($v['showtime_date']);
	}, ARRAY_FILTER_USE_BOTH);
	
	
}


echo json_encode($res);

?>