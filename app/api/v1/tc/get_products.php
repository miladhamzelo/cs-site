<?php

global $db;

$res = [];
//$res["status"]  = "0";




$concerts = $db->select("concerts","archive=0");
$concerts = check_concerts($concerts);
$films = $db->select("movies","archive=0");
$films = check_movies($films);


$movies = [];

foreach ($concerts as $i => $c) {
	$movies[] = ["id" => $c["id"], "title" => $c["title"], "isConcert" => true];
	
}

foreach ($films as $i => $f) {
	$movies[] = ["id" => $f["id"], "title" => $f["title"], "isConcert" => false];
}

$res = $movies;





echo json_encode($res);

?>