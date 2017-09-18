<?php

global $db;

$numbers = $db->select("numbers");
$txt_numbers = "";
foreach ($numbers as $n) {
	$txt_numbers .= $n['number']."\r\n";
}

//$filename = "/tmp/numbers.txt"

$handle = fopen("/tmp/numbers.txt", "w");
fwrite($handle, $txt_numbers);
fclose($handle);

header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.basename('/tmp/numbers.txt'));
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize('/tmp/numbers.txt'));
readfile('/tmp/numbers.txt');
exit;




?>