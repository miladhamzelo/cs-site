<?php $__env->startSection("main"); ?>

<div id="app">
    <div class="headerb">
        <div class="container">
            <h1>آرشیو اخبار</h1>
            <div class="clearfix"></div>
        </div>
    </div>




    <div class="container">
        <div class="buy">
            <div class="archive">
                <?php $__currentLoopData = $data["news"]; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $n): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="col-md-6 content">
                    <div class="news">
                        <a href="news?id=<?php echo e($n['id']); ?>">
                            <div class="image"><img src="<?php echo e(upload . $n['image']); ?>">
                                <div class="date"><?php echo e($n['date']); ?></div>
                            </div>
                        </a>
                        <a href="news?id=<?php echo e($n['id']); ?>">
                            <h2><?php echo e($n['title']); ?></h2>
                        </a>
                    </div>
                </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <div class="clearfix"></div>
                
                <div class="col-md-12 text-center">
                    <?php if($data["pg"]["page"] > 4+1): ?>
                    <a href="news?page=1" class="pg-btn pg-first">1</a>
                    <span>...</span>
                    <?php endif; ?>
                    <?php for($i=$data["pg"]["start"];$i<=$data["pg"]["end"];$i++): ?>
                        <?php if($data["pg"]["page"] == $i): ?>
                        <span class="pg-btn pg-active"><?php echo e($i); ?></span>
                        <?php else: ?>
                        <a href="news?page=<?php echo e($i); ?>" class="pg-btn"><?php echo e($i); ?></a>
                        <?php endif; ?>
                    <?php endfor; ?>
                    <?php if($data["pg"]["page"] + 4 < $data["pg"]["last"]): ?>
                    <span>...</span>
                    <a href="news?page=<?php echo e($data["pg"]["last"]); ?>" class="pg-btn pg-last"><?php echo e($data["pg"]["last"]); ?></a>
                    <?php endif; ?>
                </div>

            </div>
        </div>
    </div>

</div>

<?php $__env->stopSection(); ?>



<style>

.pg-btn{
    display: inline-block;
        padding-top: 3px;
    width: 30px;
    background: #efefef;
    border-radius: 3px;
    margin: 0 2px;
    border: 1px solid #e2e2e2;
}

.pg-active{
    background: #46a768;
    color: white;
}

.pg-last,.pg-first{
    background: #1b8bda;
    color: white;
}

.content{
    
    
}

</style>

<?php echo $__env->make("layouts.master", array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>