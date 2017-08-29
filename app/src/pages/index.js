

module.exports = {


  data() {
    return {

      mobile : "",
      mobileMsg : "",

    }
  },
  created() {
    console.log("index!!!")

    
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