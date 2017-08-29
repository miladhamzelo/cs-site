<template>

<div>

    <div class="row" v-if="loading">
	    <div class="col-lg-12">
	        <section class="panel">
	            <div class="panel-body">
	                درحال بارگزاری...
	            </div>
	        </section>
	    </div>
	</div>

	<div v-else>
	    <div class="row" >
	        <div class="col-lg-12">
	            <section class="panel">
	                <header class="panel-heading">اطلاعات تماس</header>
	                <div class="panel-body">
		                <form class="form-horizontal tasi-form" method="get">

	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">نام کاربری</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="user.username"> 
	                            </div>
	                        </div>
	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">گزرواژه</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="user.password"> 
	                            </div>
	                        </div>
	                       
	                    </form>
		            </div>
	            </section>
	        </div>
	    </div>
	   
	    <button type="button" class="btn btn-primary" @click="save">ذخیره</button>
	</div>
</div>

</template>

<script>
	
import sendForm from './libs/send_form.js'

export default {

    mixins : [sendForm],
	
	data(){
		return{

			sans : "",
			sansha : [],

			form : {
				name : "setting",
                data : {}
			},
			
			loading : false,

			user : {},
	
		}
	},
	created() {
		let params = {
			id : SERVER['user_id']
		}
		this.$http.get("api/get_admin",{params})
        .then(res=>{
            console.log(res)
            if(res.body != "")
           		this.user = res.body.data
        })
	},
	methods : {
		
        save(){
        	
         
            this.$http.post("api/new_admin",this.user).then(res=>{
            	console.log(res)
            	alert("save!")
            })

            this.$http.post("api/save_showtimes",{sansha:this.sansha}).then(res=>{
            	console.log(res)
            })
        
        },

        deleteSans(i){
        	this.sansha.splice(i, 1);
        },

        addSans(){
        	this.sansha.push(this.sans)
        	this.sans = ""
        }
	},

}

function br2nl(str)  {
    return str.replace(/<br>/g, "\\n");
}

</script>


<style scoped>

</style>