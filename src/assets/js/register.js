try {

  var email = "#email"
  var username = "#username"
  var password = "#password"
  var passwordverify = "#passwordverify"
  var button = ".submit-input"

  var emailSelector = document.querySelector(`${email}`) 
  var usernameSelector = document.querySelector(`${username}`)
  var passwordSelector = document.querySelector(`${password}`)
  var passwordverifySelector = document.querySelector(`${passwordverify}`)
  
  var buttonListener = document.querySelector(`${button}`)

  buttonListener.addEventListener('click', async function() {
      try {
          console.log("IN")

          const response = await hackaton.register(usernameSelector.value, emailSelector.value, passwordSelector.value)

          console.log(response)
          if (response.status === 'error') {
            window.location.href = 'http://localhost:8080/auth-login.html';
            console.log("HEREEE")
            document.querySelector('#error-login').innerHTML = response.message 
            return console.log('null');
          } else {
            localStorage.setItem('token', response.data.token);
            setTimeout(() => {
              window.location.href = '/index.html';
          }, 100) 
          }
          
          usernameSelector.value = ""
          passwordSelector.value = ""
      } catch (error) {
          console.error(error)
          document.querySelector('#error-login').innerHTML = error.message
      }
  })
} catch (error) {
  console.error(error)
  console.log("ERROR")
  document.querySelector('#error-login').innerHTML = error.message
}