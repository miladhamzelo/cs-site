<?php



function requestPay(){

	global $db;

	$fid = $_GET['fid'];
	$f = array_pop($db->select("Factors", "id=${fid}"));
	$uid = $f['user_id'];
	//print_r($f);
	$u = array_pop($db->select("users", "id=${uid}"));

	

    $MerchantID = 'e52ee6f0-3951-11e7-8413-005056a205be';  //Required
    $Amount = $f["total_price"]; //Amount will be based on Toman  - Required
    $Description = 'خرید بلیط فیلم ';  // Required
   // $Email = 'UserEmail@Mail.Com'; // Optional
  //  $Mobile = '09123456789'; // Optional
    $CallbackURL = SERVER_PATH.'verifyPay?fid='.$fid;  // Required

    // URL also can be ir.ir.zarinpal.com or de.ir.zarinpal.com
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

   	mylog($uid, "request pay is load.");

    //Redirect to URL You can do it also by creating a form
    if ($result->Status == 100) {
    	mylog($uid, "redirect to bank");
        header('Location: https://ir.zarinpal.com/pg/StartPay/'.$result->Authority);
    } else {
        echo zarinpal_error_msg($result->Status);
    }

}	



function verifyPay(){


	global $db;

	$fid = $_GET['fid'];
	$f = array_pop($db->select("Factors", "id=${fid}"));
	$uid = $f['user_id'];

	$res = [];
	$res["status"] = "0";


	mylog($uid, "verify pay is load.");
	mylog($uid, "verify pay status msg : ".$_GET['Status']);


    $MerchantID = 'e52ee6f0-3951-11e7-8413-005056a205be';
    $Amount = $f["total_price"]; //Amount will be based on Toman
    $Authority = $_GET['Authority'];

    if ($_GET['Status'] == 'OK') {

    	mylog($uid, "verify pay status is OK");
        // URL also can be ir.ir.zarinpal.com or de.ir.zarinpal.com
        $client = new SoapClient('https://ir.zarinpal.com/pg/services/WebGate/wsdl', ['encoding' => 'UTF-8']);

        $result = $client->PaymentVerification([
            'MerchantID'     => $MerchantID,
            'Authority'      => $Authority,
            'Amount'         => $Amount,
        ]);

        if ($result->Status == 100) {

        	mylog($uid, "verify pay Result Status is 100");
            //echo 'Transation success. RefID:'.$result->RefID;

        	$db->update("payments",  [ "refid" => $result->RefID ], "authority='${Authority}'");

        	$db->update("Factors", ["bought" => 1], "id=${fid}");

        	$res["status"] = "1";
        

        } /*else {
            //echo 'Transation failed. Status:'.$result->Status;
        }*/
    } /*else {
        //echo 'Transaction canceled by user';
    }*/

    if($res["status"] == '0'){

    	mylog($uid, "verify pay Result Status is 0");

    /*	$urid = $f['reserve_id'];
    	$ReserveTable = $f["movie_type"] == "concert" ? "concertReserve" : "Reserve";
    	$reserve = array_pop($db->select($ReserveTable, "uniqe_id='${urid}'"));
		$chairs_sold = json_decode($reserve["chairs_sold"], true);

		$new_chairs_sold = [];
		if(!empty($chairs_sold) && is_array($chairs_sold))
			foreach ($chairs_sold as $c) {
				if($c["fid"] != $fid)
					$new_chairs_sold[] = $c;
			}

		$fields = array(
			"chairs_sold" => json_encode($new_chairs_sold),		
		);

		$db->update($ReserveTable , $fields, "uniqe_id='${urid}'"); 

	*/

    }


    mylog($uid, "redirect to finishPay");

  //  if(!empty($_GET['isapp'])){
  //  	echo json_encode($res);
    	//redirect("finishPay?fid=${fid}", 3);
  //  }else{

    	redirect("finishPay?fid=${fid}");
  //  }

  

    
}	

?>