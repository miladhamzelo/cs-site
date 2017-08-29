import ticketView2 from '../ticketView2.vue'
import forgetPass from '../forgetPass.vue'

module.exports = {

  components : {
  	ticketView2,
    forgetPass
  },

  data() {
    return {

      onFactors : SERVER["onFactors"],

      route : SERVER["route"] || 0,

      ticketData : {}
    }
  },


  created() {
    console.log("user")
    
    
    
  },

  methods : {

    fill_ticket(t){
      this.ticketData = {
        isConcert : t.is_concert,
        code : t.factor.code,
        date : t.reserve.date,
        time : t.reserve.time,
        movieName : t.movie.title,
        chairs : t.factor.chairs,
        totalPrice : t.factor.total_price
      }
    },

    print_ticket(t){

      this.fill_ticket(t);

      window.print()
    },

    save_ticket(t){

      this.fill_ticket(t);

      this.$nextTick(()=>{
        let pdf = new jsPDF('p','pt','a4')
        var ticket = $('#ticketView2').clone()
        ticket.css({ display : "block", marginTop : 1000 })
        $("body").append(ticket)
        pdf.addHTML(ticket, 0, 5, {}, function() {
           pdf.save('ticket.pdf');
           ticket.remove()
        });
       
      })
    },

  }


}