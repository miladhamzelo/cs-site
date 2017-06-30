<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";

$archive = empty($_GET['archive']) ? "0" : "1";

if(empty($_GET['id'])){

	if(!empty($_GET['count'])){

		$top = $_GET['count'];


		$films = $db->run("SELECT TOP ${count} * FROM movies WHERE archive=${archive}");

		$res = $films;

	}else{


		$films = $db->select("movies","archive=${archive}");


		$res = check_movies($films, true);
		

	}


}else{

	$id = $_GET['id'];

	$film = $db->select("movies","id=${id} AND archive=${archive}");


	$res = array_pop(check_movies($film, true));

	//=================================== CHART ======================================//

	$chart = $db->select("Reserve","m_id=${id}");

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
			$myChart[$i]["is_half_price"] = $c['is_half_price'] == "0" ? false : true;
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