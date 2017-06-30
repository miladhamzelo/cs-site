<?php

global $db;

$res = [];
$res["status"]  = "1";
//print_r($_POST);

$_POST = json_decode($_POST["data"], true);
$image = $bgImage = "";
$Scenes = [];

if(!empty($_FILES)){

	$r = mt_rand();
	$uploadDir = getcwd()."/app/upload/";

	foreach ($_FILES as $key => $file) {

		if($key == "scenes"){

            if(is_array($file['name'])){
    			$len = count($file['name']);
    			for($i=0;$i<$len;$i++){
    
    				$filename = $r.$file["name"][$i];
    
    				if(!move_uploaded_file($file["tmp_name"][$i], $uploadDir.$filename))
    					die("FILE UPLOAD ERROR1");
    
    				$Scenes[] = $r.$_FILES["scenes"]["name"][$i];
    
    			}
            }else{
                
                $filename = $r.$file["name"];
    
				if(!move_uploaded_file($file["tmp_name"], $uploadDir.$filename))
					die("FILE UPLOAD ERROR1");

				$Scenes[] = $r.$_FILES["scenes"]["name"];
            }

		}else{

			$filename = $r.$file["name"];

			if(!move_uploaded_file($file["tmp_name"], $uploadDir.$filename))
				die("FILE UPLOAD ERROR2");
		}



	}

	if(!empty($_FILES["image"]["name"]))
		$image = $r.$_FILES["image"]["name"];
	if(!empty($_FILES["bgImage"]["name"]))
		$bgImage = $r.$_FILES["bgImage"]["name"];

}


$fields = array(
	"title" => $_POST['title'],
	"des" => $_POST['des'],
	"image" => $image,
	"bg_image" => $bgImage,
	"prices_list" => implode(' ',$_POST['prices_list']),

);





if(!empty($_POST['id'])){


	$id = $_POST['id'];
	$concert_id = $id;

	if(empty($image))
		unset($fields['image']);
	if(empty($bgImage))
		unset($fields['bg_image']);
	if(empty($Scenes))
		unset($fields['scenes']);

	$db->update("concerts", $fields, "id=${id}");


}else{
//print_r($fields);

	if(!$db->insert("concerts", $fields)){
		//print_r($fields);
		$res["status"]  = "concert INSERTION FAILD!";
	}


	$concert_id = array_pop($db->run("SELECT LAST_INSERT_ID();")[0]);

}


if(!empty($_POST['chart'])){

	$bkp_reserve = $db->select("concertReserve", "c_id=${concert_id}");
	$db->delete("concertReserve","c_id=${concert_id}");

	foreach ($_POST['chart'] as $c) {
		foreach ($c["times"] as $time) {

			$sold_chairs = "";
			foreach ($bkp_reserve as $r) {
				if($r['date'] == $c['date'] && $r['time'] == $time)
					$sold_chairs = $r['chairs_sold'];
			}

			$fields = array(
				"c_id" => $concert_id,
				"time" => $time,
				"date" => $c["date"],
				"chairs_sold" => $sold_chairs,
				"uniqe_id" => $concert_id.'_'.str_replace("/", "-",$c['date']).'_'.str_replace(":", "-",$time)
			);

			if(!$db->insert("concertReserve", $fields)){

				$res["status"]  = "RESERVE INSERTION FAILD";
				print_r($fields);
			
			}
		}
	}


}else{
	$db->delete("concertReserve","c_id=${concert_id}");
}




echo json_encode($res);

?>