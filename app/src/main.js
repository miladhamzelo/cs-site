import Vue from 'vue/dist/vue.js'
import vueResource from 'vue-resource'
import vueCookie from 'vue-cookie'
import JDate from 'jalali-date'

require("./functions.js")

Vue.use(vueCookie)
Vue.use(vueResource)
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

if(SERVER['root'] != '/')
  Vue.http.options.root = SERVER['root']
else
   Vue.http.options.root = ""

var page;

try{


  page = require('./'+ SERVER["ctrl"].replaceAll("-","_") +'/index.js')

}catch(err) {

  page = {}
}




new Vue({


  el: '#app',

  mixins : [ page ],

  data() { 
    return {
      rootUrl : SERVER['root']
    }
  },
  created(){

    console.log("Main Hook")
    
  },
  mounted(){

    document.getElementsByTagName("body")[0].style.visibility = "visible"

  },
  methods: {

    getDay(date){
        let days = ["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنج شنبه","جمعه"]
        let jdate = new JDate(date.split("/"));
        let j = jdate.getDay()+1 > 6 ? 0 : jdate.getDay()+1
        return  days[j]
    },
    getFullDay(date){
        let jdate = new JDate(date.split("/"));
        return  jdate.format('dddd DD MMMM YYYY')
    }

  }


})

