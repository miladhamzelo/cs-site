<?php

global $db;


$res = [];
$res["status"]  = "1";

$mobile= $_SESSION['user_registred_mobile'];
$pass = $_SESSION['user_registred_pass'];

echo $mobile;

$res["sms_status"] = send_password($mobile, $pass);

echo json_encode($res);

?>