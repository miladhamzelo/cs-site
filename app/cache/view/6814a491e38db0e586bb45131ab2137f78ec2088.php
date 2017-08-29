<?php $__env->startSection("head"); ?>
    
    ##parent-placeholder-1a954628a960aaef81d7b2d4521929579f3541e6##

    <link href="http://localhost/sinama/app/view/assets/css/unslider.css" rel="stylesheet" type="text/css">
    <script src="http://localhost/sinama/app/view/assets/js/unslider.js"></script>
    <style>
        .sliders{min-height:400px;}

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

<?php $__env->stopSection(); ?>


<?php $__env->startSection('main'); ?>

<div id="app">
    
<div class="slider">
        
        <div id="jssor_1" style="position:relative;margin:0 auto;top:0px;left:0px;width:1500px;height:600px;overflow:hidden;visibility:hidden;">
            <!-- Loading Screen -->
            <div data-u="loading" class="jssorl-oval" style="position:absolute;top:0px;left:0px;text-align:center;background-color:rgba(0,0,0,0.7);"> <img style="margin-top:-19.0px;position:relative;top:50%;width:38px;height:38px;" src="<?php echo e(assets); ?>img/oval.gif" /> </div>
            <div data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:1500px;height:600px;overflow:hidden;">
                <?php $__empty_1 = true; $__currentLoopData = $slides; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $slide): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                <div> <a href="http://<?php echo e($slide['link']); ?>"><img data-u="image" src="<?php echo e(upload); ?>/<?php echo e($slide['image']); ?>" /> </a></div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                <h1>123</h1>
                <?php endif; ?>
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

            <a href="<?php echo e($telegram); ?>" target="_blank"><img src="<?php echo e(assets); ?>img/telegram.png"></a>

        </li>

        <li>

            <a href="<?php echo e($instagram); ?>" target="_blank"><img src="<?php echo e(assets); ?>img/instagram.png"></a>

        </li>

        <li>

            <a href="<?php echo e($bazar); ?>" target="_blank"><img src="<?php echo e(assets); ?>img/android.png"></a>

        </li>

        <div class="clearfix"></div>

    </ul>
</div>
<div class="col-md-6">
    <ul style="margin: 15px 0;">
        <li><i class="fa fa-envelope" aria-hidden="true"></i> <?php echo e($siteEmail); ?> </li>
        <li><i class="fa fa-phone-square" aria-hidden="true"></i><?php echo e($phone); ?></li>
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
                    <div id="<?php echo e($movieTrailer['id']); ?>">
                        <script type="text/JavaScript"  :src="'<?php echo e($movieTrailer['src']); ?>'" ></script>
                    </div>
                </div>
                <h3><?php echo e($movieTrailer["name"]); ?></h3> 
            </div>
        </div>
        <div class="col-md-4 cold-sm-12">
            <div class="comingsoon">
                <div class="head">
                    <h2>به زودی در سینما ستاره</h2> 
                </div>
                <div class="sliders">
                    <ul>
                        <?php $__currentLoopData = $nextMovies; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $nm): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li>
                            <div class="cover"> <img src="<?php echo e(upload . $nm['image']); ?>">
                                <h5><?php echo e($nm["name"]); ?></h5> 
                            </div>

                        </li>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        <div class="clearfix"></div>
                    </ul>
                </div>
                
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

            <?php $__currentLoopData = $movies; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $m): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <div class="col-md-6">
                <div class="movie">
                    <a href="ticket?id=<?php echo e($m['id']); ?>"> <img src="<?php echo e(upload . $m['bg_image']); ?>">
                        <div class="overly"> </div>
                        <h2><?php echo e($m["title"]); ?></h2>
                        <div class="row">
                        <div class="button"> خرید بلیط</div>
                        </div>

                    </a>
                </div>
            </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            
            <div class="clearfix"></div>
        </div>

        <?php if(!empty($concerts)): ?>
        <div class="ticketrow">
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
            <?php $__currentLoopData = $concerts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $c): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <div class="col-md-6">
                <div class="movie">
                    <a href="ticket?cid=<?php echo e($c['id']); ?>"> <img src="<?php echo e(upload . $c['bg_image']); ?>">
                        <div class="overly"> </div>
                        <h2><?php echo e($c['title']); ?></h2>
						<div class="row">
                        <div class="button"> خرید بلیط</div>
						</div>

                    </a>
                </div>
            </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            
            <div class="clearfix"></div>
        </div>
        <?php endif; ?>
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
                    <div class="head"> <img src="<?php echo e(assets); ?>img/news.png">
                       <a href="news"><h4>اخبار</h4> </a></div>
                    <div class="clearfix"></div>
                    <?php $__currentLoopData = $news; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $n): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="col-md-6">
                        <div class="news">
                            <a href="news?id=<?php echo e($n['id']); ?>"><div class="image"><img src="<?php echo e(upload . $n['image']); ?>"></a>
                                <div class="date"><?php echo e($n["date"]); ?></div>
                        </div>
                        <a href="news?id=<?php echo e($n['id']); ?>"><h2><?php echo e($n['title']); ?></h2></a> 
                    </div>
                    </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="promotion">
                    <div class=" head ">
                        <h2>پیشنهاد استثنایی</h2> 
                    </div> 
                    <?php $__currentLoopData = $promotions; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $p): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <a href="http://<?php echo e($p['link']); ?>">
                        <img src="<?php echo e(upload . $p['image']); ?>"> 
                    </a>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>

    <div ref="mobileDialog" style="display:none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.5)">
        <div style="min-height: 100px;width:300px; position: absolute;left: 50%;margin-left: -150px;
        top: 200px;padding:50px 10px;background: white;border-radius: 7px;text-align: center" v-html="mobileMsg"></div>
    </div>


</div>


<?php echo GET_SERVER_VALUES() ?>
<?php echo GET_APP_JS() ?>

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



      
            $('.sliders').unslider({
                animation: 'fade',

                autoplay: true,
                infinite: false,
                keys: false,
                arrows: false,
                nav: false
            });

            
</script>




<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.master', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>