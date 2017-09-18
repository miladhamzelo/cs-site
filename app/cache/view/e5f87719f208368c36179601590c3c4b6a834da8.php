<?php $__env->startSection("main"); ?>


<div id="app">
    <div class="headerb">
        <div class="container">
            <h1><?php echo e($title); ?></h1>
            <?php if(!empty($date)): ?> 
            <div class="cat"><?php echo e($date); ?></div>
            <?php endif; ?>
            <div class="clearfix"></div>
        </div>
    </div>




    <div  class="container"> 
        <div class="buy">
            <?php echo $des; ?>

        </div>
    </div>

</div>





<style>
.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>


<?php echo GET_SERVER_VALUES() ?>
<?php echo GET_APP_JS() ?>

<?php $__env->stopSection(); ?>
<?php echo $__env->make("layouts.master", array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>