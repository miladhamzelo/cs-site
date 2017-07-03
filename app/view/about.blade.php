@extends("layouts.master")

@section("main")

<div id="app">
    <div class="headerb">
        <div class="container">
            <h1>درباره ما</h1>
            <div class="clearfix"></div>
        </div>
    </div>




    <div class="container">
        <div class="buy">
            {!! $des !!}

            {{ "$des" }}
            <div class="clearfix"></div>
        </div>
    </div>

</div>

@endsection



<style>
.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>
