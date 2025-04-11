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
  

  loginService = async (user) => {
    try {
      const res = await fetch(urlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || res.statusText || 'Error desconocido');
      }

      const json = await res.json();
      if (!json) throw new Error('No se recibieron datos del servidor');
      
      Cookies.set('jwt', json.access);
      json.is_temp_password ? router.push('/password') : router.push('/home');
      return true;
    } 
    catch (err) {
      this.errorMsg.value = err.message || 'Error al iniciar sesión';
      return false;
    }
  };

  changePasswordService = async (password) => {
    try{
      const res = await fetch(urlChangePD, {
        method: 'POST',
        body: JSON.stringify(password),
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        }
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || res.statusText || 'Error al cambiar la contraseña');
      }

      const json = await res.json();
      if (!json) throw new Error('No se recibió respuesta del servidor');

      this.data.value = 'Contraseña cambiada exitosamente';
      return true
    }
    catch (err) {
      this.errorMsg.value = err.message || 'Error al cambiar la contraseña';
      return false;
    }
  }
}

export default AuthServices;