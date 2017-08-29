<template>

	<img ref="el" :class="{noEffect}" :src="assets +'ajax-loader.gif'" >

</template>

<script>
	

export default {

	props : ["src"],
	data(){
		return{	
			assets : SERVER["assets"] ,

			noEffect : true
		}
	},
	mounted(){
		

		var el = this.$refs.el
		var self = this
		

		if(this.src != undefined){

			var img = new Image();
			img.src = this.src;

			img.onload = function() {
				el.src = self.src;
				$(el)
				  .css('opacity', 0)
				  .animate({ opacity: 1 }, 1000)

				self.noEffect = false

			}.bind(el);

			img.onerror = function (e) { 

				el.src = self.assets+"default-placeholder.png";
			}
		}


	}
	
}



</script>


<style scoped>

.box{
	width:150px;
}

.noEffect{
	border: 0 !important;
	box-shadow: none !important;
}


.fileInput{
	display: none;
}

</style>