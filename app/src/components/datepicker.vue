<template>

	<div class="datepickerContainer">

		<button  :id="randName3" class="btn btn-default date-select"><i class="icon-calendar"></i></button>
		<div class="inline">
			<input type="text" :value="date"  class="txtdate" :id="randName">
			<div class="datecontrol">{{date.toFaDigit()}}</div>
			<input type="text" class="box date-info" :id="randName2" readonly>
		</div>
	</div>


</template>

<script>


export default {

	props : ["value"],
	data(){
		return{

			date : "",


			randName : "dp-"+Math.floor((Math.random() * 1000000000) + 1),
			randName2 : "info-"+Math.floor((Math.random() * 100000000) + 1),
			randName3 : "info-"+Math.floor((Math.random() * 100000000) + 1),
			//randName4 : "info-"+Math.floor((Math.random() * 100000000) + 1),
		}
	},
	watch : {

		date(val){
			this.$emit("input",val)
			console.log("date is change")
		},

		value(val){
			this.date = val
		}
	},
	mounted(){

		var el = '#'+this.randName

		var btn = $jQuery1_6("#"+this.randName3)
		var dateInfo = $jQuery1_6("#"+this.randName2)


		if(this.value != undefined)
			this.date = this.value
		
		$(el).innerHeight(btn.innerHeight())

		var Today = new Date(); 
		
		var self = this



		$jQuery1_6("#"+this.randName3).click(()=>{
			$jQuery1_6(el).datepicker("show")
		})




		$jQuery1_6(el).datepicker({
			dateFormat: 'yy/mm/dd',
            altField: '#'+this.randName2,
            altFormat: 'DD، d MM yy',
           // minDate: Today,
            //beforeShowDay: DisableSpecificDates,
			onSelect(date){
				self.date = date
	
				dateInfo.val(dateInfo.val().toFaDigit())
			}
		});

	
		let defaultDate = this.date
		if(defaultDate == ""){
			defaultDate = Today
		}

		//setTimeout(()=>{
		$jQuery1_6(el).datepicker("setDate",defaultDate)
		dateInfo.val(dateInfo.val().toFaDigit())


		if(this.date == ""){
			let td = $jQuery1_6(el).datepicker("getDate")
			let day = td.getDate().toString().length == 1 ? "0"+td.getDate() : td.getDate()
			let month = (td.getMonth()+1).toString().length == 1 ? "0"+(td.getMonth()+1) : td.getMonth()+1

			let TodayString = td.getFullYear()  + "/" + month + "/" + day


			this.date = TodayString
		}

		//},100)
			

		


	}
}

/*
var disableddates = [];
function DisableSpecificDates(date) {
	var string = $jQuery1_6.datepicker.formatDate('yy/mm/dd', date);
	return [disableddates.indexOf(string) == -1];
}
*/


 
String.prototype.toFaDigit = function() {
    return this.replace(/\d+/g, function(digit) {
        var ret = '';
        for (var i = 0, len = digit.length; i < len; i++) {
            ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
        }
 
        return ret;
    });
};


</script>


<style>

.inline{display: inline-block;}

.datepickerContainer{
	position: relative;
}
.txtdate{
	position: absolute;
	right: 0;
	z-index:  1000000;
	opacity: 0;
    width: 0;
}

.datecontrol{	margin: 0 5px;}

.box{
	border: 0;
	background: transparent;
	padding: 0 5px;
}

#ui-datepicker-div{border: 0;
background: white;
color: #262626;
font-family: yekan;
box-shadow:0 0 5px 0px rgba(0, 0, 0, 0.38);}
.ui-datepicker-header{color:white !important;background:#3072ac !important; border:0 !important;}
#ui-datepicker-div .ui-state-default{border: 1px solid RGBA(68, 68, 68, 0);
background: #efefef;
font-weight: normal;
color: #616161;}
#ui-datepicker-div .ui-state-active{border: 1px solid white;background: #3072ac;color: white;}
#ui-datepicker-div .ui-state-highlight{border: 1px solid #d0d0d0!important;background: #d0d0d0!important;color: #616161!important;}
#ui-datepicker-div .ui-state-default:hover{border: 1px solid RGBA(0, 0, 0, 1)}

#ui-datepicker-div .ui-datepicker-next:hover,
#ui-datepicker-div .ui-datepicker-prev:hover{
	
	border: 1px solid white;
	background:transparent
}





.date-info{
	display: inline-block;
	min-width: 150px;
}


.date-select{
	display: inline-block;

	text-align: center;
}

</style>