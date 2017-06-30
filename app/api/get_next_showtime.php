<?php

global $db;
//global $param;

$res = [];

$sansInfo = [];


$today = new DateTime();

//$today->sub(new DateInterval('PT1H'));

$i = -1;

//print_r( $today);


$table = !empty($_GET['table']) ? $_GET['table'] : "Reserve";

while(empty($res)){

	$sansInfo = [];
	while(empty($sansInfo) && $i<30){

		$i++;

		$d = date_format($today, "j");
		$m = date_format($today, "n");
		$y = date_format($today, "Y");


		$myHour = date_interval_create_from_date_string("1 hour");
		$h = (int)date_format(date_sub($today, $myHour), "G");

		$min = (int)date_format($today, "i");

		$date = gregorian_to_jalali($y, $m, $d, "/");

		$sansInfo = $db->run("select * from $table where date='${date}' AND disable=0");

		$today->modify('+1 day');

	}

	if($i > 0 || $h == 23)
		$h = 0;

	if($i == 30)
		break;

	if(!empty($sansInfo)){

		$lastDiff = 100;
		foreach ($sansInfo as $s) {
			
			$hour = (int)explode(":", $s["time"])[0];
			$minute = (int)explode(":", $s["time"])[1];
			$diff = $hour - $h;

			if($diff >= 0 && $diff < $lastDiff){
				if($diff != 0 || ($minute - $min) > 0){
					$lastDiff = $diff;
					$res = $s;
				}
			}
		}
		
	}

	$today->modify('+1 day');

}


if(!empty($_GET['withInfo'])){

	
	
	if($table == "Reserve"){
		$mid = $res['m_id'];
		$sql = "SELECT id,title,price,half_price FROM movies WHERE id=${mid}";
	}
	else{
		$cid = $res['c_id'];
		$sql = "SELECT id,title,prices_list FROM concerts WHERE id=${cid}";
	}


	$movie = array_pop($db->run($sql));
	
	$res['movie'] = $movie;
	
}


echo json_encode($res);

?>