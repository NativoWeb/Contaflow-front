<template>
    <!-- Título de la página -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 rounded-lg shadow-md text-center md:text-left">
        Registro de Clientes PYME
    </h2>
      <!-- Formulario -->
       <form @submit.prevent="addClient" class="w-full p-6 bg-white">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Nombres:
          </label>
          <input v-model="clientForm.first_name" @input="validateFirstName"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus nombres">
          <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">{{ errors.first_name }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Apellidos:
          </label>
          <input v-model="clientForm.last_name" @input="validateLastName"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus apellidos">
          <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">{{ errors.last_name }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Tipo de Identificación:
          </label>
          <div>
            <select  v-model="clientForm.id_type" class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500">
              <option selected disabled>Seleccione</option>
              <option value="Cedula_Ciudadania">Cédula de ciudadanía</option>
              <option value="Cedula_Extranjeria">Cédula de extranjería</option>
              <option value="Pasaporte">Pasaporte </option>
          </select>
          </div>
        </div>
      </div>
  
      <!-- Segunda fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Número de Identificación:
          </label>
          <input v-model="clientForm.id_number" @input="validateIdentificationNumber"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese su celular">
          <p v-if="errors.identification_number" class="text-red-500 text-xs mt-1">{{ errors.identification_number }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Numero de Celular:
          </label>
          <input v-model="clientForm.phone_number" @input="validatePhoneNumber"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"

            type="text" inputmode="numeric" placeholder="Ingrese su correo">
          <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">{{ errors.phone_number }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Correo Electrónico:
          </label>
          <input v-model="clientForm.username" @input="validateEmail"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="email" placeholder="Ingrese su correo">
          <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
        </div>
      </div>
  
      <!-- Botón de Añadir Usuario -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="md:col-span-2"></div> <!-- Espacio vacío para empujar el botón a la derecha -->
        <div class="flex items-end">
          <button type="submit"
            class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
            <span v-if="!isLoading" class="text-white">
              Añadir usuario
            </span>
            <span v-else class="text-white flex items-center justify-center">
              Cargando
            </span>
          </button>
        </div>
      </div>
    </form>
    <TablaCliente/>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import Cookies from 'js-cookie';
  import TablaCliente from "./TablaCliente.vue"
  
  const VUE_APP_URL = process.env.VUE_APP_URL;
  
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;  // Permite letras, espacios y tildes
  const identificationRegex = /^[0-9]{7,10}$/;  // Solo números, máximo 10 caracteres
  const phoneRegex = /^[0-9]{10,10}$/;  // Solo números, máximo 10 caracteres
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Formato de email
  const isLoading = ref(false);

  // Estado del formulario
  const clientForm = reactive({
  first_name: "",
  last_name: "",
  id_type: "Seleccione",
  id_number: "",
  phone_number: "",
  username: "",
  status: "Pendiente",
  role: "CLIENTE",
  companies: [],
  conciliations: []
});
  
  // Estado de errores
  const errors = reactive({
  first_name: "",
  last_name: "",
  identification_number: "",
  phone_number: "",
  username: "",
  });  
  
  // Validaciones
  const validateFirstName = () => {
  errors.first_name = nameRegex.test(clientForm.first_name) ? "" : "Solo se permiten letras y espacios.";
  };
  
  const validateLastName = () => {
  errors.last_name = nameRegex.test(clientForm.last_name) ? "" : "Solo se permiten letras y espacios.";
  };
  
  const validateIdentificationNumber = () => {
    errors.identification_number = identificationRegex.test(clientForm.id_number) ? "" : "Solo se permiten números (minimo 7 y máximo 10 dígitos). ";
  };
  
  const validatePhoneNumber = () => {
  errors.phone_number = phoneRegex.test(clientForm.phone_number) ? "" : "Solo se permiten números (máximo 10 dígitos).";
  };
  
  const validateEmail = () => {
  errors.username = emailRegex.test(clientForm.username) ? "" : "Ingrese un correo válido.";
  };
  

  function addClient() {
    isLoading.value = true;
    
    fetch(`${VUE_APP_URL}/client/email/`, {
      method: 'POST',
      body: JSON.stringify(clientForm),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    })
    .then(res => {
      isLoading.value = false;
      if (!res.ok) {
        if (res.status === 401) alert("Acceso denegado");
        // if (res.status === 400) alert("Este usuario ya esta registrado");
        if (res.status === 403) alert("Tu rol no permite registrar usuarios");
        throw new Error(`Error ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      alert("Se envió un correo al usuario");
      location.reload();
    })
    .catch(err => {
      isLoading.value = false;
      console.error(err)
    });
  }
  </script>
  
  