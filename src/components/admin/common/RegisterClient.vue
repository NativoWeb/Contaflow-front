<template>
  <!-- Título -->
  <form @submit.prevent="addCompany" :style="{ borderRadius: '0 0 8px 8px' }">
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 text-center md:text-left rounded-t-lg">
      Registro de Empresas
    </h2>


    <div class="m-auto w-[80%] flex flex-col">
      <div>

     
      <div class="relative z-0 w-full mb-5 group">
      <input 
        v-model="clientForm.nit"
        @input="validateNit"
        type="text" 
        id="floating_nit" 
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder=" " 
        required 
      />
      <label for="floating_nit" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NIT *</label>
      <p v-if="error.nit" class="text-red-500 text-xs mt-1">{{ error.nit }}</p>
    </div>
    
    <div class="relative z-0 w-full mb-5 group">
      <input 
        v-model="clientForm.username"
        @input="validateUseranme"
        type="email" 
        id="floating_email" 
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder=" " 
        required 
      />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo Electrónico *</label>
      <p v-if="error.username" class="text-red-500 text-xs mt-1">{{ error.username }}</p>
    </div>
    
    <div class="relative z-0 w-full mb-5 group">
      <input 
        v-model="clientForm.name"
        @input="validateName"
        type="text" 
        id="floating_name" 
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder=" " 
        required 
      />
      <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Razón Social *</label>
      <p v-if="error.name" class="text-red-500 text-xs mt-1">{{ error.name }}</p>
    </div>

  <!-- Fila: Dirección + Sector Económico -->
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
      <input 
        v-model="clientForm.address"
        @input="validateAddress"
        type="text" 
        id="floating_address" 
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder=" " 
        required 
      />
      <label for="floating_address" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dirección *</label>
      <p v-if="error.address" class="text-red-500 text-xs mt-1">{{ error.address }}</p>
    </div>
    
    <div class="relative z-0 w-full mb-5 group">
      <select
        v-model="clientForm.sector"
        id="floating_sector"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      >
        <option value="" disabled selected></option>
        <option value="Comercio y Ventas">Comercio y Ventas</option>
        <option value="Restaurantes y Gastronomia">Restaurantes y Gastronomía</option>
        <option value="Construccion e Infraestructura">Construcción e Infraestructura</option>
        <option value="Servicios Profesionales">Servicios Profesionales</option>
        <option value="Finanzas y Seguros">Finanzas y Seguros</option>
        <option value="Industria y Manufactura">Industria y Manufactura</option>
        <option value="Transporte y Logistica">Transporte y Logística</option>
        <option value="Salud y Medicina">Salud y Medicina</option>
        <option value="Educacion y Formacion">Educación y Formación</option>
        <option value="Tecnologia e Informatica">Tecnología e Informática</option>
      </select>
      <label for="floating_sector" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sector económico *</label>
    </div>
  </div>
  </div>

  <div>

    <h2 class="text-lg font-bold text-[#2A5CAA]  p-3 text-center md:text-left">
      Información del director ejecutivo
    </h2>
    
    <!-- Primera fila -->
    <div class="relative z-0 w-full mb-5 group">
      <input 
      v-model="clientForm.first_name"
      @input="validateFirstName"
      type="text" 
      id="floating_first_name" 
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
      placeholder=" " 
      required 
      />
      <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres *</label>
      <p v-if="error.first_name" class="text-red-500 text-xs mt-1">{{ error.first_name }}</p>
    </div>
    
    <div class="relative z-0 w-full mb-5 group">
      <input 
      v-model="clientForm.last_name"
      @input="validateLastName"
        type="text" 
        id="floating_last_name" 
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder=" " 
        required 
        />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellidos *</label>
        <p v-if="error.last_name" class="text-red-500 text-xs mt-1">{{ error.last_name }}</p>
      </div>
      
      <div class="relative z-0 w-full mb-5 group">
        <select
        v-model="clientForm.id_type"
        id="floating_id_type"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
        >
        <option value="" disabled selected></option>
        <option value="Cedula_Ciudadania">Cédula de ciudadanía</option>
        <option value="Cedula_Extranjeria">Cédula de extranjería</option>
      </select>
      <label for="floating_id_type" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo de Identificación *</label>
    </div>
  </div>
  
  <!-- Segunda fila -->
  <div class="grid md:grid-cols-3 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
      <input 
      v-model="clientForm.id_number"
      @input="validateIdentificationNumber"
      type="text" 
      id="floating_id_number" 
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
      placeholder=" " 
      required 
      />
      <label for="floating_id_number" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número de Identificación *</label>
      <p v-if="error.id_number" class="text-red-500 text-xs mt-1">{{ error.id_number }}</p>
    </div>
    
    <div class="relative z-0 w-full mb-5 group">
      <input 
      v-model="clientForm.phone_number"
      @input="validatePhoneNumber"
      type="text" 
      id="floating_phone_number" 
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
      placeholder=" " 
      required 
      />
      <label for="floating_phone_number" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número de celular *</label>
      <p v-if="error.phone_number" class="text-red-500 text-xs mt-1">{{ error.phone_number }}</p>
    </div>
    
    <div class="relative z-0 w-full mb-5 group flex items-end">
      <button
      :disabled="isFormInvalid"
      type="submit"
      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      :class="{
        'hover:bg-blue-800': !isFormInvalid,
        'cursor-not-allowed bg-blue-400': isFormInvalid
      }"
      >
      Añadir Empresa
    </button>
  </div>
