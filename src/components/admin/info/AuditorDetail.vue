<template>
  <!-- Título de la página -->
  <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 rounded-lg shadow-md text-center md:text-left">
    Información del usuario
  </h2>
<div v-if="data">
  <div class="w-full bg-white flex flex-col md:flex-row p-8">
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
      <EditModal :user="data" :title="'Actualizar Auditor'"/>
      <DeleteModal :id="data.id"/>
      <StatusModal :id="data.id" :status="data.status"/>
      <SendInvitationModal :user="data" :apiUrl="`${VUE_APP_URL}/users/email/${data.id}`"/>
      <AssignClientsModal :apiUrl="`${VUE_APP_URL}/users/`"/>
  </div>
</div>

<ClientsAccAudTable/>
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

  <div v-if="err" class="flex justify-center items-start">
    <span>{{ err }}</span>
  </div>
<!-- cargador -->
<div v-if="isLoading" class="flex justify-center items-start">
  <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
</div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import StatusModal from '../crud/StatusModal.vue';
  import ClientsAccAudTable from '../info/ClientsAccAudTable.vue';
  import AssignClientsModal from '../crud/AssignClientsModal.vue';
  import SendInvitationModal from '../crud/SendInvitationModal.vue';
  import EditModal from '../crud/EditModal.vue';
  import DeleteModal from '../crud/DeleteModal.vue';
  import GetServices from '@/services/APIService';

  const isLoading = ref(false);
  const userId = useRoute().params.id;
  const api = new GetServices();
  const data = api.getData();
  const err = api.getError();
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/auditors/${userId}/`;
  const urlApi = VUE_APP_URL + uri;

  api.callApi(urlApi, isLoading);
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