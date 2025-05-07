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
    this.error = ref("");    // Maneja el estado de error
    this.data = ref("");     // Datos de la conciliación
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

  async getConciliations(url){
    try {
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

  async getConciliationById(url){
    try {
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
  

  // Método para enviar los archivos
  async sendFile(urlApi, fileBank, fileAccounting) {
    this.loader.value = true;
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
      if (!json) throw new Error('No se recibió respuesta del servidor');
      this.data.value = json;
     }
      catch (err) {
        this.error.value = err;
      }
      finally{
        this.loader.value = false;
      }
    }

    async saveConciliation(urlApi, dataConciliation) {
      try {
        const response = await fetch(urlApi, {
          method: 'POST',
          body: JSON.stringify(dataConciliation),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('jwt')}` 
          }
        })
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        if (!json) throw new Error('No se recibió respuesta del servidor');
        this.data.value = json;
      }
      catch (err) {
        this.error.value = err;
      }
      finally{
        this.loader.value = false;
      }
    }
  }

export default ConciliationService;