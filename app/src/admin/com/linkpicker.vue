<template>

<div id="mylinkpicker" class="input-group">

    <span id="showLinkpickerDialog" @click="bind_linkpicker" class="input-group-addon btn btn-default">لینک ها</span>
    <input @click="unbind_linkpicker" type="text" class="form-control text-left" v-model="link"> 
    <span @click="unbind_linkpicker" class="input-group-addon ltr">http://</span>
    
	                                    
	<div id="linksDialog" v-if="showLinksDialog">
		
		<div class="links">

			<div class="col-lg-12">

	            <table class="table table-striped table-advance table-hover">
	                <thead>
	                    <tr>
	                        <th><i class="icon-bullhorn"></i>تیتر</th>
	                        <th class="hidden-phone"><i class="icon-question-sign"></i>تاریخ</th>
	                        <th></th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="(l,i) in links" @click="linkSelect(l)">
	                        <td>{{l.title}}</td>
	                        <td>{{l.date}}</td>
	                    </tr>
	                </tbody>
	            </table>
		</div>
	
	</div>
        
</div>

</template>

<script>
	

export default {

	props : ["value"],
	data(){
		return{
			showLinksDialog : false,
			links : [],
			link : ''
		}
	},
	watch : {

		link(val){
			this.$emit("input", val)
		},

		value(val){
			this.link = val
		}
	},
	created() {


		if(this.value != undefined)
			this.link = this.value

		this.load_pages_and_news();

		var self = this

		this.$nextTick(()=>{

			$(document).click(function(event) { 
			    if(!$(event.target).closest('#mylinkpicker').length) {
			        self.unbind_linkpicker()
			    
			    }        
			})

		})


	},
	methods : {

		load_pages_and_news(){

			this.$http.get("api/get_pages").then(res=>{
				this.links = res.body
				console.log("load Links :")
				console.log(res)
			})
		},

		check(link){
			return this.links.indexOf(link) == -1 ? 0 : 1
		},

		linkSelect(link){
			this.link = 'cinemasetareh.ir/page?id=' + link.id
			this.unbind_linkpicker();
		},
		
		bind_linkpicker(el){
		
			this.showLinksDialog =! this.showLinksDialog
			$("#linksDialog").css({display : "none"})

			let elem = $(el.target)

			
			this.$nextTick(()=>{

				let elH = elem.innerHeight()
				let elT = elem.position().top

				let top = elT + elH+10
				let left = (elem.position().left + (elem.innerWidth()/2)) 

				let offsetTop = elem.offset().top+elem.innerHeight()+$("#linksDialog").innerHeight()+10
				let winHeight = $(window).height() + $(window).scrollTop()

				let shadow = "shadow-down"
				if(offsetTop > winHeight){

					shadow = "shadow-up"
					top = elT - $("#linksDialog").innerHeight() -10
				}

				$("#linksDialog")
				.removeClass("shadow-up shadow-down")
				.addClass(shadow)

				$("#linksDialog").offset({
					
					top ,
					//left : left - $("#linksDialog").innerWidth()/2,
				})
				$("#linksDialog").css({
					
					display : "inline-block"
				})

			})
	
		},

		unbind_linkpicker(){

			this.showLinksDialog = false

		}
		
	},

}



</script>


<style scoped>


#mylinkpicker{

	z-index: 1

}


.box{
	padding: 0 5px;
}
.ltr{direction: ltr}

#linksDialog {
	position: absolute;
	display: none;

	width:450px;
	min-height: 100px;
	padding: 10px;
	background: white;
	

	left: 0;
	width: 100%;
}


.shadow-down{
	box-shadow: 0 20px 30px rgba(0, 0, 0, 0.36);
}

.shadow-up{
	box-shadow: 0 -20px 30px rgba(0, 0, 0, 0.36);
}

td{
	cursor: default;
}


</style>