<template>

<div>
   <div class="row" v-for="(nm,i) in nextMovies">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">فیلم آینده
                    <button class="btn btn-danger" style="float: left;" @click="deleteNextMovie(i)">حذف</button>
                 </header>
                <div class="panel-body">
                   <div class="form-group">
                        <label class="col-sm-2 control-label">نام فیلم</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="nm.name"> 
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="test">فایل را انتخاب کنید</label>
                        <imageInput  v-model="nm.image" :prefix="form.uploadKey" :name="'next_movie_image'+i" @change="onFileChange">
                            سایز عکس 50px * 100px
                        </imageInput>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <button type="button" class="btn btn-primary" @click="save()">ذخیره</button>
    <button type="button" class="btn btn-primary" @click="newNextMovie">+ جدید</button>

</div>

</template>

<script>
	
import sendForm from './libs/send_form.js'
import imageInput from './com/imageInput.vue'

export default {

    mixins : [sendForm],
    components : {imageInput},
	
	data(){
		return{

            nextMovies : [],

            url : 'api/new_data',

            form : {
                name : "next_movies",
                uploadKey : getRandomInt(1,100000),
                data : ''
            }
		}
	},
	created() {

        this.$http.get("api/get_data",{params:{name:"next_movies"}})
        .then(res=>{
           console.log("nextt films :")
           console.log(res)
            
            if(res.body.data != "" && res.body.data != undefined && res.body.data != "null"){

                this.nextMovies = JSON.parse(res.body.data)
                
            }else{

                this.nextMovies = [{image:'', name:''}]
            }
        })

	},
	methods : {

        progress(p){

            if(p.finish){
                alert("Save!")
            }
        },

        save(){

            this.form.data = JSON.stringify(this.nextMovies)

            this.sendForm(this.form, this.url, this.progress)
        
        },

        newNextMovie(){
            this.nextMovies.push({image:'', link:'', alt:''})
        },

        deleteNextMovie(i){

            this.nextMovies.splice(i,1)
        }

	}
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>




<style scoped>

</style>