<template>

<div>
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
                    <header class="panel-heading"> اطلاعات خبر </header>
                    <div class="panel-body">
                        <form class="form-horizontal tasi-form" method="get">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">عنوان</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="news.title"> </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">متن خبر</label>
                                <div class="col-sm-10">
                                    <tinymce v-model="news.des"></tinymce>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">نمایش</label>
                                <div class="col-sm-10">
                                    <input type="checkbox" v-model="news.public">
                                    نمایش این خبر به همه
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>


        <div class="row">
            <div class="col-lg-12">
                <section class="panel">
                    <header class="panel-heading">تصویر خبر</header> 
                    <div class="panel-body form-horizontal tasi-form">
                        <div class="form-group">
                            <imageInput  v-model="news.image" name="news_image" @change="onFileChange">
                                سایز عکس 50px * 100px
                            </imageInput>
                        </div>
                    </div>
                </section>
            </div>
        </div>

       
        <button type="button" class="btn btn-primary" @click="sendForm(news,formUrl,progress)">ذخیره</button>
    </div>

</div>

</template>

<script>
    
import sendForm from './libs/send_form.js'
import tinymce from './com/tinymce.vue'
import imageInput from './com/imageInput.vue'


export default {

    

    mixins : [sendForm],

    components : {
        imageInput,
        tinymce
    },

    data(){
        return{

            loading : true,
          
            news : {

                title : '',
                des : '',
                image : '',
                public : '1'
            },

            formUrl : 'api/new_news'
    
        }
    },
    created() {

        this.get_news_by_id_query();

        
    },
    methods : {

        progress(p){

            if(p.finish){
                alert("save")
            }
        },

        get_news_by_id_query : function(){
            this.loading = true


                let id = this.$route.query.id;
                if(id){

                    setTimeout(()=>{
                        this.$http.get("api/get_news?id="+id).then((res)=>{

                            this.news = res.body;
                            this.loading = false
                            console.log(this.news)
                        })
                        
                    },1000)
                }else{

                    this.loading = false
                }
                
        }
        
    }




}



</script>


<style scoped>

</style>