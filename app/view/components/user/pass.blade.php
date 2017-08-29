<form class="form-horizontal tasi-form" method="post" action="change-pass">

  <div class="form-group">
      <label class="col-sm-2 control-label">رمز عبور فعلی</label>
      <div class="col-sm-10">
          <input type="password" name="oldPassword" class="form-control" placeholder="رمز عبور فعلی"> 
      </div>
  </div>
  <div class="form-group">
      <label class="col-sm-2 control-label">رمز عبور</label>
      <div class="col-sm-10">
          <input type="password" name="password" class="form-control" placeholder="رمز عبور"> 
          
      </div>
  </div>
  <div class="form-group">
      <label class="col-sm-2 control-label">تکرار رمز عبور</label>
      <div class="col-sm-10">
          <input type="password" name="confirmPassword"  class="form-control" placeholder="تکرار رمز عبور">
      </div>
  </div>

  <div class="form-group">
      <label class="col-sm-2 control-label"></label>
      <div class="col-sm-10">
          <input type="submit" name="save"  class="btn btn-success form-control" value="ذخیره">
      </div>
  </div>

</form>