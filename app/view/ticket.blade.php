@extends("layouts.master")

<style type="text/css">
body{
visibility: hidden;
}

</style>

@section("main")


<div id="app">
    <div class="headerb">
        <div class="container">
            @if($ticketType == 'film')
            <h1 v-text="movie.title.toFaDigit()"></h1>
            @else
            <h1 v-text="concert.title.toFaDigit()"></h1>
            @endif

            @if($ticketType == 'film')
            <div class="cat">{{ $type }}</div>
            @endif
            <div class="clearfix"></div>
        </div>
    </div>




    <div id="factor" class="container" v-show="showFactor" v-cloak>
         <div class="buy">
            <div class="row content">
                <h3>سفارش شما : </h3>
                <div class="factor">
                    <div class="row">
                        <div class="col-sm-6">

                            <p><strong>مشخصات فیلم</strong></p>
                            <div class="col-sm-6">
                                 عنوان فیلم :
                            </div>
                            
                            @if($ticketType == 'concert')
                            <div class="col-sm-6">
                                @{{concert.title.toFaDigit()}}
                            </div>
                            @else
                            <div class="col-sm-6">
                                @{{movie.title.toFaDigit()}}

                            </div>
                            <div class="col-sm-6">
                                 مدت زمان پخش :
                            </div>
                            <div class="col-sm-6">
                                @{{movie.time_out.toFaDigit()}} دقیقه
                            </div>
                            @endif

                            <div class="col-sm-6">
                                 تاریخ و زمان پخش :
                            </div>
                            <div class="col-sm-6">
                                @{{selectedSans.date}} - @{{selectedSans.time}}
                            </div>

                        </div>
                        <div class="col-sm-6">

                            <p><strong>مشخصات خریدار</strong></p>
                            <div class="col-sm-6">
                                 نام / نام خانوادگی :
                            </div>
                            <div class="col-sm-6">
                                @{{userInfo.name}}
                            </div>
                            <div class="col-sm-6">
                                 شماره تلفن همراه :
                            </div>
                            <div class="col-sm-6">
                                @{{userInfo.mobile}}
                            </div>

                        </div>
                    </div>
                    <div style="padding-top: 16px;margin-top: 16px;border-top: 1px solid gray">
                        <div class="row padding">
                            <div class="col-sm-6">
                                 صندلی های انتخاب شده :
                            </div>
                            <div class="col-sm-6">
                                @{{get_chairs_alpha}}
                            </div>
                        </div>
                        <div class="row padding">
                            <div class="col-sm-6 ">
                                قیمت صندلی ها :
                            </div>
                            <div class="col-sm-6">
                                @if($ticketType == 'film')
                                @{{ get_movie_price }} تومان
                                @else
                                @{{ get_concert_prices }} تومان
                                @endif
                            </div>
                        </div>
                        <div class="row padding">
                            <div class="col-sm-6 ">
                                تعداد صندلی های انتخاب شده :
                            </div>
                            <div class="col-sm-6">
                                @{{ selectedChairs.length }}
                            </div>
                        </div>
                        <div class="row padding">
                            <div class="col-sm-6 ">
                                تخفیف :
                            </div>
                            <div class="col-sm-6">
                                @{{ discount_price }} تومان
                            </div>
                        </div>
                        <div style="margin-top: 50px;border-top: 1px solid gray;font-size: 20px;padding:10px 0">
                            <div class="col-sm-6 ">
                                جمع کل :
                            </div>
                            <div class="col-sm-6 ">
                                @{{ total_price_with_discount }} تومان
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 ">
                    <button class="btn btn-success pull-left" @click="sendFactor" >پرداخت</button>
                    <button class="btn btn-danger " @click="toggleFactor(true)">بازگشت</button>
                </div>
            </div>
        </div>
    </div>





    <div id="form" class="container" v-show="!showFactor"> 
        <div class="buy">
            <div class="col-md-4">
                <div class="cover"><img src="{{ upload }}{{ $image }}"></div>
                <div class="cast">
                    <ul>
                        @if($ticketType == 'film')
                        <li>درباره فیلم : {{ $des }}</li>
                        <li>کارگردان : {{ $director }}</li>
                        <li>تهیه کننده : {{ $producer }}</li>
                        <li>سال ساخت : {{ $year }}</li>
                        <li>بازیگران : {{ $actors }}</li>
                        <li>سایر عوامل : {{ $other_agents }}</li>
                        @else
                         <li>درباره برنامه : {{ $des }}</li>
                        @endif
                    </ul>
                </div>
            </div>
            <div class="col-md-8">
       
                
                <div class="reserve-title">
                    <h3>رزرو بلیط :</h3> 
                </div>

                <section class="reserve">

                    <div class="showtime">
                         <section class="panel">
                            <header class="panel-heading"> سانس ها</header>
                            <div class="panel-body">
                                <sansha></sansha>
                            </div>
                        </section>
                    </div>
                   

                    <sandaliha :show="showChairs"></sandaliha>

                    <div id="chiarsSection" class="chairs" v-show="step==1"> 

                        <section class="panel">
                            <header class="panel-heading">انتخاب صندلی</header>
                            <div class="panel-body">

                                <div class="alert alert-danger" v-show="chairsError">
                                    باید حداقل یک صندلی انتخاب شود
                                </div>

                                <button class="btn btn-info" @click="showChairs=true">
                                    صندلی ها
                                </button>
                                <div class="box">
                                        @{{get_chairs_alpha}}
                                 <!--   <span v-for="c in get_sort_selected_chairs" class="lable myblue">@{{ c }}</span> -->
                                    <span class="lable mygrey" v-show="!selectedChairs.length">
                                        هنوز صندلی انتخاب نشده
                                    </span>
                                </div>
                            </div>
                        </section>
                       
                    </div>

                    <div class="discount" v-show="step==1">

                        <section class="panel">
                            <header class="panel-heading">کد تخفیف</header>
                            <div class="panel-body">
                                <input type="text" v-model="discount_code" class="form-control" placeholder="کد تخفیف خود را درصورت وجود وارد کنید"><br>
                                <button class="btn btn-primary" :disabled="!discount_code.length" @click="check_discount_code">بررسی کن</button>
                            </div>
                        </section>

                    </div>

                    <div class="info" v-show="step==1">

                        <section class="panel">
                            <header class="panel-heading">اطلاعات کاربری</header>
                            <div class="panel-body">
                                
                                

                                @include("components.auth")
                                
                            </div>
                        </section>

                    </div>


                    
                </section>


                @if($ticketType == 'film')
                <div style="padding:20px 0"><p >صحنه هایی از فیلم</p>
                   
                        <div class=" row gallery">
                            <div class="images">
                                <div v-for="s in get_scenes" class="col-lg-3 col-sm-4 col-xs-6">
                                    <a href="#"><img-pro class="thumbnail img-responsive" :src="s"></a>
                                </div>
                            </div>
                            <div tabindex="-1" class="modal fade" id="myModal" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button class="close" type="button" data-dismiss="modal">×</button>
                                        </div>
                                        <div class="modal-body"> </div>
                                        <div class="modal-footer">
                                            <button class="btn btn-default" data-dismiss="modal">بسته</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </div>
                @endif


            </div>
            <div class="clearfix"></div>
        </div>
    </div>


    <div class="loadingWrapper" v-show="loadingWrapper" v-cloak>
        <div class="loadingContent">لطفا صبر کنید ...</div>
    </div>

 <!--   <div ref="vueLoading" style="position: fixed;top: 0;left: 0;
    right: 0;bottom: 0;background: rgb(251, 251, 251);z-index: 99999">
        <div style="position: absolute;top: 50%;text-align: center;width: 100%">
        Loading..</div>
    </div> -->

