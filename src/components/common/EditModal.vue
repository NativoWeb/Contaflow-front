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
  import { ref, defineProps } from 'vue';

  const showEditModal = ref(false);

  const props = defineProps({
    user: Object
  })

  function toggleShowEditModal(){
    showEditModal.value = !showEditModal.value;
  }

  console.log(props.user);

  // Funcion
  const submitEdit = () => {
    console.log("Usuario Editado")
  }

</script>