<template>

<div id="chairs">
	<div class="row" style="direction: ltr">

	<!--	<div class="col-md-2" style="float: right" v-if="$root.concert">
			<div v-for="price in $root.concert.prices_list" style="margin-bottom: 4px;text-align: left">
				<span class="char" > {{price.toFaDigit()}} تومان</span>
			</div>
		</div>
		-->
		<div class="col-md-1" style="float: left">
			<div v-for="char in chars" style="margin-bottom: 4px;text-align: left">
				<span class="char">{{char.toFaDigit()}}</span>
			</div>
		</div>
		<div class="col-md-5" style="float: left;text-align: right;">
			
			<div v-for="(r,n) in leftChairs" style="margin-bottom: 4px">
				<a v-for="i in r"  @click="toggle(0,n,i-1)">
					<span class="chair" :class="updateChairStatus('l-'+n+'-'+(i-1))">{{ (Math.abs(i)).toString().toFaDigit() }}</span>
				</a>
			</div>
		</div>
		<div class="col-md-6" style="text-align: left;float: left">

			<div v-for="(r,n) in rightChairs"  style="margin-bottom: 4px">
				<a v-for="i in r" @click="toggle(1,n,i-1)">
					<span class="chair" :class="updateChairStatus('r-'+n+'-'+(i-1))">{{ (leftChairs[n]+(Math.abs(i))).toString().toFaDigit() }}</span>
				</a>
			</div>
		</div>



	</div>

</div>

</template>

<script>

export default {

	props : ["value"],

	data(){return{

		leftChairs : [7,7,7,7,7,7,7,7,8,7,7,6,6,5,6],
		rightChairs : [8,8,9,9,9,9,9,8,9,8,9,7,6,6,7],
		chars : ["15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"],
		//chars : ["A","B","C","D","E","F","G","H","I","J","K","L","M","S","T"],

		selectedChairs : []

	}},

	watch : {

		selectedChairs(val){
			console.log("selected chais is changed")
			this.$emit("input",val)
		},

		value(val){

			this.selectedChairs = val;
		}
	},
	created(){
		if(this.value != undefined)
			this.selectedChairs = this.value;
	},

	methods : {

		updateChairStatus : function(id){

			let status = ""

			

			this.$root.purchasedChairs.some(function(el,i){

				if(el.id == id){
					

					status = "purchased"
				}

			})

			if(status != "") return status

			this.selectedChairs.some(function(el,i){

				if(el.id == id){
					

					status = "selected"
				}

			})

			return status

		},

		toggle : function(s,r,c){



			let name;
	        let col 
	       
	        if(s == 1){
	          col = Math.abs( c)
	          name = this.chars[r] + '-' + (parseInt(this.leftChairs[r]) + parseInt(col+1))
	        }else{
	          col = Math.abs(c) 
	          name = this.chars[r] + '-' +  (col+1)
	        }

	        let id = (s == 0 ? 'l-' : 'r-')+r+"-"+c
	        let price
	        if(this.$root.movie){
	        	price = this.$root.movie.price
	        }else{
	        	price = parseInt(this.$root.concert.prices_list[r])
	        }


			let obj = new Object({ price, id, name })

			var index = 0 ;

			var found = this.selectedChairs.some(function (el,i) {
				
				index = i
			    return el.id === obj.id;
			});

			var pur = this.$root.purchasedChairs.some(function (el,i) {
				
				
			    return el.id === obj.id;
			});

			

			if(!pur){

				if(!found){

					this.selectedChairs.push(obj)
					
				}else{

					this.selectedChairs.splice(index,1)
					
				}
			}

		}
	}

}


</script>



<style scoped>

.box3{
	padding:5px;
	margin: 10px 0;
	text-align: center;
	font-size: 12px ;
	display: block;

}



#chairs {
		-webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;

  cursor:default;
}


a{
	margin: 2px;
}

.selected,.purchased{
	color: white !important;
}   

.selected{
	background: #4eaed4 !important;
}	

.purchased{
	background: #f56459  !important;
	cursor: not-allowed;
}

.chair{
	background:#a4acb3;
	border:1px solid #bbb;
	border-radius: 7px;
	height: 28px;
    width: 30px;
    
    text-align: center;
    color: white;
	display: inline-block;
	cursor: default;
	font-size: 1.2em;
}

.char{
	color: black;
    display: inline-block;
    height: 28px;
    font-size: 1.5em;
}




</style>