const axios =  require('axios');

async function axiosInstance(query) {
  //const type = "&image_type=photo";
  const apiRoot = `https://pixabay.com/api/?key=6950494-61b242cbe2aef9355f001496b&q=${query}&image_type=photo`;
  
  let response = await axios.get(apiRoot);
  return response.data;
}


module.exports = axiosInstance;
//export default instance;
