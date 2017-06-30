<?php

global $db;

$res = [];
$res["status"]  = "1";


$factors = $db->select("Factors", "bought=0");

//print_r($factors);

$now = new DateTime();


foreach ($factors as $i => $f) {

	$fdate = new DateTime($f['time']);
	$diff = $now->diff($fdate);
	//print_r($f);
	echo "diff min: ".(int)$diff->i . "<br>";
	echo "diff hour: ".(int)$diff->h;
	if((int)$diff->i > 20 || (int)$diff->h > 0){

		$fid = $f["id"];
		$urid = $f["reserve_id"];
		$mt = $f["movie_type"];

		$db->delete("Factors", "id=${fid}");

		$ReserveTable = $mt == "film" ? "Reserve" : "concertReserve";
		$reserve = array_pop($db->select($ReserveTable, "uniqe_id='${urid}'"));

		$chairs_sold = json_decode($reserve['chairs_sold'], true);

		$new_chairs_sold = [];
		if(!empty($chairs_sold) && is_array($chairs_sold))
			foreach ($chairs_sold as $c) {
				if($c["fid"] != $fid)
					$new_chairs_sold[] = $c;
			}

		$fields = array(
			"chairs_sold" => json_encode($new_chairs_sold),		
		);

		$db->update($ReserveTable, $fields, "uniqe_id='${urid}'");		

	}
}


echo json_encode($res);

?>