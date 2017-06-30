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
                <header class="panel-heading">مشخصات کنسرت </header>
                <div class="panel-body">
                    <form class="form-horizontal tasi-form" method="get">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">عنوان کنسرت</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="concert.title"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">توضیحات</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="concert.des"> </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <section class="panel">
                <header class="panel-heading"> تصویر کاور فیلم </header>
                <div class="panel-body">
                   <imageInput v-model="concert.image" name="image" @change="onFileChange">
                        سایز عکس 20px * 40px
                   </imageInput>
                </div>
            </section>
        </div>
        <div class="col-lg-6">
            <section class="panel">
                <header class="panel-heading"> تصویر پسزمینه فیلم </header>
                <div class="panel-body">
                    <imageInput v-model="concert.bg_image" name="bgImage" @change="onFileChange">
                        سایز عکس 100px * 80px
                    </imageInput>
                </div>
            </section>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">قیمت صندلی ها</header>
                <div class="panel-body">
                    <form class="form-horizontal tasi-form" method="get">
                        <div class="form-group" v-for="(r,i) in rowsCount"> 
                            <label class="col-sm-2 control-label"><span style="font-weight: 100">ردیف شماره </span>{{ (15-r)+1 }}</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" @input="priceInput(r, i, $event)" :value="rowsPrice[i]"> 
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
 <!--   <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">گالری </header>
                <div class="panel-body">
                    <imageInput v-model="concert.scenes" name="scenes" @change="onFileChange" multiple>
                        سایز عکس 100px * 80px
                    </imageInput>
                </div>
            </section>
        </div>
    </div> -->
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">تاریخ و سانس</header>
                <div class="panel-body">
                    <div class="form-group">

                        <div class="w3-row">
                            <table class="table table-striped table-advance table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th><i class="icon-bullhorn"></i>تاریخ ها</th>
                                        <th>سانس ها</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="concert.chart.length==0" class="w3-text-grey"><td>هنوز تاریخی ثبت نشده است</td></tr>
                                    <tr v-for="(r,i) in concert.chart">
                                        <td> 
                                            <button class="btn btn-danger" @click="remove_date(i)">
                                                <i class="icon-trash"></i>
                                            </button> 
                                        </td>
                                        <td> <datePicker v-model="r.date"></datePicker> </td>
                                        <td> <timePicker v-model="r.times" ></timePicker> </td>
                                       
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="w3-row ">
                            <button class="w3-right btn btn-primary" @click="new_date()">+تاریخ جدید</button>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    </div>
    <button type="button" class="btn btn-success" :disabled="is_save"
    @click="save()">ذخیره 
       
    </button>
</div>

</template>




<script>


import sendForm from './libs/send_form.js'

import datePicker from './com/datepicker.vue'
import timePicker from './com/timepicker.vue'
import imageInput from './com/imageInput.vue'

export default {

    
    mixins : [sendForm],

    components : {timePicker, datePicker, imageInput},

    data(){
        return{

            rowsCount : 15,

            rowsPrice : new Array(15).fill(),

            loading: true,

            loadingProgress : "",

            concert : {
                chart:[],
                title : '',
                des : '',
                bg_image : '',
                image : '',
                prices_list : [],
                
            },
            formUrl : 'api/new_concert',
            showTimes : this.$root.showTimes

    
        }
    },

	methods : {

        save(){

            this.concert.prices_list = this.rowsPrice

            this.sendForm(this.concert,this.formUrl,()=>{
                alert("saved!!!!??")
            })
        },

        priceInput(r, i, e){

            let oldval = this.rowsPrice[i]
            let newval = $(e.target).val()

            let oi = this.rowsPrice.indexOf(oldval, i)
            console.log(oi)
            for(let j=oi+1; j<this.rowsPrice.length; j++){
                if(this.rowsPrice[j] == undefined || 
                    this.rowsPrice[j] == "" || this.rowsPrice[j] == oldval){
                    this.$set(this.rowsPrice, j, newval)
                }else{
                    break;
                }
            }

            this.$set(this.rowsPrice, i, newval)
        },

        new_date(){

            this.concert.chart.push({date:"", times:[]})

        },
        
		remove_date(i){

            this.concert.chart.splice(i,1)
           // this.$http.get("api/delete_showtime", {params:{ id: }})

        },

      /*  progress(p){
            if (p.lengthComputable) {
               // this.saveLoading = true
                this.loadingProgress =  "%"+ Math.round(p.loaded / p.total * 100 )
            }

            if(p.finish){

                this.loadingProgress = ""

            }

        
        }
*/

	},

    created() {   

         
        let id = this.$route.query.id;
        if(id){
            setTimeout(()=>{
                this.$http.get("api/get_concerts?id="+id).then((res)=>{

                    this.loading = false;
                    this.concert = res.body; 
                    this.rowsPrice = this.concert.prices_list.split(' ');
                    console.log(res.body)
                   
                })
            },1000)
        }else{
            this.loading = false;
        }

    },

    computed : {
        header : function(){
            return this.$route.query.id ? 'ویرایش ' : 'اضافه کردن '
        },

        is_save(){
            return this.loadingProgress.length>0
        }


    }
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