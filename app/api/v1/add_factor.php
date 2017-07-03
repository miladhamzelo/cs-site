<?php

global $db;

$res = [];
$res["is_add_factor"]  = "1";

//print_r($_POST);

$movieType = 'film';
$ReserveTable = 'Reserve';
if(!empty($_POST['is_concert']) && ($_POST['is_concert'] === "true" || $_POST['is_concert'] === true)){
	$movieType = 'concert';
	$ReserveTable = 'concertReserve';
}

//die("<br>".$ReserveTable);

$_POST['chairs'] = json_decode($_POST['chairs'], true);

//print_r($_POST);

foreach ($_POST['chairs'] as $chair) 
	$chairs .= $chair['name'] . ' ';

$bought = "0";
$code = mt_rand();
$res['code'] = $code;

if($_POST['uid'] == "0")
	$bought = "1";


$urid = $_POST['uniqe_id'];

$reserve = array_pop($db->select($ReserveTable ,"uniqe_id='${urid}'"));

$chairs_sold = json_decode($reserve['chairs_sold'], true);


if(!empty($chairs_sold) && is_array($chairs_sold))
	foreach ($chairs_sold as $chair) {
		foreach ($_POST['chairs'] as $c) {
			if($chair['id'] == $c['id'])
				$res['is_add_factor'] = '-1';	
		}
	}


if($res['is_add_factor'] == "1"){

	$date = new DateTime();
	$d = date_format($date, "j");
	$m = date_format($date, "n");
	$y = date_format($date, "Y");

	$h = date_format($date, "H");
	$min = date_format($date, "i");

	$time = "${h}:${min}";
	$date = gregorian_to_jalali($y, $m, $d, "/");

	//======================================= ADD USER ==============================================

	$userId = 0;


	$user = array_pop($db->select("users","phone=".$_POST['user_mobile']));
	//die($user['id']);
	if(!empty($user)){

		$userId = $user['id'];

		$fields = array(
			"fullName" => $_POST['user_name']
		);

		$db->update("users", $fields, "id=".$user['id']);
			//$res["status"]  = "USER UPDATE FAILD!";
		

	}else{

		$fields = array(
			"fullName" => $_POST['user_name'],
			"phone" => $_POST['user_mobile'],
		);


		if(!$db->insert("users", $fields)){

			$res["status"]  = "USER INSERTION FAILD!";
		}


		$userId = array_pop($db->run("SELECT LAST_INSERT_ID();")[0]);
		
	}



	//======================================= ADD USER ==============================================

	$fields = array(
		"user_id" => $userId,
		"movie_id" => $_POST['mid'],
		"movie_type" => $movieType,
		"reserve_id" => $_POST['uniqe_id'],
		"chairs" => trim($chairs),
		"discount" => empty($_POST['discount']) ? "0" : $_POST['discount'],
		"total_price" => $_POST['total_price'],
		"date" => $date,
		"time" => $time,
		"code" => $code,
		"bought" => $bought
	);


	if(!$db->insert("Factors", $fields)){

		$res["is_add_factor"]  = "0";
	}


	$factor_id = array_pop($db->run("SELECT LAST_INSERT_ID();")[0]);

	$res["factor_id"] = $factor_id;

}



if($res['is_add_factor'] == "1"){

	foreach ($_POST['chairs'] as $i => $c) {

		$chairs_sold[] = ["id" => $c['id'], "fid" => $factor_id];
	}

	$fields = array(
		"chairs_sold" => json_encode($chairs_sold),		
	);

	$db->update($ReserveTable , $fields, "uniqe_id='${urid}'");

		//$res["is_add_factor"]  = "0";
	

}


echo json_encode($res);

?>