<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6" v-if="data">
    <!-- Tarjeta principal -->
    <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Sección superior -->
      <div class="flex flex-col items-center bg-gradient-to-r from-blue-800 to-blue-600 p-8 text-center">
        <div class="relative mb-4">
          <img 
            class="w-24 h-24 shadow-md" 
            src="@/assets/img_usuario.svg" 
            alt="Foto de usuario"
          >
        </div>
        <h2 class="text-2xl font-bold text-white text-xl">{{ data.name }}</h2>
        <p class="text-blue-100 mt-1">{{ data.username }}</p>
      </div>
      
              <!-- Botones de acción -->
        <div class="flex flex-col md:flex-row justify-center gap-4 mt-10">
          <EditModal :user="data" :title="'Actualizar Cliente'" />
          <DeleteModal :id="String(data.id)" />
          <StatusModal :id="String(data.id)" :status="data.status" />
          <SendInvitationModal :user="data" :apiUrl="`${VUE_APP_URL}/users/email/${data.id}`" />
        </div>

      <!-- Información -->
      <div class="p-6 md:p-8">
        <h3 class="text-xl text-center my-8 font-semibold text-blue-800">Información Personal</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Tipo de Identificación:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              <span v-if="data.id_type === 'Cedula_Ciudadania'">Cédula de Ciudadanía</span>
              <span v-else-if="data.id_type === 'Cedula_Extranjeria'">Cédula de Extranjería</span>
              <span v-else-if="data.id_type === 'Pasaporte'">Pasaporte</span>
              <span v-else>{{ data.id_type }}</span>
            </div>
          </div>

          <div>
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Número de Identificación:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ data.id_number }}
            </div>
          </div>

          <div>
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Número de Celular:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ data.phone_number }}
            </div>
          </div>

          <div>
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Correo Electrónico:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ data.username }}
            </div>
          </div>

          <div>
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Rol:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ data.role }}
            </div>
          </div>

          <div>
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Estado:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ data.status }}
            </div>
          </div>
        </div>
        <div class="max-w-6xl mx-auto mt-8">
          <div class="flex justify-center">
        <ConciliationsClients/>
      </div>
    </div>
      </div>
    </div>
  </div>

  <!-- Error -->
  <div v-if="err" class="flex justify-center items-start mt-10">
    <span class="text-red-600">{{ err }}</span>
  </div>

  <!-- Cargando -->
  <div v-if="isLoading" class="flex justify-center items-start">
    <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import StatusModal from '../crud/StatusModal.vue';
import SendInvitationModal from '../crud/SendInvitationModal.vue';
import EditModal from '../crud/EditModal.vue';
import DeleteModal from '../crud/DeleteModal.vue';
import UserService from '@/services/userService';
import { onMounted, ref } from 'vue';
import ConciliationsClients from '../crud/assign/ConciliationsClients.vue';

const getUser = new UserService();
const userId = useRoute().params.id;
const isLoading = ref(false);
const data = ref(null);
const err = ref(null);
const VUE_APP_URL = process.env.VUE_APP_URL;
const uri = `/clients/${userId}/`;
const urlApi = VUE_APP_URL + uri;

defineProps(['id']);

onMounted(async () => {
  isLoading.value = true;
  try {
    await getUser.getUserById(urlApi);
    data.value = getUser.getData().value;
  } catch (error) {
    err.value = getUser.getError().value;
  } finally {
    isLoading.value = false;
  }
});
</script>
