<template>


	<div class="path w3-row w3-hide-medium w3-hide-small">
		<div class="w3-col margin-center w3-navbar">
			<ul class="w3-ul w3-center" >
				
				<li>
					<span :class="step == 0 ? 'blue' : 'green'">انتخاب سانس</span>
				</li>
				<li>
					<span :class="step == 1 ? 'blue' : step < 1 ? 'grey' : 'green'">مشخصات خریدار</span>
				</li>
				<li>
					<span :class="step == 2 ? 'blue' : step < 2 ? 'grey' : 'green'">پرداخت</span>
				</li>
				<li>
					<span :class="step == 3 ? 'blue' : step < 3 ? 'grey' : 'green'">انتخاب صندلی</span>
				</li>
				<li>
					<span :class="step == 4 ? 'blue' : step < 4 ? 'grey' : 'green'">صدور بلیط</span>
				</li>
				
			</ul>
		</div>
	</div>	


</template>

<script>



export default {
	props : ["step"]
}

</script>

<style scoped>
	


</style>