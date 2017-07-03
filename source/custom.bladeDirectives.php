<?php



$blade_compiler->directive('myinput', function($exp) {

	list($vars) = explode(',',str_replace(['(',')',' ', "'", '"'], '', $exp));

	$vars = explode(".", $vars);

	//print_r($vars);

	$new = "";
	foreach ($vars as $key => $value) {
		if($key == 0){
			$new .= '$'.$value."['";
		}else if($key == count($vars)-1){
			$new .= $value."']";
		}else{
			$new .= $value."']['";
		}
	}

    return  "<?php echo ${new} ?>";
});




?>