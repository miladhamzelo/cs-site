<template>

<div>
    <div class="row">
        <div class="col-lg-12">
            <section class="panel" id="list">
                <header class="panel-heading">خبرنامه پیامکی </header>
                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th><i class="icon-bullhorn"></i>شماره تماس</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(n,i) in numbers">
                            <td><a href="#">{{n.phone}}</a></td>
                            <td><button class="btn btn-danger" @click="deleteNumber(i)">حذف</button></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </div>
    <a :href="$root.rootUrl + 'api/download_sms_file'" target="_blank" class="btn btn-default" @click="">خروجی txt</a>
</div>

</template>

<script>
	

export default {

	
	data(){
		return{
		
	       numbers : [],


		}
	},
	created() {
        this.$http.get("api/get_mobiles").then(res=>{
            this.numbers = res.body
        })
	},
	methods : {
		deleteNumber(i){
            let id = this.numbers[i].id
            this.$http.get("api/delete_mobile",{params:{id}}).then(res=>{
                console.log(res)
            })
            this.numbers.splice(i, 1)
        },
        printNumbers(){
            
            setTimeout(()=>{
                var el = $("#list").clone();
                $("#print").html($(el).find("button").remove().end())
                window.print()
            },500)
        }
	}
}



</script>


<style scoped>

@media print{
    @page {
        size: 21cm 29.7cm !important;
        margin: 30mm 45mm 30mm 45mm !important; /* change the margins as you want them to be. */
    }
    #list{

        width:21cm; height:29.7cm;
        margin:0 auto;
        font-size: 1.3em;
        
    }
    
}

table {
	font-size: 13px !important;
}
</style>