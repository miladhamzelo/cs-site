<template>

<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">فیلتر

                <input class="opttab" id="opt-film" type="radio" v-model="type" value='film'> 
                <label class="lbltab" for="opt-film">فیلم</label>
                <input class="opttab" id="opt-concert" type="radio" v-model="type" value='concert'>
                <label class="lbltab" for="opt-concert">فرهنگی</label>

            </header>
            <div class="panel-body">
                
                    <div class="col-md-3">
                        <select v-model="mid" class="form-control" @change="load_dates_by_movie_id">
                            <option value="" hidden>{{movies_loading_msg}}</option>
                            <option v-for="m in $root.movies" :value="m.id">{{m.title}}</option>
                        </select> 
                    </div>
                    <div class="col-md-3">
                        <select v-model="date" class="form-control">
                            <option value="" hidden>{{dates_loading_msg}}</option>
                            <option v-for="d in get_dates" :value="d">{{d}}</option>
                        </select> 
                    </div>
                    <div class="col-md-3">
                        <select v-model="urid" class="form-control">
                            <option value="" hidden>سانس</option>
                            <option v-for="t in get_times" :value="t.uniqe_id">{{t.time}}</option>
                        </select> 
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-primary form-control"
                        :disabled="allowSearch" @click="searchFactors">دریافت اطلاعات</button>
                    </div>
            
            </div>
        </section>
    </div>

    <div class="col-lg-12">
        <section class="panel" id="list">
            <header class="panel-heading">لیست خریدها</header>
            <div class="panel-body">
                <div class=" input-group" style="margin-bottom: 15px">
                  <span class="input-group-addon btn-primary"><i class="icon-search"></i></span>
                  <input type="text" class="form-control" v-model="searchText" 
                  placeholder="جستجو">
                </div>

                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th><i class="icon-bullhorn"></i>کد بلیط</th>
                            <th class="hidden-phone"><i class="icon-question-sign"></i>نام</th>
                            <th><i class="icon-bookmark"></i>شماره تماس</th>
                            <th><i class=" icon-edit"></i>صندلی های خرید شده</th>
                            <th><i class=" icon-edit"></i>زمان خرید</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(p,i) in searchResult">
                            <td><a href="#">{{p.code}}</a></td>
                            <td class="hidden-phone">{{p.user.fullName}}</td>
                            <td>{{p.user.phone}}</td>
                            <td>{{p.chairs}}</td>
                            <td>{{p.date}} - {{p.time}}</td>
                            <td>
                                <button class="btn btn-default" @click="printTicket(i,  $event)">چاپ</button>
                                <button class="btn btn-danger" @click="cancelTicket(i,  $event)">لغو</button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <div class="col-md-12">
                    {{list_loading_msg}}
                </div>
                <div class="col-md-12 " style="border-top: 1px solid #f3f3f3;margin-top: 6px;padding:5px 0">
                    <div class="col-md-4">
                        تعداد کل صندلی ها: {{ count_of_all_chairs }}
                    </div>
                    <div class="col-md-4">
                        حضوری : {{ count_of_offline_chairs }}
                    </div>
                    <div class="col-md-4">
                        آنلاین : {{ count_of_online_chairs }}
                    </div>
                </div>
            </div>
        </section>
        <router-link to="/tickets/buy-ticket" class="btn btn-success">خرید جدید</router-link>
        <button class="btn btn-default"  :disabled="!searchResult.length>0" @click="printList">چاپ لیست</button>
    </div>


    <ticket-view v-model="ticketData">
        </ticket-view>
</div>

</template>

<script>
	
