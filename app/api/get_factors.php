<?php

global $db;
//global $param;

$res = [];
//$res["status"]  = "1";



if(!empty($_GET['movie_id'])){

	$mId = $_GET['movie_id'];

	$Factors = $db->select("Factors", "movie_id=${mId}");

	$res = $Factors;
	if(is_array($Factors))
		foreach ($Factors as $i => $f) {
			if($f['user_id'] != 0){
				$id = $f['user_id'];
				$user = $db->select("users", "id=${id}");
				$res[$i]['fullName'] = $user['fullName'];
				$res[$i]['phone'] = $user['phone'];
			}
		}

} else if(!empty($_GET['user_id'])){

	$id = $_GET['user_id'];

	$factor = array_pop($db->select("Factors","user_id=${id}"));

	$res = $factor;
} else if(!empty($_GET['id'])){

	$id = $_GET['id'];

	$factor = array_pop($db->select("Factors","id=${id}"));

	$res = $factor;
} else {


	$Factors = $db->select("Factors");

	$res = $Factors;

	foreach ($Factors as $i => $f) {
		if($f['user_id'] != 0){
			$id = $f['user_id'];
			$user = $db->select("users", "id=${id}");
			$res[$i]['fullName'] = $user['fullName'];
			$res[$i]['phone'] = $user['phone'];
		}
	}

}



echo json_encode($res);

?>