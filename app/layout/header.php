<?php

$setting = array_pop($db->select("Data","name='setting'"));

if(!empty($setting))

    $setting = json_decode($setting["data"],true);



$telegram =  $setting['contact']['telegram'];

$instagram =  $setting['contact']['instagram'];

$bazar =  $setting['contact']['bazar'];

?>

<!doctype html>

<html>



<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>سینما ستاره شهر</title>

    <link href="<?= assets ?>css/style.css" rel="stylesheet" type="text/css">

    <link href="<?= assets ?>test/jquery.bxslider.css" rel="stylesheet" type="text/css">

    <script src="<?= assets ?>js/jquery.min.js"></script>

    <script src="<?= assets ?>js/bootstrap.min.js"></script>

    <script src="<?= assets ?>js/slider.js"></script>

    <script src="<?= assets ?>test/jquery.bxslider.min.js"></script>



    <link rel="stylesheet" type="text/css" href="<?= assets ?>/ticket.css">

</head>



<body>


    </div>

    <nav class="navbar navbar-inverse navbar-static-top">

        <div class="container">

            <div class="navbar-header">

                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar3"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>

                <a class="navbar-brand" href="#"><img src="<?= assets ?>img/logo.png"> </a>
                <h1 style="display: none;">سینما ستاره شهر</h1>

            </div>

            <div id="navbar3" class="navbar-collapse collapse">

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