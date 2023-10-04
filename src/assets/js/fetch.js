async function fetchTickets() {
    console.log('fetching');
  
    const response = await fetch(`${window.CONFIG.API_URL}/tickets/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    const user = await response.json();
  
    console.log(user);
  
    if (user.status === 'error') {
      window.location.href = 'http://localhost:8080/auth-login.html';
      console.log('null');
    }
  }
  
fetchTickets();  

// let x = "test"

// var mydiv = document.querySelector('.page-heading').innerHTML = x