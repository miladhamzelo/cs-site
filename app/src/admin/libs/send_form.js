
module.exports = {

	data() {
		return {

			uploadRes : "",
			formData : new FormData()
		}
	},

	methods : {

		onFileChange (ele) {
		    this.errors = {};
		    
		    let files = ele.target.files || ele.dataTransfer.files ;

		  


		    //let prop = this.makeTempPropName(ele.target.name);

		    if (!files.length) {
		        return;
		    }

		    let name
		    //let formData = new FormData();


		    if(ele.target.name)
		    	name = ele.target.name
		    else if(ele.target.id)
		    	name = ele.target.id
		    else
		    	console.log("FILE INPUT NAME IS NOT SET!");
	  
		    if(files.length > 1)
		    	name += '[]'
		    
		    let filesArray = []
		    for(let i=0;i<files.length;i++){
		    	filesArray.push(files[i])
		    	this.formData.append(name, files[i]);
		    }


		},
		
		sendForm (data,url,callback){

			this.formData.append("encrypted",true);

			if(!callback){
				if(typeof url == 'function'){
					callback = url
					url = data
				}else{
					this.formData.append("data",JSON.stringify(data));
				}
			}else{
				this.formData.append("data",JSON.stringify(data));
			}
			if(!url)
				url = data


			this.$http.post(url, this.formData,{

				progress(e) {
					if(callback)
		        		callback(e);
				    if (e.lengthComputable) {
				        console.log(e.loaded / e.total * 100);
				    }
				}
			}).then((res)=>{

				console.log("send_form :")
				console.log(res)
				if(callback)
		        	callback({finish:true});
			})


		}
	}
	

}


function myRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
