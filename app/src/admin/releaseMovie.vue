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
                <header class="panel-heading">{{header}}  فیلم </header>
                <div class="panel-body">
                    <form class="form-horizontal tasi-form" method="get">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">نام فیلم</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.title"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">سبک</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.type"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">کارگردان</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.director"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">تهیه کننده</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.producer"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">سال ساخت</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.year"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">بازیگران</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.actors"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">سایر عوامل فیلم </label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.other_agents"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">داستان فیلم </label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.des"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">مدت فیلم (دقیقه)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.time_out"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">قیمت صندلی (تومان)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.price"> </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">قیمت نیم بها (تومان)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movie.half_price"> </div>
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
                   <imageInput v-model="movie.image" name="image" @change="onFileChange">
                        سایز عکس 20px * 40px
                   </imageInput>
                </div>
            </section>
        </div>
        <div class="col-lg-6">
            <section class="panel">
                <header class="panel-heading"> تصویر پسزمینه فیلم </header>
                <div class="panel-body">
                    <imageInput v-model="movie.bg_image" name="bgImage" @change="onFileChange">
                        سایز عکس 100px * 80px
                    </imageInput>
                </div>
            </section>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">گالری </header>
                <div class="panel-body">
                    <imageInput v-model="movie.scenes" name="scenes" @change="onFileChange" multiple>
                        سایز عکس 100px * 80px
                    </imageInput>
                </div>
            </section>
        </div>
    </div>
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
                                        <th>نیم بها</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="movie.chart.length==0" class="w3-text-grey"><td>هنوز تاریخی ثبت نشده است</td></tr>
                                    <tr v-for="(r,i) in movie.chart">
                                        <td> 
                                            <button class="btn btn-danger" @click="remove_date(i)">
                                                <i class="icon-trash"></i>
                                            </button> 
                                        </td>
                                        <td> <datePicker v-model="r.date"></datePicker> </td>
                                        <td> <timePicker v-model="r.times" ></timePicker> </td>
                                        <td>
                                            <input class="form-control" type="checkbox" v-model="r.is_half_price">
                                        </td>
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
    @click="sendForm(movie,formUrl,progress)">ذخیره 
        <i v-if="is_save" class="loading-style">{{ loadingProgress }}</i>
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

            loading: true,

            loadingProgress : "",

            movie : {
                chart:[],
                title : '',
                des : '',
                producer : '',
                director : '',
                year : '',
                price : '50000',
                time_out : ''
            },
            formUrl : 'api/new_movie',
            showTimes : this.$root.showTimes

    
        }
    },

	methods : {

        new_date(){

            this.movie.chart.push({date:"", times:[]})

        },
        
		remove_date(i){

            this.movie.chart.splice(i,1)
           // this.$http.get("api/delete_showtime", {params:{ id: }})

        },

        progress(p){
            if (p.lengthComputable) {
               // this.saveLoading = true
                this.loadingProgress =  "%"+ Math.round(p.loaded / p.total * 100 )
            }

            if(p.finish){

                this.loadingProgress = ""

            }

        
        }


	},

    created() {   

         
        let id = this.$route.query.id;
        if(id){
            setTimeout(()=>{
                this.$http.get("api/get_movies?id="+id).then((res)=>{

                    this.loading = false;
                    this.movie = res.body; 
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