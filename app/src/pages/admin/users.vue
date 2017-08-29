<template>

<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">لیست کاربرها </header>
            <table class="table table-striped table-advance table-hover">
                <thead>
                    <tr>
                        <th><i class="icon-bullhorn"></i>نام</th>
                        <th><i class="icon-bookmark"></i>شماره تماس</th>
                        <th><i class=" icon-edit"></i>تعداد خرید</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="u in users">
                        <td><a href="#">{{u.fullName}}</a></td>
                        <td>{{u.phone}}</td>
                        <td><span class="label label-info label-mini">{{u.countBuy}}</span></td>
                       
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</div>

</template>

<script>
	

export default {

	
	data(){
		return{
		
	       users : [],
           loading : true
		}
	},
	created() {
        this.load_users_info()
	},
	methods : {


		load_users_info(){
            this.loading = true

            setTimeout(()=>{

                this.$http.get("api/get_users_info").then(res=>{

                    this.users = res.body
                    console.log(res.body)
                    this.loading = false
                })

            },1000)
        }
	}
}



</script>


<style scoped>
table {
	font-size: 13px !important;
}
</style>