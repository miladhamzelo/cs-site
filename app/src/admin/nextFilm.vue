<template>

<div>
   <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">فیلم آینده </header>
                <div class="panel-body">
                   <div class="form-group">
                        <label class="col-sm-2 control-label">نام فیلم</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="nextMovie.name"> 
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="test">فایل را انتخاب کنید</label>
                        <imageInput  v-model="nextMovie.image" :prefix="form.uploadKey" name="next_movie_image" @change="onFileChange">
                            سایز عکس 50px * 100px
                        </imageInput>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <button type="button" class="btn btn-primary" @click="save()">ذخیره</button>


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

            nextMovie : {
                image : '',
                name : ''
            },

            url : 'api/new_data',

            form : {
                name : "next_movie",
                uploadKey : getRandomInt(1,100000),
                data : ''
            }
		}
	},
	created() {

        this.$http.get("api/get_data",{params:{name:"next_movie"}})
        .then(res=>{
           console.log("nextt film :")
           console.log(res)
            this.nextMovie = JSON.parse(res.body.data)
        })

	},
	methods : {

        progress(p){

            if(p.finish){
                alert("Save!")
            }
        },

        save(){

            this.form.data = JSON.stringify(this.nextMovie)

            this.sendForm(this.form, this.url, this.progress)
        
        }

	}
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>




<style scoped>

</style>