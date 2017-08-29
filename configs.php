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

/*

$blade_path = ['./app/view'];         // your view file path, it's an array
$blade_cachePath = './app/cache/view';     // compiled file path

$blade_compiler = new \Xiaoler\Blade\Compilers\BladeCompiler($blade_cachePath);

// you can add a custom directive if you want
require 'source/custom.bladeDirectives.php';

$blade_engine = new \Xiaoler\Blade\Engines\CompilerEngine($blade_compiler);
$blade_finder = new \Xiaoler\Blade\FileViewFinder($blade_path);

// if your view file extension is not php or blade.php, use this to add it
$blade_finder->addExtension('tpl');

// get an instance of factory
$blade_factory = new \Xiaoler\Blade\Factory($blade_engine, $blade_finder);


*/


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






?>