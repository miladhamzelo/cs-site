<template>

<div>
	<textarea :id="randName"></textarea>
	<input name="image" type="file" id="upload" class="hidden"  onchange="">
</div>


</template>

<script>
	

export default {

	props : ["value"],
	data(){
		return{
			
			randName : "tinymce-"+Math.floor((Math.random() * 1000000000) + 1),
			text : ''
		}
	},
	watch : {

		value(val){
			this.text = val


		},

		text(val){
		
			this.$emit("input",val)
		}
	},
	created() {

		if(this.value != undefined)
			this.text = this.value


	},
	mounted(){

		var self = this
		var el = this.randName



		setTimeout(()=>{


		tinymce.init({
		    selector: "#"+el,
		    directionality : 'rtl',
		    height: 500,
		    paste_data_images: true,
		    plugins: [
		      "advlist autolink lists link image charmap print preview hr anchor pagebreak",
		      "searchreplace wordcount visualblocks visualchars code fullscreen",
		      "insertdatetime media nonbreaking save table contextmenu directionality",
		      "emoticons template paste textcolor colorpicker textpattern"
		    ],
		   	toolbar : "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
		   	images_upload_url: self.$root.rootUrl+'api/upload_image',
  			automatic_uploads: true,
			relative_urls: false,
			valid_elements: '*[*]',
			remove_script_host: false,
		   	file_picker_callback: function(callback, value, meta) {
		      if (meta.filetype == 'image') {
		        $('#upload').trigger('click');
		        $('#upload').on('change', function() {
		          var file = this.files[0];
		          var reader = new FileReader();
		          reader.onload = function(e) {
		            callback(e.target.result, {
		              alt: ''
		            });
		          };
		          reader.readAsDataURL(file);
		        });
		      }
		    },
		    setup: function(editor) {

		        editor.on('init', function() {
		      		setTimeout(()=>{

		            	tinymce.get(el).setContent(self.text);
		      		},100)

		        });


		        editor.addButton('upImage', {
			      text: 'image',
			      icon: false,
			      onclick: function () {
			        editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
			      }
			    });

		        editor.on('change', function() {

		            var new_value = tinymce.get(el).getContent();

		            self.text = new_value

		        });
		    }
		});


		},100)


	}




}



</script>


<style scoped>

#tinymce-editor{

}


.hidden{display:none;}

</style>