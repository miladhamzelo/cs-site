<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Mosaddek">
    <meta name="keyword" content="FlatLab, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <link rel="shortcut icon" href="{{ assets }}/admin/img/favicon.html">
    <title>پنل  مدیریت</title>
    <!-- Bootstrap core CSS -->

    @style("admin/css/bootstrap.min.css")
    <!--external css-->
    @style("admin/assets/font-awesome/css/font-awesome.css")
    @style("admin/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css")
    @style("admin/css/owl.carousel.css")
    <!-- Custom styles for this template -->
    @style("admin/css/style.css")
    @style("admin/css/style-responsive.css")


</head>

<body>

    <div id="app">
        <section id="container" class="">
            <!--header start-->

            <header class="header white-bg">
                <div class="sidebar-toggle-box">
                    <div data-original-title="Toggle Navigation" data-placement="right" class="icon-reorder tooltips"></div>
                </div>
                <!--logo start--><a href="#" class="logo"> پنل <span> مدیریت </span></a>
                <button class="btn btn-danger pull-left" style="margin: 15px" @click="logout">خروج</button>
                <!-- inbox dropdown end -->
                <!--  notification end -->
                
            </header>
            <!--header end-->
            <!--sidebar start-->
            <aside>
                <div id="sidebar" class="nav-collapse ">
                    <!-- sidebar menu start-->
                    <ul class="sidebar-menu">
                        <li class="parent">
                            <router-link to="/dashboard"> <i class="icon-dashboard"></i> <span>داشبورد</span> </router-link>
                        </li>
                        <li class="parent">
                            <router-link to="/main"> <i class="icon-play-circle"></i> <span>صفحه اصلی</span> </router-link>
                            <ul class="child">
                                <li>
                                    <router-link to="/main/slider"> <i class="icon-play-circle"></i> <span>اسلایدر</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/main/next-movie"> <i class="icon-play-circle"></i> <span>فیلم های آینده</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/main/promotion"> <i class="icon-play-circle"></i> <span>پیشنهاد استثنایی</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/main/movie-trailer"> <i class="icon-play-circle"></i> <span>آنونس فیلم</span> </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="parent">
                            <router-link to="/movies" > <i class="icon-play-circle"></i> <span>فیلم های در حال اکران</span> </router-link>
                            <ul class="child">
                                <li>
                                    <router-link to="/movies/list-movies"> <i class="icon-play-circle"></i> <span>لیست اکران ها</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/movies/archive-movies"> <i class="icon-play-circle"></i> <span>آرشیو</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/movies/release-movie"> <i class="icon-play-circle"></i> <span>اضافه کردن فیلم</span> </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="parent">
                            <router-link to="/concerts" > <i class="icon-play-circle"></i> <span>کنسرت ها</span> </router-link>
                            <ul class="child">
                                <li>
                                    <router-link to="/concerts/list-concerts"> <i class="icon-play-circle"></i> <span>لیست کنسرت ها</span> </router-link>
                                </li>
                               <!-- <li>
                                    <router-link to="/movies/archive-movies"> <i class="icon-play-circle"></i> <span>آرشیو</span> </router-link>
                                </li> -->
                                <li>
                                    <router-link to="/concerts/release-concert"> <i class="icon-play-circle"></i> <span>اضافه کردن کنسرت</span> </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="parent">
                            <router-link to="/news"> <i class="icon-play-circle"></i> <span>اخبار</span> </router-link>
                            <ul class="child">
                                <li>
                                    <router-link to="/news/list-news"> <i class="icon-play-circle"></i> <span>لیست اخبار</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/news/release-news"> <i class="icon-play-circle"></i> <span>اضافه کردن خبر</span> </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="parent">
                            <router-link to="/pages"> <i class="icon-play-circle"></i> <span>صفحات </span> </router-link>
                            <ul class="child">
                                <li>
                                    <router-link to="/pages/list-pages"> <i class="icon-play-circle"></i> <span>لیست صفحات</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/pages/release-page"> <i class="icon-play-circle"></i> <span>اضافه کردن صفحه</span> </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="parent">
                            <router-link to="/tickets"> <i class="icon-play-circle"></i> <span>خریدها</span> </router-link>
                            <ul class="child">
                                <li>
                                    <router-link to="/tickets/sale-tickets"> <i class="icon-play-circle"></i> <span>بلیط های فروخته شده</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/tickets/payments"> <i class="icon-play-circle"></i> <span>پرداخت ها</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/tickets/buy-ticket"> <i class="icon-play-circle"></i> <span>خرید بلیط</span> </router-link>
                                </li>
                                <li>
                                    <router-link to="/tickets/check-ticket"> <i class="icon-play-circle"></i> <span>چک کردن بلیط</span> </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="parent">
                            <router-link to="/sms-subcribe"> <i class="icon-play-circle"></i> <span>خبرنامه پیامکی</span> </router-link>
                        </li>
                   <!--     <li class="parent">
                            <router-link to="/users"> <i class="icon-play-circle"></i> <span>کاربران</span> </router-link>
                        </li> -->
                        <li class="parent">
                            <router-link to="/discounts"> <i class="icon-play-circle"></i> <span>تخفیف ها</span> </router-link>
                        </li>
                        <li class="parent">
                            <router-link to="/setting"> <i class="icon-play-circle"></i> <span>تنظیمات</span> </router-link>
                        </li>
                    </ul>
                    <!-- sidebar menu end-->
                </div>

            </aside>
            <!--sidebar end-->

            <section id="main-content">
    	        <section class="wrapper">

    	        	<router-view></router-view>

    	        </section>

    	    </section>

        </section>



	    <div id="loading" v-show="loading">بارگزاری...</div>
        

    </div>

    <div id="print"></div>

