<template>
  
  <div class=" mt-8" v-if="data">
    <button @click="addClient" type="button" class="btn-action">Asignar Cliente</button>

    
    <div class="w-full bg-white flex flex-col p-8 shadow-md" style="border-radius: 8px 8px 8px 8px;">
      <!-- Sección de información -->
      <div class="flex-1" >
        <div class="gap-2 flex flex-col items-center justify-center">
      <img class="rounded-full w-20 h-20" src="@/assets/img_usuario.svg" alt="foto usuario">
        <h3>{{ data.first_name }} {{ data.last_name }}</h3>
        <h5>{{ data.username }}</h5>
    </div>
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
    <div class="flex gap-6 items-center justify-around w-[100%]">
      <CompaniesClients/>
      <ConciliationsClients/>
    </div>
  </div>

    <!-- Modal -->
    <div v-if="isLoading" 
    class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
    :class="{'scale-100': isLoading}">
    <div class="relative w-full max-w-lg  p-6 transform transition-all duration-600 ease-in-out">
        <!-- Modal content -->
        <div class="relative dark:bg-gray-800">
            <!-- Modal body -->
            <div class="p-8 text-center space-y-4">
                <img src="@/assets/loader.svg" alt="">
            </div>
        </div>
    </div>
  </div>

    <!-- Edit Successfull! -->
    <div v-if="alertEditedModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/update.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">Se asigno el Cliente de manera de correcta</h3>

          <button @click="isEditedToggle"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
              Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>

    <!-- Modal de Error -->
    <div v-if="err" 
    class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
    :class="{'scale-100': err}">
    <div class="relative w-full max-w-lg bg-white p-6 transform transition-all duration-600 ease-in-out">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg dark:bg-gray-800">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4">
                <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
                <button @click="toggleError" 
                        class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">
                    &times;
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-8 text-center space-y-4">
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    <strong>{{ err }}</strong>
                </p>
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
  import CompaniesClients from './CompaniesClients.vue';
  import ConciliationsClients from './ConciliationsClients.vue';
  import router from '@/router';

  const clientId = useRoute().params.id;
  const getUser = new UserService();
  const isLoading = ref(false);
  const data = ref(null);
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
      data.value = getUser.getData().value;
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
    console.log(clients)
    // set para evitar ids duplicados
    const uniqueClients = [...new Set(clients)];
    getUser.editUser(url, {clients: uniqueClients}, isEditedToggle)
    isLoading.value = false;
  }

</script>