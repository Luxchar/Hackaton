async function fetchTickets() {
  console.log('fetching');
  const token = localStorage.getItem('token');

  const User = await hackaton.connect(token);
  console.log(User)
  document.querySelector('#username').innerHTML = User.data.username;
  document.querySelector('#mail').innerHTML = User.data.mail;

  if (User.status === 'error') {
    window.location.href = 'http://localhost:8080/auth-login.html';
  }

  ticket = await hackaton.reportGet(token)
  console.log(ticket)

  document.querySelector('#user_count').innerHTML = ticket.data.user_count;
  document.querySelector('#ticket_count').innerHTML = ticket.data.ticket_count;
  document.querySelector("#ticket_today").innerHTML = ticket.data.ticket_count_today;
  document.querySelector("#ticket_month").innerHTML = ticket.data.ticket_count_month;
}

fetchTickets()