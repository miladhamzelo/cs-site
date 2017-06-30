<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";



if(empty($_GET['id'])){

	if(!empty($_GET['count'])){

		$top = $_GET['count'];


		$pages = $db->run("SELECT TOP ${count} * FROM pages");

		$res = $pages;

	}else{


		$pages = $db->run("select * from pages order by id desc");

		$res = $pages;
		
	}


}else{

	$id = $_GET['id'];

	$page = array_pop($db->select("pages","id=${id}"));

	$res = $page;
}



echo json_encode($res);

?>