import router from "@/router";
import Cookies from "js-cookie";
import { ref } from "vue";

const VUE_APP_URL = process.env.VUE_APP_URL;
const url = `${VUE_APP_URL}/users/login/`;
const token = Cookies.get('jwt');

class AuthServices {
  data;
  errorMsg;


  constructor () {
    this.data = ref("");
    this.errorMsg = ref("");
  }

  // Servicio para el ingreso
  loginService = () => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    .then(async res => {
      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`)
      res.json();
    })
    .then(async json => {
      if (!json) return
      Cookies.set('jwt', json.access);
      redirectByRole(json)
    })
    .catch(err => {
      this.errorMsg = err;
      router.push(`login`)
    })
  }

  redirectByRole = (json) => {
    if (!json.is_temp_password) {
      if (json.role === 'ADMIN') {
        return router.push('/administrador')
      }
      else if (json.role === 'CLIENTE') {
        return router.push('/cliente')
      }
      else if (json.role === 'CONTADOR') {
        return router.push('/contador')
      }
      else if (json.role === 'AUDITOR') {
        return router.push('/auditor')
      }
    }
    else {
      return router.push('/password')
    }
  }
}

export default AuthServices;