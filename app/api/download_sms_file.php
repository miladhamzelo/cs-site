<?php

global $db;

$numbers = $db->select("users","sms=1");
$txt_numbers = "";
foreach ($numbers as $user) {
	$txt_numbers .= $user['phone']."\n";
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