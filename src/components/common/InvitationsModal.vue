<template>
  <button class="btn-action">Reenviar invitación</button>
  <div 
  class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
  >
  <div class="relative w-full max-w-lg bg-white  p-6 transform transition-all duration-600 ease-in-out">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 ">
              <button  
                      class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">
                  &times;
              </button>
          </div>
          <!-- Modal body -->
          <div class="p-8 text-center space-y-4">
              <h3 class="mb-2 text-2xl font-semibold text-[#2A5CAA] dark:text-white">¡Invitación enviada con éxito!</h3>
              <!-- <p class="text-lg text-gray-700 dark:text-gray-300">
                  El usuario <strong>{{ userForm.first_name }}</strong> ha sido invitado a unirse a ContaFlow con el rol de Usere PYME.
              </p>
              <p class="text-lg text-gray-700 dark:text-gray-300">
                  <img src="@/assets/correo.svg" alt="Correo" class="inline-block h-6 w-6 mr-3" />
                  Se ha enviado un correo a <strong>{{ userForm.username }}</strong> con un enlace de activación.
              </p> -->
          </div>
      </div>
  </div>
</div>
</template>

