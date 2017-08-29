<?php

global $db;

$res = [];
//$res["status"]  = "-1";

$code = $_GET['code'];

$res = check_discount_code($code);

echo json_encode($res);

?>