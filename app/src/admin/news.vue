<template>

<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">لیست خبر ها </header>
            <table class="table table-striped table-advance table-hover">
                <thead>
                    <tr>
                        <th><i class="icon-bullhorn"></i>تیتر</th>
                        <th class="hidden-phone"><i class="icon-question-sign"></i>تاریخ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <p v-if="news.length == 0">درحال بارگزاری...</p>
                    <tr v-for="(n,i) in news">
                        <td><router-link :to="'edit-news?id='+n.id">{{n.title}}</router-link></td>
                        <td class="hidden-phone">{{n.date}}</td>
                        <td class="hidden-phone">
                            <button class="btn btn-danger" @click="deleteNews(i)">حذف</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <router-link class="btn btn-primary" :to="'release-news'">خبر جدید</router-link>
    </div>
</div>

</template>

<script>


export default {

	
	data(){
		return{
		
	       news : []
		}
	},
	created() {

        this.load_news()

	},
	methods : {

		load_news : function(){
            this.$http.get("api/get_news").then((res)=>{

                this.news = res.body;

               // console.log(res)
            })
        },

        deleteNews(i){

            let id = this.news[i].id
            this.news.splice(i,1)

            this.$http.get("api/delete_news", {params:{id}}).then((res)=>{

                console.log(res.body)
            })
        }


	}
}



</script>


<style scoped>

</style>