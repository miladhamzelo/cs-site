<?php

global $db;
//global $param;

$res = [];
$res["status"]  = "1";


$table = !empty($_GET['table']) ? $_GET['table'] : "Reserve";

$id = $_GET['id'];

if(!$db->delete($table ,"id=${id}")){
	$res['status'] = "0";
}





echo json_encode($res);

?>