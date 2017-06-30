<?php


function env($key, $default=""){
	$env = $_SESSION["env"];
	if(!empty($env[$key]))
		return $env[$key];
	return $default;
}


function connect_to_db($configs = []){

	global $db;

	//if(SERVER_NAME == 'localhost' || strpos(SERVER_NAME, 'ngrok') !== false)
	//	$db = new db("mysql:host=127.0.0.1;dbname=sinama;charset=utf8", "root", "Mrt");
	//else
		$db = new db("mysql:host=127.0.0.1;dbname=".$configs['db_name'].";charset=utf8",$configs['username'], $configs['password']);
}



function mylog($user_id, $msg){

	global $db;
	
	$date = new DateTime();
	$datetime = $date->format('Y-m-d H:i:s');
	
	$fields = [
		"user_id" => $user_id,
		"msg" => $msg,
		"datetime" => $datetime
	];

	$db->insert("logs", $fields);


}


function dash_to_camelcase($text){
	
	$needle = "-";
	$lastPos = 0;

	while (($lastPos = strpos($text, $needle, $lastPos))!== false) {
		$char = strtoupper(substr($text, $lastPos+1, 1));
		$text = substr_replace($text, $char, $lastPos, 2);
	    $lastPos = $lastPos + strlen($needle);
	}

	return $text;
}



function dash_to_underline($text){

	return str_replace("-", "_", $text);
}



function redirect($ctrl="", $delay = 0){

	global $dirname;
	$dir =  $dirname != "/" ?  $dirname . "/" : "/";
	if($delay > 0)
		header( "refresh:${delay}; url=" . $dir . trim($ctrl, '/'));
	else
		header("Location: " . $dir . trim($ctrl, '/'));
	exit;
}


//  **************************************************************************

$scripts = "var SERVER = [];";

function SERVER($key, $val) {
    
    global $scripts;


    if(is_array($val))
    	$scripts .= "SERVER['${key}'] = " . json_encode($val) . ";";
    else if(is_bool($val) || is_numeric($val))
    	$scripts .= "SERVER['${key}'] = ${val};";
    else
		$scripts .= "SERVER['${key}'] = '${val}';";

 
}


function GET_APP_JS() {

	$rnd = mt_rand();
    
    echo "<script src='".base."/dist/main.build.js?${rnd}'></script>";
}


function GET_SERVER_VALUES() {
    
    global $scripts;

    echo "<script>";
    echo $scripts;
    echo "</script>";
}



// ***************************************************************************


function count_params($func) {
    $reflection = new ReflectionFunction($func);

    return $reflection->getNumberOfParameters();
}


function script($src, $basePath = ""){

	global $scripts;

	if(!empty($basePath))
		$scripts[] = $basePath . $src;
	else
		$scripts[] = assets . $src;

}


function get_scripts(){

	global $scripts;

	foreach ($scripts as $s) {
		echo "<script src='${s}'></script>";
	}

}


function encryptstr($str){
	
	$key = md5($str);
	
	$iv = mcrypt_create_iv(
    mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC),
    MCRYPT_DEV_URANDOM
	);

	return  base64_encode(
		$iv .
		mcrypt_encrypt(
			MCRYPT_RIJNDAEL_128,
			hash('sha256', $key, true),
			$str,
			MCRYPT_MODE_CBC,
			$iv
		)
	);
}


function check_user_agent ( $type = NULL ) {
        $user_agent = strtolower ( $_SERVER['HTTP_USER_AGENT'] );
        if ( $type == 'bot' ) {
                // matches popular bots
                if ( preg_match ( "/googlebot|adsbot|yahooseeker|yahoobot|msnbot|watchmouse|pingdom\.com|feedfetcher-google/", $user_agent ) ) {
                        return true;
                        // watchmouse|pingdom\.com are "uptime services"
                }
        } else if ( $type == 'browser' ) {
                // matches core browser types
                if ( preg_match ( "/mozilla\/|opera\//", $user_agent ) ) {
                        return true;
                }
        } else if ( $type == 'mobile' ) {
                // matches popular mobile devices that have small screens and/or touch inputs
                // mobile devices have regional trends; some of these will have varying popularity in Europe, Asia, and America
                // detailed demographics are unknown, and South America, the Pacific Islands, and Africa trends might not be represented, here
                if ( preg_match ( "/phone|iphone|itouch|ipod|symbian|android|htc_|htc-|palmos|blackberry|opera mini|iemobile|windows ce|nokia|fennec|hiptop|kindle|mot |mot-|webos\/|samsung|sonyericsson|^sie-|nintendo/", $user_agent ) ) {
                        // these are the most common
                        return true;
                } else if ( preg_match ( "/mobile|pda;|avantgo|eudoraweb|minimo|netfront|brew|teleca|lg;|lge |wap;| wap /", $user_agent ) ) {
                        // these are less common, and might not be worth checking
                        return true;
                }
        }
        return false;
}




