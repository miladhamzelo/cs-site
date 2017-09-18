
  <ul class="nav nav-tabs authTabs">
    <li :class="{'active' : auth=='login'}"><a   @click="auth='login'">ورود</a></li>
    <li :class="{'active' : auth=='register'}"><a   @click="auth='register'">ثبت نام</a></li>
  </ul>

  <div class="tab-content">
    <div  class="" v-show="auth=='login'" style="padding: 30px 10px">
       <form class="form-horizontal tasi-form" method="post">
          <div class="alert alert-danger" v-if="login.errors.length">
            <div v-for="err in login.errors">* {{ err }}</div>
          </div>

          <div class="alert alert-success" v-if="showSmsMessage">
             رمز عبور به شماره موبایل شما ارسال گردید ، در صورتی که تا 3 دقیقه پیامک رمز عبور را دریافت نکردید بر روی ارسال مجدد رمز عبور کلیک کنید<br><br>
           
              <button class="btn btn-default" @click.stop.prevent="reSendPassword">ارسال مجدد رمز ورود</button>
            
          </div>

          <div class="form-group">
              <label class="col-sm-2 control-label">شماره موبایل</label>
              <div class="col-sm-10">
                  <input type="text" name="username" v-model="login.username" class="form-control" placeholder="شماره موبایل"> 
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-2 control-label">رمز عبور</label>
              <div class="col-sm-10">
                  <input type="password" name="password" ref="loginPass" v-model="login.password" class="form-control" placeholder="رمز عبور شما" @keydown.stop.prevent.enter="toggleFactor()"> 
                  <forget-pass></forget-pass>
              </div>
          </div>
       
          <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-10">
                 <label>
                    <input type="checkbox" v-model="login.remember">
                    مرا به خاطر بسپار
                </label>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-10">
                  <button class="btn btn-danger" @click.stop.prevent="toggleFactor()" :disabled="!formIsComplete">
                  ادامه خرید</button>
              </div>
          </div>

        </form>
    </div>
    <div  class="" v-show="auth=='register'" style="padding: 30px 10px">  
      
       <form class="form-horizontal tasi-form" method="post">

          <div class="alert alert-info">برای ادامه خرید بعد از ثبت نام باید از قسمت "ورود" در همین بخش وارد شوید</div>
          <div class="alert alert-warning">رمز عبور شما برای ورود به سایت به شماره موبایل شما ارسال خواهد شد.</div>

          <div class="alert alert-danger" v-if="register.errors.length">
            <div v-for="err in register.errors">* {{ err }}</div>
          </div>

          <div class="form-group">
              <label class="col-sm-2 control-label">نام</label>
              <div class="col-sm-10">
                  <input type="text" v-model="register.name" class="form-control" placeholder="نام و نام خانودگی"> 
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-2 control-label">شماره موبایل</label>
              <div class="col-sm-10">
                  <input type="text" v-model="register.mobile" class="form-control" placeholder="شماره موبایل یازده رقمی"> 
              </div>
          </div>
       
          <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-10">
                 <label>
                    <input type="checkbox" v-model="register.sms">
                    عضویت در خبرنامه پیامکی سایت
                </label>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-10">
                 <label>
                    <input type="checkbox" v-model="register.rules"> 
                    با <a href="#">قوانین و مقرارت</a> سایت نیز موافقم.
                </label>
              </div>
          </div>
          

          <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-10">
                  <button class="btn btn-success" :disabled="!register.rules" @click="registerUser">ثبت نام</button>
              </div>
          </div>

          
        </form>

    </div>
   
  </div>
</form>