</div>
</div>
</form>

<!-- Modal de carga -->
<div v-if="isLoading" class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0" :class="{'scale-100': isLoading}">
  <div class="relative w-full max-w-lg p-6 transform transition-all duration-600 ease-in-out">
      <div class="relative dark:bg-gray-800">
        <div class="p-8 text-center space-y-4">
          <img src="@/assets/loader.svg" alt="Cargando...">
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal de éxito -->
  <div v-if="isResponse" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
    <div class="bg-white p-6 shadow-lg w-96 relative rounded-tl-3xl">
      <button @click="closeResponseModal()" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center">&times;</button>
      <p class="text-[#2A5CAA] font-bold mb-4 text-center">¡Empresa agregada!</p>
      <p class="text-gray-800 font-medium mb-4 text-center">
        La empresa <span class="font-bold">{{ clientForm.name }}</span> fue registrada exitosamente en ContaFlow.
      </p>
    </div>
  </div>
  
  <!-- Modal de error -->
  <div v-if="isError" class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0" :class="{'scale-100': isError}">
    <div class="relative w-full max-w-lg bg-white p-6 transform transition-all duration-600 ease-in-out">
      <div class="relative bg-white rounded-lg dark:bg-gray-800">
        <div class="flex items-center justify-between p-4">
          <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
          <button @click="closeErrorModal()" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">&times;</button>
        </div>
        <div class="p-8 text-center space-y-4">
          <p class="text-lg text-gray-700 dark:text-gray-300"><strong>{{ errorMessage }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
  import UserService from "@/services/userService";
  import { computed, reactive, ref } from "vue";
  
  const sendEmailService = new UserService();
  const isLoading = ref(false);
  const isResponse = ref(false);
  const isError = ref(false);
  const errorResponse = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const nitRegex = /^\d{7,8}-\d{1}$/;
  const nameRegex =  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/; // Permite letras, espacios y tildes
  const addressRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#-]+$/;
  const id_numberRegex = /^[0-9]{7,10}$/; // Solo números, minimo 7 y máximo 10 caracteres
  const phoneRegex = /^[0-9]{10,10}$/; // Solo números, máximo 10 caracteres

  const clientForm = reactive({
    nit: "",
    name: "",
    username: "",
    address: "",
    sector: "Seleccione un sector",

    // Informacion directivo
    first_name: "",
    last_name: "",
    id_type: 'Seleccione una opción',
    id_number: "",
    phone_number: "",
  });

  const error = reactive({
    nit: "",
    name: "",
    address: "",
    username: "",
    
    // Informacion directivo
    id_number: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const validateNit = () => {
    if (!clientForm.nit.trim()) error.nit = "El NIT es obligatorio";
    else if (!nitRegex.test(clientForm.nit)) error.nit = "El formato del NIT no es válido. Ejemplo: 12345678-9";
    else error.nit = "";
  }

  const validateName = () => {
    if (!clientForm.name.trim()) error.name = "La razón social es obligatoria";
    else if (!nameRegex.test(clientForm.name)) error.name = "La razón social no es válida";
    else error.name = "";
  }

  const validateAddress = () => {
    if (!clientForm.address.trim()) error.address = "La dirección es obligatoria";
    else if (!addressRegex.test(clientForm.address)) error.address = "La dirección no es válida";
    else error.address = "";
  }

  const validateFirstName = () => {
    if (!clientForm.first_name.trim()) error.first_name = "El nombre solo puede contener letras.";
    else if (!nameRegex.test(clientForm.first_name)) error.first_name = "La dirección no es válida";
    else error.email = "";
  }

  const validateLastName = () => {
    if (!clientForm.last_name.trim()) error.last_name = "El apellido solo puede contener letras";
    else if (!nameRegex.test(clientForm.last_name)) error.last_name = "La dirección no es válida";
    else error.last_name = "";
  }

  const validateIdentificationNumber = () => {
    if (!clientForm.id_number.trim()) error.id_number = "Ingrese un número válido de identificación.";
    else if (!id_numberRegex.test(clientForm.id_number)) error.id_number = "El número no es válido";
    else error.id_number = "";
  }

  const validatePhoneNumber = () => {
    if (!clientForm.phone_number.trim()) error.phone_number = "Ingrese un número de celular válido.";
    else if (!phoneRegex.test(clientForm.phone_number)) error.phone_number = "El número de celular no es válido";
    else error.phone_number = "";
  }

  const isFormInvalid = computed(() => {
    return (
      !clientForm.nit.trim() ||
      !clientForm.name.trim() ||
      !clientForm.address.trim() ||
      !clientForm.username.trim() ||
      !clientForm.first_name.trim() ||
      !clientForm.last_name.trim() ||
      !clientForm.id_number.trim() ||
      !clientForm.phone_number.trim() ||

      Object.values(error).some(error => error !== "")
    )
  })

  const closeErrorModal = () => {
    isError.value = !isError.value;
    location.reload();
  }

  const closeResponseModal = () => {
    isResponse.value = !isResponse.value;
    location.reload()
  }

  async function addCompany(){
    isLoading.value = true;
    const url = `${VUE_APP_URL}/clients/register/`;
    const data = clientForm;

    try {
      await sendEmailService.addCompany(url, data);
      isResponse.value = true;
    }
    catch(err){
      isResponse.value = false;
      isError.value = true;
      errorResponse.value = sendEmailService.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  }
</script>