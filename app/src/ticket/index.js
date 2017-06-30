
import sandaliha from './sandaliha.vue'
import sansha from './sansha.vue'
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
        movie : SERVER['movie'],
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
    get_scenes(){
      let scenes = this.movie.scenes.split(",")
      let a = []
      scenes.some((el,i)=>{
        a.push( SERVER["root"] + "app/upload/" + el )
      })
      return a
    },
    total_price(){
      return this.get_movie_price*this.selectedChairs.length
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

    verify_user_info(){

      if(this.info.name.trim().length == 0 ){
        alert("لطفا نام خود را وارد کنید")
        return false
      }

      if( this.info.mobile.trim().length == 0 
        || !(!isNaN(parseInt(this.info.mobile)) 
          && this.info.mobile.length == 11)){
        alert("شماره تلفن همراه خود را درست وارد کنید")
        return false
      }
      return true
    },
    
    toggleFactor : function(){

      if(this.verify_user_info()){

            this.loadingWrapper = true
            
            var self = this;
            //this.user_id = this.$cookie.get("cinema-setareh-user-id")
            if(this.user_id == 0){

             // this.info.mobile = 

              this.$http.post('api/new_user',this.info).then(res => {
                console.log(res)
                if(res.body.status == "1"){
                  console.log(res)
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
      
      }else{
        $('html,body').animate({scrollTop:$("#app").offset().top }, 1200, ()=>{
                this.loadingWrapper = false
              });
      }


      
    },

    sendFactor : function(){

      

      let data = {
        mid: this.movie.id, 
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
    console.log(this.movie)

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