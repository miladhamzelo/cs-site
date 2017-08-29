<template>

<div id="myTimepicker">


	<button @click="bind_timepicker" class="btn btn-default">سانس ها</button>
	<span class="box">
		<span class="number">{{times.length.toFaDigit()}}</span>
		  سانس انتخاب شده
	</span>
	                                    
	<div id="timesDialog" class="" v-if="showTimesDialog">
		
		<div class="sans">
				<div class="col-md-6 showtime" v-for="s in $root.showTimes">
					<label>
						<input type="checkbox" :checked="check(s.time)" @change="timeSelect(s.time)">
						{{s.time.toFaDigit()}}
					</label>
				</div>	
		</div>
	
	</div>
        
</div>

</template>

<script>
	

export default {

	props : ["value"],
	data(){
		return{
			showTimesDialog : false,
			times : []
		}
	},
	watch : {

		value(val){
			this.times = val
		}
	},
	created() {

		if(this.value != undefined)
			this.times = this.value



		var self = this

		this.$nextTick(()=>{

			$(document).click(function(event) { 
			    if(!$(event.target).closest('#myTimepicker').length) {
			        self.unbind_timepicker()
			    
			    }        
			})

		})


	},
	methods : {

		check(time){
			return this.times.indexOf(time) == -1 ? 0 : 1
		},

		timeSelect(time){

			let index = this.times.indexOf(time);

			if(index == -1)

				this.times.push(time)
			else
				
				this.times.splice(index, 1)
			

		},
		
		bind_timepicker(el){
			console.log(el)
			
			this.showTimesDialog =! this.showTimesDialog
			$("#timesDialog").css({display : "none"})

			let elem = $(el.target)

			
			this.$nextTick(()=>{

				let elH = elem.innerHeight()
				let elT = elem.position().top

				let top = elT + elH+10
				let left = (elem.position().left + (elem.innerWidth()/2)) 

				let offsetTop = elem.offset().top+elem.innerHeight()+$("#timesDialog").innerHeight()+10
				let winHeight = $(window).height() + $(window).scrollTop()


				if(offsetTop > winHeight){
				
					top = elT - $("#timesDialog").innerHeight() -10
				}


				$("#timesDialog").offset({
					
					top ,
					left : left - $("#timesDialog").innerWidth()/2,
				})
				$("#timesDialog").css({
					
					display : "inline-block"
				})

			})
	
		},

		unbind_timepicker(){

			this.showTimesDialog = false

		}
		
	},

}



</script>


<style scoped>


#myTimepicker{

	display: inline-block;

}


.box{
	padding: 0 5px;
}

.number{
	display: inline-block;
	width: 20px;
	text-align: center;
}

.showtime{
	text-align: center;
	padding:2px;
}
.showtime:hover{
	background:rgba(158, 158, 158, 0.12);
}


.close{
	background: red
}

#timesDialog {
	position: absolute;
	display: none;

	width:160px;
	min-height: 100px;
	padding: 10px;
	background: white;
	border: 1px solid grey;
	border-radius: 5px
}



</style>