async function fetchTickets() {
  console.log('fetching');
  const token = localStorage.getItem('token');

  const User = await hackaton.connect(token);
  console.log(User)
  if (User.status === 'error') {
    window.location.href = 'http://localhost:8080/auth-login.html';
  }

  console.log(await hackaton.reportGet(token))

  if (ticket.status === 'error') {
    // window.location.href = 'http://localhost:8080/auth-login.html';
  }
}

fetchTickets()