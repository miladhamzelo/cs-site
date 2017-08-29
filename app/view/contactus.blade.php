@extends("layouts.master")


@section("main")

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
                        <li><i class="fa fa-location-arrow" aria-hidden="true"></i>{{ $address }}</li>
                        <li><i class="fa fa-phone-square" aria-hidden="true"></i>تلفن : {{ $phone }}</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-8">
                <form class="form-horizontal" role="form" method="post" action="contactus">
                    <div class="form-group">
                        <label for="name" class="col-sm-1 control-label">نام</label>
                        <div class="col-sm-11">
                            <input type="text" class="form-control" id="name" name="name" placeholder="نام شما" value="{{ $_POST['name'] }}"> 
                            {!! "<p class='text-danger'>$errName</p>" !!}</div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-sm-1 control-label">ایمیل</label>
                        <div class="col-sm-11">
                            <input type="email" class="form-control" id="email" name="email" placeholder="example@domain.com" value="{{ $_POST['email'] }}"> 
                            {!! "<p class='text-danger'>$errEmail</p>" !!}</div>
                    </div>
                    <div class="form-group">
                        <label for="message" class="col-sm-1 control-label">پیغام</label>
                        <div class="col-sm-11">
                            <textarea class="form-control" rows="4" name="message">{{ $_POST['message'] }}</textarea>
                            {!! "<p class='text-danger'>$errMessage</p>" !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="human" class="col-sm-1 control-label">2+3 </label>
                        <div class="col-sm-11">
                            <input type="text" class="form-control" id="human" name="human" placeholder="جواب؟"> 
                            {!! "<p class='text-danger'>$errHuman</p>" !!}</div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <input id="submit" name="submit" type="submit" value="ارسال" class="btn btn-primary"> </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            {{ $result }}  
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


@getAppVars
@getAppScript


@endsection