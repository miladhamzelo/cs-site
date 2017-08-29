<!doctype html>

<html>



<head>

    <?php $__env->startSection("head"); ?>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title> <?php echo $__env->yieldContent("title", "سینما ستاره شهر"); ?> </title>

    <link href="http://localhost/sinama/app/view/assets/css/style.css" rel="stylesheet" type="text/css">

    <link href="http://localhost/sinama/app/view/assets/test/jquery.bxslider.css" rel="stylesheet" type="text/css">

    <link href="http://localhost/sinama/app/view/assets/ticket.css" rel="stylesheet" type="text/css">

    <script src="http://localhost/sinama/app/view/assets/js/jquery.min.js"></script>

    <script src="http://localhost/sinama/app/view/assets/js/bootstrap.min.js"></script>

    <script src="http://localhost/sinama/app/view/assets/js/slider.js"></script>

    <script src="http://localhost/sinama/app/view/assets/test/jquery.bxslider.min.js"></script>


    
    <?php echo $__env->yieldSection(); ?>


    <style>
        
            .v-clock,[v-clock]{
                display: none;
            }

            .body{
                visibility: hidden;
            }
    </style>
    
</head>



<body>


    <nav class="navbar navbar-inverse navbar-static-top">

        <div class="container">

            <div class="navbar-header">

                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar3"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>

                <a class="navbar-brand" href="#"><img src="<?php echo e(assets); ?>img/logo.png"> </a>
                <h1 style="display: none;">سینما ستاره شهر</h1>

            </div>

            <div id="topnav" class="navbar-collapse collapse">

                <ul class="nav navbar-nav navbar-right">

                    <li><a href="/">خانه</a></li>

                    <li><a href="about">درباره ما</a></li>

                    <li><a href="contactus">تماس با ما</a></li>

                    <li><a href="#">کافی شاپ</a></li>

                </ul>

            </div>

            <!--/.nav-collapse -->

        </div>

        <!--/.container-fluid -->

    </nav>

    <?php $__env->startSection('main'); ?>
    <?php echo $__env->yieldSection(); ?>

    <footer>
        <div class="container">
            <div class="col-md-4 menu">
                <div class="header">دسترسي سريع</div>
                <ul>
                    <li><a href="http://www.cinemasetareh.ir/page?id=3">قوانين و مقررات</a></li>
                    <li><a href="http://www.cinemasetareh.ir/page?id=4">شکايات </a></li>
                    <li><a href="http://www.cinemasetareh.ir/contactus">تماس با ما</a></li>
                    <li><a href="http://www.cinemasetareh.ir/about"> درباره ما </a></li>
                </ul>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4"><img id='jzpenbqenbqewlaoapfu' style='cursor:pointer' onclick='window.open("https://logo.samandehi.ir/Verify.aspx?id=72245&p=jyoeuiwkuiwkaodsdshw", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")' alt='logo-samandehi' src='https://logo.samandehi.ir/logo.aspx?id=72245&p=yndtodrfodrfshwlujyn' />
            <img id='rgvllbrhlbrhsguirgvl' style='cursor:pointer' onclick='window.open("https://trustseal.enamad.ir/Verify.aspx?id=57705&p=yncrqgwlqgwldrfsyncr", "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")' alt='' src='https://trustseal.enamad.ir/logo.aspx?id=57705&p=fujypeukpeukgthvfujy'/>

            </div>

            <div class="clearfix"></div>
        </div>
    </footer>



</body>




</html>
