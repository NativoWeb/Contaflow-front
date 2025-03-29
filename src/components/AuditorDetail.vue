<template>
  <!-- Título de la página -->
  <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 rounded-lg shadow-md text-center md:text-left">
    Información del usuario
  </h2>
<div v-if="user">
  <div class="w-full bg-white flex flex-col md:flex-row p-8">
      <!-- Sección de información -->
      <div class="flex-1">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <!-- Primera fila -->
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Nombres:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ user.first_name }}</p>
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Apellidos:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ user.last_name }}</p>
          </div>

          <!-- Segunda fila -->
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Tipo de Identificación:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{  user.id_type }}</p>
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Número de Identificación:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ user.id_number}}</p>
          </div>

          <!-- Tercera fila -->
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Número de Celular:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ user.phone_number}}</p>
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Correo Electrónico:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ user.username }}</p>
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Rol:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ user.role}}</p>           
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Estado:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ user.status}}</p>           
          </div>
      </div>
  </div>

  <!-- Sección de botones -->
  <div class="flex flex-col gap-6 ml-2 p-8">
      <button @click="toggleEditModal" class="btn-action">Editar</button>
      <button @click="toggleDeleteModal"   class="btn-action">Eliminar</button>
      <button class="btn-action">Activar / Inactivar</button>
      <button class="btn-action">Reenviar invitación</button>
      <button @click="toggleAssignModal" class="btn-action">Asignar Empresa y Banco</button>
  </div>
</div>

<div class="tables-container p-2">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 class="text-xl font-bold text-[#2A5CAA] p-3">Empresas</h2>
      <table class="w-full text-sm text-left rtl:text-right text-[#08245B]">
          <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF]">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      Nit
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Razón Social
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Sector Económico
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Dirección
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Acción
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <td class="px-6 py-4">123456789</td>
                  <td class="px-6 py-4">Empresa A</td>
                  <td class="px-6 py-4">Finanzas</td>
                  <td class="px-6 py-4">Calle 123</td>
                  <td class="px-6 py-4">
                      <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 class="text-xl font-bold text-[#2A5CAA] p-3">Bancos</h2>
      <table class="w-full text-sm text-left rtl:text-right text-[#08245B]">
          <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF]">
              <tr>
                  <th scope="col" class="px-7 py-3">
                      Bancos
                  </th>
                  <th scope="col" class="px-7 py-3">
                      Número de cuenta
                  </th>
                  <th scope="col" class="px-7 py-3">
                      Tipo de cuenta
                  </th>
                  <th scope="col" class="px-7 py-3">
                      Acción
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <td class="px-7 py-6">Bancolombia</td>
                  <td class="px-7 py-6">9876543210</td>
                  <td class="px-7 py-6">Ahorro</td>
                  <td class="px-7 py-6">
                      <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</div>

<!-- Modal para Eliminar -->
<div v-if="isDeleteModalOpen" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
<div class="relative p-5 w-full max-w-md max-h-full">
  <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
    <!-- Contenido del Modal -->
    <div class="p-6 md:p-5 text-center">
      <img src="@/assets/Error.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
      <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">¿Ess seguro que quieres eliminar este registro?</h3>
      <h3 class="mb-5 text-lg font-normal text-[#000000]">Este registro se elimina definitivamente.</h3>
      
      <!-- Botones -->
      <button @click="closeDeleteModal"
              class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                     focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                     dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Cancelar
      </button>
      <button @click="confirmDelete"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
        Confirmar
      </button>
    </div>
  </div>
</div>
</div>

<!-- Modal para Editar -->
<div v-if="isEditModalOpen" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
<div class="p-10 relative w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
  <!-- Encabezado -->
  <div>
    <h3 class="text-xl font-semibold text-[#2A5CAA]">Editar registro</h3>
  </div>

  <!-- Contenido -->
  <div class="space-y-1 p-2">
    <form @submit.prevent="submitEdit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-[#193368]">Nombres:</label>
          <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{user.first_name}}</p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-[#193368]">Apellidos:</label>
          <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.last_name}}</p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-[#193368]">Tipo de Identificación:</label>
          <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.id_type }}</p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-[#193368]">Número de Identificación:</label>
          <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.id_number }}</p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-[#193368]">Número de Celular:</label>
          <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.phone_number }}</p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-[#193368]">Correo Electrónico:</label>
          <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.username }}</p>
        </div>
      </div>
    </form>
  </div>

  <!-- Botones -->
  <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
    <button @click="closeEditModal"
            class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                   focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                   dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      Cancelar
    </button>
    <button @click="submitEdit"
            type="button" 
            class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
      Confirmar
    </button>
  </div>
