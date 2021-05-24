const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const api = 'https://reqres.in'
//? remember not to have a forward slash infront of the url if not inside it


// const getData = () => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', api + '/api/users' );
//   //! the open method is to prepare a httprequest to be sent with all the details
  
//   xhr.onload = () => {
//     console.log(xhr);
//     //? logging xhr will return the request object response
//     console.log(xhr.response);
//     //? the response data is a component property of the request object so you need to use dot notation to access it
//     const data = JSON.parse(xhr.response);
//     console.log(data);
//   }
//   //! onload is a listener for when the request has been sent and we get a response.
//   //! you could also use addeventlistener but less browser support

//   xhr.send();
//   //! the .send method is the one that will send the request
// };

//? getData version 2 where we do not use the json.parse but define response type instead
// const getData = () => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', api + '/api/users' );
  
//   xhr.responseType = "json";

//   xhr.onload = () => {
//     const data = xhr.response;
//     console.log(data);
//   }

//   xhr.send();
// };

//! reusable dynamic xhr function 
function sendRequest(verb, url, data) {
  return new Promise((resolve, reject) =>{
  const xhr = new XMLHttpRequest();
  xhr.open(verb, api + url);
  
  xhr.responseType = "json";

  xhr.onload = () => {
    //! to check if after the making the request, there is an error
    if (xhr.status >= 400) {
      reject(xhr.response)
    } else {
      resolve(xhr.response)  
    }
  }

  //! setting the header is only req if you are sending data which is usually during a POST request
  if (data) {
    //! when posting data, the api needs to know what type of data it is receiving b4 it can parse it
    xhr.setRequestHeader('Content-Type', 'application/json')  
  }

  //! this method will be called when there is an error while making the request eg disconnected internet
  xhr.onerror = () =>{
    reject('The request could not be sent')
  }
  

  xhr.send(JSON.stringify(data));


  })
}

//? the specific requests
const getData = () => {
  sendRequest('GET', '/api/users').then(responseData =>{
    console.log(responseData)
  })
};


const sendData = () => {
  sendRequest('POST', '/api/register',{
    "email": "eve.holt@reqres.in",
    // "password": "pistol"    
  }).then(responseData =>{
    console.log(responseData);
  }).catch(err =>{
    console.log(err)
  })
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);

    