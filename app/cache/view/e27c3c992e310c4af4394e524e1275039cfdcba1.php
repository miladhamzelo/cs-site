<?php $__env->startSection("main"); ?>

<div id="app">
    <div class="headerb">
        <div class="container">
            <h1>صفحه مورد نظر شما پیدا نشد!</h1>
            <div class="clearfix"></div>
        </div>
    </div>




    <div  class="container"> 
        <div class="content w3-row w3-padding w3-white w3-card-2">
            <div class="row notfound">
                <img style="width:100%;max-width:70%" src="<?php echo e(assets); ?>/notfound.png">
            </div>
        </div>
    </div>

</div>





<style>

.notfound{
    text-align: center;

}

.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>



<?php $__env->stopSection(); ?>
<?php echo $__env->make("layouts.master", array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>