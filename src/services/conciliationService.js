import Cookies from "js-cookie";
import { ref } from "vue";

class ConciliationService {
  data;
  loader;
  error;
  modal;

  constructor() {
    this.loader = ref(false);  // Maneja el estado de carga
    this.modal = ref(false);   // Modal para mostrar el estado de carga o errores
    this.error = ref(null);    // Maneja el estado de error
    this.data = ref(null);     // Datos de la conciliación
  }

  getLoader() {
    return this.loader;
  }

  getToken() {
    return Cookies.get('jwt');
  }

  getData() {
    return this.data;
  }

  getError() {
    return this.error;
  }

  getModal() {
    return this.modal;
  }

  // Método para enviar los archivos
  async sendFile(urlApi, fileBank, fileAccounting) {
    this.loader.value = true; // Activar el estado de carga

    const formData = new FormData();
    formData.append('data', fileBank);
    formData.append('data', fileAccounting);

    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      this.data.value = json; // Almacenamos la respuesta de la API
      
        // Llamado a la funcion de la otra peticion - guardar los archivos en la base de datos y el resultado de la conciliacion
      }
      catch (err) {
        this.error.value = err;
      }
      finally{
        this.isLoading.value = false;
      }

    }
  }

  export default new ConciliationService();