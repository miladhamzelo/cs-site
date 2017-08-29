@extends("layouts.user")


@section("main")

<div class="card card-container" id="app">
    <img id="logo-img" class="logo-img-card" src="{{ assets }}img/logo-96.png" />
    <p id="profile-name" class="profile-name-card"></p>
    @if($login_err)
    <div class="alert alert-danger">نام کاربری یا رمز عبور اشتباه است</div>
    @endif
    <form class="form-signin" method="post">
        <span id="reauth-phone" class="reauth-phone"></span>
        <input type="phone" name="username" id="inputphone" class="form-control" placeholder="شماره موبایل" required autofocus>
        <input type="password" name="password" id="inputPassword" class="form-control" placeholder="رمز عبور" required>
        <div id="remember" class="checkbox">
            <forget-pass></forget-pass>
       
        </div>
        <div class="wrapper">
            <span class="group-btn  col-md-6">     
            <input class="btn btn-lg btn-primary btn-block btn-signin" type="submit" name="login" value="ورود">
        </span>
            <div class="clearfix"></div>
        </div>
    </form>

</div>


@getAppVars
@getAppScript


@endsection