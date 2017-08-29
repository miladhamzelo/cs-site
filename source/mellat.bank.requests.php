<?php
session_start();

require_once("source/lib1/nusoap.php");


function requestPay(){
?>

<script>
function postRefId (refIdValue) {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "https://bpm.shaparak.ir/pgwchannel/startpay.mellat");         
    form.setAttribute("target", "_self");
    var hiddenField = document.createElement("input");              
    hiddenField.setAttribute("name", "RefId");
    hiddenField.setAttribute("value", refIdValue);
    form.appendChild(hiddenField);

    document.body.appendChild(form);         
    form.submit();
    document.body.removeChild(form);
}
</script>

<?php

	global $bank;
	global $db;



	$fid = $_GET['fid'];

	$f = array_pop($db->select("Factors", "id=${fid}"));

	if(empty($f)) page_404();

	$uid = $f['user_id'];
	//print_r($f);
	$u = array_pop($db->select("users", "id=${uid}"));

	//echo "price : " . $f['total_price'];

	$dbResult = $db->insert("payments", [

		"amount" => (int)$f['total_price'],
   		"date" => time(),
   		"name" => $u['fullName'],
   		"f_id" => $fid,
   		"mobile" => $u['phone'],
   		"type" => 'mellat',
		"authority" => "",

	]);



	if(!$dbResult){
		die("Error in insert payment");
	}

	$payId = array_pop($db->run("SELECT LAST_INSERT_ID();")[0]);

	$_SESSION['PAY_ORDER_ID'] = $payId;

	$client = new nusoap_client('https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl');
	$namespace='http://interfaces.core.sw.bps.com/';

	$terminalId = $bank["TerminalId"];
	$userName = $bank['UserName'];
	$userPassword = $bank['UserPassword'];
	$orderId = $payId;
	$amount = (int)$f['total_price'] * 10;
	$localDate = date("Ymd");
	$localTime = date("His");
	$additionalData = "";
	$callBackUrl = SERVER_PATH.'verifyPay?fid='.$fid;
	$payerId = "0";

	// Check for an error
	$err = $client->getError();
	if ($err) {
		echo '<h2>Constructor error</h2><pre>' . $err . '</pre>';
		die();
	}
  
	$parameters = array(
		'terminalId' => $terminalId,
		'userName' => $userName,
		'userPassword' => $userPassword,
		'orderId' => $orderId,
		'amount' => $amount,
		'localDate' => $localDate,
		'localTime' => $localTime,
		'additionalData' => $additionalData,
		'callBackUrl' => $callBackUrl,
		'payerId' => $payerId);

	// Call the SOAP method
	$result = $client->call('bpPayRequest', $parameters, $namespace);
	
	// Check for a fault
	if ($client->fault) {
		echo '<h2>Fault</h2><pre>';
		print_r($result);
		echo '</pre>';
		die();
	} 
	else {
		// Check for errors
		
		$resultStr  = $result;

		$err = $client->getError();
		if ($err) {
			// Display the error
			echo '<h2>Error</h2><pre>' . $err . '</pre>';
			die();
		} 
		else {
			// Display the result

			$res = explode (',',$resultStr);

		//	echo "<script>alert('Pay Response is : " . $resultStr . "');</script>";
		//	echo "Pay Response is : " . $resultStr;

			$ResCode = $res[0];

			
			
			if ($ResCode == "0") {
				// Update table, Save RefId

				$db->update("payments", ["authority" => $res[1]], "id=${payId}");
				echo "redirect to bank...";
				echo "<script language='javascript' type='text/javascript'>postRefId('" . $res[1] . "');</script>";
			} 
			else {
			// log error in app

				echo mellat_payment_status((int)$ResCode);
				// Update table, log the error
				// Show proper message to user
			}
		}// end Display the result
	}// end Check for errors


}








