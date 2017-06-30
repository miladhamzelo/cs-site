<?php

global $db;

$res = [];


$concerts = $db->run("SELECT id,title,prices_list FROM concerts WHERE archive=0");

foreach ($concerts as $c) {
	$cid = $c['id'];
	$reserve = check_showtimes($db->select("concertReserve", "c_id=${cid}"), 60);
	if(!empty($reserve)){
		foreach ($reserve as $i => $r) {
			$reserve[$i]['movie'] = $c;
			$res[] = $reserve[$i];
		}
		
	}
	
}



echo json_encode($res);

?>