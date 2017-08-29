<template>
<div>
  <a style="cursor:pointer" @click="show"><slot>رمز عبور رو فراموش کردی؟</slot></a>
  <div v-if="forgetPassWindow" style="z-index:1000;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.5)">
      <div style="min-height: 100px;width:350px; position: absolute;left: 50%;margin-left: -175px;
      top: 200px;padding:50px 10px;background: white;border-radius: 7px;text-align: center;" >
        
        <div class="form-group">
            <div class="col-sm-12">
                <form>
                  <input type="text" ref="txtForgetPass" class="form-control" v-model="forgetPassInput" placeholder="شماره موبایل خود را وازد کنید">
                  <br>
                  <button class="btn btn-success forget-btn" @click.stop.prevent="sendNewPass">ارسال</button>
                  <button class="btn btn-default forget-btn" @click.stop.prevent="forgetPassWindow=false">بستن</button>
                </form>
            </div>
        </div>
       
      </div>
  </div>
</div>
</template>

<script>

export default  {

  data(){
    return{

      forgetPassInput : '',
        forgetPassWindow : false,

    }
  },


  methods : {

    show(){
      console.log("show forget pass")
      this.forgetPassInput = ''
      this.forgetPassWindow = true
      this.$nextTick(function () {
        this.$refs.txtForgetPass.focus()
      });
    },

    sendNewPass(e){

      let el = $(e.target)
      el.prop("disabled", true)

      let params = {number : this.forgetPassInput}

      this.$http.get('api/send_new_user_password',{params}).then(res => {
          console.log(res)
          //setTimeout(()=>{},)
          this.forgetPassWindow = false
          this.showSmsMessage = true
          el.prop("disabled", false)

          console.log(res)
      })
    },

  }
  
}


</script>


<style scoped>
  .forget-btn{
    width:auto !important;
    display: inline-block !important;
    border-radius: 4px !important;
  }
</style>