function verifyPay(){

	global $bank;
	global $db;

	$payId = $order_id = $_SESSION['PAY_ORDER_ID'];
	//echo "payerId : " . $payId;
	$fid  = $_GET['fid'];

	$f = array_pop($db->select("Factors", "id=${fid}"));
	$uid = $f['user_id'];
	$user = array_pop($db->select("users", "id = :id", ["id" => $uid]));

	$mid = $f['movie_id'];
	$table = $f['movie_type'] == "film" ? "movies" : "concerts";
	$movie = array_pop($db->select($table, "id = :id", ["id" => $mid]));

//	print_r($movie);	

	$urid = $f['reserve_id'];
	$table = $f['movie_type'] == "film" ? "Reserve" : "concertReserve";
	$reserve = array_pop($db->select($table, "uniqe_id = :urid", ["urid" => $urid]));

	$au = array_pop($db->select("payments", "id=${payId}"))["authority"];
	$res = [];
	$res["status"] = "0";



	$terminalId = $bank["TerminalId"];
	$userName = $bank['UserName'];
	$userPassword = $bank['UserPassword'];
	$orderId = $order_id;
	$verifySaleOrderId = $_POST['SaleOrderId'];
	$verifySaleReferenceId = $_POST['SaleReferenceId'];


	$client = new nusoap_client('https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl');
	$namespace='http://interfaces.core.sw.bps.com/';

	// Check for an error
	$err = $client->getError();
	if ($err) {
		echo '<h2>Constructor error</h2><pre>' . $err . '</pre>';
		die();
	}


	$RefId = $_POST['RefId'];


	//print_r($_POST);

	if($verifySaleOrderId != $order_id || $RefId!=$au || !isset($_POST['ResCode'])){
        
        die("erro in verify : 1");
    }

    $ResCode = (int)$_POST['ResCode'];

    if($ResCode != 0 && $ResCode != 43){

    //	$db->update("payments", ["refid" => $verifySaleReferenceId], "id=${payId}");
 
    	redirect("finishPay?fid=${fid}");
    }

  	  
	$parameters = array(
		'terminalId' => $terminalId,
		'userName' => $userName,
		'userPassword' => $userPassword,
		'orderId' => $orderId,
		'saleOrderId' => $verifySaleOrderId,
		'saleReferenceId' => $verifySaleReferenceId);

	// Call the SOAP method
	$result = $client->call('bpVerifyRequest', $parameters, $namespace);

	// Check for a fault
	if ($client->fault) {
		echo '<h2>Fault</h2><pre>';
		print_r($result);
		echo '</pre>';
		die();
	} 
	else {

		$resultStr = $result;
		
		$err = $client->getError();
		if ($err) {
			// Display the error
			echo '<h2>Error</h2><pre>' . $err . '</pre>';
			die();
		} 
		else {
			// Display the result
			// Update Table, Save Verify Status 
			$db->update("payments", ["refid" => $verifySaleReferenceId], "id=${payId}");
			$db->update("Factors", ["bought" => 1], "id=${fid}");
			// Note: Successful Verify means complete successful sale was done.
		//	echo "<script>alert('Verify Response is : " . $resultStr . "');</script>";
		//	echo "Verify Response is : " . $resultStr;
			$result = (int)$result;
			if(isset($result) and ($result==0 or $result==43)){;
                    //settel
			
                unset($result);
              //  $result = $client->call('bpReversalRequest', $parameters, $namespace);
                $result = $client->call('bpSettleRequest', $parameters, $namespace);
                if ($client->fault) {
	                die("fault in bpSettleRequest");
                }

           
	            $err = $client->getError();
	            if ($err) 
	            {
                    print_r($err);die();
	            }

            	$result = (int)$result;
                if(isset($result) and ($result==0 or $result==45) )
                {	
                	$mobile = $user["phone"];
                	$movieTitle = $movie["title"];
                	$code = $f["code"];
                	$date = $reserve["date"];
                	$time = $reserve["time"];
                	$movieType = $f['movie_type'];

                	send_success_sms($mobile, $movieTitle, $code, $date, $time, $movieType);

                    redirect("finishPay?fid=${fid}");


                }
            }

		}// end Display the result
	}// end Check for errors

}


?>