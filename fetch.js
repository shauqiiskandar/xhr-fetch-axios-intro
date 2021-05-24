const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const api = 'https://reqres.in'

//* fetch get with promise syntax
// const getData = () => {
//   fetch(api + '/api/users').then(response => {
//     // console.log(response.json())
//     return response.json();
//   }).then(data => {
//     console.log(data);
//   })
// };
//! fetch returns a promise which is still pending. then outputs a completed promise that has data handled by the 2nd promise. if we immediately log response.json in the first then block, the promise is still pending. the first then block in the correct case, would return the promise that has been resolved and the json data parsed.

//* fetch that gets the *response*
// const getData = () => {
//   fetch(api + '/api/users?page=2').then((resp) => {
//     console.log(resp);
//   })
// };

//* fetch that gets the *pending promise*
// const getData = () => {
//   fetch(api + '/api/users?page=2').then((resp) => {
//     console.log(resp.json());
//   })
// };


//* fetch post with promise syntax
// const sendData = () => {
//   fetch(api + '/api/users').then(response => {
//     // console.log(response.json())
//     return response.json();
//   }).then(data => {
//     console.log(data);
//   })
// };

//* request template function
const reqFunc = (method, url, data) => {
  return fetch(api + url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? {
      'Content-Type': 'application/json'
    } : {}
  }).then(response => {
    return response.json();
  })
};
//! the header takes a ternary(conditional) function where it checks if data exists. if it does, there will be a header attached. If it doesn't, it will be empty
//! the header can take in as many key:value header pairs as required

//* get request using the template function
const getData = () => {
  reqFunc('GET', '/api/users').then(data => {
    console.log(data);
  })
};

//* fetch request using the template function
// const sendData = () => {
//   reqFunc('POST', '/api/register', {
//     "email": "eve.holt@reqres.in",
//     "password": "pistol"
//   }).then(data => {
//     console.log(data);
//   })
// };
// //! we keep the 2nd then outside the template function because we want to have some specific code for a fetch request and not include it with a get request

//* fetch request with catch error handling
const sendData = () => {
  reqFunc('POST', '/api/register', {
    "email": "eve.holt@reqres.in",
    //! "password": "pistol"
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err)
  })
};
//! try to ommit the password and see if catch catches the error. as with the xhr request, the catch does not get the error because the request was made successfully(there is no network problem that caused the request not to go thru). only the status was unsuccessful.

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);