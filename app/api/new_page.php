<?php

global $db;

$res = [];
$res["status"]  = "1";

//$_POST = json_decode($_POST["data"], true);




if(!empty($_POST)){
//print_r($_POST);
	$fields = array(
		"title" => $_POST['title'],
		"des" => $_POST['des'],
		"uri" => $_POST['uri']
	);


	if(!empty($_POST["id"])){

		$id = $_POST["id"];
		$db->update("pages", $fields, "id=${id}");

	}else{

		if(!$db->insert("pages", $fields)){

			$res["status"]  = "PAGES INSERTION FAILD!";
		}
	}


}




echo json_encode($res);

?>