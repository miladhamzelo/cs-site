@extends("layouts.master")


@section("main")

<div id="app">

    <div id="container">

        <div class="headerb">
            <div class="container">
                <h1>
                    @if(!empty( $status ))
                        پرداخت انجام شد
                    @else
                        پرداخت انجام نشد!
                    @endif
                </h1>
                <div class="clearfix"></div>
            </div>
        </div>


        <div  class="container"> 
            <div class="buy">

                @if(!empty( $status ))
                
                    <p class="alert alert-success">پرداخت انجام شد</p>

                    <ticket-view2 show="true" v-model="ticketData"></ticket-view2>
                    <button class="btn btn-primary" @click="printTicket">چاپ بلیط</button>
                    <button class="btn btn-default" @click="saveTicket">ذخیره بلیط</button>

                @else
                    
                    <p class="alert alert-danger">پرداخت انجام نشد</p>

                    @if( !$isConcert )
                        <a href="ticket?id={{ $mid }}">« بازگشت به صفحه خرید بلیط</a>
                    @else
                        <a href="ticket?cid={{ $mid }}">« بازگشت به صفحه خرید بلیط</a>
                    @endif

                @endif
              
            </div>
        </div>

    </div>



</div>



<style scoped>


.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>

 <script src="{{  assets  }}/html2canvas.js"></script>
 <script src="{{  assets  }}/jspdf.js"></script>
 
{{  GET_SERVER_VALUES()  }}
{{  GET_APP_JS()  }}


@endsection