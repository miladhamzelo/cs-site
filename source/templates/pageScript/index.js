import test from './test.vue'


module.exports = {


  data() {
  	return {
  		name : "mory",
  		age : 21
  	}
  },
  created() {
    console.log('Home is Hook 123')
  },
  computed : {
    f2 : function(){ return this.$root.f + " MORTEZA" },
    
  },
  components : {
  	test
  }


}