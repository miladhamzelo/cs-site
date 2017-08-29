<?php

global $db;

$res = [];
$res["status"]  = "1";


if(!empty($_POST)){

	
	

	$fields =[
		
		"number" => $_POST["number"],
		
	];
	if(!$db->insert("numbers", $fields)){

		$res["status"]  = "MOBILE NUMBER INSERTION FAILD!";
	}



}




echo json_encode($res);

?>