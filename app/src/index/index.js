

module.exports = {

  components : {
  	
  },

  data() {
    return {
      movies :  [],
      concerts :  [],
      nextMovie :  {},
      movieTrailer : {},
      promotions :  [],
      setting :  {},
      news :  [],
      slider : {},

      mobile : "",
      mobileMsg : "",

    }
  },
  created() {
    console.log("SERVER")
    console.log(SERVER)
    
    this.setting = SERVER['setting'] ? JSON.parse(SERVER['setting']) : {}
    this.promotions = SERVER['promotions'] ? JSON.parse(SERVER['promotions']) : []
    this.news = SERVER['news'] ? JSON.parse(SERVER['news']) : []
    this.movieTrailer = SERVER['movie_trailer'] ? JSON.parse(SERVER['movie_trailer']) : {}
    this.nextMovie = SERVER['next_movie'] ? JSON.parse(SERVER['next_movie']) : {}
    this.movies = SERVER['movies'] ? SERVER['movies'] : []
    this.concerts = SERVER['concerts'] ? SERVER['concerts'] : []
    this.slider = SERVER['slider'] ? JSON.parse(SERVER['slider']) : {slides:[]}


    
  },

  methods : {

    sendMobile(){
     
      var el = this.$refs.mobileDialog
      el.style.display = "block"

      this.mobileMsg = "لطفا صبر کنید ..."
      setTimeout(()=>{
        this.$http.post("api/new_mobile",{number:this.mobile}).then(res=>{
          var time = 4000
          if(res.body.status == "1"){
            this.mobileMsg = "شماره شما با موفقیت ثبت شد."
            time = 1000
          }else{
            this.mobileMsg = "مشکلی در ثبت بوجود آمده! <br> لطفا شماره درست را وارد کنید یا بعدا امتحان کنید."
          }
          setTimeout(()=>{el.style.display = "none"},time)

        })
      },1000)
    }
  }


}