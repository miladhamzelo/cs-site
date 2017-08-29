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
            date : this.ticket.date,
            time : this.ticket.time,
            movieName : this.ticket.movie_name,
            chairs : this.ticket.chairs,
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



    status_msg(){
      return 'پرداخت انجام '+(this.status ? 'شد' : 'نشد')
    },

    

  }


}