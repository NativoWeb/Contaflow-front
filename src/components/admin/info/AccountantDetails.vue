<template>
  <!-- Título de la página -->
  <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 shadow-md text-center md:text-left" style="border-radius: 6px 6px 0 0;">
    Información del usuario
  </h2>
<div v-if="data">
  <div class="w-full bg-[#FBFBFB] shadow-md flex flex-col md:flex-row p-8" style="border-radius: 0 0 8px 8px;">
      <!-- Sección de información -->
      <div class="flex-1">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <!-- Primera fila -->
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Nombres:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ data.first_name }}</p>
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Apellidos:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ data.last_name }}</p>
          </div>

          <!-- Segunda fila -->
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Tipo de Identificación:
              </label>
              <p v-if="data.id_type == 'Cedula_Ciudadania'" class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Cedula de Ciudadania</p>
              <p v-if="data.id_type == 'Cedula_Extranjeria'" class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Cedula de Extranjeria</p>
              <p v-if="data.id_type == 'Pasaporte'" class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Pasaporte</p>
            </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Número de Identificación:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ data.id_number}}</p>
          </div>

          <!-- Tercera fila -->
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Número de Celular:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ data.phone_number}}</p>
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Correo Electrónico:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ data.username }}</p>
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Rol:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ data.role}}</p>           
          </div>
          <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                  Estado:
              </label>
              <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">{{ data.status}}</p>           
          </div>
      </div>
  </div>

  <!-- Sección de botones -->
  <div class="flex flex-col gap-6 ml-2 p-8">
      <EditModal :user="data" :title="'Actualizar Contador'"/>
      <DeleteModal :id="data.id"/>
      <StatusModal :id="data.id" :status="data.status"/>
      <SendInvitationModal :user="data" :apiUrl="`${VUE_APP_URL}/users/email/${data.id}`"/>
      <button @click="goToClientDetails" class="btn-action">Clientes</button>
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
</div>
</div>
</div>
  
  <div v-if="err" class="flex justify-center items-start">
    <span>{{ err }}</span>
  </div>


<!-- cargador -->
<div v-if="isLoading" class="flex justify-center items-start">
  <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
</div>
</template>

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

<script setup>
  import { useRoute } from 'vue-router';
  import StatusModal from '../crud/StatusModal.vue';
  import SendInvitationModal from '../crud/SendInvitationModal.vue';
  import EditModal from '../crud/EditModal.vue';
  import DeleteModal from '../crud/DeleteModal.vue';
  import UserService from '@/services/userService';
  import { onMounted, ref } from "vue";
  import router from '@/router';
  
  const getUser = new UserService();
  const userId = useRoute().params.id;
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/accountants/${userId}/`;
  const urlApi = VUE_APP_URL + uri;
  
  const goToClientDetails = () => {
    router.push(`clientes_contador/accountants/${userId}`)
  }

  onMounted(async () => {
    isLoading.value = true;
    try{
      await getUser.getUserById(urlApi)
      data.value = getUser.getData().value;
    }
    catch(error){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  });



</script>