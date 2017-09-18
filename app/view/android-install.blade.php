@extends("layouts.master")


@section("main")


<div id="app">
    <div class="headerb">
        <div class="container">
            <h1>دانلود نسخه اندرید</h1>
            <div class="clearfix"></div>
        </div>
    </div>




    <div  class="container"> 
        <div class="content w3-row w3-padding w3-white w3-card-2">
            تا ثانیه های دیگر به صورت خودکار دانلود آغاز میشود.<br>
            <a class="btn btn-success btn-lg" href="{{ $apk_path }}">دانلود</a>
        </div>
    </div>

</div>


<script>
    
setTimeout(()=>{
    window.location.href = "{{ $apk_path }}"
},7000)

</script>


<style>

.notfound{
    text-align: center;

}

.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>



@endsection