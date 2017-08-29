<template>

<div>
    <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">لیست برنامه های فرهنگی </header>
                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th><i class="icon-bullhorn"></i>لیست برنامه ها</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <p v-if="concerts.length == 0">{{loading_msg}}</p>
                        <tr v-for="(c,i) in concerts" :class="{'expire' : c.expire}">
                            <td><router-link :to="'/concerts/edit-concert?id='+c.id">{{c.title}}</router-link></td>
                            <td>{{ c.expire ? 'تاریخ گذشته' : 'درحال اکران' }}</td>
                            <td>
                                <button class="btn btn-danger" @click="delete_concert(c.id, i)">حذف</button>
                                <button class="btn btn-default" @click="archive_concert(c.id, i)">آرشیو</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </div>
    <router-link class="btn btn-success" :to="'/concerts/release-concert'"> برنامه جدید</router-link>
  
</div>

</template>

<script>
	

export default {

	
	data(){
		return{
		
	       concerts : [],

           loading: true
		}
	},
	
    computed : {

        loading_msg(){
            return this.loading ? "درحال بارگزاری..." : "درحال حاضر هیچ فیلمی یافت نشد"
        }

    },

    created() {

       this.load_concerts();
	},

	methods : {
		
        load_concerts(){

            this.$http.get("api/get_concerts").then((res)=>{

                this.concerts = res.body;
                this.loading = false

                console.log(res)
            })
        },

        delete_concert(id, index){

            this.concerts.splice(index,1)

            this.$http.get("api/delete_concert", {params:{id}}).then((res)=>{

                console.log(res.body)
            })

        },

        archive_concert(id, index){

            this.concerts.splice(index,1)

            this.$http.get("api/archive_concert", {params:{id}}).then((res)=>{

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