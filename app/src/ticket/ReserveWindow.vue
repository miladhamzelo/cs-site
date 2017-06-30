<template>

<div id="ReserveWindow" class="shadow" v-show="showWindow" @click.self="hideWindow">
	<div class="content">
		<steps :step="step"></steps>
		<div class="stepView w3-padding-16 w3-container w3-right-align ">

			<div class="step step-0"  v-show="step==0">
				<p class="w3-text-grey">روز و سانس مورد نظر خود را انتخاب کنید :</p>

				<div class="w3-row dates w3-center">

					
					<div class="w3-row w3-padding-32" >
						<span v-for="(d,i) in sansInfo" >
							<input :id="'rd'+i" type="radio" v-model="day" :value="i">
							<label :for="'rd'+i">
								{{d.date}}
							</label>
						</span>
					</div>


					<div class="w3-row w3-padding-32" >
						<span v-for="(s,i) in sans" >
							<input :id="'rt'+i" type="radio" v-model="time" :value="i">
							<label :for="'rt'+i">
								{{s}}
							</label>
						</span>
					</div>

					
				</div>
			</div>

			<div class="step step-1" v-show="step==1">
				<p class="w3-text-grey">روز و سانس مورد نظر خود را انتخاب کنید :</p>

				
			</div>

		</div>
		<div class="buttons w3-padding w3-topbar ">
			<button @click="step--" v-show="step>0" class="btn w3-btn w3-orange w3-padding">قبلی</button>
			<button @click="step++" v-show="step!=2" class="btn w3-btn w3-blue w3-padding">بعدی</button>
			<button @click="step++" v-show="step==2" class="btn w3-btn w3-pink w3-padding"><b>پرداخت از کارت عضو شتاب</b></button>
		</div>
	</div> 
</div>

</template>

<script>

import steps from "./com/steps.vue"

export default {
	//props : ["show"],

	components : {
		steps
	},

	data(){
		return{
			step : 0,
			sansInfo : [],
			day : 0,
			time : 0,
			sans : []
		}
	},
	methods : {
		hideWindow : function(){
			this.$root.showReserveWindow = false
		}
	},

	computed : {

		showWindow : function(){
			return this.$root.showReserveWindow
		}
		
	},
	watch : {
		day : function(val){
			this.sans = this.sansInfo[val].sans_times.split(" ");
			this.time = 0;
		}
	},
	created(){


		this.$http.get('/sinama/api/get_ekran/'+pageParam[0]).then(response => {

			let data = response.body;

			if(data.status == "1"){
				console.log(data)
				this.sansInfo = data.sansInfo
				this.sans = this.sansInfo[this.day].sans_times.split(" ");
				console.log("FILM LOADING OK")
			}

		}, response => {
			console.log("ERROR WHEN GET FILM")
		});
	}
}

</script>

<style scoped>
	
#ReserveWindow { 

	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

}


.buttons {
	position: absolute;
	bottom:20px; left: 20px; right: 20px;

	border-color: #e8e8e8 !important;
	border-width: 3px !important
}

.btn{

	padding-left: 30px !important;
	padding-right: 30px !important;
	border-radius: 5px
}

.content {

	direction: rtl;
	padding: 10px 20px 30px;
	background: rgb(246, 246, 246);
	min-width:900px;
	min-height: 85%;
	position:absolute;
	top:40px;
	left: 50%;
	margin-left: -470px;
	border-radius: 15px;

}

.shadow {
	background:rgba(0,0,0,0.5);
}


input[type=radio] {
		display:none;
	}

	input[type=radio] + label {
		display:inline-block;
		margin:-2px;
		padding: 4px 12px;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 20px;
		color: #333;
		text-align: center;
		text-shadow: 0 1px 1px rgba(255,255,255,0.75);
		vertical-align: middle;
		cursor: pointer;
		background-color: #f5f5f5;
		background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
		background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
		background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
		background-image: -o-linear-gradient(top,#fff,#e6e6e6);
		background-image: linear-gradient(to bottom,#fff,#e6e6e6);
		background-repeat: repeat-x;
		border: 1px solid #ccc;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
		border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
		border-bottom-color: #b3b3b3;
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#ffe6e6e6',GradientType=0);
		filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
		-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
		-moz-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
	}

	input[type=radio]:checked + label {
		   background-image: none;
		outline: 0;
		-webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
		-moz-box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
		box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
			background-color:#e0e0e0;
	}

</style>