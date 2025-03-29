<template>
  <!-- Formulario -->
  <form @submit.prevent="addUser" class="w-full p-6">
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
          <select v-model="userForm.role"
            class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="ADMIN">Administrador</option>
            <option value="CONTADOR">Contador</option>
            <option value="AUDITOR">Auditor</option>
            <option value="CLIENTE">Cliente PYME</option>
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
        <input v-model="userForm.phone_number" @input="validatePhoneNumber"
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          type="text" placeholder="Ingrese su celular">
        <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">{{ errors.phone_number }}</p>
      </div>
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Numero de Celular:
        </label>
        <input v-model="userForm.username" @input="validateEmail"
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          type="email" placeholder="Ingrese su correo">
        <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
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

   <!-- Contenedor de búsqueda y selección de empresa -->
   <div class="p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
    <h2 class="text-lg font-semibold text-[#193368] dark:text-white">Seleccionar Empresa</h2>
    <div class="w-full md:w-1/2">
      <label for="table-search" class="sr-only">Buscar</label>
      <div class="flex items-center bg-gray-50 border border-[#B4C3DF] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
        <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <input  type="text" 
        v-model="searchQuery"  id="table-search-users" placeholder="Buscar..."
          class="w-full p-2 text-sm text-[#193368] bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
    </div>
  </div>

  <!-- Tabla -->
  <div class="overflow-x-auto p-4 bg-white shadow-md rounded-lg">
    <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
      <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
        <tr>
          <th scope="col" class="px-6 py-3">NIT</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Razón Social</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Dirección</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Sector Económico</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="empresa in filteredEmpresas" :key="empresa.nit" @click="seleccionarEmpresa(empresa)"
          class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
          <td class="px-6 py-4">{{ empresa.nit }}</td>
          <td class="px-6 py-4  md:table-cell">{{ empresa.razonSocial }}</td>
          <td class="px-6 py-4  md:table-cell">{{ empresa.direccion }}</td>
          <td class="px-6 py-4  md:table-cell">{{ empresa.sectorEconomico }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// , computed
import { reactive, ref } from "vue";
import Cookies from 'js-cookie';

// Estado del formulario
const userForm = reactive({
first_name: "",
last_name: "",
phone_number: "",
username: "",
role: "CLIENTE",
companies: []
});

// Estado de errores
const errors = reactive({
first_name: "",
last_name: "",
phone_number: "",
username: "",

});

const isLoading = ref(false);

// Expresiones regulares
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;  // Permite letras, espacios y tildes
const phoneRegex = /^[0-9]{0,10}$/;  // Solo números, máximo 10 caracteres
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Formato de email

// Validaciones
const validateFirstName = () => {
errors.first_name = nameRegex.test(userForm.first_name) ? "" : "Solo se permiten letras y espacios.";
};

const validateLastName = () => {
errors.last_name = nameRegex.test(userForm.last_name) ? "" : "Solo se permiten letras y espacios.";
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

fetch('http://127.0.0.1:8000/users/email/', {
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
<script >
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref(""); // Agregado para la búsqueda
const router = useRouter();
const empresas = ref([
{ nit: '123456789', razonSocial: 'Empresa A', direccion: 'Calle 123', sectorEconomico: 'Tecnología' },
{ nit: '987654321', razonSocial: 'Empresa B', direccion: 'Avenida 456', sectorEconomico: 'Finanzas' },
{ nit: '456789123', razonSocial: 'Empresa C', direccion: 'Carrera 789', sectorEconomico: 'Salud' }
]);

const seleccionarEmpresa = (empresa) => {
router.push({
  name: 'ListaCon',
  query: {
    nit: empresa.nit,
    razonSocial: empresa.razonSocial,
    direccion: empresa.direccion,
    sectorEconomico: empresa.sectorEconomico
  }
});

};

// Filtrar empresas
const filteredEmpresas = computed(() => {
return empresas.value.filter(empresa =>
  empresa.nit.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  empresa.razonSocial.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  empresa.direccion.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  empresa.sectorEconomico.toLowerCase().includes(searchQuery.value.toLowerCase())
);
});

</script>
