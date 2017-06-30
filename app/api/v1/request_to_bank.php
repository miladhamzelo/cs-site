<?php


global $db;

$fid = $_GET['id'];
$f = array_pop($db->select("Factors", "id=${fid}"));
$uid = $f['user_id'];
$u = array_pop($db->select("users", "id=${uid}"));



$MerchantID = 'e52ee6f0-3951-11e7-8413-005056a205be';  //Required
$Amount = $f["total_price"]; //Amount will be based on Toman  - Required
$Description = 'خرید بلیط فیلم ';  // Required
// $Email = 'UserEmail@Mail.Com'; // Optional
//  $Mobile = '09123456789'; // Optional
$CallbackURL = SERVER_PATH.'verifyPay?isapp=1&fid='.$fid;  // Required

// URL also can be ir.zarinpal.com or de.zarinpal.com
$client = new SoapClient('https://ir.zarinpal.com/pg/services/WebGate/wsdl', ['encoding' => 'UTF-8']);

$result = $client->PaymentRequest([
    'MerchantID'     => $MerchantID,
    'Amount'         => $Amount,
    'Description'    => $Description,
    'CallbackURL'    => $CallbackURL,
   // 'Mobile'    => $Mobile,
   // 'Email'    => $Email
]);

	$fields = [

		"authority" => $result->Authority,
		"amount" => $Amount,
		"date" => time(),
		"name" => $u['fullName'],
		"f_id" => $fid,
		"mobile" => $u['phone']
	];

	$db->insert("payments",$fields);



//Redirect to URL You can do it also by creating a form
if ($result->Status == 100) {

    header('Location: https://ir.zarinpal.com/pg/StartPay/'.$result->Authority);
} else {
    echo zarinpal_error_msg($result->Status);
}


?>