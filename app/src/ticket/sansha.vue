<template>

<div v-if="loading">درحال بارگزاری سانس ها...</div>

<div v-else>
    <select v-model="date" class="form-control">
	    <option value="" hidden>تاریخ های اکران</option>
	    <option v-for="d in get_dates" :value="d"> {{ $root.getFullDay(d) }} {{ is_half_price(d) }}</option>
    </select>
    
	<div class="rows" v-if="date.length>0">
     
            <div class="row " v-for="(s,i) in filtered_sans" @click="selectSans(s,i)" 
       			 :class="{active : si == i}" v-show="si == i || si == -1">
	            <div class="date col-sm-3">{{s.date.toFaDigit()}}</div>
	            <div class="date col-sm-3">{{s.time.toFaDigit()}}</div>
	            <div class="price col-sm-3" >
	            	<div v-if="$root.movie">
		           		<p class="myprice" :class="{'expire-price':s.is_half_price=='1'}">{{$root.movie.price.toFaDigit()}} تومان</p>
		           		<p v-if="s.is_half_price=='1'" class="myprice">{{$root.movie.half_price.toFaDigit()}} تومان</p>
	            	</div>
	            	<div v-else>
	            		...
	            	</div>
	            </div>
	            <div class="btn btn-success col-sm-3" v-show="si == -1">خرید بلیط</div>
	            <div class="btn btn-danger col-sm-3" v-show="si == i">لغو بلیط</div>
	            <div class="clearfix"></div>
            </div>
      
	</div>



</div>


</template>

<script>

export default {

	props : ["movieId"],

	data(){return{

		ReserveTableName : 'Reserve',

		date : "",

		sansInfo : [],

		showDateBox : true,
		
		loading : true,

		si : -1,

	
		interval : 0

		
	}},

	created(){


		this.load_showtimes();
		
	},

	watch : {

		movieId(){

			this.load_showtimes();
			this.si = -1;
			this.$root.step = 0;
			this.$root.selectedSans = {}
			this.date = ""
		},

		date(){

			this.si = -1;
			this.$root.step = 0;
			this.$root.selectedSans = {}
		}


	},

	computed : {

		filtered_sans(){
			if(this.date == "")
				return this.sansInfo

			return this.sansInfo.filter((el)=>{

				return el.date == this.date
			})
		},

		get_dates(){

			let dates = []
			this.sansInfo.some((el, i)=>{
				if(dates.indexOf(el.date) == -1)
					dates.push(el.date)
			})
			return dates
		}
	},

	methods : {

		is_half_price(date){

			let msg
			this.sansInfo.some((el)=>{
				if(el.date == date){
					msg = el.is_half_price == "1" ? " - نیم بها" : ""
					return
				}
			})

			return msg
		},



		load_showtimes(){

			this.loading = true;

			let id;
			this.ReserveTableName = "Reserve"

			if(this.movieId && this.movieId != "")
				id = this.movieId

			if(SERVER['query']['id'])
				id = SERVER['query']['id']

			if(SERVER['query']['cid']){
				id = SERVER['query']['cid']
				this.ReserveTableName = "concertReserve"
			}

			let params = {
				id,
				table : this.ReserveTableName,
				delay : 60
			}

			this.$http.get('api/get_showtimes',{params}).then(response => {

				setTimeout(()=>{

					let data = response.body;
					this.sansInfo = data
					console.log("FILM LOADING OK")
					console.log(data)
					this.loading = false;

				},1000)

			}, response => {
				console.log("ERROR WHEN GET FILM : ")
				console.log(response)
			});
		},

		selectSans(s,i){

			this.$root.selectedSans = {uniqe_id: s.uniqe_id, id: s.id, date: s.date, time: s.time, is_half_price: s.is_half_price}
			
			this.$root.step = 1;

			
			let params = { 
				uid : s.uniqe_id , 
				table : this.ReserveTableName
			}
			this.$root.loadingSoldChairs = true;

			clearInterval(this.interval)

			this.interval = setInterval(()=>{
				
				this.$http.get("api/get_chairs_sold",{params}).then(res => {
					console.log(res)
					if(res.body.chairs_sold == undefined || !res.body.chairs_sold){
						this.$root.purchasedChairs = []
					}
					else{
						
						this.$root.purchasedChairs = JSON.parse(res.body.chairs_sold)
					}
					this.$root.loadingSoldChairs = false;
				})
			},5000)

			this.$http.get("api/get_chairs_sold",{params}).then(res => {
				console.log(res)
				if(res.body.chairs_sold == undefined || !res.body.chairs_sold){
					this.$root.purchasedChairs = []
				}
				else{
					
					this.$root.purchasedChairs = JSON.parse(res.body.chairs_sold)
				}
				this.$root.loadingSoldChairs = false;
			})
			
				

			if(this.si != -1){
				this.si = -1;
				this.$root.step = 0;
				this.$root.selectedSans = {}
			}
			else {
				this.si = i
				this.$root.step = 1;
			}

		}
	}



}


</script>



<style scoped>


.rows{
	padding:16px;
}

.row{

	padding: 16px;
	background: whitesmoke;
}

.expire-price{
	text-decoration: line-through;
	color:red;
	font-size: 1.0em !important;
}

.myprice{
	font-size: 1.3em
}

.row {
	cursor:pointer;
	border:2px dashed transparent;
	margin-bottom:10px;
}
.row:not(.active):hover {
	border:2px dashed #ececec;
}
.active{
	border:2px dashed #00bcd4;
}
.button.btnbuy {
	background: green !important;
}
.button.btncancel {
	background: red !important;
}
</style>