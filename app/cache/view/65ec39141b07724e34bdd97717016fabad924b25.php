<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Mosaddek">
    <meta name="keyword" content="FlatLab, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <link rel="shortcut icon" href="img/favicon.html">

    <title>سرویس خرید بلیط</title>

    <!-- Bootstrap core CSS -->
    <link href="http://localhost/sinama/app/view/assets/admin/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="http://localhost/sinama/app/view/assets/admin/css/bootstrap-reset.css" rel="stylesheet" type="text/css">
    <!--external css-->
    <link href="http://localhost/sinama/app/view/assets/admin/assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">
    <!-- Custom styles for this template -->
    <link href="http://localhost/sinama/app/view/assets/admin/css/style.css" rel="stylesheet" type="text/css">
    <link href="http://localhost/sinama/app/view/assets/admin/css/style-responsive.css" rel="stylesheet" type="text/css">
    <link href="http://localhost/sinama/app/view/assets/ticket.css" rel="stylesheet" type="text/css">

</head>

  <body class="login-body">

   <div id="app">
        
        <div id="container">   
            <div class="frame" v-if="loading">
                <div class="col-lg-12">
                    <section class="panel">
                        <div class="panel-body">
                            درحال بارگزاری...
                        </div>
                    </section>
                </div>
            </div>

            <div class="frame"  v-else-if="!loading && !showtime.id">
                <div class="col-lg-12">
                    <section class="panel">
                        <div class="panel-body">
                             درحال حاضر فیلمی برای اکران وجود ندارد
                        </div>
                    </section>
                </div>
            </div>



            <div  class="frame" v-else>
                
                <div class="col-lg-3">
                    <section class="panel panel-primary">
                        <header class="panel-heading ">مشخصات {{ title_msg }}</header>
                        <div class="panel-body">
                            <div class="col-md-12" v-if="showtime.id">
                                <div class="col-md-12"><big class="title"><strong>{{movie.title}}</strong></big></div>
                                <div class="col-md-12">

                                    <select v-model="date" class="date">
                                        <option :value="date" v-if="get_dates.length==0">{{date}} - {{getDay(date)}}</option>
                                        <option disabled v-if="get_dates.length==0">درحال بارگزاری ...</option>
                                        <option v-for="d in get_dates" :value="d">{{d}} - {{$root.getDay(d)}}</option>
                                    </select>

                                    <div class="times">

                                        <div v-for="(t,i) in get_times" >
                                            <input :id="'time'+i"  type="radio" v-model="time" :value="t.id" @click="sansSelect(t)"> 
                                            <label :for="'time'+i" class="time">
                                               <span style="margin: 0 3px">سانس {{lables[i]}}</span>  {{t.time}} 
                                               <span style="margin: 0 3px;font-size: 11px;
                                               font-style: italic;font-weight: 100;">{{t.movie.title}}</span> 
                                            </label>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-12 info2">
                            <div class="col-md-4">
                               <span class="chair"></span><span class="chair-lable">قابل انتخاب</span>
                            </div>
                            <div class="col-md-4">
                                <span class="chair blue"></span><span class="chair-lable">انتخاب شده</span>
                            </div>
                            <div class="col-md-4">
                                <span class="chair red"></span><span class="chair-lable">خریداری شده</span>
                            </div>
                        </div>


                    </section>
                    <section class="panel panel-primary" v-if="entity=='film'">
                        <header class="panel-heading ">چاپ مستقیم بلیط</header>
                        <div class="panel-body">
                            <div class="col-md-12">
                            
                                <check-ticket-page in-self-service="true"></check-ticket-page>
                            </div>
                        </div>
                    </section>
                </div>
                
                <div class="col-lg-9" v-if="showtime.id" >

                    <section class="panel panel-primary" v-if="loadingSans">
                        <header class="panel-heading ">رزرو صندلی</header>
                        <div class="panel-body">
                            درحال بارگزاری .... 
                        </div>
                    </section>

                    <section class="panel panel-primary"  v-else>
                        <header class="panel-heading ">رزرو صندلی</header>
                        <div class="panel-body">


                            <div class="chairs row">
                               
                                <div class="col-md-12  info">
                                    <div class="col-md-4"><strong>آزاد</strong></div>
                                    <div class="col-md-4"><strong> پرده نمایش</strong></div>
                                    <div class="col-md-4"><strong>خانواده</strong></div>
                                </div>
                                
                                <chairs v-model="selectedChairs"></chairs>



                            </div>

                           

                            <div class="row box2" style="border-top: 1px solid #f3f3f3;">
             

                                <div class="col-md-4 mtop" v-if="entity=='film'"><big>هزینه هر صندلی : 
                                    <strong>{{ get_movie_price.toMoney().toFaDigit() }} تومان 
                                        <span v-if="showtime.is_half_price=='1'">(نیم بها)</span>
                                    </strong>
                                    </big>
                                </div>

                                <div class="col-md-4">
                                    <big> <button class="btn btn-danger btn-lg" 
                                    :disabled="!selectedChairs.length>0" @click="sendFactor"><strong>تایید و تکمیل خرید</strong></button> </big>
                                </div>

                                
                                      
                                 <div class="col-md-4 mtop"><big>تعداد صندلی ها : <strong>{{selectedChairs.length.toFaDigit()}} عدد </strong></big></div>

                                <div class="col-md4 mtop">
                                    <big>هزینه کل : 
                                        <strong v-if="entity=='film'">{{total_price.toMoney().toFaDigit()}} تومان</strong>
                                        <strong v-else>{{concert_total_price.toMoney().toFaDigit()}} تومان</strong>
                                    </big>
                                </div>


                            
                               

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>


        <div class="loadingWrapper" v-if="loadingWrapper" v-cloak>
            <div class="loadingContent">لطفا صبر کنید ...</div>
        </div>

        <ticket-view v-model="ticketData">
        </ticket-view>
       

   </div>


  </body>
