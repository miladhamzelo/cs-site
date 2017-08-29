<?php

global $db;

$res = [];
//$res["status"]  = "1";



$res = $db->select("numbers");


echo json_encode($res);

?>