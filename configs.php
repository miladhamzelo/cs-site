<?php





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

	@ Validation Class and Configurations

		this is description forthis section
		and another description in continue.

*/

require "vendor/wixel/gump/gump.class.php";
require "source/custom.gump.php";

$validator = new Gump();






?>