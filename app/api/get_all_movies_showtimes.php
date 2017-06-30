<?php

global $db;

$res = [];


$movies = $db->run("SELECT id,title,price,half_price FROM movies WHERE archive=0");

foreach ($movies as $m) {
	$mid = $m['id'];
	$reserve = check_showtimes($db->select("Reserve", "m_id=${mid}"), 60);
	if(!empty($reserve)){
		foreach ($reserve as $i => $r) {
			$reserve[$i]['movie'] = $m;
			$res[] = $reserve[$i];
		}
		
	}
	
}



echo json_encode($res);

?>