</div>





<style>


.gallery{
    min-height: 100px;
    margin-top: 10px;
}
.images .thumbnail{
    height: 90px;
    width: 100%;
}

[v-cloak] { display:none; }

.buy{
    margin-bottom: 80px;
    min-height:1000px;
}
.factor{
    margin: 20px 0;
}
#factor h3{
    font-size: 20px;

}
.factor{
    border: 1px solid #b9b9b9;
    border-radius: 10px;
    padding: 30px;
    color: #545454;
   
    background: #f1f1f1;
}
.factor .row div{
    padding:5px 15px ;
}
.factor p strong{
    font-weight: 100;
    font-size: 20px;
}
.content{
    max-width: 700px;
    margin: 0 auto;
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

.lable{
    padding:5px 10px;
    
    margin:0 3px;
    display: inline-block;
}    
.myblue{
    background: rgba(118, 169, 155, 0.35);
}
.mygrey{
    color:gray;
}

.myheading {
    

    padding-right: 10px;
    margin-bottom: 10px;
    color: #afafaf;
    border-bottom: 1px dashed #cecece;
    margin-top: 20px;
    margin-bottom: 20px;
}

.btns{
    padding:10px 0;
    margin-top: 20px;
}

.box{
    border: 1px solid #eaeaea;
    padding:10px;
    margin-top: 20px;
    border-radius: 5px;
}

.reserve{

    padding: 20px;
    margin-top: 20px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 12px;
    box-shadow: 0 0 10px #dadada;
}

.reserve-title h3{
    font-size: 20px;
    margin-top: 30px
}


.cover img{
    height: 330px;
    width: 280px;
}


 .authTabs a{
    cursor: default;
  }
</style>




@getAppVars
@getAppScript



 <script>
   // $(document).ready(function () {
        $('.thumbnail').click(function () {
            $('.modal-body').empty();
            var title = $(this).parent('a').attr("title");
            $('.modal-title').html(title);
            $($(this).parents('div').html()).appendTo('.modal-body');
            $('#myModal').modal({
                show: true
            });
        });
//    });
</script>


@endsection