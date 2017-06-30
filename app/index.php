<div id="app">
    
<div class="slider">
        
        <div id="jssor_1" style="position:relative;margin:0 auto;top:0px;left:0px;width:1500px;height:600px;overflow:hidden;visibility:hidden;">
            <!-- Loading Screen -->
            <div data-u="loading" class="jssorl-oval" style="position:absolute;top:0px;left:0px;text-align:center;background-color:rgba(0,0,0,0.7);"> <img style="margin-top:-19.0px;position:relative;top:50%;width:38px;height:38px;" src="<?= assets ?>img/oval.gif" /> </div>
            <div data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:1500px;height:600px;overflow:hidden;">
                <div v-for="slide in slider.slides"> <a :href="'http://'+slide.link"><img data-u="image" :src="'<?=upload?>/' + slide.image" /> </a></div>
                 <a data-u="any" href="http://www.jssor.com" style="display:none">Full Width Slider</a> </div>
            <!-- Bullet Navigator -->
            <div data-u="navigator" class="jssorb05" style="bottom:16px;right:16px;" data-autocenter="1">
                <!-- bullet navigator item prototype -->
                <div data-u="prototype" style="width:16px;height:16px;"></div>
            </div>
            <!-- Arrow Navigator --><span data-u="arrowleft" class="jssora22l" style="top:0px;left:8px;width:40px;height:58px;" data-autocenter="2"></span> <span data-u="arrowright" class="jssora22r" style="top:0px;right:8px;width:40px;height:58px;" data-autocenter="2"></span> </div>
        <!-- #endregion Jssor Slider End -->
    </div>
        <div id="information">
    <div class="container">

<div class="col-md-6">
               <ul class="social">

                    <li>

                        <a href="<?= $telegram ?>" target="_blank"><img src="<?= assets ?>img/telegram.png"></a>

                    </li>

                    <li>

                        <a href="<?= $instagram ?>" target="_blank"><img src="<?= assets ?>img/instagram.png"></a>

                    </li>

                    <li>

                        <a href="<?= $bazar ?>" target="_blank"><img src="<?= assets ?>img/android.png"></a>

                    </li>

                    <div class="clearfix"></div>

                </ul>
</div>
<div class="col-md-6">
            <ul style="margin: 15px 0;">
                <li><i class="fa fa-envelope" aria-hidden="true"></i> {{setting.contact.siteEmail}} </li>
                <li><i class="fa fa-phone-square" aria-hidden="true"></i>{{setting.contact.phone}} </li>
                <div class="clearfix"></div>
            </ul>
</div>

