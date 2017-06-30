<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";





$pays = $db->run("select * from payments order by id desc");

foreach ($pays as $i => $p) {

	$date = new DateTime();
	$date->setTimestamp($pays[$i]['date']);
	$d = date_format($date, "j");
	$m = date_format($date, "n");
	$y = date_format($date, "Y");

	$h = date_format($date, "H");
	$min = date_format($date, "i");

	$time = "${h}:${min}";
	$date = gregorian_to_jalali($y, $m, $d, "/");

	$pays[$i]["date"] = "$date - $time";

	//==================================================

	$fid = $p["f_id"];
	$pays[$i]["factor"] = [];
	if($fid != "0"){
		$factor = array_pop($db->select("Factors", "id=${fid}"));
		$r = explode("_", $factor["reserve_id"]);
		$pays[$i]["sans"] = $r[1] . " / " . str_replace("-", ":", $r[2]);
		$pays[$i]["movie_id"] = $factor['movie_id'];
		$pays[$i]["movie_type"] = $factor['movie_type'];
	}
}

$res = $pays;



echo json_encode($res);

?>