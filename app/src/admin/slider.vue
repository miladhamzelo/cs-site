<template>

<div>


    <div class="col-lg-12" v-if="loading">
        <section class="panel">
            <div class="panel-body">
                درحال بارگزاری...
            </div>
        </section>
    </div>

    <div class="col-lg-12" v-else>

       <div class="row" v-for="(s,i) in slider.slides">
            <div class="col-lg-12">
                <section class="panel">
                    <header class="panel-heading">اسلاید {{(i+1).toFaDigit()}}
                    <button class="btn btn-danger"  style="float: left;" @click="deleteSlide(i)">حذف</button>
                    </header> 
                    <div class="panel-body form-horizontal tasi-form">
                        <div class="form-group">
                            <imageInput  v-model="s.image" :prefix="form.uploadKey" :name="'slide_image'+i" @change="onFileChange">
                                سایز عکس 50px * 100px
                            </imageInput>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">لینک : </label>
                            <div class="col-sm-10">
                                <linkpicker v-model="s.link">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">توضیح کوتاه : </label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="s.alt"> </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <button type="button" class="btn btn-success" @click="sendForm(form, url, progress)">ذخیره</button>
        <button type="button" class="btn btn-primary" @click="newSlide">+ جدید</button>
    </div>

</div>

</template>

<script>
    
import sendForm from './libs/send_form.js'
import imageInput from './com/imageInput.vue'
import linkpicker from './com/linkpicker.vue'

export default {

    mixins : [sendForm],
    components : {imageInput, linkpicker},
    
    data(){
        return{

            slider : {
                slides : []
            },

            loading : true,

            url : 'api/new_data',

            form : {
                name : "slider",
                uploadKey : getRandomInt(1,100000) ,
                data : ''
            }
        }
    },
    watch : {
        slider : {
            deep : true,
            handler(val){
                this.form.data = JSON.stringify(this.slider)
            }
        }
    },
    created() {

        setTimeout(()=>{

            this.$http.get("api/get_data",{params:{name:"slider"}})
            .then(res=>{
               console.log(res)
               this.loading = false
                if(res.body.data != "" && res.body.data != undefined && res.body.data != "null"){

                    this.slider = JSON.parse(res.body.data)
                    
                }else{

                    this.slider.slides = [{image:'', link:'', alt:''}]
                }
            })
        },1000)

    },
    methods : {

        progress(p){

            if(p.finish){
                alert("Save!")
            }
        },


        newSlide(){
            this.slider.slides.push({image:'', link:'', alt:''})
        },

        deleteSlide(i){

            this.slider.slides.splice(i,1)
        }

    }
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>




<style scoped>

pre{direction: ltr}
</style>