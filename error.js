const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const api = 'https://reqres.in'

//* request template function
const reqFunc = (method, url, data) => {
  return fetch(api + url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? {
      'Content-Type': 'application/json'
    } : {}
  }).then(response => {
   //% or you can check if response.ok is true or for successful responses which are 200 ish codes
    if (response.status >= 400) { 
      return response.json().then(errorData => {
        const err = new Error ('Theres a problem');
        err.data = errorData; //! here we are assigning the error information from the resolved promise to the error object.
        throw err //! the throw operator gives a reject output. This combined with the return operator causes reqfunc to return an error triggering the .catch method
      })
    }
    return response.json();
  })
};
//% err.data is not directly available because it has not been loaded yet see fetch.js line 15. wait for the promise that has been output by the fetch api to resolve through the 1st then and you can work with the data AFTER the 1st then 

//* fetch request with catch error handling
const sendData = () => {
  reqFunc('POST', '/api/register', {
    "email": "eve.holt@reqres.in",
    //! "password": "pistol"
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err, err.data) //% by adding the 2nd argument, you can log out the extra information inside the error object
  })
};
//! try to omit the password and see if catch catches the error. as with the xhr request, the catch does not get the error because the request was made successfully(there is no network problem that caused the request not to go thru). only the status was unsuccessful.

//* get request using the template function
const getData = () => {
  reqFunc('GET', '/api/users').then(data => {
    console.log(data);
  })
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);