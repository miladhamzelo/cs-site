<template>

<div id="sans">

	<div class="addsans">
		<input v-model="sansInput" placeholder="Sans">
		<button @click="addSans(sansInput)">+Add</button>
	</div>

	<div class="sanslist">
		<div v-for="s in showTimes">
			{{s.time}}
		</div>
		
	</div>


	<button @click="saveSans">Save</button>


</div>

</template>

<script>
	


export default {
	data(){
		return{

			sansInput : "",

			new : [],
			
			sans : [],

			showTimes : this.$root.showTimes

		}
	},
	methods : {
		addSans : function(s){

			this.new.push({time:s})
			this.showTimes.push({time:s})
			this.sansInput = ""
		},
		saveSans : function(){


			let formData = new FormData()
			formData.append("times", JSON.stringify(this.new))

			this.$http.post('/sinama/api/add-sans', formData).then((response) => {

				console.log(response.data)

		    });

		}
	},
	created() {


	}
	
}

</script>