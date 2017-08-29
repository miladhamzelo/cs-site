<?php

global $db;

$res = [];
$res["status"]  = "1";

$movieType = 'film';
$ReserveTable = 'Reserve';
if(!empty($_POST['isConcert']) && $_POST['isConcert'] == "true"){
	$movieType = 'concert';
	$ReserveTable = 'concertReserve';
}



foreach ($_POST['chairs'] as $chair) 
	$chairs .= $chair['name'] . ' ';

$bought = "0";
$code = mt_rand(100000,999999);
$res['code'] = $code;

if($_POST['uid'] == "0")
	$bought = "1";


$urid = $_POST['urid'];

$reserve = array_pop($db->select($ReserveTable ,"uniqe_id='${urid}'"));
$is_half_price = $reserve["is_half_price"];
$chairs_sold = json_decode($reserve['chairs_sold'], true);


if(!empty($chairs_sold) && is_array($chairs_sold))
	foreach ($chairs_sold as $chair) {
		foreach ($_POST['chairs'] as $c) {
			if($chair['id'] == $c['id'])
				$res['status'] = 'CHAIRS_IS_EXIST';	
		}
	}


if($res['status'] == "1"){



	

	$date = new DateTime();
	$d = date_format($date, "j");
	$m = date_format($date, "n");
	$y = date_format($date, "Y");

	$h = date_format($date, "H");
	$min = date_format($date, "i");

	$time = "${h}:${min}";
	$date = gregorian_to_jalali($y, $m, $d, "/");




	$discount = 0;
	$total_price = (int)$_POST["total_price"];
	$dis_val = check_discount_code($_POST['discount']);
	if($dis_val["status"] == "1"){

		$discount = $dis_val["value"];
		$discount_pirce = ((int)$discount/100)*$total_price;
		$total_price = $total_price - $discount_pirce;
	}





	$fields = array(
		"user_id" => $_POST['uid'],
		"movie_id" => $_POST['mid'],
		"movie_type" => $movieType,
		"reserve_id" => $_POST['urid'],
		"chairs" => trim($chairs),
		"discount" => $discount,
		"total_price" => (string)$total_price,
		"date" => $date,
		"time" => $time,
		"code" => $code,
		"is_half_price" => $is_half_price,
		"bought" => $bought
	);


	if(!$db->insert("Factors", $fields)){

		$res["status"]  = "FACTOR INSERTION FAILD!";
	}


	$factor_id = array_pop($db->run("SELECT LAST_INSERT_ID();")[0]);

	$res["factor_id"] = $factor_id;

}



if($res['status'] == "1"){

	foreach ($_POST['chairs'] as $i => $c) {

		$chairs_sold[] = ["id" => $c['id'], "fid" => $factor_id];
	}

	$fields = array(
		"chairs_sold" => json_encode($chairs_sold),		
	);

	if(!$db->update($ReserveTable , $fields, "uniqe_id='${urid}'")){

		$res["status"]  = "RESERVE UPDATING FAILD!";
	}

}


echo json_encode($res);

?>