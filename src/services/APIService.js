import { ref } from 'vue';
import Cookies from 'js-cookie';

// Servicio para el get
class GetServices {
  data;
  errors;
  loader;
  showModal;
  alertModal;

  constructor (){
    this.data = ref(); 
    this.errors = ref(false);
    this.loader = ref(false);
    this.showModal = ref(false);
    this.alertModal = ref(false);
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

  getData = (url, loader, headers=this.headerAuth) => {
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

  sendData = (url, headerSend, toggle) => {
    this.loader.value = true;
    this.showModal.value = false;

    fetch(url, headerSend) 
    .then(response => {
      if (!response.ok) throw new Error(`${response.status} error de tipo: ${response.statusText}`)
      return response.json()
    })
    .then(() => {
      toggle()
    })
    .catch(err => {
      this.loader.value = false;
      this.errors.value = err;
    })
    .finally(() => {
      this.errors.value = false;
      this.loader.value = false;
      this.showModal.value = false;
    })


  }
}


export default GetServices;