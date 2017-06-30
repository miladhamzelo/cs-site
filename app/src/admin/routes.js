const Container = {
  template: `

    <router-view :key="$route.fullPath"></router-view>
    
  `
}



import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'


import dashboard from './dashboard.vue'
import users from './users.vue'
import sms from './sms.vue'
import slider from './slider.vue'
import payments from './payments.vue'
import setting from './setting.vue'
import promotion from './promotion.vue'
import movieTrailer from './movieTrailer.vue'
import purchases from './purchases.vue'
import checkTicket from './checkTicket.vue'
import buy from './buy.vue'
import nextFilm from './nextFilm.vue'
import news from './news.vue'
import pages from './pages.vue'
import movies from './movies.vue'
import concerts from './concerts.vue'
import archiveMovies from './archiveMovies.vue'
import releaseMovie from './releaseMovie.vue'
import releaseConcert from './releaseConcert.vue'
import releasePage from './releasePage.vue'
import releaseNews from './releaseNews.vue'


Vue.use(Router)

const router = new Router({
  
  mode: 'history',
  base: SERVER['root']+"admin-panel/",
  routes: [

    { path: '/', component: Container,

      children: [

        { path: 'dashboard', component: dashboard },

        { path: 'main', component: Container, children: [

          { path: 'next-movie', component: nextFilm },

          { path: 'promotion', component: promotion },

          { path: 'slider', component: slider },

          { path: 'movie-trailer', component: movieTrailer },

          { path: '', redirect: 'slider' },

        ]},

        { path: 'movies', component: Container, children: [

          { path: 'release-movie', component: releaseMovie },

          { path: 'edit-movie', component: releaseMovie ,meta:{active: "list-movies"}},

          { path: 'list-movies', component: movies },

          { path: 'archive-movies', component: archiveMovies },

          { path: '', redirect: 'list-movies' },

        ]},

        { path: 'concerts', component: Container, children: [

          { path: 'release-concert', component: releaseConcert },

          { path: 'edit-concert', component: releaseConcert ,meta:{active: "list-concerts"}},

          { path: 'list-concerts', component: concerts },

          //{ path: 'archive-movies', component: archiveMovies },

          { path: '', redirect: 'list-concerts' },

        ]},

        { path: 'news', component: Container, children: [

          { path: 'release-news', component: releaseNews },
 
          { path: 'edit-news', component: releaseNews ,meta:{active: "list-news"}},

          { path: 'list-news', component: news },

          { path: '', redirect: 'list-news' },

        ]},

        { path: 'pages', component: Container, children: [

          { path: 'release-page', component: releasePage },
 
          { path: 'edit-page', component: releasePage ,meta:{active: "list-pages"}},

          { path: 'list-pages', component: pages },

          { path: '', redirect: 'list-pages' },

        ]},
 
        { path: 'tickets', component: Container, children: [

          { path: 'sale-tickets', component: purchases },

          { path: 'buy-ticket', component: buy },

          { path: 'payments', component: payments },

          { path: 'check-ticket', component: checkTicket },

          { path: '', redirect: 'sale-tickets' },

        ]},

        { path: 'sms-subcribe', component: sms },

        { path: 'setting', component: setting },

        { path: 'users', component: users },

        { path: '', redirect: 'dashboard' },

        { path: '*', redirect: 'dashboard' },
      ]

    }

   

  ]
})


router.beforeEach(function (to,from,next) {

  router.app.loading = true
  
  setTimeout(()=>{
    router.app.loading = false
    next()

  },300)

  //======================================

})




router.afterEach(function (to,from,next) {

  if(to.meta.active){
    let page = to.meta.active;
    $("#sidebar a[href*='"+page+"']").addClass("my-router-link-active")
    .parent().addClass("my-router-link-active")

  }else{
    $("#sidebar .my-router-link-active").removeClass("my-router-link-active")
  }
 
})




export default router














