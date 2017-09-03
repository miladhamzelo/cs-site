<?php
session_start();

define("PATH_ROOT", dirname(__FILE__));
define("SERVER_NAME", $_SERVER['SERVER_NAME']);




$site_is_down = false;
if(file_exists(".down")){
	$site_is_down = true;
	//define("SITE_DOWN", true);
}





$env_content = file_get_contents(".env");
$env_content = explode("\n", $env_content);
foreach ($env_content as $e) {
	
	$option = explode("=", trim($e));
	if(!empty($option[0]))
		$_ENV[$option[0]] = $option[1];
}





$dirname = dirname($_SERVER["SCRIPT_NAME"]);

define("root", $dirname);

$info = $_SERVER["REQUEST_URI"];
if($dirname != '/')
	$info = str_ireplace($dirname,'',$_SERVER["REQUEST_URI"]);

$info = trim($info,'/');

if (false !== $pos = strpos($info, '?')) {
	$info = substr($info, 0, $pos);
}
$info = rawurldecode($info);

$url = explode('/',$info) ;
$ctrl = $url[0] ;
$ctrl = empty($ctrl)? "index" : $ctrl;
$param = array_slice($url,1); 


$routes = [];

require("source/functions.php");
require 'source/defines.php';
//require 'app/routes.php';
require 'configs.php';


/*
$hasController = false;
$method  = 'index';

if(file_exists("app/${ctrl}Controller.php")){
	$hasController = true;
	if(!empty($param))
		$method = array_shift($param);
	require "app/${ctrl}Controller.php";
}else{

	require "app/controller.php";
}


SERVER("param", $param);
SERVER("ctrl", $ctrl);
SERVER("query", $_GET);
SERVER("upload", upload);
SERVER("assets", assets);
SERVER("base", base);



if(!$hasController){
	$ctrl_name1 = dash_to_camelcase($ctrl);
	$ctrl_name2 = dash_to_underline($ctrl);
}else{
	$ctrl_name1 = dash_to_camelcase($method);
	$ctrl_name2 = dash_to_underline($method);
}
	


if(function_exists($ctrl_name1)) {
	if(count_params($ctrl_name1) == 1)
		$ctrl_name1($param);
	else
		$ctrl_name1();
}else if(function_exists($ctrl_name2)) {
	if(count_params($ctrl_name2) == 1)
		$ctrl_name2($param);
	else
		$ctrl_name2();
}else if(function_exists("_default")) {
	_default();
}else{
	page_404();
}


$_SESSION['flash_data'] = [];
*/
//=========================================================================================

?>
