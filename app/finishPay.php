<div id="app">

    <div id="container">

        <div class="headerb">
            <div class="container">
                <h1 v-text="status_msg"></h1>
                <div class="clearfix"></div>
            </div>
        </div>


        <div  class="container"> 
            <div class="buy">
                <div v-if="status" v-cloak>

                   
                    <p>پرداخت انجام شد</p>


                    <ticket-view2 show="true" v-model="ticketData"></ticket-view2>

                    <button class="btn btn-primary" @click="printTicket">چاپ بلیط</button>
                    <button class="btn btn-default" @click="saveTicket">ذخیره بلیط</button>



                </div>
                <div v-else v-cloak>
                    
                    <p>پرداخت انجام نشد</p>

                    <?php if(!$isConcert){ ?>
                        <a :href="'ticket?id='+mid">« بازگشت به صفحه خرید بلیط</a>
                     <?php }else{ ?>
                        <a :href="'ticket?cid='+mid">« بازگشت به صفحه خرید بلیط</a>
                     <?php } ?>
                </div>
              
            </div>
        </div>

    </div>



</div>



<style scoped>

[v-cloak]{display: none}

.content{
    min-height: 400px;
    margin-bottom: 80px
}

</style>

 <script src="<?= assets ?>/html2canvas.js"></script>
 <script src="<?= assets ?>/jspdf.js"></script>
 
<?php GET_SERVER_VALUES() ?>
<?php GET_APP_JS() ?>