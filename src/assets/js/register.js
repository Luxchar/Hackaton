async function registerForm() {
  
    const username = document.querySelector(`${"#username"}`).value;
    const password = document.querySelector(`${"#password"}`).value;
    const email = document.querySelector(`${"#email"}`).value;
  
    console.log(username, password, email);
  
    console.log(`${window.CONFIG.API_URL}/client/register`)

    const response = await fetch(`${window.CONFIG.API_URL}/client/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email }),
    });

    console.log(response)

    const user = await response.json();

    console.log(user)
  
    if (user.status === 'error') {
        return console.log('null');
    }

    localStorage.setItem('token', user.token);
    // window.location.href = 'http://localhost:8080/index.html';
}