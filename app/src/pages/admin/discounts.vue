<template>

<div>
  <div class="row">
        <div class="col-lg-12">
            <section class="panel">
                <header class="panel-heading">تخفیف ها</header>
                <div class="panel-body">
                    <div class="form-group">

                        <div class="w3-row">
                            <table class="table table-striped table-advance table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th><i class="icon-bullhorn"></i>کد تخفیف</th>
                                        <th>میزارن تخفیف (به درصد)</th>
                                        <th>تاریخ انقضاء</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="discounts.length==0" class="w3-text-grey"><td>هنوز تخفیفی ثبت نشده</td></tr>
                                    <tr v-for="(d,i) in discounts">
                                        <td> 
                                            <button class="btn btn-danger" @click="deleteDiscount(i)">
                                                <i class="icon-trash"></i>
                                            </button> 
                                        </td>
                                        <td><input class="form-control"  type="text" v-model="d.code"></td>
                                        <td><input class="form-control"  type="text" v-model="d.value"></td>
                                        <td> <datePicker v-model="d.expired_date"></datePicker> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="w3-row ">
                            <button class="w3-right btn btn-primary" @click="new_discount()">+ تخفیف جدید</button>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    </div>

    <button type="button" class="btn btn-success" @click="save">ذخیره </button>
</div>

</template>

<script>
import datePicker from '../../components/datepicker.vue'

export default {

    components : {
        datePicker
    },
	
	data(){
		return{
		
	       discounts : []
		}
	},
	created() {

        this.load_discounts()

	},
	methods : {

		load_discounts(callback){
            this.$http.get("api/get_discounts").then((res)=>{

                this.discounts = res.body;

                if(callback)
                    callback()
               // console.log(res)
            })
        },

        new_discount(){

            let code = Math.random().toString(36).slice(9).substr(0,6)
            this.discounts.push({code,value:30,expired_date:''})
        },

        deleteDiscount(i){

            let id = this.discounts[i].id
            this.discounts.splice(i,1)

            this.$http.get("api/delete_discount", {params:{id}}).then((res)=>{

                console.log(res.body)
            })
        },

        save(e){

            let el = $(e.target)
            el.prop("disabled",true)
            setTimeout(()=>{

                this.$http.post('api/new_discount', {discounts:this.discounts}).then(res=>{
                    console.log(res)
                    this.load_discounts(()=>{

                        el.prop("disabled",false)

                    })
                })  
            
            },1000)
        }


	}
}



</script>


<style scoped>

</style>