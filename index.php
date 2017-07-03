<?php
session_start();

define("PATH_ROOT", dirname(__FILE__));
define("SERVER_NAME", $_SERVER['SERVER_NAME']);



$env_content = file_get_contents(".env");
$env_content = explode("\n", $env_content);
foreach ($env_content as $e) {
	
	$option = explode("=", trim($e));
	if(!empty($option[0]))
		$_ENV[$option[0]] = $option[1];
}


require("source/functions.php");
require("controller.php");



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


SERVER("param", $param);
SERVER("ctrl", $ctrl);
SERVER("query", $_GET);


if(SERVER_NAME == 'localhost'){
	SERVER("root", $dirname . '/');
	$base = "http://localhost".$dirname."/";
}else{
	
	$protocol = $_SERVER["SERVER_PROTOCOL"] == "HTTP/1.1" ? "http" : "https";

	$dir = "/";
	if(strpos(SERVER_NAME, 'ngrok') !== false)
		$dir = $dirname."/";
	SERVER("root", $dir);
	$base = $protocol."://".SERVER_NAME."${dir}";

}


define("SERVER_PATH",$base);
define("base",$base."app/");
define("assets",base."view/assets/");
define("upload",base."upload/");

SERVER("assets", assets);
SERVER("base", base);


$ctrl_name1 = dash_to_camelcase($ctrl);
$ctrl_name2 = dash_to_underline($ctrl);

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
	header("HTTP/1.0 404 Not Found");
	exit;
}




//=========================================================================================

?>
