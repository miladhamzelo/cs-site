<?php

global $db;

$res = [];
//$res["status"]  = "1";



$res = $db->run("SELECT phone,id FROM users WHERE sms=1");


echo json_encode($res);

?>