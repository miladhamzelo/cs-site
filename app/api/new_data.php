<?php

global $db;


$res = [];
$res["status"]  = "1";
$uploadKey = "";



if(!empty($_POST)){

	if(!empty($_POST["encrypted"]))
		$_POST = json_decode($_POST["data"], true);



	if(!empty($_POST["uploadKey"]))
		$uploadKey = $_POST["uploadKey"];

	

}


if(!empty($_FILES)){

	$r = mt_rand();
	$uploadDir = getcwd()."/app/upload/";

	foreach ($_FILES as $file) {

		if(is_array($file['name'])){

			$len = count($file['name']);
			for($i=0;$i<$len;$i++){

				//$filename = $r."-nextMovie-".$file["name"][$i];
				$filename = $uploadKey.$file["name"][$i];

				if(!move_uploaded_file($file["tmp_name"][$i], $uploadDir.$filename))
					die("FILE UPLOAD ERROR");

			}

		}else{

			//$filename = $r.$file["name"];
			$filename = $uploadKey.$file["name"];

			if(!move_uploaded_file($file["tmp_name"], $uploadDir.$filename))
				die("FILE UPLOAD ERROR");
		}
	}
}


if(!empty($_POST)){

	if(!empty($_POST["encrypted"]))
		$_POST = json_decode($_POST["data"], true);


	$name = $_POST['name'];
	$data = str_replace("\\n","<br>",$_POST['data']);


	if(is_array($data))
		$data = json_encode($data);


	$fields = [
		"data" => $data
	];

	$record = $db->select("Data","name='${name}'");
	if(empty($record)){

		$fields["name"] = $name;

		if(!$db->insert("Data", $fields)){
			$res["status"]  = "DATA INSERTION FAILD";		
		}

	}else{

		$db->run("UPDATE Data SET data='${data}' WHERE name='${name}'");	

	//	$db->update("Data", $fields, "name='${name}'");
			
	}
	
}

echo json_encode($res);

?>