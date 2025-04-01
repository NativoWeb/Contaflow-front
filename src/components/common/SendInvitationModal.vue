<template>
<button @click="toggleShowInvitationModal" class="btn-action">Reenviar Invitación</button>
    <!-- Modal para Editar -->
  <div v-if="showInvitationModal" 
    class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
  <div class="p-6 relative w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <!-- Encabezado -->
    <div class="p-6 md:p-5 text-center">
      <img src="@/assets/person.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
      <h3 class="text-xl font-semibold text-[#2A5CAA] m-4">Reenviar Invitación</h3>
      <p class=" text-lg font-normal text-[#000000]">¿Desea reenviar la invitación al usuario: <span class="font-semibold text-[#2A5CAA]"> {{ user.first_name }}?</span> </p>
    </div>
  
    <!-- Botones -->
    <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
      <button @click="toggleShowInvitationModal"
              class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                    focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                    dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Cancelar
      </button>
      <button @click="sendInvitation"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
        Confirmar
      </button>
    </div>
  </div>
  </div>

  <!-- Edit Successfull! -->
  <div v-if="alertInvitationModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/update.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">Se le reenvio la información al usuario</h3>

          <button @click="toggleAlertInvitation"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
              Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Cookies from 'js-cookie';
  import {defineProps, ref} from 'vue'
  
  const showInvitationModal = ref(false);
  const alertInvitationModal = ref(false);

  const props = defineProps({
    user: Object,
    apiUrl: String
  })

  console.log(props.user)

  function sendInvitation(){
    fetch(props.apiUrl, {
      method: 'PATCH',
      body: JSON.stringify(props.user),
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    })
    .then(res => {
    if (!res.ok) {
      if (res.status === 401) alert("Acceso denegado");
      // if (res.status === 400) alert("Este usuario ya esta registrado");
      if (res.status === 403) alert("Tu rol no permite registrar usuarios");
      throw new Error(`Error ${res.status}`);
    }
    return res.json();
  })
  .then((json) => {
    console.log(json)
    toggleAlertInvitation()
  })
  .catch(err => {
    console.error(err)
  })
  .finally(() => {
    showInvitationModal.value = false;
  });
  } 

  const toggleShowInvitationModal = () => {
    showInvitationModal.value = !showInvitationModal.value;
  }

  const toggleAlertInvitation = () => {
    alertInvitationModal.value = !alertInvitationModal.value;
    if (alertInvitationModal.value == false){
      location.reload()
    }
  }

</script>