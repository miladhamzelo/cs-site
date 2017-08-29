<template>

<div class="row" v-if="!inSelfService">
    <div class="col-lg-12">
        <section class="panel">
            <header  class="panel-heading">جستجوی بلیط</header>
            <div class="panel-body">
                
                    <div class="col-md-3">
                        <input v-model="code" class="form-control" placeholder="کد بلیط">
                    </div>
                    
                    <div class="col-md-3">
                        <button class="btn btn-primary form-control"
                        :disabled="!code" @click="searchFactors">جستجو</button>
                    </div>
            
            </div>
        </section>
    </div>
    <div class="col-lg-12">
        <section class="panel" id="list">{{inSelfService}}
            <header class="panel-heading">مشخصات بلیط</header>
            <section class="panel-body">
                <div v-if="loadingList" class="msg">درحال بارگزاری...</div>
                <div v-else :class="'msg ' + statusClass">{{statusText}}</div>
                <div v-if="has_ticket">
                    <div class="col-md-3">
                        کد بلیط : {{ticket.code}}
                    </div>
                    <div class="col-md-3">
                        نام فیلم : {{movie.title}}
                    </div>
                    <div class="col-md-3">
                        صندلی ها : {{ticket.chairs}}
                    </div>
                    <div class="col-md-3">
                        هزینه کل : {{ticket.total_price}} تومان
                    </div>
                </div>
            </section>
        </section>
      
        <button class="btn btn-default"  @click="printList">چاپ بلیط</button>
    </div>

    <ticket-view v-model="ticketData">
        </ticket-view>
</div>

<div class="row" v-else>

    <div style="font-size: 12px;font-style: italic;">
        * لطفا کد بلیط را به انگلیسی وارد کنید : ...1234
    </div>

    <div class="input-group">
      <input v-model="code" class="form-control" placeholder="کد بلیط" >
      <span id="doPrint" class="input-group-addon btn btn-primary" 
      :disabled="disabledPrintButton || !code"  @click="serachAndPrint">چاپ کن</span>
    </div>

    <div style="margin-top: 10px" v-if="faildInput" 
    :class="'msg ' + statusClass">{{statusText}}</div>
     
</div>

</template>

<script>
	
import ticketView from '../../components/ticketView.vue'
export default {

    props : ["inSelfService"],

	components : {ticketView},
	data(){
		return{
		      
            disabledPrintButton : false,
            faildInput : false,

            code : "",

            ticket : {},

            showtime : {},

            ticketData : {},


            movie : {},

            loadingList : false,

            statusText : "درحال حاضر اطلاعاتی دردست نیست",

            statusClass : "",


		}
	},
    watch : {
        code(){
            this.faildInput = false
        }
    },
    created(){
        if(this.inSelfService){
            
        }
    },
    computed : {
        has_ticket(){
            return (this.ticket.id && this.movie.id && this.showtime.id) ? true : false
        },


        total_price(){
          return this.get_movie_price*this.ticket.chairs.split(' ').length
        },

        get_movie_price(){
          return this.showtime.is_half_price=='1' ? this.movie.half_price : this.movie.price
        },


        get_chairs_alpha(){
          let rows = []
          let text = []
          let chairs = this.ticket.chairs.split(' ')
          chairs.some((el)=>{
            
              let x = el.split('-');
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

          return text.join(" ") 
        }


    },
	methods : {

        serachAndPrint(){

            this.disabledPrintButton = true
            this.faildInput = false

            this.searchFactors();
            this.waitForRaquest = setInterval(()=>{

                if(this.has_ticket){

                    clearInterval(this.waitForRaquest)
                    this.$root.ticketData = {
                        code : this.code,
                        date : this.showtime.date,
                        time : this.showtime.time,
                        movieName : this.movie.title,
                        chairsAlpha : this.get_chairs_alpha,
                        chairsCount : this.ticket.chairs.split(' ').length,
                        chairsNumber : this.ticket.chairs,
                        totalPrice : this.total_price
                    }

                    setTimeout(()=>{

                        window.print();

                        this.ticket = {}
                        this.showtime = {}
                        this.movie = {}

                        this.code = ''
                        this.disabledPrintButton = false

                                                 
                    },1)

                }else if(!this.loadingList){

                    clearInterval(this.waitForRaquest)
                    this.faildInput = true
                    //alert("این بلیط وجد ندارد! لطفا شماره بلیط را صحیح وارد کنید یا در صورت اشکال به اپراتور بلیط گزارش دهید.")
                    //this.code = ''
                    this.disabledPrintButton = false
                }

            },100)
        },

        searchFactors(){

            this.loadingList = true

            let params = {code:this.code}
            setTimeout(()=>{
                this.$http.get('api/search_factor_by_code',{params}).then((res)=>{
                    console.log(res.body)
                    


                    if(res.body.status == "1"){



                        this.ticket = res.body.ticket
                        this.statusText = "این بلیط در سیستم ثبت شده است"
                        this.statusClass = "success"


                        let params = { id : res.body.ticket.movie_id }
                        this.$http.get("api/get_movies",{params}).then((res)=>{
                            this.movie = res.body; 
                            console.log(res.body)

                            let params = { urid : this.ticket.reserve_id }
                            this.$http.get("api/get_showtime_by_uniqe_id",{params}).then(res=>{
                                this.loadingList = false
                                this.showtime = res.body
                                console.log(res.body)
                            })
                        })


                    }else{
                        this.loadingList = false
                        this.statusText = "این بلیط در سیستم وجود ندارد"
                        this.statusClass = "faild"
                    }
                })
            },1000)
        },

        printList(){

            this.ticketData = {
                code : this.code,
                date : this.showtime.date,
                time : this.showtime.time,
                movieName : this.movie.title,
                chairsAlpha : this.get_chairs_alpha,
                chairsCount : this.ticket.chairs.split(' ').length,
                chairsNumber : this.ticket.chairs,
                totalPrice : this.total_price
            }

            setTimeout(()=>{
                $("#print").html($("#ticketView").clone())
                window.print()
            },500)
        }

	}
}



</script>


<style scoped>

.msg{
    padding:10px;
    margin-bottom: 15px;
}

.success{
    background: rgba(139, 195, 75, 0.3);
    
}
.faild{
    background: #ffdce8;
}



table {
	font-size: 13px;
}

.form-control{

}
</style>