<?php


function route($method, $uri, $ctrl){
	global $routes;
	$routes[] = ["method"=>$method, "uri"=>$uri, "ctrl"=>$ctrl];
}


function alternative($ctrl){

	if(function_exists($ctrl)){
		$ctrl();
		echo "<script>window.history.pushState('${ctrl}', '', '${ctrl}');</script>";
	}
}


function flash($data){


	if(is_array($data)){
		// set array of flash
		foreach ($data as $name => $val) {
			$_SESSION["flash_data"][$name] = $val;
		}
		return;
	}
	// else get specify flash
	return empty($_SESSION['flash_data'][$data]) ? null : $_SESSION['flash_data'][$data];
}



function send_password($number, $pass){

	$postfields = array('receptor'=> $number, 'token'=> $pass, 'template'=>'pass');
	$ch = curl_init();
	$key = "505679597A7555626668626837497138696E674952773D3D";
	curl_setopt($ch, CURLOPT_URL, "https://api.kavenegar.com/v1/${key}/verify/lookup.json");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_POST, 1);
	// Edit: prior variable $postFields should be $postfields;
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
	$result = curl_exec($ch);

	return $result;
	
}



function send_success_sms($number, $title, $code, $date, $time, $movieType){

	$a = $movieType == "film" ? 'اکران' : 'اجرا';
	$dateTime = $time+"-"+$date;

	$postfields = array('receptor'=> $number, "template"=> "pay", 'token10'=> $title, 
		'token'=> $code, 'token2'=> $dateTime);
	$ch = curl_init();
	$key = "505679597A7555626668626837497138696E674952773D3D";
	curl_setopt($ch, CURLOPT_URL, "https://api.kavenegar.com/v1/${key}/verify/lookup.json");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_POST, 1);
	// Edit: prior variable $postFields should be $postfields;
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
	$result = curl_exec($ch);

	return $result;
	
}




function bank_enabled($enabled){
	if($enabled)
		require_once 'source/mellat.bank.requests.php';
	else
		require_once 'source/zarinpal.bank.requests.php';
	
}




function myhash($data){
	global $hash_salt;
	return hash("sha512", $data . $hash_salt);
}


function die_when_site_down(){

	global $site_is_down;

	if($site_is_down)
		die();
	
}




function page_404(){

	global $site_is_down;

	if($site_is_down){

		view("updating");
		exit;
	}

	view("404");
	exit;
}





function only_show_if_site_down($pages=[]){

	global $site_is_down;
	global $ctrl;
	$pages[] = "api";
	if($site_is_down && !in_array($ctrl, $pages)){

		view("updating");
		exit;
	}
}




function view($filename, $args=[]){

	global $blade_factory;

	echo $blade_factory->make($filename, $args)->render();
}


function env($key, $default=""){
	//$env = $_ENV["env"];
	if(!empty($_ENV[$key]))
		return $_ENV[$key];
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
    
    return "<script src='".base."/dist/main.build.js?${rnd}'></script>";
}


function GET_SERVER_VALUES() {
    
    global $scripts;

    $a = "<script>";
    $a .= $scripts;
    $a .= "</script>";

    return $a;
}



// ***************************************************************************


function count_params($func) {
    $reflection = new ReflectionFunction($func);

    return $reflection->getNumberOfParameters();
}

/*
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
*/

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

function mellat_payment_status($a){
	switch ($a) {
	case 0:
	$show = 'با موفقیت پرداخت شد';
	break;
	case 1:
	$show = 'عملیات ناموفق';
	break;
	case 11:
	$show = 'شماره کارت نامعتبر است';
	break;
	case 12:
	$show = 'موجودي كافي نيست';
	break;
	case 13:
	$show = 'رمز نادرست است';
	break;
	case 14:
	$show = 'تعداد دفعات وارد كردن رمز بيش از حد مجاز است';
	break;
	case 15:
	$show = 'كارت نامعتبر است';
	break;
	case 16:
	$show = 'دفعات برداشت وجه بيش از حد مجاز است';
	break;
	case 17:
	$show = 'كاربر از انجام تراكنش منصرف شده است';
	break;
	case 18:
	$show = 'تاريخ انقضاي كارت گذشته است';
	break;
	case 19:
	$show = 'مبلغ برداشت وجه بيش از حد مجاز است';
	break;
	case 111:
	$show = 'صادر كننده كارت نامعتبر است';
	break;
	case 112:
	$show = 'خطاي سوييچ صادر كننده كارت';
	break;
	case 113:
	$show = 'پاسخي از صادر كننده كارت دريافت نشد';
	break;
	case 114:
	$show = 'دارنده كارت مجاز به انجام اين تراكنش نيست';
	break;
	case 21:
	$show = 'پذيرنده نامعتبر است';
	break;
	case 23:
	$show = 'خطاي امنيتي رخ داده است';
	break;
	case 24:
	$show = 'طلاعات كاربري پذيرنده نامعتبر است';
	break;
	case 25:
	$show = 'مبلغ نامعتبر است';
	break;
	case 31:
	$show = 'پاسخ نامعتبر است';
	break;
	case 32:
	$show = 'فرمت اطلاعات وارد شده صحيح نمي باشد';
	break;
	case 33:
	$show = 'حساب نامعتبر است';
	break;
	case 34:
	$show = 'خطاي سيستمي';
	break;
	case 35:
	$show = 'تاريخ نامعتبر است';
	break;
	case 41:
	$show = 'شماره درخواست تكراري است';
	break;
	case 42:
	$show = 'راكنش Sale يافت نشد';
	break;
	case 43:
	$show = 'قبلا درخواست Verify داده شده است';
	break;
	case 44:
	$show = 'درخواست Verfiy يافت نشد';
	break;
	case 45:
	$show = 'تراكنش Settle شده است';
	break;
	case 46:
	$show = 'تراكنش Settle نشده است';
	break;
	case 47:
	$show = 'تراكنش Settle يافت نشد';
	break;
	case 48:
	$show = 'تراكنش Reverse شده است';
	break;
	case 49:
	$show = 'تراكنش Refund يافت نشد';
	break;
	case 412:
	$show = 'شناسه قبض نادرست است';
	break;
	case 413:
	$show = 'شناسه پرداخت نادرست است';
	break;
	case 414:
	$show = 'سازمان صادر كننده قبض نامعتبر است';
	break;
	case 415:
	$show = 'زمان جلسه كاري به پايان رسيده است';
	break;
	case 416:
	$show = 'خطا در ثبت اطلاعات';
	break;
	case 417:
	$show = 'شناسه پرداخت كننده نامعتبر است';
	break;
	case 418:
	$show = 'اشكال در تعريف اطلاعات مشتري';
	break;
	case 419:
	$show = 'تعداد دفعات ورود اطلاعات از حد مجاز گذشته است';
	break;
	case 421:
	$show = 'IPنامعتبر است';
	break;
	case 51:
	$show = 'تراكنش تكراري است';
	break;
	case 54:
	$show = 'تراكنش مرجع موجود نيست';
	break;
	case 55:
	$show = 'تراكنش نامعتبر است';
	break;
	case 61:
	$show = 'خطا در واريز';
	break;
	}
	return $show;
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