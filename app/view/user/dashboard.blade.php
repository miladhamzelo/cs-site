@extends("layouts.user")


@section("main")

<div id="app">
    <div class="col-md-12 welcome">
        <h4><span>{{ $user["fullName"] }}</span> به باشگاه مشتریان سینما ستاره شهر خوش آمدید</h4>
    </div>
    @if($msg_status)
    <div class="col-md-12 alert alert-{{ $msg_class }}" role="alert">{{ $msg_text }}</div>
    @else
    <div style="display: inline-block;"></div>
    @endif

    <div class="clearfix"></div>
    <div class="col-md-4 edit">
        <button type="button" class="btn btn-labeled btn-green" @click="route=0">
        <span class="btn-label"><i class="fa fa-info" aria-hidden="true"></i></span>گزارشات</button>
        <div class="clearfix"></div> 
        <button type="button" class="btn btn-labeled btn-green" @click="route=1">
        <span class="btn-label"><i class="fa fa-key" aria-hidden="true"></i></span>تغییر رمز عبور</button>
        <div class="clearfix"></div>
        <button type="button" class="btn btn-labeled btn-green" @click="route=2">
        <span class="btn-label"><i class="fa fa-pencil" aria-hidden="true"></i></span>تغییر مشخصات</button>
       <a href="logout"> <button type="button" class="btn btn-labeled btn-danger" >
        <span class="btn-label"><i class="fa fa-pencil" aria-hidden="true"></i></span>خروج</button></a>
    </div>
    <div class="col-md-8">
        <div class="col-md-12" v-if="route==0">
            @include("components.user.reports")
        </div>
        <div class="col-md-12" v-if="route==1">
            @include("components.user.pass")
        </div>
        <div class="col-md-12" v-if="route==2">
            @include("components.user.info")
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-12">
        <div class="panel-default widget">
            <div class="panel-heading">
                <h3 class="panel-title">
                    بلیط های خریداری شده</h3>
            </div>
            <div class="panel-body ticket">
                <ul class="list-group">
                    
                    <li v-for="f in onFactors" class="list-group-item">
                        <div class="row">

                            <div class="col-md-2 col-xs-12">
                                فیلم : @{{ f.movie.title }}
                            </div>
                            <div class="col-md-3 col-xs-12">
                                تاریخ اکران : @{{ f.reserve.date }} ساعت @{{ f.reserve.time }} </div>

                            <div class="col-md-6">

                                @{{ f.factor.chairs }} </div>
                            <div class="col-md-1">
                                <a href="#">
                                    <button @click="print_ticket(f)" type="button" class="btn btn-primary btn-xs" title="Print">
                               <i class="fa fa-print" aria-hidden="true"></i>

                            </button>
                                </a>
                                <a href="#">
                                    <button @click="save_ticket(f)" type="button" class="btn btn-success btn-xs" title="Download">
                                <i class="fa fa-download" aria-hidden="true"></i>

                            </button>
                                </a>
                            </div>
                        </div>
                    </li>
                    
                    <li v-if="!onFactors.length"> درحال حاضر هیچ خرید جدیدی یافت نشد </li>
                    
                </ul>
            </div>
        </div>
    </div>

    <ticket-view2 show="false" v-model="ticketData"></ticket-view2>
    
</div>

@script("html2canvas.js")
@script("jspdf.js")

@getAppVars
@getAppScript


@endsection

