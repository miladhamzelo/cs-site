<?php
$lastVersion = 1;
$expiredVersion = 1;
$userVersionCode = $_GET["versionCode"];// for example 6
$isUpdateAvailable = false;
$isExpired = false;

$res = [];

$res["isExpired"] = $isExpired;
$res["isUpdateAvailable"] = $isUpdateAvailable;

if($userVersionCode<$expiredVersion){
  $isExpired = true;
  $res["isExpired"] = $isExpired;
  $res["isUpdateAvailable"] = $isUpdateAvailable;
}else if($userVersionCode < $lastVersion){
  $isUpdateAvailable = true;
  $res["isExpired"] = $isExpired;
  $res["isUpdateAvailable"] = $isUpdateAvailable;
}

echo json_encode($res);
?>