</html>


<style scoped>



@media  print{

    @page  {
        margin: 5px;
        padding: 0;
    }
    #container{
        display: none;
    }
    
}



.frame .title{
    display: block;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
}

.frame .date{
    padding: 3px;
    width: 100%;
    background: white;
    text-align-last:center;
}



.frame .times{
    margin-top: 10px;
}

.frame .time{
    width: 100%;
    padding: 10px;
    margin: 2px 0;
    border-radius: 5px;
    background: #fbfbfb;
        border: 1px solid #dedede;
    text-align: center;
}
.frame .times input[type="radio"] {
  display: none;
}
.frame .times input[type="radio"]:checked+label{
    background: #03A9F4;
    color: white;
}



.loadingWrapper {
    background : rgba(0,0,0,0.9);
    position: fixed;
    top: 0;left: 0;right: 0;bottom: 0;

}

.loadingContent{
    display: inline-block;
    position: absolute;
    top: 50%;left: 50%;
    width:200px;
    margin-left: -100px;
    color: white;
    font-size: 20px;

}






#app{
        min-width: 900px;
}
.frame{
    margin-top: 20px
}
.box{
    padding:10px;
    width:80%;
    margin:0 auto;
    border: 2px solid #d6d6d6;
    margin-bottom: 20px;
    text-align: center;
}
.box2{
    padding:20px 0;
 
    margin-top: 20px;
    text-align: center;
}
.mtop{
    margin-top: 10px;
}
.chairs{
    padding:0px;
    width:80%;
    margin:0 auto;
    margin-bottom: 20px;
}
.frame .info{
    padding: 10px;
        display: inline-block;
    box-shadow: 0 0 5px #e6e6e6;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #a4acb3;
    border-radius: 7px;
    text-align: center;
    color: white;
}
.info2{
    padding: 10px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 7px;
    text-align:center;
}
.info2 .chair{
    background:#a4acb3;
    border-radius: 4px;
    height: 17px;
    width: 18px;
    
    text-align: center;
    color: #fff;
    display: inline-block;
}
.chair-lable{

    display: inline-block;
  padding: 10px;
}
.blue{
    background: #4eaed4 !important;
}   

.red{
    background: #f56459 !important;
}
.panel {

    margin-top: -20px!important;
    margin-bottom: -20px!important;
}
</style>



<script src="http://localhost/sinama/app/view/assets/pdp/js/jquery-1.10.1.min.js"></script>

<?php echo GET_SERVER_VALUES() ?>
<?php echo GET_APP_JS() ?>