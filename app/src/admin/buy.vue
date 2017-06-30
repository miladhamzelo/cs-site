<template>

<div class="row">



    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">فیلتر</header>
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
                        :disabled="allowSearch" @click="get_reserved_chairs">بارگزاری صندلی ها</button>
                    </div>
            
            </div>
        </section>
    </div>


    <div class="col-lg-12" >
        <section class="panel">
            <header class="panel-heading">ثبت بلیط</header>
            <div class="panel-body">

                <span>{{chairs_loading_msg}}</span>

                <div v-if="!this.loadingChairs && showChairs">
                    <p>صندلی های مورد نظر را انتخاب کنید :</p>

                    <chairs v-model="$root.selectedChairs"></chairs>

                    <button class="btn btn-success" @click="sendFactor">ثبت بلیط و چاپ</button>
                </div>

            </div>
        </section>
    </div>




    <div id="ticket">
        
        <h1>سینما ستاره</h1>

        <p>نام فیلم : {{$root.movie.title}}</p>
        <p>شماره صندلی(ها) : {{get_chairs}}</p>
        <p>مبلغ پرداختی : {{total_price}}</p>
        <p><img id="barcodeImage" src="/sinama/app/assets/ajax-loader.gif"></p>
        <p>{{currentTicketCode}}</p>


          
    </div>

</div>

</template>

<script>
    
import chairs from '../ticket/chairs.vue'

export default {

    components : {chairs},
    
    data(){
        return{

            currentTicketCode : "",

            barcodeImage : "",

            sansInfo : [],

            mid : "",
            date : "",
            urid : "",


            loadingMovie : true,
            loadingDates : false,
            loadingChairs : false,


            showChairs : false
            

        }
    },

    watch : {

        mid(val){
            this.date = this.urid = ""
            this.loadingDates = true
            this.showChairs = false

            this.$root.movies.some((el)=>{
                if(el.id == val){
                    this.$root.movie = el
                    return
                }

            })
        
        }
    },

    computed : {


        movies_loading_msg(){
            return this.loadingMovie ? "درحال بارگزاری..." : "فیلم ها"
        },
        dates_loading_msg(){
            return this.loadingDates ? "درحال بارگزاری..." : "تاریخ اکران "
        },
        chairs_loading_msg(){
            let text = this.showChairs ? "" : "درحال حاضر هیچ اطلاعاتی وجود ندارد"
            return this.loadingChairs ? "درحال بارگزاری..." : text
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


        get_chairs(){
            let c = ''
            this.$root.selectedChairs.some((el)=>{
                c += " " + el.name
            })
            return c
        },

        total_price(){
            return this.$root.movie.price*this.$root.selectedChairs.length
        }
    },
    created(){
        
        this.load_movies();
    },
    methods : {

        get_reserved_chairs(){

            let urid = this.urid
            
            this.loadingChairs = true
            this.showChairs = false

            setTimeout(()=>{
                this.$root.get_sold_chairs(urid, ()=>{
                   
                    this.loadingChairs = false
                    this.showChairs = true
                    
                })
            },1000)
        },

        load_dates_by_movie_id(){
            setTimeout(()=>{
                this.$http.get('api/get_showtimes',{params:{id : this.mid}}).then((res)=>{
                    this.loadingDates = false;
                    this.sansInfo = res.body
                    console.log(res.body)
                })
            },1000)
        },

        load_movies(){
            setTimeout(()=>{
               this.$http.get('api/get_movies').then((res)=>{
                    this.loadingMovie = false
                    this.$root.movies = res.body
               })
            },1000)
        },

       

        sendFactor(){
            let data = {
                mid: this.mid, 
                urid: this.urid, 
                uid: "0", // 0 means admin user id
                chairs: this.$root.selectedChairs,
                total_price: this.total_price, 
                discount: "0"
            }

            console.log(data)

            setTimeout(()=>{

                this.$http.post('api/new_factor',data ).then(res => {
                    console.log(res)
                    this.$root.get_sold_chairs(this.urid);
                    

                    if(res.body.status == "1"){
                         console.log("res")
                        var img = new Image();
                        var path = SERVER['root'] + "api/barcode?size=40&text="+res.body.code;
                        console.log(path)
                        img.src = path
                        var el = $("#barcodeImage")
                        var self = this
                        img.onload = function() {
                            el.prop("src",path);
                            self.printFactor();
                        }.bind(el);
                        
                        this.currentTicketCode = ""+res.body.code


                    }
                    else{
                        alert("مشکلی در ثبت بلیط اتفاق افتاده.")
                    }

                }, response => {
                    alert("مشکلی در ثبت بلیط اتفاق افتاده.")
                });

            },1000)
        },

        printFactor(){
            setTimeout(()=>{
                $("#print").html($("#ticket"))
                window.print()

                this.$root.selectedChairs = [];
            },2500)
        }
        
    },
}



</script>


<style scoped>


#ticket{
   display: none;;
   text-align: center;
    width: 298px;
    height: 420px;
}
#ticket p {
    font-size: 16px;
     text-align: justify;
  -moz-text-align-last: center;
  text-align-last: center;
}
#ticket img{
       width: 100%;
    height: 60px;
}

@media print{
    #ticket{
        display: block;
    }
}

table {
	font-size: 13px;
}

.sans{

    padding-top: 15px;
}


.form-control{
    padding: 0;
}
</style>