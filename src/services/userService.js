import Cookies from "js-cookie";
import { ref } from "vue";

class UserService {

  data;
  loader;
  error;
  modal;

  constructor (){
    this.loader = ref(false);
    this.modal = ref(false);
    this.error = ref(null);
    this.data = ref(null);
  }

  getLoader(){
    return this.loader;
  }

  getToken(){
    return Cookies.get('jwt');
  }

  getData(){
    return this.data;
  }

  getError(){
    return this.error;
  }

  getModal(){
    return this.modal;
  }

  async getUsers(urlApi) {
    try {
      const url = urlApi;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}` 
        },
      });
      if (!response.ok) throw new Error(`${response.status} error de tipo: ${response.statusText}`);
      const json = await response.json();
      this.data.value =  json;
    }
    catch (err) {
      this.error.value = err;
    }
  }

  async getUserById(urlApi) {
    try {
      const url = urlApi;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}` 
        },
      });
      if (!response.ok) throw new Error(`${response.status} error de tipo: ${response.statusText}`)
      const json = await response.json();
      this.data.value = json;
    }
    catch (err) {
      this.error.value = err;
    }
  }

  sendEmail = (url, data, toggle, method) => {
    this.loader.value = true;
    this.modal.value = false;

    fetch(url, {
      method: method,  
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}` 
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
      this.error.value = err;
    })
    .finally(() => {
      this.loader.value = false;
    })
  }

  editUser = (url, data, toggle) => {
    this.loader.value = true;
    this.modal.value = false;

    fetch(url, {
      method: 'PATCH',  
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}` 
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
      this.error.value = err;
    })
    .finally(() => {
      this.loader.value = false;
    })
  }

  deleteUser = (url, toggle) => {
    this.loader.value = true;
    this.modal.value = false;

    fetch(url, {
      method: 'DELETE',  
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}` 
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
      this.error.value = err;
    })
  }
}

export default UserService;