import router from "@/router";
import Cookies from "js-cookie";
import { ref } from "vue";


const VUE_APP_URL = process.env.VUE_APP_URL;
const urlLogin = `${VUE_APP_URL}/users/login/`;
const urlChangePD = `${VUE_APP_URL}/users/password/`;

class AuthServices {
  data;
  errorMsg;

  constructor () {
    this.data = ref("");
    this.errorMsg = ref("");
  }

  getData () {
    this.data;
  }

  getError (){
    this.errorMsg;
  }

  getToken(){
    return Cookies.get('jwt');
  }
  

  // Servicio para el ingreso
  loginService = (user) => {
    return fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
    .then(res => {
      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`)
      return res.json();
    })
    .then(json => {
      if (!json) return
      Cookies.set('jwt', json.access);
      json.is_temp_password ? router.push('/password') : router.push('/home')
    })
    .catch(err => {
      this.errorMsg = err;
      router.push(``)
    })
  };

  changePasswordService = (password) => {
    fetch(urlChangePD, {
      method: 'POST',
      body: JSON.stringify(password),
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }
    })
    .then(res => res.json())
    .then(() => {
      alert("Contraseña cambiada de manera correcta");
      router.push('/home')
    })
    .catch(err => {
      this.errorMsg = err;
    })
  }
}

export default AuthServices;