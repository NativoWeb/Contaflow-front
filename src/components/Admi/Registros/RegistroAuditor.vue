<template>
    <!-- Título de la página -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 rounded-lg shadow-md text-center md:text-left">
        Registro de Auditor
    </h2>
      <!-- Formulario -->
       <form @submit.prevent="addUser" class="w-full p-6 bg-white">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Nombres:
          </label>
          <input v-model="userForm.first_name" @input="validateFirstName"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus nombres">
          <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">{{ errors.first_name }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Apellidos:
          </label>
          <input v-model="userForm.last_name" @input="validateLastName"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus apellidos">
          <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">{{ errors.last_name }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Tipo de Identificación:
          </label>
          <div>
            <select  v-model="userForm.identification_type" class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500">
              <option selected>Seleccione</option>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="CE">Cédula de extranjería</option>
              <option value="PP">Pasaporte </option>
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
          <input v-model="userForm.identification_number" @input="validateIdentificationNumber"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese su celular">
          <p v-if="errors.identification_number" class="text-red-500 text-xs mt-1">{{ errors.identification_number }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Numero de Celular:
          </label>
          <input v-model="userForm.phone_number" @input="validatePhoneNumber"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="email" placeholder="Ingrese su correo">
          <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">{{ errors.phone_number }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Correo Electrónico:
          </label>
          <input v-model="userForm.username" @input="validateEmail"
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
    
    <!-- Contenedor de búsqueda y tabla -->
     <div class="p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      <h2 class="text-lg font-semibold text-[#193368] dark:text-white">Lista de Auditor</h2>
      <div class="w-full md:w-1/2">
        <label for="table-search" class="sr-only">Buscar</label>
        <div class="flex items-center bg-gray-50 border border-[#B4C3DF] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
          <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <input  type="text" 
          v-model="searchQuery"  
          id="table-search-users" 
          placeholder="Buscar..."
          class="w-full p-2 text-sm text-[#193368] bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
      </div>
    </div>
  
    <!-- Tabla -->
    <div class="overflow-x-auto p-3 bg-white shadow-md rounded-lg">
      <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
          <tr>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Número de Identificación</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Correo</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Celular</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.identification_number" @click="seleccionarUsusario(usuario)"
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ user.first_name }} {{ user.last_name }}</td>
            <td class="px-6 py-4">{{ user.identification_number }}</td>
            <td class="px-6 py-4">{{ user.username }}</td>
            <td class="px-6 py-4">{{ user.phone_number }}</td>
            <td class="px-6 py-4">{{ user.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  // , computed
  import { reactive, ref } from "vue";
  import Cookies from 'js-cookie';
  
  const VUE_APP_URL = process.env.VUE_APP_URL;

  // Estado del formulario
  const userForm = reactive({
  first_name: "",
  last_name: "",
  identification_type: "Seleccione",
  identification_number: "",
  phone_number: "",
  username: "",
  estado: "Pendiente",
  companies: []
  });
  
  // Estado de errores
  const errors = reactive({
  first_name: "",
  last_name: "",
  identification_number: "",
  phone_number: "",
  username: "",
  });
  
  const isLoading = ref(false);
  
  // Expresiones regulares
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;  // Permite letras, espacios y tildes
  const identificationRegex = /^[0-9]{7,10}$/;  // Solo números, máximo 10 caracteres
  const phoneRegex = /^[0-9]{10,10}$/;  // Solo números, máximo 10 caracteres
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Formato de email
  
  // Validaciones
  const validateFirstName = () => {
  errors.first_name = nameRegex.test(userForm.first_name) ? "" : "Solo se permiten letras y espacios.";
  };
  
  const validateLastName = () => {
  errors.last_name = nameRegex.test(userForm.last_name) ? "" : "Solo se permiten letras y espacios.";
  };
  
  const validateIdentificationNumber = () => {
  errors.identification_number = identificationRegex.test(userForm.identification_number) ? "" : "Solo se permiten números (minimo 7 y máximo 10 dígitos). ";
  };
  
  const validatePhoneNumber = () => {
  errors.phone_number = phoneRegex.test(userForm.phone_number) ? "" : "Solo se permiten números (máximo 10 dígitos).";
  };
  
  const validateEmail = () => {
  errors.username = emailRegex.test(userForm.username) ? "" : "Ingrese un correo válido.";
  };
  
  
  // Verificación de correo único
  /*const checkEmailExists = () => {
  fetch(`http://127.0.0.1:8000/users/email/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.exists) {
      errors.username = "Este correo ya está registrado.";
    }
  })
  .catch(err => console.error("Error verificando el correo:", err));
  };
  */
  
  // Comprobar si hay errores
  // const hasErrors = computed(() => {
  //   return Object.values(errors).some(error => error);
  // });
  
  // Envío del formulario
  function addUser() {
  isLoading.value = true;
  // if (hasErrors.value) {
  //   alert("Corrija los errores antes de enviar.");
  //   return;
  // }
  
  fetch(`${VUE_APP_URL}/auditor/email/`, {
    method: 'POST',
    body: JSON.stringify(userForm),
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
  
  <script>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const users = ref([
    { first_name: 'Juan', last_name: 'Pérez', identification_number: '123456789', username: 'juanp@example.com', phone_number: '3123456789', estado: 'Activo' },
    { first_name: 'María', last_name: 'López', identification_number: '987654321', username: 'marial@example.com', phone_number: '3156784321', estado: 'Inactivo' }
  ]);
  
  const seleccionarUsuario = (user) => {
    router.push({
      name: 'ListaCon',
      query: { id: user.identification_number } // Se pasa el número de identificación como parámetro
    });
  };
  
  // Filtrado de usuarios por búsqueda
  const searchQuery = ref("");
  
  const filteredUsers = computed(() => {
    return users.value.filter((user) =>
      user.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.estado.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.identification_number.includes(searchQuery.value)
    );
  });
  
  export default {
    setup() {
      return {
        users,
        searchQuery,
        filteredUsers,
        seleccionarUsuario
      };
    }
  };
  </script>
  
  