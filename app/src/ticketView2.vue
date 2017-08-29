<template>

<div id="ticketView2" v-if="render" v-show="showTicket">
 	<ul><li>
		<div class="clearfix"></div>
		<div id="container">
			<div class="row">
				<div class="col-xs-8">
					<h1 class="title">سینما ستاره</h1>
				</div>        
	            <div class="col-xs-4 text-left">
	            	<img id="barcodeImage">
	            	<div class="code"><strong>{{ spacedCode }}</strong></div>
	            </div>   
			</div>
		   	<div class="row ">
	            <div class="col-xs-5 "><span class="box"> {{ title_msg }} : <strong>{{ value.movieName }}</strong></span></div>        
	            <div class="col-xs-4 "><span class="box">زمان {{ datetime_msg }} : <strong>{{ value.date }} -  {{ value.time }}</strong></span> </div>               
	            <div class="col-xs-3 "><span class="box">تعداد صندلی ها : <strong>{{ get_chairs_count }}</strong></span></div>        
	        </div>
		   	<div class="row ">
	           	<div class="col-xs-12 "><span class="box">مکان صندلی ها : <strong>{{ get_chairs_alpha }}</strong></span> </div>    
	        </div>
		   	<div class="row">
	            <div class="col-xs-3 "><span class="box">تخفیف : <strong>0</strong></span></div>        
	            <div class="col-xs-9 "><span class="box">هزینه پرداخت شده  : <strong>{{ value.totalPrice }} تومان</strong></span></div>   
	        </div>
	        <div class="row red">
	        	با در دست داشتن شماره بليط  {{ value.code }}  مي توانيد با مراجعه با باجه فروش بليط ، بليط خود را چاپ نماييد.

	        </div>
		</div>
	</li></ul>
</div>
</template>


            
            

<script>
	
import JSBarcode from 'jsbarcode'

export default {

	props : ["value","show"],
	data(){
		return{	
			imgPath : SERVER['base'] + '/assets/img/',

			showTicket : false,

			render : false
		}
	},
	created(){

		//console.lo
		
	

		if(this.show == "true")
			this.showTicket = true
		else
			this.showTicket = false

		console.log(this.value)
		console.log("ticket View")
	},
	computed : {
		title_msg(){
			return this.value.isConcert ? 'عنوان برنامه' : 'عوان فیلم'
		},
		datetime_msg(){
			return this.value.isConcert ? 'اجرا' : 'اکران'
		},
		spacedCode(){
	
      		return this.value.code.split('').join(' ');
    	},
    	get_chairs_count(){
    
	        return this.value.chairs.split(' ').length

	    },
    	sort_chairs(){
      
	      let chairs = this.value.chairs.split(' ')
	      let a = chairs.sort((a,b)=>{
	        a = parseInt(a.split('-').join(''))
	        b = parseInt(b.split('-').join(''))
	       return a>b
	      })


	      return a
	    },
    	get_chairs_alpha(){
	      let rows = []
	      let text = []
	      let chairs = this.sort_chairs
	      chairs.some((el)=>{
	        
	          let x = el.split('-');
	          let r = x[0];
	          let c = x[1];
	          let i = rows.indexOf(parseInt(r))


	          if( i == -1){

	            rows.push(parseInt(r));
	            text.push(`ردیف ${r} صندلی ${c} `)

	          }else{

	            text[i] += ` , ${c} `

	          }
	      })

	      return text.join(" ") 
	    }


	},
	watch : {

		value : {
			handler(val){
				console.log(val)
				if(val.code){

					this.render = true

					this.$nextTick(()=>{
						JSBarcode("#barcodeImage", val.code, {
							displayValue : false,
							height: 360,
	  						width: 14
						})
					})
					console.log("barcdoe change")
				}
			},
			deep : true
		}
	}
	
}



</script>



<style>
.red{
	color:red !important;
}

@media print {
	@page {
		margin: 20px;
		padding: 0;
	}       
	#ticketView2 {
		display: block !important;
	}
	body * {
		visibility: hidden;
	}
	#ticketView2, #ticketView2 * {
		visibility: visible;
	}
	#ticketView2 {
		position: absolute;
		left: 0;
		top: 0;
	}
	.title{
		visibility: visible;
	}
	.box{
     	font-size: 20px
	}
}

</style>

<style scoped >


div.code {
  text-align: justify;
      direction: ltr;
}

div.code:after {
  content: "";
  display: inline-block;
  width: 100%;
}

#barcodeImage{
	height: 60px;
	width: 100%;
}

.box{
	padding: 10px;
	background: #fbfbfb;
	width: 100%;
	display: inline-block;
	border: 1px solid #efefef;
	font-family: 'yekan normal';
	font-size: 16px;
}

strong{
	font-weight: bold;
}

h1{
	font-size: 34px;
	font-weight: bold;
}

.row{
	padding:10px;
}

ul{
	margin: 0;
	padding:0;
}

li{
	list-style: none;
	margin: 0;padding: 0;
}

#ticketView2 {
	width: 100%;
	    background: #fbfbfb;
    
    box-shadow: 0 0 5px #d0d0d0;
    margin: 10px 0;
    padding: 20px;
}

.title{
	visibility: hidden;
}

.left{
	direction: ltr !important
}



</style>