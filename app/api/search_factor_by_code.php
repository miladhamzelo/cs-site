<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "1";


$code = $_GET['code'];

$res["ticket"] = array_pop($db->select('Factors', "code='${code}'"));
if(empty($res["ticket"]))
	$res["status"] = "0";

echo json_encode($res);

?>