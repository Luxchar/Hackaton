async function loginForm() {
    console.log('login');
  
    const username = document.querySelector(`${"#username"}`).value;
    const password = document.querySelector(`${"#password"}`).value;
  
    console.log(username, password);
  
    const response = await fetch(`${window.CONFIG.API_URL}/client/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log(response)

    const user = await response.json();

    console.log(user)
  
    if (user.status === 'error') {
      window.location.href = 'http://localhost:8080/auth-login.html';
      return console.log('null');
    } else {
      localStorage.setItem('token', user.token);
      // window.location.href = 'http://localhost:8080/index.html';
    }
}