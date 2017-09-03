<?php



require 'vendor/autoload.php';




$hash_salt = '!j@3O],kD g0F?1{7BQ9p!b2GdSYD,Kl,Ty(G[<DT}ket502V|`0g0AgkPB$+$r%';


$bank = [

	"TerminalId" => env("BANK_TERMINALID"),

	"UserName" => env("BANK_USERNAME"),

	"UserPassword" => env("BANK_PASSWORD"),
];

bank_enabled( true );


/***************************************

	@ Blade Template Engine

		this is description forthis section
		and another description in continue.

*/

Xiaoler\Blade\Autoloader::register();

use Xiaoler\Blade\FileViewFinder;
use Xiaoler\Blade\Factory;
use Xiaoler\Blade\Compilers\BladeCompiler;
use Xiaoler\Blade\Engines\CompilerEngine;
use Xiaoler\Blade\Filesystem;
use Xiaoler\Blade\Engines\EngineResolver;

$path = ['./app/view'];         // your view file path, it's an array
$cachePath = './app/cache/view';     // compiled file path

$file = new Filesystem;
$blade_compiler = new BladeCompiler($file, $cachePath);

require 'source/custom.bladeDirectives.php';

$resolver = new EngineResolver;
$resolver->register('blade', function () use ($blade_compiler) {
    return new CompilerEngine($blade_compiler);
});

// get an instance of factory
$blade_factory = new Factory($resolver, new FileViewFinder($file, $path));

// if your view file extension is not php or blade.php, use this to add it
$blade_factory->addExtension('tpl', 'blade');


/***************************************

	@ Gump Validation 

		this is description forthis section
		and another description in continue.

*/


require "source/custom.gump.php";

$validator = new Gump();





/***************************************

	@ Database Class and Configurations

		this is description forthis section
		and another description in continue.

*/



require('source/class.db.php');


connect_to_db ([

	"db_name" => env("DB_DATABASE"),

	"username" => env("DB_USERNAME"),

	"password" => env("DB_PASSWORD")
]);



/***************************************

	@ Prevent show specify pages when site is down.

		this is description forthis section
		and another description in continue.

*/


only_show_if_site_down([ "admin-panel" , "self-service"]);




/***************************************

	@ Prevent show specify pages when site is down.

		this is description forthis section
		and another description in continue.

*/



$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
 //   $r->addRoute('GET', '/users', 'get_all_users_handler');
	/*global $routes;
	foreach ($routes as $route) {
		$r->addRoute($route["method"], $route["uri"], $route["ctrl"]);
	}*/
	require 'app/routes.php';
});

// Fetch method and URI from somewhere
$httpMethod = $_SERVER['REQUEST_METHOD'];
//$uri = $_SERVER['REQUEST_URI'];

$uri = rawurldecode("/".implode("/",$url));
// echo "$uri ";
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        // ... 404 Not Found.

        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        // ... 405 Method Not Allowed
        
        break;
    case FastRoute\Dispatcher::FOUND:
    	$vars = $routeInfo[2];
    	$path = explode(".", $routeInfo[1]);
        $method = array_pop($path);
        $path = implode("/", $path);
        //echo "app/controllers/${path}.php";
        require "app/controllers/${path}.php";
        if(function_exists($method)){
        	$method($vars);
        }
        

        break;
}




?>