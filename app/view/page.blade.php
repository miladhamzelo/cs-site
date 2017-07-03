@extends("layouts.master")


@section("main")


<div id="app">
    <div class="headerb">
        <div class="container">
            <h1>{{ $title }}</h1>
            @if(!empty($date)) 
            <div class="cat">{{ $date }}</div>
            @endif
            <div class="clearfix"></div>
        </div>
    </div>




    <div  class="container"> 
        <div class="buy">
            {!! $des !!}
        </div>
    </div>

</div>





<style>
.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>


{{ GET_SERVER_VALUES() }}
{{ GET_APP_JS() }}

@endsection