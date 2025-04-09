import Cookies from "js-cookie";
import { ref } from "vue";

class CompaniesService {

  data;
  error;

  constructor (){
    this.data = ref(null);
    this.error = ref(false);

  }
  
  getData(){
    return this.data;
  }

  getError(){
    return this.error;
  }

  getToken(){
    return Cookies.get('jwt');
  }

  async getCompanies(urlApi){
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
      this.data.value = json;
    }
    catch(err){
      this.error.value = err;
    }
  }

  async getCompanyById(urlApi){
    try{
      const url = urlApi;
      const response = await fetch(url, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        }
      });
      if (!response.ok) throw new Error(`${response.status} error de tipo: ${response.statusText}`);
      const json = await response.json();
      this.data.value = json;
    }
    catch(err){
      this.error.value = err;
    }
  }

  async addCompany(urlApi, data){
    try{
      const url = urlApi;
      const response = await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        }
      })
      if (!response.ok) throw new Error(`${response.status} error de tipo: ${response.statusText}`)
      const json = await response.json();
      this.data.value = json;    
    }
    catch(err){
      this.error.value = err;
    }
  }

  async editCompany(urlApi, data){
    try{
      const url = urlApi;
      const response = await fetch(url, {
        body: JSON.stringify(data),
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        }
      })
      if (!response.ok) throw new Error(`${response.status} error de tipo: ${response.statusText}`)
      const json = await response.json()
      this.data.value = json;
    }
    catch(err){
      this.error.value = err;
    }
  }

  async deleteCompany(urlApi){
    try{
      const url = urlApi;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        }
      })
      if (!response.ok) throw new Error(`${response.status} error de tipo: ${response.statusText}`)
      const json = await response.json()
      this.data.value = json;    
    }
    catch(err){
      this.error.value = err;
    }
  }
}

export default CompaniesService;