<template>
  <div class="mt-8" v-if="data">
    <div class="flex flex-col items-center justify-center">
      <img class="rounded-full w-20 h-20" src="@/assets/img_usuario.svg" alt="foto usuario">
        <h3>{{ data.first_name }} {{ data.last_name }}</h3>
        <h5>{{ data.username }}</h5>
    </div>
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
    <div>
      <CompaniesClients :data="data"/>
      <ConciliationsClients :data="data"/>
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

  const userId = useRoute().params.id;
  const getUser = new UserService();
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/clients/${userId}/`
  const urlApi = VUE_APP_URL + uri;

  onMounted(async () => {
    isLoading.value = true;
    try {
      await getUser.getUserById(urlApi)
      data.value = getUser.getData().value;
      console.log(data)
    }
    catch(er){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

</script>