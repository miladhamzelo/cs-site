<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";



if(empty($_GET['id'])){



	$news = $db->run("select * from news order by id desc");

	$res = $news;
	


}else{

	$id = $_GET['id'];

	$news = array_pop($db->select("news","id=${id}"));

	$res = $news;
}



echo json_encode($res);

?>