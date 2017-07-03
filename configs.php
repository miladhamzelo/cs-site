<?php



require 'vendor/autoload.php';

/***************************************

	@ Database Class and Configurations

		this is description forthis section
		and another description in continue.

*/




require('source/class.db.php');

$db_config = [

	"db_name" => env("DB_DATABASE"),

	"username" => env("DB_USERNAME"),

	"password" => env("DB_PASSWORD")
];



connect_to_db ( $db_config );



/***************************************

	@ Gump Validation 

		this is description forthis section
		and another description in continue.

*/


require "source/custom.gump.php";

$validator = new Gump();




/***************************************

	@ Blade Template Engine

		this is description forthis section
		and another description in continue.

*/


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



?>