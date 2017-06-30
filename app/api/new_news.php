<?php

global $db;

$res = [];
$res["status"]  = "1";
$image = "";

$_POST = json_decode($_POST["data"], true);



if(!empty($_FILES)){

	$r = mt_rand();
	$uploadDir = getcwd()."/app/upload/";

	$filename = $r.$_FILES["news_image"]["name"];

	if(!move_uploaded_file($_FILES["news_image"]["tmp_name"], $uploadDir.$filename))
		die("FILE UPLOAD ERROR");


	$image = $filename;
}



if(!empty($_POST)){

	$date = new DateTime();

	$d = date_format($date, "j");
	$m = date_format($date, "n");
	$y = date_format($date, "Y");
	$date = gregorian_to_jalali($y, $m, $d, "/");

	$fields = array(
		"title" => $_POST['title'],
		"des" => $_POST['des'],
		"public" => $_POST['public']=="1"? true:false,
		"date" => $date
	);

	if(!empty($image))
		$fields["image"] = $image;

	if(!empty($_POST["id"])){

		$id = $_POST["id"];
		$db->update("news", $fields, "id=${id}");

	}else{

		if(!$db->insert("news", $fields)){

			$res["status"]  = "NEWS INSERTION FAILD!";
		}
	}


}




echo json_encode($res);

?>