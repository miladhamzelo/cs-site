<?php

global $db;

$res = [];
$res["status"]  = "1";




$id = $_GET['id'];



if(!$db->update("movies",["archive" => "1"],"id=${id}")){
	$res['status'] = "0";
}



if(!$db->update("Reserve",["disable" => "1"],"m_id=${id}")){
	$res['status'] = "0";
}





echo json_encode($res);

?>