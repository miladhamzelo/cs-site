<template>

<div>
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">آرشیو اکران ها </header>
                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th><i class="icon-bullhorn"></i>آرشیو فیلم ها</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <p v-if="movies.length == 0">{{loading_msg}}</p>
                        <tr v-for="(m,i) in movies">
                            <td><router-link :to="'/admin/movies/edit-movie?id='+m.id">{{m.title}}</router-link></td>
                            <td>
                                <button class="btn btn-danger" @click="delete_movie(m.id, i)">حذف</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </div>
  
</div>

</template>

<script>
	

export default {

	
	data(){
		return{
		
	       movies : [],

           loading : true,
		}
	},

    computed : {

        loading_msg(){
            return this.loading ? "درحال بارگزاری..." : "درحال حاضر هیچ فیلمی یافت نشد"
        }
    },
	
    created() {

       this.load_movies();
	},

	methods : {
		
        load_movies(){

            this.$http.get("api/get_movies?archive=1").then((res)=>{

                this.movies = res.body;
                this.loading = false

                console.log(res)
            })
        },

        delete_movie(id, index){

            this.movies.splice(index,1)

            this.$http.get("api/delete_movie", {params:{id}}).then((res)=>{

                console.log(res.body)
            })

        }

	}
}



</script>


<style scoped>
table {
	font-size: 13px !important;
}
</style>