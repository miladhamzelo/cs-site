<form class="form-horizontal tasi-form" method="post" action="change-info">

  <div class="form-group">
      <label class="col-sm-2 control-label">نام</label>
      <div class="col-sm-10">
          <input type="text" name="name" value="{{ $user['fullName'] }}" class="form-control" placeholder="نام و نام خانوادگی"> 
      </div>
  </div>
  <div class="form-group">
      <label class="col-sm-2 control-label">شماره موبایل</label>
      <div class="col-sm-10">
          <input type="text" name="mobile" value="{{ $user['phone'] }}" class="form-control" placeholder="شماره موبایل"> 
      </div>
  </div>

  <div class="form-group">
    <label class="col-sm-2 control-label"></label>
    <div class="col-sm-10">
        <input type="submit" name="save"  class="btn btn-success form-control" value="ذخیره">
    </div>
  </div>

</form>