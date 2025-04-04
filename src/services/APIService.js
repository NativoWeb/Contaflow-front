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

  getLoader() {
    return this.loader;
  }

  getShowModal(){
    return this.showModal;
  }

  getAlertModal(){
    return this.alertModal;
  }

  headerAuth = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  }

  // Tomar Datos
  getDataApi = (url, loader, headers=this.headerAuth) => {
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

  // Enviar Datos
  sendDataApi = (url, data, toggle, method) => {
    this.loader.value = true;
    this.showModal.value = false;

    fetch(url, {
      method: method,  
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('jwt')}` 
        },
      body: JSON.stringify(data)
    })
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
      this.loader.value = false;
    })
  }

  // Eliminar Datos
  deleteDataApi = (url, toggle) => {
    this.loader.value = true;
    this.showModal.value = false;

    fetch(url, {
      method: 'DELETE',  
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('jwt')}` 
        },
    })
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
  }
}


export default GetServices;