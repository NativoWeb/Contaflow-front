<template>

  <button @click="toggleShowEditModal" class="btn-action">Editar</button>
    <!-- Modal para Editar -->
  <div v-if="showEditModal" 
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
            <input v-model="edituser.first_name" type="text" class="text-left text-[#193368] w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Apellidos:</label>
            <input v-model="edituser.last_name" type="text" class="text-left text-[#193368] w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">
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
            <input v-model="edituser.phone_number" type="text" class="text-left text-[#193368] w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Correo Electrónico:</label>
            <input v-model="edituser.username" type="email" class="text-left w-full text-[#193368] bg-gray-100 border border-gray-300 rounded-full py-2 px-3">
          </div>
        </div>
      </form>
    </div>

    <!-- Botones -->
    <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
      <button @click="toggleShowEditModal"
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
</template>

<script setup>
  import { ref, defineProps, reactive } from 'vue';
  import Cookies from 'js-cookie';



  const showEditModal = ref(false);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  

  
  const props = defineProps({
    user: Object
  })

  const edituser = reactive({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    phone_number: props.user.phone_number,
    username: props.user.username
  });

  function toggleShowEditModal(){
    showEditModal.value = !showEditModal.value;
  }

  console.log(props.user);

  // Funcion
  const submitEdit = () => {

    fetch(`${VUE_APP_URL}/users/update/${props.user.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}` 
      },
      body: JSON.stringify({
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        phone_number: props.user.phone_number,
        username: props.user.username
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    showEditModal.value = false;

    console.log("Usuario Editado")
  }

</script>