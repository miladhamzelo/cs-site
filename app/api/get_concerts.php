<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";

$archive = empty($_GET['archive']) ? "0" : "1";

if(empty($_GET['id'])){

	if(!empty($_GET['count'])){

		$top = $_GET['count'];


		$concerts = $db->run("SELECT TOP ${count} * FROM concerts WHERE archive=${archive}");

		$res = $concerts;

	}else{


		$concerts = $db->select("concerts","archive=${archive}");


		$res = check_concerts($concerts, true);
		

	}


}else{

	$id = $_GET['id'];

	$concert = $db->select("concerts","id=${id} AND archive=${archive}");


	$res = array_pop(check_concerts($concert, true));

	//=================================== CHART ======================================//

	$chart = $db->select("concertReserve","c_id=${id}");

	$myChart = [];
	$i = -1;


	foreach ($chart as  $c) {

		$dateExists = false;
		foreach ($myChart as $a) 
			if($c["date"] == $a["date"])
				$dateExists = true;
		

		

		if(!$dateExists){
			$i++;
			$myChart[$i]["date"] = $c['date'];
			//$myChart[$i]["is_half_price"] = $c['is_half_price'] == "0" ? false : true;
		}

		//echo $myChart[$i]["date"];

		if(empty($myChart[$i]["times"])){
			$myChart[$i]["times"] = [];
		}

		array_push($myChart[$i]["times"], $c['time']);
	}


	$res["chart"] = $myChart;

	//=================================== CHART ======================================//

}



echo json_encode($res);

?>