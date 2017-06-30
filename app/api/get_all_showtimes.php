<?php

global $db;

$res = [];
$res["status"]  = "1";


$showtimes = $db->run("select * from Showtimes");

$res["showTimes"] = $showtimes;


echo json_encode($res);

?>