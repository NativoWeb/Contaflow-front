import { ref } from 'vue';
import Cookies from 'js-cookie';

// Servicio para el get
class GetServices {
  data;
  errors;

  constructor (){
    this.data = ref(); 
    this.errors = ref(false);
  }

  getData (){
    return this.data;
  }

  getError (){
    return this.errors;
  }

  headerAuth = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  }

  callApi = (url, loader, headers=this.headerAuth) => {
    loader.value = true;
    fetch(url, headers)
    .then(response => {
      loader.value = false;
      if (!response.ok) throw new Error(`${response.status} error de tipo: ${response.statusText}`)
      return response.json()
    })
    .then(json => {
      this.data.value = json;
    })
    .catch(err => {
      loader.value = false;
      this.errors.value = err;
    })
  }
}

export default GetServices;