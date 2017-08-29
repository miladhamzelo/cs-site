<template>

<div>
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">لیست اکران ها </header>
                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th><i class="icon-bullhorn"></i>لیست فیلم ها</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <p v-if="movies.length == 0">{{loading_msg}}</p>
                        <tr v-for="(m,i) in movies" :class="{'expire' : m.expire}">
                            <td><router-link :to="'/movies/edit-movie?id='+m.id">{{m.title}}</router-link></td>
                            <td>{{ m.expire ? 'تاریخ گذشته' : 'درحال اکران' }}</td>
                            <td>
                                <button class="btn btn-danger" @click="delete_movie(m.id, i)">حذف</button>
                                <button class="btn btn-default" @click="archive_movie(m.id, i)">آرشیو</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </div>
    <router-link class="btn btn-success" :to="'/movies/release-movie'"> فیلم جدید</router-link>
  
</div>

</template>

<script>
import { mapMutations } from 'vuex'	

export default {

	
	data(){
		return{
		
	       movies : [],

           loading: true
		}
	},
	
    computed : {

        loading_msg(){
            return this.loading ? "درحال بارگزاری..." : "درحال حاضر هیچ فیلمی یافت نشد"
        }

    },

    created() {

        console.log("store")
        console.log(this.$store.state.count)

       this.load_movies();
	},

	methods : {
		
        load_movies(){

            this.$http.get("api/get_movies").then((res)=>{

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

        },

        archive_movie(id, index){

            this.movies.splice(index,1)

            this.$http.get("api/archive_movie", {params:{id}}).then((res)=>{

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

.expire td{
    background: rgba(255,0,0,0.1) !important;
}
</style>