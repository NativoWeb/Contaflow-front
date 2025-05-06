<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6" v-if="clientData">
    <!-- Header con botón -->
    <div class="flex justify-between items-center mb-8 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900">Detalles del Usuario</h1>
      <button 
        @click="addClient" 
        type="button" 
        class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Asignar Cliente
      </button>
    </div>

    <!-- Tarjeta principal -->
    <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Sección superior con foto de perfil -->
      <div class="flex flex-col items-center bg-gradient-to-r from-blue-800 to-blue-600 p-8 text-center">
        <div class="relative mb-4">
          <img 
            class="w-24 h-24 rounded-full border-4 border-white shadow-md" 
            src="@/assets/img_usuario.svg" 
            alt="Foto de usuario"
          >
        </div>
        <h2 class="text-2xl font-bold text-white text-xl">{{ clientData.name }}</h2>
        <p class="text-blue-100 mt-1">{{ clientData.username }}</p>
      </div>

      <!-- Sección de información -->
      <div class="p-6 md:p-8">
        <h3 class="text-xl text-center my-8 font-semibold text-blue-800">Información empresa</h3>
        <!-- Primera fila -->
        <div class="flex flex-col md:flex-row gap-6 mb-6">
          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Nombre Cliente PYMES:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ clientData.name }}
            </div>
          </div>
        </div>

        <!-- Segunda fila -->
        <div class="flex flex-col md:flex-row gap-6 mb-6">
          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Nit:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ clientData.nit }}
            </div>
          </div>
                    
          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Correo Electrónico:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ clientData.username }}
            </div>
          </div>
        </div>

        <!-- Tercera fila -->
        <div class="flex flex-col md:flex-row gap-6 mb-6">
          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Número de Celular:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ clientData.phone_number }}
            </div>
          </div>

          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Dirección:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ clientData.address }}
            </div>
          </div>

          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Sector:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ clientData.sector }}
            </div>
          </div>
        </div>

        <!-- Cuarta fila -->
        <h3 class="text-xl text-center my-8 font-semibold text-blue-800">Información representante</h3>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Nombre:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ clientData.first_name }} {{  clientData.last_name }}
            </div>
          </div>
          
        </div>

        <div class="flex flex-col md:flex-row gap-6">

          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Tipo de Identificación:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              <span v-if="clientData.id_type == 'Cedula_Ciudadania'">Cédula de Ciudadanía</span>
              <span v-else-if="clientData.id_type == 'Cedula_Extranjeria'">Cédula de Extranjería</span>
              <span v-else-if="clientData.id_type == 'Pasaporte'">Pasaporte</span>
            </div>
          </div>

          <div class="flex-1">
            <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
              Numero de Identificación:
            </label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-700">
              {{ clientData.id_number }}
            </div>
          </div>
        </div>

    <!-- Sección inferior -->
    <div class="max-w-6xl mx-auto mt-8">
      <div class="flex justify-center">
        <ConciliationsClients/>
      </div>
    </div>
  </div>
    </div>

<div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
  <div class="bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 scale-95 animate-pulse-once">
    <div class="flex flex-col items-center justify-center space-y-4">
      <div class="relative">
        <svg class="w-16 h-16 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p class="text-gray-700 font-medium">Procesando, esto puede tomar un momento...</p>
    </div>
  </div>
</div>

<!-- Success Modal -->
<div v-if="alertEditedModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6 flex flex-col items-center text-center">
      <div class="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Operación exitosa</h3>
      <p class="text-gray-600 mb-6">Se asignó el cliente correctamente</p>
      <button 
        @click="isEditedToggle"
        type="button" 
        class="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Aceptar
      </button>
    </div>
  </div>
</div>

<!-- Error Modal -->
<div v-if="err" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="ml-3 text-xl font-semibold text-gray-900">¡Error!</h3>
        </div>
        <button 
          @click="toggleError" 
          class="text-gray-400 hover:text-gray-500 transition-colors duration-200"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="py-4">
        <p class="text-gray-700 font-medium text-center">
          {{ err }}
        </p>
      </div>
      <div class="mt-6">
        <button 
          @click="toggleError"
          type="button" 
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import UserService from '@/services/userService';
  import ConciliationsClients from './ConciliationsClients.vue';
  import router from '@/router';

  const clientId = useRoute().params.id;
  const getUser = new UserService();
  const isLoading = ref(false);
  const data = ref(null);
  const clientData = ref(null);
  const err = ref(null);
  const alertEditedModal = ref("");
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/clients/${clientId}/`
  const urlApi = VUE_APP_URL + uri;
  const userId = useRoute().params.userId;
  const userRole = useRoute().params.role;
  const url = `${VUE_APP_URL}/${userRole}/update/${userId}/`;
  let clientsList = [];
  let clients = ``;

  onMounted(async () => {
    isLoading.value = true;
    try {
      await getUser.getUserById(urlApi)
      clientData.value = getUser.getData().value;
      console.log(clientData.value)
    }
    catch(er){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

  onMounted(async () => {
    try{
      await getUser.getUserById(`${VUE_APP_URL}/${userRole}/${userId}/`);
      data.value = getUser.getData().value;
      clientsList += [data.value.clients];
      // si el usuario tiene clientes o si no
      clients = clientsList ? clientsList.split(",") : [];
    }
    catch(err){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

  const isEditedToggle = () => {
    isLoading.value = false;
    alertEditedModal.value = !alertEditedModal.value;
    if (alertEditedModal.value == false){
      router.back()
    }
  }

  const addClient = () => {
    isLoading.value = true;
    clients.push(clientId)
    // set para evitar ids duplicados
    const uniqueClients = [...new Set(clients)];
    getUser.editUser(url, {clients: uniqueClients}, isEditedToggle)
    isLoading.value = false;
  }
</script>