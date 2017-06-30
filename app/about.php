<div id="app">
    <div class="headerb">
        <div class="container">
            <h1>تماس با ما</h1>
            <div class="clearfix"></div>
        </div>
    </div>




    <div class="container">
        <div class="buy">
            <div class="col-md-4">
                <div class="contactus">
                    <ul>
                        <li><i class="fa fa-location-arrow" aria-hidden="true"></i> آدرس : میدان شهربانی ، مجتمع تجاری ستاره شهر ، سینما ستاره شهر</li>
                        <li><i class="fa fa-phone-square" aria-hidden="true"></i>تلفن : 32238860 076</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-8">
                <form class="form-horizontal" role="form" method="post" action="index.php">
                    <div class="form-group">
                        <label for="name" class="col-sm-2 control-label">نام</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="name" name="name" placeholder="نام شما" value=""> </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-sm-2 control-label">ایمیل</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="email" name="email" placeholder="example@domain.com" value=""> </div>
                    </div>
                    <div class="form-group">
                        <label for="message" class="col-sm-2 control-label">پیغام</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" rows="4" name="message"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="human" class="col-sm-2 control-label">2 + 3 = ?</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="human" name="human" placeholder="Your Answer"> </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <input id="submit" name="submit" type="submit" value="ارسال" class="btn btn-primary"> </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <! Will be used to display an alert to the user>
                        </div>
                    </div>
                </form>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>

</div>





<style>
.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>


<?php GET_SERVER_VALUES() ?>
<?php GET_APP_JS() ?>