<?php

global $db;

$res = [];
//$res["status"]  = "0";


$type = $_GET['type'];
$id = $_GET['id'];

if($type == 'film'){

	$film = $db->select("movies", "id=${id}");

	$film = check_movies($film)[0];

	if(!empty($film)){


		$reserve = $db->run("SELECT uniqe_id,m_id,time,date,is_half_price FROM Reserve WHERE m_id=${id} ");

		$reserve = check_showtimes($reserve, 60);

	
		foreach ($reserve as $i => $r) {
			$reserve[$i]['price'] = $film['price'];
			$reserve[$i]['half_price'] = $film['half_price'];

		}


		$res = $reserve;

		
	}else{
		$res = 0;
	}
}else if($type == 'concert'){
	
	$concert = $db->select("concerts", "id=${id}");

	$concert = check_concerts($concert)[0];

	if(!empty($concert)){


		$reserve = $db->run("SELECT uniqe_id,c_id,time,date FROM concertReserve WHERE c_id=${id}");


		foreach ($reserve as $i => $r) {
			$reserve[$i]['prices_list'] = $concert['prices_list'];

		}

		$res = $reserve;

	}else{
		$res = 0;
	}
}


echo json_encode($res);

?>