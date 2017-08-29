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
        <div class="row">
            <div class="col-lg-12">
                <section class="panel">
                    <header class="panel-heading">لیست پرداخت ها </header>
                    <div class="panel-body">
                        <div class=" input-group" style="margin-bottom: 15px">
                          <span class="input-group-addon btn-primary"><i class="icon-search"></i></span>
                          <input type="text" class="form-control" v-model="searchText" 
                          placeholder="جستجو">
                        </div>
                        <table class="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                    <th><i class="icon-bullhorn"></i>کد مرجع</th>
                                    <th><i class="icon-question-sign"></i>نام</th>
                                    <th><i class="icon-question-sign"></i>شماره مبایل</th>
                                    <th><i class="icon-question-sign"></i>تاریخ</th>
                                    <th><i class="icon-question-sign"></i>مبلغ پرداختی</th>
                                    <th><i class="icon-question-sign"></i>شماره وضعیت</th>
                                    <th><i class="icon-question-sign"></i>وضعیت</th>
                                    <th><i class="icon-question-sign"></i>شماره کارت</th>
                                    <th><i class="icon-question-sign"></i>اتوریتی</th>
                                    <th><i class="icon-question-sign"></i>سانس</th>
                                    <th><i class="icon-question-sign"></i>نوع بلیط</th>
                                    <th><i class="icon-question-sign"></i>ای دی فیلم/کنسرت</th>
                                    <th><i class="icon-question-sign"></i>درگاه</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <h3 v-if="pays.length == 0">درحال بارگزاری...</h3>
                                <tr v-for="n in searchResult">
                                    <td class="hidden-phone">{{n.refid}}</td>
                                    <td class="hidden-phone">{{n.name}}</td>
                                    <td class="hidden-phone">{{n.mobile}}</td>
                                    <td class="hidden-phone">{{n.date}}</td>
                                    <td class="hidden-phone">{{n.amount}} تومان</td>
                                    <td class="hidden-phone">{{n.resCode}}</td>
                                    <td class="hidden-phone">{{ payStatus(n) }}</td>
                                    <td class="hidden-phone">{{n.cardNumber}}</td>
                                    <td class="hidden-phone">{{n.authority}}</td>
                                    <td class="hidden-phone">{{n.sans}}</td>
                                    <td class="hidden-phone">{{n.movie_type}}</td>
                                    <td class="hidden-phone">{{n.movie_id}}</td>
                                    <td class="hidden-phone">{{n.type || 'zarinpal'}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </section>
                
            </div>
        </div>

    </div>

</div>

</template>

<script>


export default {

    

    mixins : [],

    components : {
     
    },

    data(){
        return{

            loading : true,
          
            pays : [],

            searchText : ''
    
        }
    },
    created() {

        this.get_payments();

        
    },
    computed : {
        searchResult(){
            var a = []
            var val = this.searchText
            this.pays.some(el=>{
                if(el.name.indexOf(val)>-1 || el.mobile.indexOf(val)>-1 
                    || el.refid.indexOf(val)>-1 || el.date.indexOf(val)>-1){
                        a.push(el)
                     
                }
            })

            return a
        },
    },
    methods : {

        get_payments(){
            this.loading = true

            setTimeout(()=>{
                this.$http.get("api/get_payments").then((res)=>{

                    this.pays = res.body;
                    this.loading = false
                    console.log(this.pays)
                })
                
            },1000)
    
                
        },

        payStatus(n){
            return n.type == "mellat" ?  n.resCode == "0" ? "موفق" : "نا موفق" : n.refid == "0" ? "نا موفق" : "موفق"
        }
        
    }




}



</script>


<style scoped>

</style>