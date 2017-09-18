<template>


<div class="row" v-if="loading">
    <div class="col-lg-12">
        <section class="panel">
            <div class="panel-body">
                درحال بارگزاری...
            </div>
        </section>
    </div>
</div>

<div v-else>
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading"> وضعیت فروش </header>
                <div class="panel-body">
                    <div class="col-md-6"> <strong>فروش امروز  </strong>
                        <div>تعداد بلیط های فروخته شده : <strong>{{ work.tomorrow.number }}</strong></div>
                        <div>تعداد صندلی های رزرو شده : <strong>{{ work.tomorrow.sold_chairs_count }}</strong></div>
                        <div>درآمد کل :  : <strong>{{ work.tomorrow.revenue }} تومان</strong></div>
                    </div>
                    <div class="col-md-6"> <strong>فروش دیروز  </strong>
                        <div>تعداد بلیط های فروخته شده : <strong>{{ work.yesterday.number }}</strong></div>
                        <div>تعداد صندلی های رزرو شده : <strong>{{ work.yesterday.sold_chairs_count }}</strong></div>
                        <div>درآمد کل :  : <strong>{{ work.yesterday.revenue }} تومان</strong></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    
</div>

</template>




<script>


import sendForm from './libs/send_form.js'


export default {

    
    mixins : [sendForm],

    data(){
        return{

            loading: true,

            work : {},

            
    
    
        }
    },

	methods : {

        

	},

    created() {   


        setTimeout(()=>{
            this.$http.get("api/get_work_status").then((res)=>{

                this.work = res.body; 
                console.log(res.body)

                this.loading = false;
            
               
            })
        },1000)
     

    },

    computed : {
       

    },
}



</script>


<style scoped>

.loading-style{

    padding: 0 20px
}

.box{
    width:150px;

}

input[type='checkbox']{
    box-shadow: none;
}


</style>