class Hackaton {
  
    constructor() {
    }
  
    login(username, password) {
      return new Promise((resolve, reject) => {
          fetch(`${window.CONFIG.API_URL}/client/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
        }).then((response) => {
            response.json().then((data) => {
              if (response.status === 200) {
                resolve(data);
              } else {
                reject(data);
              }
            });
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
  
    register(username, email, password) {
      return new Promise((resolve, reject) => {
          fetch(`${window.CONFIG.API_URL}/client/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password
            }),
        }).then((response) => {
            response.json().then((data) => {
              if (response.status === 200) {
                resolve(data);
              } else {
                reject(data);
              }
            });
        })
        .catch((error) => {
          reject(error);
        });
      });
    }

    connect(token) {
      return new Promise((resolve, reject) => {
          fetch(`${window.CONFIG.API_URL}/client/connect`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token
            }),
        }).then((response) => {
            response.json().then((data) => {
              if (response.status === 200) {
                resolve(data);
              } else {
                reject(data);
              }
            });
        })
        .catch((error) => {
          reject(error);
        });
      });
    }

     reportGet(token) {
      return new Promise((resolve, reject) => {
        fetch(`${window.CONFIG.API_URL}/tickets/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token
          }),
      }).then((response) => {
          response.json().then((data) => {
            if (response.status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          });
      })
      .catch((error) => {
        reject(error);
      });
    });
    }

    reportCreate(postal_code, address, city, type, description, token) {
      return new Promise((resolve, reject) => {
        fetch(`${window.CONFIG.API_URL}/tickets/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postal_code,
            address,
            city,
            type,
            description,
            token
          }),
      }).then((response) => {
          response.json().then((data) => {
            if (response.status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          });
      })
      .catch((error) => {
        reject(error);
      });
    });
    }
  }
  
  
  const hackaton = new Hackaton();