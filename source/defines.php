<?php


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



?>