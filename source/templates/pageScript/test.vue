<template>

<h1>Test


<p>Hello {{name}}</p>age : {{age}}<p @click="hello()">{{this.$root.message}}</p></h1>

	

</template>

<script>
	


export default {
	data(){
		return{
			age : 30,
			name : this.$root.name
			
		}
	},
	methods : {
		hello : ()=>{
			alert("dfsdfsdfsdf")
		}
	}
}

</script>