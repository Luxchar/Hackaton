try {

    var postal_code = "#postal_code"
    var address = "#address"
    var city = "#city"
    var type = "#type"
    var description = "#description"

    var button = ".submit-input"
  
    var postal_codeSelector = document.querySelector(postal_code)
    var addressSelector = document.querySelector(address)
    var citySelector = document.querySelector(city)
    var typeSelector = document.querySelector(type)
    var descriptionSelector = document.querySelector(description)
    var buttonListener = document.querySelector(`${button}`)

    var token = localStorage.getItem('token')
  
    buttonListener.addEventListener('click', async function() {
        try {
            console.log('fetching');
            const token = localStorage.getItem('token');
          
            try {
              const User = await hackaton.connect(token);
              if (User.status === 'error') {
                console.log('error');
                window.location.href = 'http://localhost:8080/auth-login.html';
              } 
            } catch (error) {
                console.error(error);
                window.location.href = 'http://localhost:8080/auth-login.html';
            }

            console.log("IN")
  
            const response = await hackaton.reportCreate(postal_codeSelector.value, addressSelector.value, citySelector.value, typeSelector.value, descriptionSelector.value, token)
            
            console.log(response)
            
            postal_codeSelector.value = ""
            addressSelector.value = ""
            citySelector.value = ""
            typeSelector.value = ""
            descriptionSelector.value = ""
        } catch (error) {
            console.error(error)
        }
    })
  } catch (error) {
    console.error(error)
  }