</div>
</div>

<!-- Modal para asignar empresa -->
<div v-if="isAssignModalOpen" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
<div class="p-10 relative w-[80%] bg-white rounded-lg shadow-lg dark:bg-gray-800">
  <!-- Encabezado -->
  <div>
    <h3 class="text-xl font-semibold text-[#2A5CAA]">Asignar empresa</h3>
  </div>

  <!-- Contenedor de las tablas con flexbox -->
<div class="tables-container flex flex-wrap gap-4 p-2">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2">
      <h2 class="text-xl font-bold text-[#2A5CAA] p-3">Empresas</h2>
      <table class="w-full text-sm text-left rtl:text-right text-[#08245B]">
          <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF]">
              <tr>
                  <th scope="col" class="px-6 py-3">Nit</th>
                  <th scope="col" class="px-6 py-3">Razón Social</th>
                  <th scope="col" class="px-6 py-3">Sector Económico</th>
                  <th scope="col" class="px-6 py-3">Dirección</th>
                  <th scope="col" class="px-6 py-3">Acción</th>
              </tr>
          </thead>
          <tbody>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <td class="px-6 py-4">123456789</td>
                  <td class="px-6 py-4">Empresa A</td>
                  <td class="px-6 py-4">Finanzas</td>
                  <td class="px-6 py-4">Calle 123</td>
                  <td class="px-6 py-4">
                      <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2">
      <h2 class="text-xl font-bold text-[#2A5CAA] p-3">Bancos</h2>
      <table class="w-full text-sm text-left rtl:text-right text-[#08245B]">
          <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF]">
              <tr>
                  <th scope="col" class="px-7 py-3">Bancos</th>
                  <th scope="col" class="px-7 py-3">Número de cuenta</th>
                  <th scope="col" class="px-7 py-3">Tipo de cuenta</th>
                  <th scope="col" class="px-7 py-3">Acción</th>
              </tr>
          </thead>
          <tbody>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <td class="px-7 py-6">Bancolombia</td>
                  <td class="px-7 py-6">9876543210</td>
                  <td class="px-7 py-6">Ahorro</td>
                  <td class="px-7 py-6">
                      <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</div>


  <!-- Botones -->
  <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
    <button @click="closeAssignModal"
            class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                   focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                   dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      Cancelar
    </button>
    <button @click="confirAssign"
            type="button" 
            class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
      Confirmar
    </button>
  </div>
</div>
</div>
  </div>
  
<!-- cargador -->
<div v-else class="flex justify-center items-start">
  <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
</div>


</template>

<script setup>
import { useRoute } from 'vue-router';
import Cookies from 'js-cookie';
import { ref } from 'vue';

  const userId = useRoute().params.id;
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const user = ref();

  console.log(userId)

  fetch(`${VUE_APP_URL}/auditor/${userId}/`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    })
  .then(res => res.json())
  .then(json => {
    user.value = json
  })

// export default {
//   data() {
//     return {
//       isDeleteModalOpen: false,
//       isEditModalOpen: false,
//       isAssignModalOpen: false,
//     };
//   },
//   methods: {
//     toggleDeleteModal() {
//       this.isDeleteModalOpen = !this.isDeleteModalOpen;
//     },
//     closeDeleteModal() {
//       this.isDeleteModalOpen = false;
//     },
//     closeModal() {
//       this.isModalOpen = false; // Cierra el modal
//     },
//     confirmDelete() {
//       const deleteMethod = { 
//         methods : 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${Cookies.get('jwt')}`
//         }
//       }

//       fetch(`${VUE_APP_URL}/auditor/${userId}/`, deleteMethod)
//       .then(res => res.json())
//       .then(json => {
//         console.log(json)
//       })
//       .catch(err => console.error(err))

//       console.log("Registro eliminado.");
//       this.closeDeleteModal();
//     },
    
//     toggleEditModal() {
//       this.isEditModalOpen = !this.isEditModalOpen;
//     },
//     closeEditModal() {
//       this.isEditModalOpen = false;
//     },
//     submitEdit() {
//       console.log("Registro editado:", this.editForm);
//       this.closeEditModal();
//     },
//     toggleAssignModal(){
//       this.isAssignModalOpen = !this.isAssignModalOpen;
//     },
//     closeAssignModal(){
//       this.isAssignModalOpen = false;
//     }, 
//     confirAssign(){
//       console.log("registro asignado");
//       this.closeAssignModal();
//     }
//   }
// };
</script>

<style>
.tables-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.tables-container > div {
  width: 100%; 
}

@media (min-width: 768px) {
  .tables-container > div {
      width: 48%;
  }
}
</style>
