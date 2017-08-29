<?php

global $db;


$res = [];
$res["status"]  = "1";

//$db->delete("discounts");

print_r($_POST);

foreach ($_POST["discounts"] as $d) {
	
	if(!empty($d['id'])){

		// update

		$fields = [
			
			"value" => $d["value"],
			"code" => $d["code"],
			"expired_date" => $d["expired_date"],
		];

		$db->update("discounts", $fields, "id = :id", ["id" => $d["id"]]);
		

	}else{

		// insert


		$fields = [
			
			"value" => $d["value"],
			"code" => $d["code"],
			"expired_date" => $d["expired_date"],
		];

		if(!$db->insert("discounts", $fields)){
			$res["status"] = "FAILD INSERT IN DISCOUNTS";
		}
	}

}

echo json_encode($res);

?>