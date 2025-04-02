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
              <p v-if="user.id_type == 'Cedula_Ciudadania'" class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Cedula de Ciudadania</p>
              <p v-if="user.id_type == 'Cedula_Extranjeria'" class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Cedula de Extranjeria</p>
              <p v-if="user.id_type == 'Pasaporte'" class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Pasaporte</p>
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
      <EditModal :user="user" :title="'Actualizar Cliente'"/>
      <DeleteModal :id="user.id"/>
      <StatusModal :id="user.id" :status="user.status"/>
      <SendInvitationModal :user="user" :apiUrl="`${VUE_APP_URL}/users/email/${user.id}`"/>
      <AssignComConModal/>
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
</div>
  
<!-- cargador -->
<div v-else class="flex justify-center items-start">
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
  import Cookies from 'js-cookie';
  import { ref } from 'vue';
  import StatusModal from '../crud/StatusModal.vue';
  import SendInvitationModal from '../crud/SendInvitationModal.vue';
  import EditModal from '../crud/EditModal.vue';
  import DeleteModal from '../crud/DeleteModal.vue';
  import AssignComConModal from '../crud/AssignComConModal.vue';

  const userId = useRoute().params.id;
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const user = ref();

  fetch(`${VUE_APP_URL}/clients/${userId}/`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    })
  .then(res => res.json())
  .then(json => {
    user.value = json
  })


</script>