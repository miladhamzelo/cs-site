<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>WebSite Title</title>
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
</head>

<body>
    <div class="headerb">
        <div class="container">
            <h1>باشگاه مشتریان</h1>
            <div class="clearfix"></div>
        </div>
    </div>
    <div class="container">
        <div class="customer">

            <div class="clearfix"></div>
            
            @section('main')
            @show

            <div class="clearfix"></div>
        </div>

    </div>
</body>

</html>