<div class="clearfix"></div>
        </div>

    </div>
    <div class="container">
        <div class="col-md-8 col-sm-12">
            <div class="clip">

                <div class="video">
                    <div :id="movieTrailer.id">
                        <script type="text/JavaScript"  :src="movieTrailer.src" ></script></div>
                    </div>
                <h3>{{movieTrailer.name}}</h3> 
            </div>
        </div>
        <div class="col-md-4 cold-sm-12">
            <div class="comingsoon">
                <div class="head">
                    <h2>به زودی در سینما ستاره</h2> </div>
                <div class="cover"> <img :src="'<?=upload?>/' + nextMovie.image">
                    <h5>{{nextMovie.name}}</h5> </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="container">
        <div class="ticketrow">
            <div class="head">
                <div class="col-md-2 col-sm-4 col-xs-6">
                    <div class="img"></div>
                    <div class="title">در حال اکران</div>
                </div>
                <div class="col-md-10 col-sm-8 col-xs-6">
                    <div class="bar"> </div>
                </div>
                <div class="clearfix"></div>
            </div>

            <div class="col-md-6" v-for="m in movies">
                <div class="movie">
                    <a :href="'ticket?id='+m.id"> <img :src="'<?=upload?>' + m.bg_image">
                        <div class="overly"> </div>
                        <h2>{{m.title}}</h2>
                        <div class="row">
                        <div class="button"> خرید بلیط</div>
                        </div>

                    </a>
                </div>
            </div>
            
            <div class="clearfix"></div>
        </div>

        <div class="ticketrow" v-if="concerts.length">
            <div class="head">
                <div class="col-md-3 col-sm-4 col-xs-6">
                    <div class="img"></div>
                    <div class="title">برنامه های فرهنگی</div>
                </div>
                <div class="col-md-9 col-sm-8 col-xs-6">
                    <div class="bar"> </div>
                </div>
                <div class="clearfix"></div>
            </div>

            <div class="col-md-6" v-for="c in concerts">
                <div class="movie">
                    <a :href="'ticket?cid='+c.id"> <img :src="'<?=upload?>' + c.bg_image">
                        <div class="overly"> </div>
                        <h2>{{c.title}}</h2>
						<div class="row">
                        <div class="button"> خرید بلیط</div>
						</div>

                    </a>
                </div>
            </div>
            
            <div class="clearfix"></div>
        </div>
    </div>
    <div class="rowsubcribe">
        <div class="container">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <h3>عضویت در خبرنامه پیامکی</h3>
                <h5>
                    برای دریافت جدیدترین اخبار مربوط به سینما ستاره در خبرنامه پیامکی عضو شوید
                </h5>
                <div class="smsbox">
                    <input class="form-control text-left" v-model="mobile">
                    <div class="button" @click="sendMobile">
                        <div class="bg"></div>
                    </div>
                </div>
                <div class="col-md-3"></div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
    <div class="newsrow">
        <div class="container">
            <div class="col-md-8">
                <div class="newsbox">
                    <div class="head"> <img src="<?=assets?>img/news.png">
                        <h4>اخبار</h4> </div>
                    <div class="clearfix"></div>
                    <div class="col-md-6" v-for="n in news">
                        <div class="news">
                            <a :href="'news?id=' + n.id"><div class="image"><img :src="'<?=upload?>/'+n.image"></a>
                                <div class="date">{{n.date}}</div>
                            </div> <a :href="'news?id=' + n.id"><h2>{{n.title}}</h2></a> </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="promotion">
                    <div class=" head ">
                        <h2>پیشنهاد استثنایی</h2> </div> <a v-for="p in promotions" :href="'http://' + p.link"><img  :src="'<?=upload?>/' + p.image"> </a></div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>

    <div ref="mobileDialog" style="display:none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.5)">
        <div style="min-height: 100px;width:300px; position: absolute;left: 50%;margin-left: -150px;
        top: 200px;padding:50px 10px;background: white;border-radius: 7px;text-align: center" v-html="mobileMsg"></div>
    </div>


</div>


<?php GET_SERVER_VALUES() ?>
<?php GET_APP_JS() ?>

<!--<script src="<?=base?>/dist/main.build.js?tesdsfsdfsdfdt"></script>-->

<script type="text/javascript">


            jssor_1_slider_init = function () {
                var jssor_1_options = {
                    $AutoPlay: true
                    , $SlideDuration: 800
                    , $SlideEasing: $Jease$.$OutQuint
                    , $ArrowNavigatorOptions: {
                        $Class: $JssorArrowNavigator$
                    }
                    , $BulletNavigatorOptions: {
                        $Class: $JssorBulletNavigator$
                    }
                };
                var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
                /*responsive code begin*/
                /*remove responsive code if you don't want the slider scales while window resizing*/
                function ScaleSlider() {
                    var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
                    if (refSize) {
                        refSize = Math.min(refSize, 1920);
                        jssor_1_slider.$ScaleWidth(refSize);
                    }
                    else {
                        window.setTimeout(ScaleSlider, 30);
                    }
                }
                ScaleSlider();
                $Jssor$.$AddEvent(window, "load", ScaleSlider);
                $Jssor$.$AddEvent(window, "resize", ScaleSlider);
                $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
                /*responsive code end*/
            };

            jssor_1_slider_init();
</script>


<style>

.movie{
    height:300px;
}
.movie img{
    height:100%;
}

.cover img{
    width: 100% !important;
    height: 300px !important;
}

.promotion img{
       width: 258px !important;
    height: 128px !important;
}
</style>