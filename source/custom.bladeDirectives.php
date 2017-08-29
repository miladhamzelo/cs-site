<?php


$blade_compiler->directive('style', function($exp) {

	list($data) = explode(',',str_replace(['(',')',' ', "'", '"'], '', $exp));
    return  '<link href="'.assets.$data.'" rel="stylesheet" type="text/css">';
});



$blade_compiler->directive('script', function($exp) {

	list($data) = explode(',',str_replace(['(',')',' ', "'", '"'], '', $exp));
    return  '<script src="'.assets.$data.'"></script>';
});


$blade_compiler->directive('getAppScript', function($exp) {
	
    return "<?php echo GET_APP_JS() ?>";
});



$blade_compiler->directive('getAppVars', function($exp) {

    return "<?php echo GET_SERVER_VALUES() ?>";
});




?>