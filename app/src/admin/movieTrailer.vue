<template>

<div>
   <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">پیشنمایش فیلم سینمایی</header>
                <div class="panel-body">
                    <form class="form-horizontal tasi-form" method="get">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">نام فیلم</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="movieTrailer.name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">لینک آپارات</label>
                            <div class="col-sm-10">
                                <textarea type="text" class="form-control" v-model="embedCode">
                                 </textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
    <button type="button" class="btn btn-primary" @click="save()">ذخیره</button>


</div>

</template>

<script>
	
import sendForm from './libs/send_form.js'


export default {

    mixins : [sendForm],
	
	data(){
		return{
            embedCode : '',
            movieTrailer : {
                name : '',
                id : '',
                src : ''
            },
            

            url : 'api/new_data',

            form : {
                name : "movie_trailer",
                data : ''
            }
		}
	},
    watch : {

        embedCode(v){
            this.movieTrailer.id = $(v).prop("id")
            this.movieTrailer.src = $(v).children("script").prop("src")
        }
    },
	created() {

        this.$http.get("api/get_data",{params:{name:"movie_trailer"}})
        .then(res=>{
           console.log(res)
            if(res.body){
                this.movieTrailer = JSON.parse(res.body.data)
                let id = this.movieTrailer.id
                let src = this.movieTrailer.src
                this.embedCode = `<div id="${id}"><script type="text/JavaScript" src="${src}"><\/script></div>`
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


          //  this.movieTrailer.src = this.movieTrailer.src.replace(/\//g, "&#47");
            console.log(this.movieTrailer.src)
            this.form.data = JSON.stringify(this.movieTrailer)

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