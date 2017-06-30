
import sandaliha from '../ticket/sandaliha.vue'
import sansha from '../ticket/sansha.vue'
import imgPro from '../imgPro.vue'


module.exports = {

  components : {
     sansha,
     sandaliha,
     imgPro
  },

  data(){
    return{
      
        step : 0,
        concert : SERVER['concert'],
        user_id : 0,
        selectedSans : {},
        info : {name:'',mobile:''},
        selectedChairs : [],
        purchasedChairs : [],
        showChairs : false,
        sms : false,

        loadingWrapper : false,
        loadingSoldChairs : false,
        showFactor : false



    }
  },
  watch : {
    selectedSans : function(){
      this.selectedChairs = []
    }
  },
  computed : {

    formIsComplete(){

      let info = this.info.name!="" && this.info.mobile!=""
      let selChairs = this.selectedChairs.length>0

      return (info && selChairs)
    },
   /* get_scenes(){
      let scenes = this.concert.scenes.split(",")
      let a = []
      scenes.some((el,i)=>{
        a.push( SERVER["root"] + "app/upload/" + el )
      })
      return a
    },*/

    get_concert_prices(){
      let prices = [];
      this.selectedChairs.some(el=>{
        if(prices.indexOf(el.price) == -1)
          prices.push(el.price)
      })
      return prices.join(" / ")
    },

    total_price(){
      let sum = 0;
      this.selectedChairs.some(el=>{
        let row = el.id.split('-')[1];
        sum += parseInt(this.concert.prices_list[row])
      })
      return sum
    },


    get_sort_selected_chairs(){
      
      let chairs = this.get_selected_chairs
      let a = chairs.sort((a,b)=>{
        a = parseInt(a.split('-').join(''))
        b = parseInt(b.split('-').join(''))
       return a>b
      })


      return a
    },

    get_selected_chairs(){
      let a = [];
      this.selectedChairs.some(el=>{
        a.push(el.name)
      })
      return a
    },

    get_chairs_alpha(){
      let rows = []
      let text = []
      let chairs = this.get_sort_selected_chairs
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

      return text.join(" ") 
    }

  
   
  },
  methods : {
    
    toggleFactor : function(){
      this.loadingWrapper = true
      
      var self = this;
      //this.user_id = this.$cookie.get("cinema-setareh-user-id")
      if(this.user_id == 0){

        this.$http.post('api/new_user',this.info).then(res => {
          console.log(res)
          if(res.body.status == "1"){

            this.user_id = res.body.user_id
            this.showFactor = !this.showFactor 

            if(this.info.remember == true)
              this.$cookie.set("cinema-setareh-user-id", this.user_id, { expires: '1M' })
            else
              this.$cookie.delete("cinema-setareh-user-id")

            $('html,body').animate({scrollTop:$("#app").offset().top }, 1200, function(){
              self.loadingWrapper = false
            });

          }
          else{
            console.log(res.body.status)
          }

        })

      }else{
        this.showFactor = !this.showFactor 
        $('html,body').animate({scrollTop:$("#app").offset().top }, 1200, function(){
          self.loadingWrapper = false
        });
      }
      
      
    },

    sendFactor : function(){

      

      let data = {
        isConcert : true,
        mid: this.concert.id, 
        urid: this.selectedSans.uniqe_id, 
        uid: this.user_id, 
        chairs: this.selectedChairs,
        total_price: this.total_price,
        discount: "20%"
      }

      console.log(data)

      this.$http.post('api/new_factor',data ).then(res => {
        console.log(res)
        if(res.body.status == "1"){
          window.location.href = "requestPay?fid="+res.body.factor_id;
        }if(res.body.status == "CHAIRS_IS_EXIST"){
          alert("بعضی از صندلی های انتخابی شما توسط کاربر دیگری زودتر به ثبت رسیده است. لطفا از اول صندلی هارا انتخاب کنید.")
          this.selectedChairs = [];
          this.toggleFactor();
        }

      }, response => {
        // error callback
      });
    },

    changeInfo : function(){

      this.user_id = 0
     
    }
    


  },
  created() {

    this.concert.prices_list = this.concert.prices_list.split(" ")

    console.log(this.concert)

    this.user_id = this.$cookie.get("cinema-setareh-user-id")
    if(this.user_id != "null"){

      this.$http.get('api/get_users?id='+this.user_id).then(res => {

        console.log(res.body)

        if(res.body != "null"){

          this.info.name = res.body.fullName
          this.info.mobile = res.body.phone
          this.info.remember = true
          
        }else{

          this.user_id = 0
          this.$cookie.delete("cinema-setareh-user-id")

        }

      })
    }


  }
}