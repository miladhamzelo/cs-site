<?php

global $db;
//global $param;


$table = !empty($_GET['table']) ? $_GET['table'] : "Reserve";

$res = [];
$dl = empty($_GET['delay']) ? 30 : $_GET['delay'];
if(empty($_GET['date'])){

	$today = new DateTime();
	$d = date_format($today, "j");
	$m = date_format($today, "n");
	$y = date_format($today, "Y");

	$date = gregorian_to_jalali($y, $m, $d, "/");

}else{

	$date = $_GET['date'];
}


$sansInfo = $db->select($table ,"date='${date}' AND disable=0");

if(!empty($_GET['withInfo'])){

	$a = [];
	$movies = [];
	foreach ($sansInfo as $i => $s) {

		if($table == "Reserve"){
			$mid = $s['m_id'];
			$sql = "SELECT id,title,price,half_price FROM movies WHERE id=${mid}";
		}
		else{
			$cid = $s['c_id'];
			$sql = "SELECT id,title,prices_list FROM concerts WHERE id=${cid}";
		}

		if(!in_array($mid, $a)){
			$movie = array_pop($db->run($sql));
			$sansInfo[$i]['movie'] = $movies[$mid] = $movie;
		}else{
			$sansInfo[$i]['movie'] = $movies[$mid];
		}
	}
}

$res = check_showtimes($sansInfo, $dl);


echo json_encode($res);

?>