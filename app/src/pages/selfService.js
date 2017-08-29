
import chairs from '../components/chairs.vue'
import ticketView from '../components/ticketView.vue'

import checkTicketPage from './admin/checkTicket.vue'

module.exports = {


  components : {chairs, ticketView, checkTicketPage},

  data() {
    return {

      firstShowtime : {},

      date : '',
      time : '',
      currentTicketCode : '',
      lables : ["اول","دوم","سوم","چهارم","پنجم","شیشم","هفتم",
      "هشتم","نهم","دهم","یازدهم","دوازدهم","سیزدهم","چهاردهم","پانزدهم"],
      

      movie : {},
      movies : [],
      showtime : {},
      ticketData : {},
      allShowtimes : [],
      allMovieShowtimes : [],
      selectedChairs : [],
      purchasedChairs : [],


      loading : true,
      loadingSans : false,
      loadingWrapper : false,


      entity : SERVER['entity']
    }
  },

  watch : {

     showtime(val,oldVal){
      
      if(val.id == oldVal.id)
        return

      this.movie = val.movie

      this.loadingSans = true;
      setTimeout(()=>{
        this.get_sold_chairs(val.uniqe_id,()=>{
          this.loadingSans = false;
        });
      },1000)
    }
  },

  methods : {

    sansSelect(s){

      if(s.id == this.showtime.id)
        return
      this.showtime = s

    },

    init(){
      var interval
      this.movies = []
      this.movie = {}
      this.showtime = {}
      this.allShowtimes = []
      this.allMovieShowtimes = []
      this.selectedChairs = []
      this.loading = true
      this.loadingSans = false
      this.loadingWrapper = false

      setTimeout(()=>{

        let params = {
          table : this.entity == "concert" ? "concertReserve" : "Reserve",
          withInfo : true
        }
        this.$http.get("api/get_next_showtime",{params}).then(res=>{
          this.purchasedChairs = [];
          if(res.body.chairs_sold != "" && res.body.chairs_sold != "null" && res.body.chairs_sold != undefined)
            this.purchasedChairs = JSON.parse(res.body.chairs_sold)
            console.log("next")
            console.log(res.body)
          this.showtime = res.body;
          this.firstShowtime = res.body;
          this.date = res.body.date
          this.time = res.body.id
          

          if(res.body.m_id || res.body.c_id ){
            let params = {
              table : this.entity == "concert" ? "concertReserve" : "Reserve",
              date : res.body.date,
              delay : 60,
              withInfo : true
            }
            this.$http.get("api/get_showtimes_by_date", {params}).then((res)=>{

              this.allShowtimes = res.body
              console.log("by date")
              console.log(res.body)
              this.loading = false

              let getAllShowtimesApiName = this.entity == "film" ? 'get_all_movies_showtimes' : 'get_all_concerts_showtimes'
              this.$http.get("api/"+getAllShowtimesApiName).then(res=>{
                this.allMovieShowtimes = res.body
                console.log("res.body")
                console.log(res.body)
              })


              interval = setInterval(()=>{
                console.log("Update Interval")
                this.get_sold_chairs(this.showtime.uniqe_id, (res)=>{

                  if(res.status == "0"){
                    clearInterval(interval)
                    this.init()
                  }
                });

                this.$http.get("api/"+getAllShowtimesApiName).then(res=>{

                  if(res.body.length == 0){

                    clearInterval(interval)
                    this.init()

                  }else{

                    console.log("all Movie showtimes:")
                    console.log(res.body)
                    let olds = this.allMovieShowtimes.length
                    let news = res.body.length
                    if(news != olds){
                      var allSans = res.body
                      console.log('allMovieShowtimes is Change')
                      this.$http.get("api/get_next_showtime").then(res=>{
                        if(!res.body){
                          this.init()
                        }
                        else{
                          console.log(res.body)
                          this.allMovieShowtimes = allSans

                          this.firstShowtime = res.body;
                          this.date = this.firstShowtime.date
                          this.time = this.firstShowtime.id
                          this.showtime = this.firstShowtime
                        }
                      })
                    }
                                        
                  }

                  
                })


                

              },10000)

            })
          }else{
            this.loading = false;
          }
          
        })

      },1000)
    },

    sendFactor(){

      this.loadingWrapper = true

      let data = {
          isConcert : this.entity == "film" ? false : true,
          mid: this.entity == "film" ? this.showtime.m_id :  this.showtime.c_id, 
          urid: this.showtime.uniqe_id, 
          uid: "0", // 0 means admin user id
          chairs: this.selectedChairs,
          total_price: this.entity == "film" ? this.total_price : this.concert_total_price, 
          discount: "0"
      }

      console.log(data)

      setTimeout(()=>{

          this.$http.post('api/new_factor',data ).then(res => {
              console.log("Factor :")
              console.log(res)
              if(res.body.status == "1"){
                this.get_sold_chairs(this.showtime.uniqe_id,()=>{
                  this.currentTicketCode = ""+res.body.code
                  this.loadingWrapper = false
                  this.printFactor()
                });
              }
              else{
                  alert("بعضی از صندلی های انتخابی شما قبلا رزرو شده اند...لطفا بعد از بروز رسانی دوباره صندلی ها اقدام کنید.")
              }

          }, response => {
              alert("مشکلی در ثبت بلیط اتفاق افتاده.")
          });

      },1000)
    },

    printFactor(){
            
      

      this.ticketData = {
        isConcert : this.entity == "film" ? false : true,
        code : this.currentTicketCode,
        date : this.showtime.date,
        time : this.showtime.time,
        movieName : this.movie.title,
        chairsAlpha : this.get_chairs_alpha,
        chairsCount : this.selectedChairs.length,
        chairsNumber : this.get_chairs_number,
        totalPrice : this.entity == "film" ? this.total_price : this.concert_total_price
      }
          
      setTimeout(()=>{

          window.print();
          this.selectedChairs = []
          this.date = this.firstShowtime.date
          this.time = this.firstShowtime.id
          this.showtime = this.firstShowtime
          
      },1)
    },

    get_sold_chairs(uid,cb){
      let params = {
        uid,
        table : this.entity == "concert" ? "concertReserve" : "Reserve"
      }

      this.$http.get('api/get_chairs_sold',{params}).then(res => {
        console.log(res.body)
        this.purchasedChairs = []

        if(res.body.status == "1" && uid == this.showtime.uniqe_id){

          if(res.body.chairs_sold != "" && res.body.chairs_sold != "null" && res.body.chairs_sold != undefined){

            this.purchasedChairs = JSON.parse(res.body.chairs_sold)
          }

        }

       console.log("this.purchasedChairs")
       console.log(this.purchasedChairs)

        if(cb)cb(res.body)

      })
    },


    sort_chairs(chairs){
      
      chairs = chairs.split(' ')
      let a = chairs.sort((a,b)=>{
        a = parseInt(a.split('-').join(''))
        b = parseInt(b.split('-').join(''))
       return a>b
      })


      return a
    },


  },
  


  computed : {

    title_msg(){
      return this.entity == 'film' ? 'فیلم' : 'برنامه'
    },

    get_dates(){

        let a = []
        this.allMovieShowtimes.some((el)=>{
            if(a.indexOf(el.date) == -1)
                a.push(el.date)
        })

        return a
    },

    get_times(){

        let a = []
        this.allMovieShowtimes.some((el)=>{
            if(el.date == this.date)
                a.push(el)
        })

        a.sort((a,b)=>{
          let at = parseInt(a.time.split(':').join(''))
          let bt = parseInt(b.time.split(':').join(''))
          return bt<at
        })
        return a
    },



    total_price(){
      return this.get_movie_price*this.selectedChairs.length
    },

    concert_total_price(){
      let sum = 0;
      this.selectedChairs.some(el=>{
        let row = el.id.split('-')[1];
        let prices = this.showtime.movie.prices_list.split(' ')
        sum += parseInt(prices[row])
      })
      return sum
    },

    get_movie_price(){
      return this.showtime.is_half_price=='1' ? this.movie.half_price : this.movie.price
    },


    get_concert_price(){
      return this.showtime.is_half_price=='1' ? this.movie.half_price : this.movie.price
    },

    get_chairs_number(){
      let c = ''
      this.selectedChairs.some((el,i)=>{
        c +=  el.name + " " 

      })
      return this.sort_chairs(c.trim()).join(' ')
    },

    get_chairs_alpha(){
      let rows = []
      let text = []
      let chairs = this.get_chairs_number.split(' ')
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
    }

  },

  created() {
    console.log('self service')
    this.init()
  },
}

