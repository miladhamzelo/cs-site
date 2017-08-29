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
	                            <label class="col-sm-2 control-label">آدرس</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="setting.contact.address"> 
	                            </div>
	                        </div>
	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">تلفن</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="setting.contact.phone"> 
	                            </div>
	                        </div>
	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">تلگرام</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="setting.contact.telegram"> 
	                            </div>
	                        </div>
	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">اینستاگرام</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="setting.contact.instagram"> 
	                            </div>
	                        </div>
	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">لینک بازار</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="setting.contact.bazar"> 
	                            </div>
	                        </div>
	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">ایمیل سایت</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="setting.contact.siteEmail"> 
	                            </div>
	                        </div>
	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">ایمیل مدیر</label>
	                            <div class="col-sm-10">
	                                <input type="text" class="form-control" v-model="setting.contact.adminEmail"> 
	                            </div>
	                        </div>
	                    </form>
		            </div>
	            </section>
	        </div>
	    </div>
	    <div class="row" >
	        <div class="col-lg-12">
	            <section class="panel">
	                <header class="panel-heading">درباره ما</header>
	                <div class="panel-body">
		                <form class="form-horizontal tasi-form" method="get">
	                        <div class="form-group">
	                            <label class="col-sm-2 control-label">درباره ما</label>
	                            <div class="col-sm-10">
	                                <textarea type="text" class="form-control" v-model="setting.about">
	                                 </textarea>
	                            </div>
	                        </div>
	                    </form>
		            </div>
	            </section>
	        </div>
	    </div>
	    <div class="row" >
	        <div class="col-lg-12">
	            <section class="panel">
	                <header class="panel-heading">سانس ها</header>
	                <div class="panel-body">

	                        <div class="form-group">
	                            <div class="col-sm-6">

	                            	<div class="row">
		                            	<div class="col-sm-3">
		                                	<button class="btn btn-primary" @click="addSans">ثبت</button>
		                            	</div>
		                                <div class="col-sm-9">
		                                	<input type="text" class="form-control" v-model="sans">
		                            	</div>
		                            </div>
                            		
                                	<div class="row" style="margin-top: 35px">
		                            	<div class="col-sm-3" v-for="(s,i) in sansha">
		                                	<div class=" input-group" >
											  <span class="input-group-addon btn btn-danger" @click="deleteSans(i)">X</span>
											  <input type="text" class="form-control" :value="s">
											</div>
		                            	</div>
	                            	</div>
	                            </div>
	                        </div>
	                 
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

			setting : {

				contact : {

					adminEmail : '',
					siteEmail : '',
					address : '',
					phone : '',
					telegram : '',
					instagram : '',
					bazar : '',
				},

				about : ''
			}
	
		}
	},
	created() {
		this.$http.get("api/get_data",{params:{name:"setting"}})
        .then(res=>{
            console.log(res)
            if(res.body != "")
           		this.setting = JSON.parse(br2nl(res.body.data))
        })

		this.$http.get("api/get_all_showtimes").then(res=>{
            console.log(res)
           	if(res.body.showTimes){
           		res.body.showTimes.some(el=>{
           			this.sansha.push(el.time)
           		})
           	}
        })
	},
	methods : {
		
        save(){
        	
            this.form.data = JSON.stringify(this.setting)
            this.$http.post("api/new_data",this.form).then(res=>{
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