<template>

<div class="sansSelector">
	<select v-model="myVal">
	  <option value="none">-- Select --</option>
	  <option v-for="st in data" :value="st.id" >{{st.time}}</option>
	</select>
	<span class="close" @click="this.$emit('onclose',[])">X</span>
	{{myVal}}
</div>


</template>

<script>
	


export default {
	props : ["value"],

	data(){
		return{
			myVal : this.value,
			data : []
		}
	},
	watch : {
		value : function(n){
			this.myVal = n;
		},
		myVal : function(n){
			this.$emit("input",n);
			console.log("change")
		}
	},
	created() {

		this.$http.get('/sinama/api/get_sans').then(response => {

			let data = response.body;

			if(data.status == "1"){

				this.data = data.showTimes
	
			}

		}, response => {
			console.log("ERROR WHEN GET SANS")
		});


	}
	
}

</script>



<style scoped>

span.close {
	background: red;
	color: white;
	cursor:default;

}

.sansSelector {
	margin-right:5px;
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