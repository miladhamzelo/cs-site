<?php

global $db;

$res = [];
$res["status"]  = "1";


$user = array_pop($db->select("users","username=".$_POST['username']));

if(!empty($user) && $user["password"] == myhash($_POST['password'])){

	$res["user_id"] = $user["id"];

}else {

	$res["status"] = "0";
}



echo json_encode($res);

?>