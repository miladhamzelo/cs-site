import router from './routes.js'


module.exports = {
	
    router,

  //  el : "#test",
  
	data() {
		return {
			loading : true,
			showTimes : [],

			movies : [],
			movie : {},
            
            selectedChairs : [],
            purchasedChairs : [],
            selectedSans : {}
		}
	},
	created() {
		console.log('Admin Stuff');
/*
		this.$http.get('app/components/test.html').then(data=>{
	        var parser = new DOMParser();
	        var $doc = parser.parseFromString(data, "text/html");
	   
	        setTimeout(()=>{
	        	$("document").html($doc)
	        },1000)
	    });
*/

		this.get_show_times()

	},
	methods : {

		get_sold_chairs(uid, callback){
			let params = {uid}

			this.$http.get('api/get_chairs_sold',{params}).then(res => {

				this.purchasedChairs = []
				console.log(res)
				if(res.body.chairs_sold != "" && res.body.chairs_sold != "null" && res.body.chairs_sold != undefined)
					this.purchasedChairs = JSON.parse(res.body.chairs_sold)

				if(callback != undefined)
					callback()
			})
		},

		get_show_times(){

			this.$http.get('api/get_all_showtimes').then(res => {
				
				let data = res.body;
				console.log(res)

				if(data.status == "1"){

					this.showTimes = data.showTimes
		
				}
			})

		},

		logout(){

			this.$cookie.delete("cinema-setareh-admin-id")
			window.location.replace(SERVER["root"]+"login")
		}
	}

	


}