function zarinpal_error_msg($id){
	switch ($id) {
		case '-1':
		return 'اطلاعات ارسال شده ناقص است.';
		break;
		case '-2':
		return 'آی پی یا مرچنت کد پذیرنده صحیح نیست';
		break;
		case '-3':
		return 'با توجه به محدودیت های شاپرک امکان پرداخت با رقم درخواست شده میسر نمی باشد.';
		break;
		case '-4':
		return 'سطح تایید پذیرنده پایین تر از صطح نقره ای است.';
		break;
		case '-11':
		return 'درخواست مورد نظر یافت نشد.';
		break;
		case '-12':
		return 'امکان ویرایش درخواست میسر نمی باشد.';
		break;
		case '-21':
		return 'هیچ نوع عملیات مالی برای این تراکنش یافت نشد.';
		break;
		case '-22':
		return 'تراکنش نا موفق می باشد.';
		break;
		case '-33':
		return 'رقم تراکنش با رقم پرداخت شده مطابقت ندارد.';
		break;
		case '-34':
		return 'سقف تقسیم تراکنش از لحاظ تعداد با رقم عبور نموده است.';
		break;
		case '-40':
		return 'اجازه دسترسی به متد مربوطه وجود ندارد.';
		break;
		case '-41':
		return 'اطلاعات ارسال شده مربوط به AdditionalData غیر معتر می باشد.';
		break;
		case '-42':
		return 'مدت زمان معتبر طول عمر شناسه پرداخت بین ۳۰ دقیقه تا ۴۰ روز می باشد.';
		break;
		case '-54':
		return 'درخواست مورد نظر آرشیو شده است.';
		break;
		case '100':
		return 'عملیات با موفقیت انجام گردیده است.';
		break;
		case '101':
		return 'عملیات پرداخت موفق بوده و قبلا Payment Verification تراکنش انجام شده است';
		break;
		default:
		return $id;
		break;
	}
}
/*

function show_page($page=null){
	
	global $ctrl;
	global $param;
	
	$page = empty($page)? (empty($param[0])? null : $param[0]) : $page;
	$f = "app/pages/".$ctrl."/".$page.".php";
	if(!empty($page) && file_exists($f)){
		require($f);
		return true;
	}
	return false;
}
function vue_com($comName=""){
	
	global $ctrl;
	global $param;
	
	
	$f = "app/components/".$comName."/index.html"
	if(!empty($comName) && file_exists($f)){
		require($f);
		return true;
	}
	return false;
}
function show_layout($layout){
	
	//if(nobody) return false;
	
	$f = "app/layout/".$layout.".php";
	if(!empty($layout) && file_exists($f)){
		
		include($f);
		return true;
	}
	return false;
}

function page_name(){
	
	global $param; 
	if(!empty($param[0])) return $param[0];
	return null;
}
*/


//=====================================================
function gregorian_to_jalali($gy,$gm,$gd,$mod=''){
 $g_d_m=array(0,31,59,90,120,151,181,212,243,273,304,334);
 $jy=($gy<=1600)?0:979;
 $gy-=($gy<=1600)?621:1600;
 $gy2=($gm>2)?($gy+1):$gy;
 $days=(365*$gy) +((int)(($gy2+3)/4)) -((int)(($gy2+99)/100)) 
+((int)(($gy2+399)/400)) -80 +$gd +$g_d_m[$gm-1];
 $jy+=33*((int)($days/12053)); 
 $days%=12053;
 $jy+=4*((int)($days/1461));
 $days%=1461;
 $jy+=(int)(($days-1)/365);
 if($days > 365)$days=($days-1)%365;
 $jm=($days < 186)?1+(int)($days/31):7+(int)(($days-186)/30);
 $jd=1+(($days < 186)?($days%31):(($days-186)%30));
 return($mod=='')?array($jy,$jm,$jd):z($jy).$mod.z($jm).$mod.z($jd);
}

function jalali_to_gregorian($jy,$jm,$jd,$mod=''){
 $gy=($jy<=979)?621:1600;
 $jy-=($jy<=979)?0:979;
 $days=(365*$jy) +(((int)($jy/33))*8) +((int)((($jy%33)+3)/4)) 
+78 +$jd +(($jm<7)?($jm-1)*31:(($jm-7)*30)+186);
 $gy+=400*((int)($days/146097));
 $days%=146097;
 if($days > 36524){
  $gy+=100*((int)(--$days/36524));
  $days%=36524;
  if($days >= 365)$days++;
 }
 $gy+=4*((int)(($days)/1461));
 $days%=1461;
 $gy+=(int)(($days-1)/365);
 if($days > 365)$days=($days-1)%365;
 $gd=$days+1;
 foreach(array(0,31,(($gy%4==0 and $gy%100!=0) or ($gy%400==0))?29:28 
,31,30,31,30,31,31,30,31,30,31) as $gm=>$v){
  if($gd<=$v)break;
  $gd-=$v;
 }
 return($mod=='')?array($gy,$gm,$gd):z($gy).$mod.z($gm).$mod.z($gd); 
}





function z($n){
	return strlen((string)$n)==1 ? "0".$n : $n;
}

//=====================================================








?>