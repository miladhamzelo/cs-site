<?php 

GUMP::add_validator("is_object", function($field, $input, $param = NULL) {
    return is_object($input[$field]);
});

/*
   Create a custom filter named "upper".
   The callback function receives two arguments:
   The value to filter, and any parameters used in the filter rule. It should returned the filtered value.
*/
GUMP::add_filter("upper", function($value, $params = NULL) {
    return strtoupper($value);
});




?>