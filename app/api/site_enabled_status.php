<?php


global $db;

$res = [];
$res["status"]  = "1";

if(file_exists(".down")){
	$res["status"]  = "0";
}

echo json_encode($res);

?>