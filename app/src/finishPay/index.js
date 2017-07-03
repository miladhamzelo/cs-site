import ticketView2 from '../ticketView2.vue'

module.exports = {


  components : {ticketView2},

  data() {
    return {

      ticketData : {},
      ticket : {},

    }
  },
  created() {
 
    this.load_ticket_data()
  },

  methods : {

    load_ticket_data(){
      let fid = SERVER['fid'];
      let params = { fid }
      this.$http.get('api/get_ticket',{params}).then(res=>{
        console.log(res.body)
        this.ticket = res.body
        if(this.ticket.code)
          this.ticketData = {
            isConcert : this.ticket.is_concert,
            code : this.ticket.code,
            spacedCode : this.spacedCode,
            date : this.ticket.date,
            time : this.ticket.time,
            movieName : this.ticket.movie_name,
            chairsAlpha : this.get_chairs_alpha,
            chairsCount : this.ticket.chairs.split(' ').length,
            chairsNumber : this.ticket.chairs,
            totalPrice : this.ticket.total_price
          }

      })
    },


    printTicket(){

      window.print();
    },


    saveTicket(){

      let pdf = new jsPDF('p','pt','a4')
      pdf.addHTML($('#ticketView2'), 0, 5, {}, function() {
         pdf.save('ticket.pdf');
      });
    },



  },

  computed : {


    sort_chairs(){
      
      let chairs = this.ticket.chairs.split(' ')
      let a = chairs.sort((a,b)=>{
        a = parseInt(a.split('-').join(''))
        b = parseInt(b.split('-').join(''))
       return a>b
      })


      return a
    },


    spacedCode(){

      return this.ticket.code.split('').join(' ');
    },

    status_msg(){
      return 'پرداخت انجام '+(this.status ? 'شد' : 'نشد')
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

  }


}