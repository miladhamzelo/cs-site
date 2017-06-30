<?php

global $db;

$fid = $_GET['id'];
$f = array_pop($db->select("Factors", "id=${fid}"));

$res = [];
$res["status"] = "0";


if($f['bought'] == 1){
	$res['status'] = "1";
	$res['code'] = $f["code"];
}


echo json_encode($res);



?>