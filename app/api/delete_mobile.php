<?php

global $db;

$res = [];
$res["status"]  = "1";

$id = $_GET["id"];

$db->delete("numbers","id = :id", ["id" => $id]);


echo json_encode($res);

?>