</body>

</html>

<link rel="stylesheet" type="text/css" href="{{ assets }}/ticket.css">

<style>

body{
    visibility: hidden;
}

#print{
    display: none;
}

@media print {

    @page {
         margin: 5px;
         padding: 0;
    }


    #app{
        display: none;
    }

    #print{
        position: absolute;
        top: 0;left: 0;
        display: block;
        
        padding:10px;
    }

}


#loading{
	position:absolute;
	z-index: 10000;
	top:20px;
	left:50%;
	margin-left:-50px;
	width:100px;
	text-align: center;
	padding:10px 20px;
	background:yellow;
	border:2px solid orange;
}


.menu-active > a{
    background: #f66 !important;
  color: white  !important;
  border-radius: 2px;
}
ul.child{
   display: none;
}


.router-link-active,
.my-router-link-active a {
    background: #F44336 !important;
    color: white !important;
    border-radius: 5px;
}

.child a{
    background: rgba(128, 128, 128, 0.13)!important;
    border-radius: 5px;
    border-right: 3px solid grey;
}

.child .router-link-active,
.child .my-router-link-active a {
    background: rgba(128, 128, 128, 0.13)!important;
    color: white !important;
    border-radius: 5px;
    border-right: 3px solid #F44336;
}



ul.sidebar-menu li > ul{
        margin: 0;
    padding: 0;
}

ul.sidebar-menu li li{
        margin: 0;
    margin-top: 10px;
}
ul.sidebar-menu li li>a{
    padding: 10px;
    padding-right: 10px;
}


.wrapper{
    
}

</style>



<!-- DATEPICKER -->

@style("jquery-datepicker/styles/jquery-ui-1.8.14.css")
@script("jquery-datepicker/scripts/jquery-1.6.2.min.js")
@script("jquery-datepicker/scripts/jquery.ui.datepicker-cc.all.min.js")
<script type="text/javascript">
        var $jQuery1_6 = $.noConflict(true);
</script>

<!-- DATEPICKER -->

@script("admin/tinymce/tinymce.min.js")


@getAppVars
@getAppScript

@script("pdp/js/jquery-1.10.1.min.js")
@script("admin/js/bootstrap.min.js")
@script("admin/js/jquery.scrollTo.min.js")
@script("admin/js/jquery.nicescroll.js")
@script("admin/js/jquery.sparkline.js")
@script("admin/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.js")
@script("admin/js/owl.carousel.js")
@script("admin/js/jquery.customSelect.min.js")

@script("admin/js/common-scripts.js")

@script("admin/js/sparkline-chart.js")
@script("admin/js/easy-pie-chart.js")








<script>
  
    $(document).ready(function () {


        $(".parent>a").click(function(){
            if(!$(this).hasClass("router-link-active")){
                $("ul.child").hide(200);
                $(this).next(".child").show(200);
            }
           
        })


       var activeSelected = setInterval(function(){

          console.log("aaaaaaaaaa")
          $(".router-link-active").next("ul.child").show();

          if($(".parent > .router-link-active").next("ul.child").length == 0 ||
            $(".parent > .router-link-active").next("ul.child").css("display") == "block")
            clearInterval( activeSelected )

            
                   
      },500)

        $("#owl-demo").owlCarousel({
            navigation: true
            , slideSpeed: 300
            , paginationSpeed: 400
            , singleItem: true
        });
    });
    //custom select box
    $(function () {
        $('select.styled').customSelect();
    });
</script>
