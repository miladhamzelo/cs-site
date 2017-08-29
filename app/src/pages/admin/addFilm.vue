<template>

<div>

	<div id="filmInfo">
	
		<input name="title" v-model="film.title" placeholder="title">
		<textarea name="desc" v-model="film.desc" placeholder="Description"></textarea>
		<input type="file" name="myFile"  @change="onFileChange">
		<input type="file" name="myFile2"  @change="onFileChange">
		<input type="hidden" name="chart" :value="film.chart">
		<button @click="sendForm(film)">Send</button>
	

	</div>

	<div id="weekBox">{{film.chart}}
		<div v-for="(r,i) in weekChart" :style="r.selected ? 'background:#e8e8e8' : ''">
			<label>
				<input type="checkbox" :disabled="!r.enable" v-model="r.selected">
				
				{{r.name}} {{r.date}}
				
			</label>

			<button @click="addSans(i)" :disabled="!r.enable">+ Add Sans</button>
			{{sansLength(r.date_id)}}
			<div class="sansSelector" v-for="j in sansLength(r.date_id)" >{{j}}
				<select v-model="film.chart[r.date_id][j-1].value">
				  <option value="none">-- Select --</option>
				  <option v-for="st in showTimes" :value="st.id">{{st.time}}</option>
				</select>
				<span class="selectClose" @click="removeSans(i,j)">x</span>
				
			</div>
			
			
		</div>

		<button @click="nextWeek">next week</button>
		<button @click="prevWeek">previews week</button>
	</div>
{{week}}
</div>

</template>

<script>
	
import sendForm from './libs/send_form.js'


export default {

	
	mixins : [sendForm],

	computed : {
	
	},
	data(){
		return{
			
			days : ["SH","YE","DO","SE","CH","PA","JO"],

			film : {
				title : "",
				desc : "",
				chart : {}
			},

			weekChart : [],

			showTimes : this.$root.showTimes,


			week : 0

		}
	},
	created() {

		var d = new Date(/*new Date().getTime() + ((2*24) * 60 * 60 * 1000)*/);
		var today

		if(d.getDay()+1 == 7)
			today = 0 
		else
			today = d.getDay()+1;
	

		for(let i=0;i<7;i++){

			let name,enable = true

			if(i < today)
				enable = false
			
			name = this.days[i]

			let n = (new Date().getTime() + ((i*24) * 60 * 60 * 1000))
			var d = new Date(n);

			this.weekChart.push({name, enable, selected:false, date: formatDate(d), date_id: d })
		}

		// ===================================== GET SANS DATA =======================

		

	},
	methods : {
		sansLength(di){
			let len = 0;
			if(this.film.chart[di])
				len = this.film.chart[di].length
			return len 

			/*let len = 0;
			let n = this.film.chart.length
			for(let i=0;i<n;i++){

				if(this.film.chart[i].date == di){
					len = this.film.chart[i].sans.length
				}
			}

			return len*/


			
		},
		addSans : function(i){

			if(this.weekChart[i].enable == true){
				let dateId = this.weekChart[i].date_id
		
				if(!this.film.chart[dateId])
					this.$set(this.film.chart,dateId,[])

				this.film.chart[dateId].push({value:"none"})
	
				this.weekChart[i].selected = true
			}
		},
		removeSans : function(i,j){

			if(this.weekChart[i].enable == true){
				this.weekChart[i].sans.splice(j-1, 1);
			}
		},
		nextWeek : function(){


			this.week++;

			// Get Sat of next week
			let today = new Date().getDay();
			let n = (new Date().getTime() + (((6+(this.week*7))-today)*24) * 60 * 60 * 1000)
			var d = new Date(n);

			// Fill new chart
			this.weekChart = []

			for(let i=0;i<7;i++){

				let name,enable = true
				
				name = this.days[i]

				let n = new Date(d.getTime() + ((i*24) * 60 * 60 * 1000))

				

				this.weekChart.push({name, enable, selected:false, date: formatDate(n), date_id: new Date(n)  })
			}
			
			
		},
		prevWeek : function(){

			let today ,d
			if(this.week > 0)
				this.week--;

			if(this.week == 0){

				d = new Date();
				today = d.getDay()+1;
			}else{

				today = new Date().getDay();
				let n = (new Date().getTime() + (((6+(this.week*7))-today)*24) * 60 * 60 * 1000)
				d = new Date(n);
				today = d.getDay();
				
			}

			this.weekChart = []

			for(let i=0;i<7;i++){

				let name,enable = true

				if(d.getDay()+1 == 7)
					today = 0 
				else
					today = d.getDay()+1;

				if(this.week == 0 && i < today)
					enable = false
				
				
				name = this.days[i]

				let n = new Date(d.getTime() + ((i*24) * 60 * 60 * 1000))
				

				this.weekChart.push({name, enable, selected:false, date: formatDate(n), date_id: new Date(n)  })
			}
			
		},
	}
}



function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

</script>


<style scoped>

span.selectClose {
	background: red;
	color: white;
	cursor:default;
	padding: 1px 5px 2px 4px;
	    margin-left: -5px;
    display: inline-block;
    font-family: sans-serif

}

div.sansSelector {
	margin-right:5px;
	display: inline-block
}
	
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-indent: 1px;
    text-overflow: '';
    padding: 2px 5px 2px 4px;
    
    
}

</style>