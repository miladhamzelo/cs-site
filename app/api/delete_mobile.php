<?php

global $db;

$res = [];
$res["status"]  = "1";

$id = $_GET["id"];

$user = array_pop($db->select("users","id=${id}"));
if(!empty($user["fullName"])){
	$db->update("users",["sms" => 0], "id=${id}");
}else{
	$db->delete("users","id=${id}");
}

echo json_encode($res);

?>