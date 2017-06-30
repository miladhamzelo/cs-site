<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";



if(empty($_GET['id'])){

	if(!empty($_GET['count'])){

		$top = $_GET['count'];


		$news = $db->run("SELECT TOP ${count} * FROM news");

		$res = $news;

	}else{


		$news = $db->run("select * from news order by id desc");

		$res = $news;
		
	}


}else{

	$id = $_GET['id'];

	$news = array_pop($db->select("news","id=${id}"));

	$res = $news;
}



echo json_encode($res);

?>