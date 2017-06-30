<template>

<div id="ReserveWindow" class="shadow" v-if="showWindow" @click.self="hideWindow">
	<div class="content">
	
		<div class="col-md-12  info">
            <div class="col-md-4"><strong>آزاد</strong></div>
            <div class="col-md-4"><strong> پرده نمایش</strong></div>
            <div class="col-md-4"><strong>خانواده</strong></div>
        </div>

		<chairs v-model="selectedChairs"></chairs>

		<div class="row" style="padding: 10px;text-align: center;">
		    <!--<span v-for="c in this.$root.selectedChairs" class="lable myblue">{{c.name}}</span>-->
		    <button class="btn btn-success" @click="sendChairs()">تایید صندلی ها</button>
		</div>



	</div>
</div>

</template>

<script>

import chairs from './chairs.vue'

export default {

	props : ["show"],

	data(){
		return{
			selectedChairs : []
		}
	},
	watch : {

		show(val){
			if(val==true)
				this.selectedChairs = this.$root.selectedChairs.freeze();
		}

	},
	methods : {

		hideWindow(){
			this.$root.showChairs = false
		},
		sendChairs(){
			this.$root.selectedChairs = JSON.parse(JSON.stringify(this.selectedChairs));
			this.hideWindow();
		}
	},

	computed : {

		showWindow(){
			return this.$root.showChairs
		}
	},
	components : {
		chairs
	}



}


</script>



<style scoped>

 .info{
    padding: 10px;
        display: inline-block;
    box-shadow: 0 0 5px #e6e6e6;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #a4acb3;
    border-radius: 7px;
    text-align: center;
    color: white;
}
	
#ReserveWindow { 

z-index: 100;

	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	-webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;

  cursor:default;

  overflow: scroll;

}


.content {

	direction: rtl;
	padding:  30px;
	padding-bottom: 10px;
	background: rgb(246, 246, 246);
	min-width:850px;
	min-height: 85%;
	position:absolute;
	top:20px;
	left: 50%;
	margin-left: -425px;
	border-radius: 15px;

}

@media screen and (max-width: 480px) {
  .content{
      margin-left: -560px;

  }
}

.shadow {
	background:rgba(0,0,0,0.5);
}
.box{
	padding:10px;
	width:80%;
	margin:0 auto;
	border: 2px solid #d6d6d6;
    margin-bottom: 20px;
    text-align: center;
}


</style>