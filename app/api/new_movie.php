<?php

global $db;

$res = [];
$res["status"]  = "1";


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
	"scenes" => implode(',',$Scenes),
	"other_agents" => $_POST['other_agents'],
	"producer" => $_POST['producer'],
	"actors" => $_POST['actors'],
	"director" => $_POST['director'],
	"year" => $_POST['year'],
	"type" => $_POST['type'],
	"price" => $_POST['price'],
	"half_price" => $_POST['half_price'],
	"time_out" => $_POST['time_out'],

);





if(!empty($_POST['id'])){


	$id = $_POST['id'];
	$film_id = $id;

	if(empty($image))
		unset($fields['image']);
	if(empty($bgImage))
		unset($fields['bg_image']);
	if(empty($Scenes))
		unset($fields['scenes']);

	$db->update("movies", $fields, "id=${id}");


}else{


	if(!$db->insert("movies", $fields)){
		//print_r($fields);
		$res["status"]  = "MOVIE INSERTION FAILD!";
	}


	$film_id = array_pop($db->run("SELECT LAST_INSERT_ID();")[0]);

}


if(!empty($_POST['chart'])){

	$bkp_reserve = $db->select("Reserve", "m_id=${film_id}");
	$db->delete("Reserve","m_id=${film_id}");

	foreach ($_POST['chart'] as $c) {
		foreach ($c["times"] as $time) {

			$sold_chairs = "";
			foreach ($bkp_reserve as $r) {
				if($r['date'] == $c['date'] && $r['time'] == $time)
					$sold_chairs = $r['chairs_sold'];
			}

			$fields = array(
				"m_id" => $film_id,
				"time" => $time,
				"is_half_price" => empty($c["is_half_price"]) ? "0" : "1",
				"date" => $c["date"],
				"chairs_sold" => $sold_chairs,
				"uniqe_id" => $film_id.'_'.str_replace("/", "-",$c['date']).'_'.str_replace(":", "-",$time)
			);

			if(!$db->insert("Reserve", $fields)){

				$res["status"]  = "RESERVE INSERTION FAILD";
				print_r($fields);
			
			}
		}
	}


}else{
	$db->delete("Reserve","m_id=${film_id}");
}




echo json_encode($res);

?>