<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>سینما ستاره شهر</title>
    @style("css/style.css")
    @style("test/jquery.bxslider.css")
    @script("js/jquery.min.js")
    @script("js/bootstrap.min.js")
    @script("js/slider.js")
    @script("test/jquery.bxslider.min.js")
    <script>
        $(document).ready(function() {
            $('.thumbnail').click(function() {
                $('.modal-body').empty();
                var title = $(this).parent('a').attr("title");
                $('.modal-title').html(title);
                $($(this).parents('div').html()).appendTo('.modal-body');
                $('#myModal').modal({
                    show: true
                });
            });
        });

    </script>
    <style>
        body {
            background: #fff;
        }
        
        .logo {
            margin: 0 auto;
            text-align: center;
        }
        
        .logo h2 {
            font-size: 24px;
            text-align: center;
            margin-top: 20px
        }
        
        .logo h5 {
            font-size: 18px;
            text-align: center;
            margin-top: 30px;
        }

    </style>
</head>

<body>
    <div class="col-md-12">
        <div class="logo">
            <img src="{{ assets }}img/logo-com.png">
            <h2>سینما ستاره شهر</h2>
            <h5>در حال به روز رسانی ، لطفا لحظاتی بعد اقدام فرمایید</h5>
        </div>
    </div>

</body>

</html>
