
import sandaliha from './sandaliha.vue'
import sansha from './sansha.vue'
import imgPro from '../imgPro.vue'


import forgetPass from '../forgetPass.vue'


module.exports = {


  components : {
     sansha,
     sandaliha,
     imgPro,
     forgetPass
  },

  data(){
    return{

        auth : 'login',
        login : {username : '', password : '', errors : []} ,
        register : {name : '', mobile : '' , errors : [], sms : true, rules : true} ,
        showSmsMessage : false,
        
      
        movie : SERVER['movie'] ? SERVER['movie'] : undefined,
        concert : SERVER['concert'] ? SERVER['concert'] : undefined,
        discount_code : '',
        discount_value : 0,
        step : 0,
        user_id : 0,
        selectedSans : {},
        userInfo : {name:'', mobile:'', id:0},
        selectedChairs : [],
        purchasedChairs : [],
        showChairs : false,
        chairsError : false,
        sms : false,

        loadingWrapper : false,
        loadingSoldChairs : false,
        showFactor : false



    }
  },
  created() {

    console.log(this.movie)
    console.log(this.concert)

  },
  watch : {
    selectedSans : function(){
      this.selectedChairs = []
    }
  },
  computed : {

    formIsComplete(){

      let info = this.userInfo.name!="" && this.userInfo.mobile!=""
      let selChairs = this.selectedChairs.length>0

      return true//(info && selChairs)
    },
    get_scenes(){
      let scenes = this.movie.scenes.split(",")
      let a = []
      scenes.some((el,i)=>{
        a.push( SERVER["root"] + "app/upload/" + el )
      })
      return a
    },

    get_concert_prices(){
      let prices = [];
      this.selectedChairs.some(el=>{

        if(prices.indexOf(el.price) == -1)
          prices.push(el.price)
      })
      return prices.join(" / ")
    },

    concert_total_price(){
      let sum = 0;
      this.selectedChairs.some(el=>{
        let row = el.id.split('-')[1];
        let prices = this.concert.prices_list.split(" ")
        sum += parseInt(prices[row])
      })
      return sum
    },

    discount_price(){
      if(this.movie)
        return (this.discount_value/100)*this.total_price;
      else
        return (this.discount_value/100)*this.concert_total_price;
    },

    total_price(){

      return this.get_movie_price*this.selectedChairs.length
    },

    total_price_with_discount(){
      if(this.movie)
        return this.total_price - this.discount_price
      else
        return this.concert_total_price - this.discount_price
    },

    get_movie_price(){
      console.log("this.selectedSans");   console.log(this.selectedSans)
      return this.selectedSans.is_half_price=='1' ? this.movie.half_price : this.movie.price
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


    reSendPassword(e){

      var el = $(e.target)
      el.prop("disabled", true);

      var c = 0;
      var timeout = 180
      var text = el.text()
      el.text(text + " ("+timeout+")")
      var timer = setInterval(()=>{
        c++;
        if(c == timeout){
          el.prop("disabled", false)
          el.text(text)
          clearInterval(timer)
        }else{
          el.text(text + " (" + (timeout-c) + ")")
        }
      },1000)

      this.$http.get('api/re_send_user_password').then(res => {

          alert("رمز عبور به شماره شما ارسالشد.")
          console.log(res)
      })

    },

    registerUser(e){
        var el = $(e.target)
        el.prop("disabled", true)
        

        this.register.mobile = enInt(this.register.mobile)
        this.$http.post('api/new_user',this.register).then(res => {
          console.log( res)
          el.prop("disabled", false)

          if(res.body.status == "1"){

           //  alert(res.body.user_info.pass)
            this.showSmsMessage = true
          // this.register.pass = res.body.user_info.pass
            
            this.login.password = ''
            this.login.errors = []
            this.login.username = this.register.mobile
          
            this.auth = 'login'
            

            this.$nextTick(function () {
              this.$refs.loginPass.focus();
            });


            this.register.name = ''
            this.register.mobile = ''
            this.register.sms = true
            this.register.rules = true
            this.register.errors = []

          }else{
            this.register.errors = []
            console.log("register status: " + res.body.status)
            if(res.body.status == "-1")
              this.register.errors.push("این شماره تماس قبلا ثبت شده است")
            if(res.body.status == "0")
              this.register.errors.push("شماره تماس وارد شده صحیح نیست")
          }


        })
    },

    check_discount_code(){
      this.$http.get("api/check_discount_code",{params:{code:this.discount_code}}).then(res=>{
        let status = res.body.status
        console.log(res)
        if(status == "1"){
          alert("کد تخفیف معتبر است")
        }else{
          alert("کد تخفیف نا معتبر است")
        }
      })
    },
    
    toggleFactor(back=false){

      this.login.errors = []
      this.register.errors = []
      this.chairsError = false;


      var self = this;

       if(!back){

        if(this.selectedChairs.length == 0){
          $('html,body').animate({scrollTop:$("#chiarsSection").offset().top-300 }, 1200);
          this.chairsError = true;
          return
        }

        
        this.loadingWrapper = true
        
        setTimeout(()=>{

          this.$http.post('api/check_user_login',this.login).then(res => {
            console.log(res)
            if(res.body.status == "1"){
              this.userInfo = res.body.user_info
              
              this.$http.get('api/check_discount_code',{params:{code:this.discount_code}}).then(res => {
console.log("discount")
console.log(res)
                if(res.body.value != undefined)
                  this.discount_value = res.body.value

               // alert(this.discount_value)

                self.showFactor = !self.showFactor 
                $('html,body').animate({scrollTop:$("#app").offset().top }, 1200, function(){
                  self.loadingWrapper = false
                  self.showSmsMessage = false
                });

              })
              
            }else{
              console.log("login status: " + res.body.status)
              this.login.errors.push('نام کاربری یا گذرواژه اشتباه است')
              this.loadingWrapper = false
            }
          })

        },1000)
        

      }else {
        this.loadingWrapper = true

        self.showFactor = !self.showFactor 
        $('html,body').animate({scrollTop:$("#app").offset().top }, 1200, function(){
          self.loadingWrapper = false
        });
      }

       

      
    },

    sendFactor(){

      let  mid = this.movie ? this.movie.id : this.concert.id,
          total_price = this.movie ? this.total_price : this.concert_total_price,
          isConcert = this.movie ? false : true

      let data = {
        mid,
        isConcert,
        total_price,
        urid: this.selectedSans.uniqe_id, 
        uid: this.userInfo.id, 
        chairs: this.selectedChairs,
        discount: this.discount_code
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

    


  },
}