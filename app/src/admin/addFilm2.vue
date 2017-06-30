<template>

<div>

	<div id="filmInfo">
	
		<input name="title" v-model="film.title" placeholder="title">
		<textarea name="desc" v-model="film.desc" placeholder="Description"></textarea>
		<input type="file" name="myFile"  @change="onFileChange">
		<input type="file" name="myFile2"  @change="onFileChange">
		<input type="hidden" name="chart" :value="film.chart">
	
	

	</div>

	<div id="ekran">

	

		<button @click="addEkranDate()">+Add Ekran</button>

		<div v-for="(r,i) in film.chart">{{film.chart[i].sans.length}}

			<input type="number" v-model="r.year">
			<input type="number" v-model="r.month">
			<input type="number" v-model="r.day">

			<button @click="addSans(i)">+Sans</button>

			<div class="sansSelector" v-for="j in r.sans.length" >
				<select v-model="r.sans[j-1]">
				  <option value="none">-- Select --</option>
				  <option v-for="st in showTimes" :value="st.time">{{st.time}}</option>
				</select>
				<span class="selectClose" @click="removeSans(i,j)">x</span>
			</div>
						
		</div>

		

	</div>


		<button @click="sendForm(film)">Send</button>

</div>

</template>

<script>
	
import sendForm from './libs/send_form.js'


export default {

	mixins : [sendForm],
	data(){
		return{
		
			film : {
				title : "",
				desc : "",
				chart : []
			},
			showTimes : this.$root.showTimes
		}
	},
	created() {

	},
	methods : {

		addEkranDate : function(){

			this.film.chart.push({year:1395,month:12,day:15,sans:["none"]})
		},
		
		addSans : function(i){

			this.film.chart[i].sans.push("none")
		},
		removeSans : function(i,j){

			this.film.chart[i].sans.splice(j-1, 1);
		},
		
	}
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