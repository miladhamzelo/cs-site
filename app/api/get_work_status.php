<?php

global $db;

$res = [];
$res["status"]  = "1";

$tomorrow = new DateTime();
$yesterday = new DateTime("-1 day");

$d = date_format($tomorrow, "j");
$m = date_format($tomorrow, "n");
$y = date_format($tomorrow, "Y");


$tomorrow = gregorian_to_jalali($y, $m, $d, "/");

$factors = $db->run("SELECT * FROM Factors WHERE bought=1 AND date='${tomorrow}'");
$res["tomorrow"]["number"] = count($factors);
$res["tomorrow"]["revenue"] = 0;
//$res["tomorrow"]["sold_chairs_count"] = 0;
//$res["tomorrow"]["half_prices_count"] = 0;
$res["tomorrow"]["complete_prices_count"] = 0;
foreach ($factors as $f) {
	//$res["tomorrow"]["half_prices_count"] += $f["is_half_price"] ? 1 : 0;
	//$res["tomorrow"]["complete_prices_count"] += $f["is_half_price"] ? 0 : 1;
	$res["tomorrow"]["revenue"] += (int)$f["total_price"];
	if($f['movie_type'] == "film")
		$res["tomorrow"]["sold_chairs_count"] += substr_count($f['chairs'], '-');
}

$d = date_format($yesterday, "j");
$m = date_format($yesterday, "n");
$y = date_format($yesterday, "Y");


$yesterday = gregorian_to_jalali($y, $m, $d, "/");

$factors = $db->run("SELECT * FROM Factors WHERE bought=1 AND date='${yesterday}'");
$res["yesterday"]["number"] = count($factors);
$res["yesterday"]["revenue"] = 0;
$res["yesterday"]["sold_chairs_count"] = 0;
//$res["yesterday"]["half_prices_count"] = 0;
//$res["yesterday"]["complete_prices_count"] = 0;
foreach ($factors as $f) {
	//$res["yesterday"]["half_prices_count"] += $f["is_half_price"] ? 1 : 0;
	//$res["yesterday"]["complete_prices_count"] += $f["is_half_price"] ? 0 : 1;
	$res["yesterday"]["revenue"] += (int)$f["total_price"];
	if($f['movie_type'] == "film")
		$res["yesterday"]["sold_chairs_count"] += substr_count($f['chairs'], '-');
}

echo json_encode($res);

?>