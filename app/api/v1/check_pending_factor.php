<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "1";

$fid = $_GET['id'];

$factor = array_pop($db->select("Factors", "id=${fid}"));

if($factor['bought'] == 0){

	$res['status'] = "0";
}else{

	$mid = $factor['movie_id'];
	$urid = $factor['reserve_id'];
	$ReserveTable = $factor['movie_type'] == "film" ? "Reserve" : "concertReserve";
	$table = $factor['movie_type'] == "film" ? "movies" : "concerts";

	$res["total_cost"] = $factor["total_price"];

	$movie = array_pop($db->run("select id,image,bg_image,title from $table where id=${mid}"));
	$res["factor_id"] = $fid;
	$res["title"] = $movie["title"];
	$res["cover"] = $movie["image"];

	$reserve = array_pop($db->run("select id,time,date,chairs_sold from $ReserveTable where uniqe_id='${urid}'"));
	$res["showtime_time"] = $reserve['time'];
	$res["showtime_date"] = $reserve['date'];

	$chairsSold = json_decode($reserve["chairs_sold"], true);

	$formatedChairssold = [];
	
	if(!empty($chairsSold))
		foreach ($chairsSold as $c) {
			$formatedChairssold[] = $c['id'];
		}

	$res["all_seats"] = implode(',', $formatedChairssold);
	$res["seats_count"] = count($formatedChairssold);




}

echo json_encode($res);

?>