<?php

global $db;

$res = [];
$res["status"]  = "1";


if(!empty($_POST)){

	$db->run("Truncate table Showtimes");
	foreach ($_POST["sansha"] as $s) {
		if(!$db->insert("Showtimes", ["time" => $s])){

			$res["status"]  = "SHOWTIMES INSERTION FAILD!";
		}
	}

}




echo json_encode($res);

?>