import ticketView from '../ticketView.vue'
export default {

    components : {ticketView},
	
	data(){
		return{
		
            type : 'film',

            sansInfo : [],

            searchText : "",

            mid : "",
            date : "",
            urid : "",


            loadingMovie : true,
            loadingDates : false,
            loadingList : false,
            
            ticketData : [],

            purchases : [],


        
		}
	},
	created() {
        this.load_movies();
	},
    watch :{



        mid(){
            this.date = this.urid = ""
            //this.loadingDates = true
        },

        type(){
            this.mid = ""
            this.date = ""
            this.urid = ""
            this.load_movies();
        }
    },
    computed : {


        count_of_all_chairs(){
            let t = 0
            this.purchases.some(el => {
                t += el.chairs.split(" ").length
            })
            return t
        },
        count_of_offline_chairs(){
             let t = 0
            this.purchases.some(el => {
                if(el.user_id == 0)
                    t += el.chairs.split(" ").length
            })
            return t
        },
        count_of_online_chairs(){
            return (this.count_of_all_chairs - this.count_of_offline_chairs) || 0
        },


        searchResult(){
            var a = []
            var val = this.searchText
            this.purchases.some((el,i)=>{
                if(el.code.indexOf(val)>-1 || el.user.fullName.indexOf(val)>-1 
                    || el.user.phone.indexOf(val)>-1 || el.chairs.indexOf(val)>-1){

                        el.realIndex = i
                        a.push(el)
                     
                }
            })

            return a
        },

        

        movies_loading_msg(){
            return this.loadingMovie ? "درحال بارگزاری..." : this.type == "film" ? "فیلم ها" : "برنامه های فرهنگی"
        },
        dates_loading_msg(){
            return this.loadingDates ? "درحال بارگزاری..." : this.type == "film" ? "تاریخ اکران " : "تاریخ اجرا"
        },
        list_loading_msg(){
            let text = this.purchases.length > 0 ? "" : "درحال حاضر هیچ اطلاعاتی وجود ندارد"
            return this.loadingList ? "درحال بارگزاری..." : text
        },
        

        get_dates(){

            let a = []
            this.sansInfo.some((el)=>{
                if(a.indexOf(el.date) == -1)
                    a.push(el.date)
            })
            return a
        },

        get_times(){

            let a = []
            this.sansInfo.some((el)=>{
                if(el.date == this.date)
                    a.push({time:el.time, uniqe_id:el.uniqe_id})
            })
            return a
        },

        allowSearch(){
            return !(this.mid != "" && this.urid != "")
        },


       getReseveTable(){
        return this.type == "film" ? "Reserve" : "concertReserve"
       }


    },
	methods : {

         get_chairs_alpha(chairs){
          let rows = []
          let text = []
          chairs = chairs.split(' ')

          chairs.some((chair)=>{
            
              let x = chair.split('-');
              let r = x[0];
              let c = x[1];
              let i = rows.indexOf(parseInt(r))


              if( i == -1){

                rows.push(parseInt(r));
                text.push(`ردیف ${r} صندلی ${c} `)

              }else{

                text[i] += ` , ${c} `

              }
          })

          return text.join(" ") //c.replace(/\/+$/, '');
        },

        printTicket(i,e){

 
            let el = e.target
            $(el).prop("disabled","1")

            var movie,showtime

            let params = {
                id : this.searchResult[i].movie_id
            }
            let table = this.type == "film" ? 'get_movies' : 'get_concerts'
            this.$http.get("api/"+table,{params}).then(res=>{

                let params = {
                    urid : this.searchResult[i].reserve_id,
                    table : this.getReseveTable
                }

                movie = res.body

                this.$http.get("api/get_showtime_by_uniqe_id",{params}).then(res=>{

                    showtime = res.body
                    $(el).removeProp("disabled")

                    this.ticketData = {
                        isConcert : this.type == "film" ? false : true,
                        code : this.searchResult[i].code,
                        date : showtime.date,
                        time : showtime.time,
                        movieName : movie.title,
                        chairsAlpha : this.get_chairs_alpha( this.searchResult[i].chairs ),
                        chairsCount : this.searchResult[i].chairs.split(' ').length,
                        chairsNumber : this.searchResult[i].chairs,
                        totalPrice : this.searchResult[i].total_price
                    }

                    setTimeout(()=>{
                        $("#print").html($("#ticketView").clone())
                        window.print()
                    },500)
                
                })

            })    

        },

        cancelTicket(i,e){
            let el = e.target
            $(el).prop("disabled","1")

            let params = {
                fid : this.searchResult[i].id,
                urid : this.searchResult[i].reserve_id,
                table : this.getReseveTable
            }

            this.$http.get("api/cancel_ticket",{params}).then(res=>{
                console.log(res)
                $(el).removeProp("disabled")
                let realIndex = this.searchResult[i].realIndex
                this.purchases.splice(realIndex, 1)
            },err=>{
                alert("مشکلی در لغو بوجود آمپده")
                $(el).removeProp("disabled")
                console.log(err)
            })


        },

        searchFactors(){

            let mid = this.mid,
                urid = this.urid,
                type = this.type

            this.loadingList = true

            let params = {mid,urid,type}
            setTimeout(()=>{
                this.$http.get('api/search_factor',{params}).then((res)=>{
                    console.log(res.body)
                    this.loadingList = false
                    this.purchases = res.body.purchases
                })
            },1000)
        },

        load_dates_by_movie_id(){
            this.loadingDates = true;
            setTimeout(()=>{
                let params = {
                    id : this.mid,
                    table : this.getReseveTable
                }
                this.$http.get('api/get_showtimes?noValidate=1',{params}).then((res)=>{
                    this.loadingDates = false;
                    this.sansInfo = res.body
                })
            },1000)
        },

        load_movies(){
            this.loadingMovie = true
            setTimeout(()=>{
                let table = this.type == "film" ? 'get_movies' : 'get_concerts'
               this.$http.get('api/'+table).then((res)=>{
                    this.loadingMovie = false
                    this.$root.movies = res.body
               })
            },1000)
        },


        printList(){
            setTimeout(()=>{
                $("#print").html($("#list").clone())
                window.print()
            },500)
        }

	}
}



</script>


<style scoped>



input[type="radio"]:checked+label{
 
    background: #03a9f4 !important;
    color: white;
}

.lbltab{
    border: 1px solid #03a9f4;
    padding: 5px 15px;
    background: white;
    margin: 0 2px;
    border-radius: 5px;
    color: #03a9f4;
}


.opttab{
    display: none
}


table {
	font-size: 13px;
}

select.form-control{
    padding: 0 !important;
}
</style>