<?php

global $db;

$res = [];
$res["status"]  = "1";

$table = empty($_GET['table']) ? "Reserve" : $_GET['table'];

if(!empty($_GET)){

	$fid = $_GET['fid'];
	$urid = $_GET['urid'];
	$db->delete("Factors", "id=${fid}");
	$reserve = array_pop($db->select($table, "uniqe_id='${urid}'"));
	$chairs_sold = json_decode($reserve["chairs_sold"], true);

	$new_chairs_sold = [];
	if(!empty($chairs_sold) && is_array($chairs_sold))
		foreach ($chairs_sold as $c) {
			if($c["fid"] != $fid)
				$new_chairs_sold[] = $c;
		}

	$fields = array(
		"chairs_sold" => json_encode($new_chairs_sold),		
	);

	$db->update($table, $fields, "uniqe_id='${urid}'");


}

echo json_encode($res);

?>