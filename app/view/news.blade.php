@extends("layouts.master")


@section("main")

<div id="app">
    <div class="headerb">
        <div class="container">
            <h1>آرشیو اخبار</h1>
            <div class="clearfix"></div>
        </div>
    </div>




    <div class="container">
        <div class="buy">
            <div class="archive">
                @foreach($news as $n)
                <div class="col-md-6 content">
                    <div class="news">
                        <a href="news?id={{ $n['id'] }}">
                            <div class="image"><img src="{{ upload . $n['image'] }}">
                                <div class="date">{{ $n['date'] }}</div>
                            </div>
                        </a>
                        <a href="news?id={{ $n['id'] }}">
                            <h2>{{ $n['title'] }}</h2>
                        </a>
                    </div>
                </div>
                @endforeach
                <div class="clearfix"></div>
            </div>
        </div>
    </div>

</div>

@endsection



<style>



.content{
    
    
}

</style>
