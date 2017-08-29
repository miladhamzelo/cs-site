<template>

<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">لیست صفحات </header>
            <table class="table table-striped table-advance table-hover">
                <thead>
                    <tr>
                        <th><i class="icon-bullhorn"></i>تیتر</th>
                        <th class="hidden-phone"><i class="icon-question-sign"></i>مسیر</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>                    
                    <tr v-for="n in pages">
                        <td><router-link :to="'edit-page?id='+n.id">{{n.title}}</router-link></td>
                        <td class="hidden-phone">{{ get_uri(n) }}</td>
                    </tr>
                </tbody>
            </table>
            <p  v-if="pages.length == 0">{{loading_msg}}</p>
        </section>
        <router-link class="btn btn-primary" :to="'release-page'">صفحه جدید</router-link>
    </div>
</div>

</template>

<script>

export default {

	
	data(){
		return{
		
	       pages : [],

           loading : true
		}
	},
	created() {

        this.load_pages()

	},
    computed : {
        loading_msg(){
            return this.loading ? "درحال بارگزاری..." : "درحال حاضر هیچ صفحه ای یافت نشد"
        }
    },
	methods : {

		load_pages : function(){
            this.loading = true;
            setTimeout(()=>{
                this.$http.get("api/get_pages").then((res)=>{

                    this.pages = res.body;
                    this.loading = false
                   // console.log(res)
                })
            },1000)
        },

        get_uri(p){
            return "http://cinemasetareh.ir/" + p.uri
        }


	}
}



</script>


<style scoped>

</style>