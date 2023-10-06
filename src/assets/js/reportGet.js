async function fetchTickets() {
  console.log('fetching');
  const token = localStorage.getItem('token');

  try {
    const User = await hackaton.connect(token);
    if (User.status === 'error') {
      console.log('error');
      window.location.href = 'http://localhost:8080/auth-login.html';
    }  
    document.querySelector('#username').innerHTML = User.data.username;
    document.querySelector('#mail').innerHTML = User.data.mail;

    ticket = await hackaton.reportGet(token)
    console.log(ticket)

    document.querySelector('#user_count').innerHTML = ticket.data.user_count
    document.querySelector('#ticket_total').innerHTML = ticket.data.ticket_total;
    document.querySelector("#ticket_today").innerHTML = ticket.data.tickets_count_today.length;
    document.querySelector("#ticket_month").innerHTML = ticket.data.tickets_count_month.length;

    for (i = 0; i < 4; i++) {
      document.querySelector('#' + 'city_' + i).innerHTML = ticket.data.last_four_tickets[i].ville;
      document.querySelector('#' + 'description_' + i).innerHTML = ticket.data.last_four_tickets[i].soustype;
    }
  }
  catch (error) {
    console.error(error);
    window.location.href = 'http://localhost:8080/auth-login.html';
  }

}

fetchTickets()