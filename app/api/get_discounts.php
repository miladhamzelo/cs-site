<?php

global $db;
//global $param;

$res = [];

if(empty($_GET['id'])){

	$dis = $db->run("select * from discounts order by id desc");

	$res = $dis;


}else{

	$id = $_GET['id'];

	$dis = array_pop($db->select("discounts","id=${id}"));

	$res = $dis;
}



echo json_encode($res);

?>