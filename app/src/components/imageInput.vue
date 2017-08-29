<template>

	<div class="w3-row w3-padding">
		<div class="col-md-6">
	        <div class="form-group">
	            <label :for="name" class="btn btn-primary">{{ get_input_title }}</label>
	            <input type="file" class="fileInput" :id="name" @change="FileChange" :multiple="multiple" :name="name"> 
	            <p class="help-block">
	            	<slot></slot>
	            </p>
	        </div>
	    </div>
	    <div class="col-md-6" v-if="uploadedImages.length==0">
	        <img v-for="img in get_images" :src="assets +'ajax-loader.gif'" v-img="upload + img" class="box">
	    </div>
	    <div class="col-md-6" v-else>
	        <img v-for="img in uploadedImages" :src="img" class="box">
	    </div>
	</div>

</template>

<script>
	

export default {

	props : ["value","name","multiple","prefix"],
	data(){
		return{

			images : "",
			upload : SERVER['upload'] ,
			assets : SERVER['assets'] ,

			pre : '',

			uploadedImages : [],

		}
	},
	watch : {

		value(val){
			this.images = val
			console.log(val)
		},

		images(val){
			this.$emit("input", val)
		}
	},
	created() {

		if(this.prefix != undefined)
			this.pre = this.prefix

		if(this.value != undefined)
			this.images = this.value

	},
	methods : {

		FileChange(e){
			//console.log(e)

			let files = e.target.files
			var self = this

			if (files && files[0]) {

		        self.uploadedImages = []

		        var anyWindow = window.URL || window.webkitURL;

		        this.clear_images();

	            for(var i = 0; i < files.length; i++){

	            	this.set_image(files[i].name);

					//get a blob to play with
					var objectUrl = anyWindow.createObjectURL(files[i]);
					// for the next line to work, you need something class="preview-area" in your html
					self.uploadedImages.push(objectUrl)

					// get rid of the blob
					window.URL.revokeObjectURL(files[i]);
	            }
		    }


			this.$emit("change",e)
		},

		clear_images(){
			if(Array.isArray(this.images))
				this.images = []
			else
				this.images = ""
		
		},

		set_image(img){
			if(Array.isArray(this.images)){
				this.images.push(img)
			}
			else{
				if(this.images == "")
					this.images =  this.pre + img
				else
					this.images += ", " + this.pre + img
			}
		
		}
	},
	computed : {

		get_images(){
			return this.images != "" ? this.images.split(",") : []
		},


		get_input_title(){
		
			return this.multiple != undefined ? 'انتخاب تصاویر' : 'انتخاب تصویر'
		}
	},

	directives : {

		img : {
			bind(el,b,v){
				

				var img = new Image();
				img.src = b.value;

				img.onload = function() {
					el.src = b.value;
					$(el)
					  .css('opacity', 0)
					  .animate({ opacity: 1 }, 1000)
				}.bind(el);

				img.onerror = function (e) { 
				
					el.src = v.context.assets+"default-placeholder.png";
				}


			},
			update(el,b,v){

				el.src = b.value;
				el.onerror = function (e) { 
				
					el.src = v.context.assets+"default-placeholder.png";
				}
			
			}
		}
	}
	
}



</script>


<style scoped>

.box{
	width:150px;
}


.fileInput{
	display: none;
}

</style>