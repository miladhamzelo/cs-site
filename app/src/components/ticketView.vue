<template>

<div id="ticketView">
 	<ul><li>
		<div class="clearfix"></div>
		<div id="container">
		    <div class="left">
		        <div class="top">
		            <div class="logo"> <img :src="imgPath + 'logo-grey.jpg'"></div>
		            <div class="title">سينما ستاره شهر</div>
		            <div class="clearfix"></div>
		        </div>
		        <div class="medium">
		            <div class="line">
		                <div class="filmname">{{ title_msg }} : {{ value.movieName }}</div>
		                <div class="filmname">شماره بلیط : {{ value.code }}</div>
		                <div class="clearfix"></div>
		            </div>
		            <div class="line">
		                <div class="ekran">{{ datetime_msg }} : <span> {{ value.time }} </span></div>
		                <div class="date">تاریخ : <span> {{ value.date }} </span></div>
	                    <div class="tedad">تعداد : <span> {{ value.chairsCount }} </span></div>
		                <div class="price">قیمت : <span> {{ value.totalPrice }} </span></div>
		                <div class="clearfix"></div>
		            </div>
		            <div class="line">
		                <div class="chair">صندلی : </div>
		                <div class="number">{{ value.chairsAlpha }}</div>
		                <div class="clearfix"></div>
		            </div>
		        </div>
		        <div class="social">
		            <div class="web">www.Sbelit.ir : خرید بلیط</div>
		            <div class="instagram"><img :src="imgPath + 'telegram-grey.png'">/cinemasetareh</div>
		            <div class="telegram"><img :src="imgPath + 'instagram-grey.png'">/cinemasetareh</div>
		            <div class="clearfix"></div>
		        </div>
		    </div>
		    <div class="right">
		        <div class="info"> <img id="barcodeImage">
		            <br>{{ datetime_msg }} : {{ value.time }}
		            <br>تاریخ : {{ value.date }}
		            <br>صندلی ها <br> <small>(ردیف-صندلی)</small>: <br>{{ value.chairsNumber }}
		        </div>
		    </div>
		</div>
	</li></ul>
</div>
</template>


            
            

<script>
	
import JSBarcode from 'jsbarcode'

export default {

	props : ["value"],
	data(){
		return{	
			imgPath : SERVER['base'] + 'view/assets/img/'
		}
	},
	created(){

		
		console.log("ticket View")
	},
	computed : {
		title_msg(){
			return this.value.isConcert ? 'عنوان برنامه' : 'نام فیلم'
		},
		datetime_msg(){
			return this.value.isConcert ? 'اجرا' : 'اکران'
		},
	},
	watch : {

		value : {
			handler(val){
				if(val.code){
					console.log("barcdoe change")
					JSBarcode("#barcodeImage", val.code, {
						displayValue : false,
						height: 360,
  						width: 14
					})
				}
			},
			deep : true
		}
	}
	
}



</script>


<style scoped >

ul{
	margin: 0;
	padding:0;
}

li{
	list-style: none;
	margin: 0;padding: 0;
}

#container {
	display: none;
}

@media print{
    #container {
        display: block;
        position: absolute;
        top: 0;left: 0;
    }
}

.left{
	direction: ltr !important
}



</style>