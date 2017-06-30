<div id="app">
    <div class="headerb">
        <div class="container">
            <h1><?= $data['title'] ?></h1>
            <?php if(!empty($data['date'])){ ?>
            <div class="cat"><?= $data['date'] ?></div>
            <?php } ?>
            <div class="clearfix"></div>
        </div>
    </div>




    <div  class="container"> 
        <div class="buy">
            <?= $data['des']  ?>
        </div>
    </div>

</div>





<style>
.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>


<?php GET_SERVER_VALUES() ?>
<?php GET_APP_JS() ?>