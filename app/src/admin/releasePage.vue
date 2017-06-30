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
                    <header class="panel-heading"> اطلاعات صفحه </header>
                    <div class="panel-body">
                        <form class="form-horizontal tasi-form" method="get">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">عنوان</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="page.title"> </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">محتوا</label>
                                <div class="col-sm-10">
                                    <tinymce v-model="page.des"></tinymce>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">مسیر</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="page.uri"> </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>

        <button type="button" class="btn btn-primary" @click="save">ذخیره</button>
    </div>

</div>

</template>

<script>
    
import sendForm from './libs/send_form.js'
import tinymce from './com/tinymce.vue'


export default {

    

    mixins : [sendForm],

    components : {
        tinymce
    },

    data(){
        return{

            loading : true,
          
            page : {

                title : '',
                des : '',
                uri : ''
            }
    
        }
    },
    created() {

        this.get_page_by_id_query();

        
    },
    methods : {

        get_page_by_id_query : function(){
            this.loading = true


            let id = this.$route.query.id;
            if(id){

                setTimeout(()=>{
                    this.$http.get("api/get_pages?id="+id).then((res)=>{

                        this.page = res.body;
                        this.loading = false
                        console.log(this.page)
                    })
                    
                },1000)
            }else{

                this.loading = false
            }
                
        },

        save(){
           this.$http.post("api/new_page",this.page).then((res)=>{

                if(res.body.status == "1"){
                    alert("save")
                }else{
                    alert("error")
                }
                console.log(res.body)
            }) 
        }
        
    }




}



</script>


<style scoped>

</style>