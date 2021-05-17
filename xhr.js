const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const api = 'https://reqres.in'
//? remember not to have a forward slash infront of the url if not inside it

const getData = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', api + '/api/users' );
  //! the open method is to prepare a httprequest to be sent with all the details
  
  xhr.onload = () => {
    console.log(xhr);
    //? logging xhr will return the request object response
    console.log(xhr.response);
    //? the response data is a component property of the request object so you need to use dot notation to access it
    const data = JSON.parse(xhr.response);
    console.log(data);
  }
  //! onload is a listener for when the request has been sent and we get a response.
  //! you could also use addeventlistener but less browser support

  xhr.send();
  //! the .send method is the one that will send the request
};

const sendData = () => {

};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
