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
                @foreach($data["news"] as $n)
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
                
                <div class="col-md-12 text-center">
                    @if($data["pg"]["page"] > 4+1)
                    <a href="news?page=1" class="pg-btn pg-first">1</a>
                    <span>...</span>
                    @endif
                    @for($i=$data["pg"]["start"];$i<=$data["pg"]["end"];$i++)
                        @if($data["pg"]["page"] == $i)
                        <span class="pg-btn pg-active">{{$i}}</span>
                        @else
                        <a href="news?page={{ $i }}" class="pg-btn">{{$i}}</a>
                        @endif
                    @endfor
                    @if($data["pg"]["page"] + 4 < $data["pg"]["last"])
                    <span>...</span>
                    <a href="news?page={{ $data["pg"]["last"] }}" class="pg-btn pg-last">{{ $data["pg"]["last"] }}</a>
                    @endif
                </div>

            </div>
        </div>
    </div>

</div>

@endsection



<style>

.pg-btn{
    display: inline-block;
        padding-top: 3px;
    width: 30px;
    background: #efefef;
    border-radius: 3px;
    margin: 0 2px;
    border: 1px solid #e2e2e2;
}

.pg-active{
    background: #46a768;
    color: white;
}

.pg-last,.pg-first{
    background: #1b8bda;
    color: white;
}

.content{
    
    
}

</style>
