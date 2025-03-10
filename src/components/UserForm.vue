<template>
  <div>
    <!-- Formulario -->
    <form @submit.prevent="enviarFormulario" class="w-full">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Nombres:
          </label>
          <input v-model="form.first_name" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus nombres">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Apellidos:
          </label>
          <input v-model="form.last_name" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus apellidos">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Celular:
          </label>
          <input v-model="form.phone_numbre" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese su celular">
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Correo:
          </label>
          <input v-model="form.email" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="email" placeholder="Ingrese su correo">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Rol:
          </label>
          <div class="relative">
            <select v-model="form.role" class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500">
              <option value="Administrador">Administrador</option>
              <option value="Contador">Contador</option>
              <option value="Auditor">Auditor</option>
              <option value="Cliente PYME">Cliente PYME</option>
            </select>
          </div>
        </div>
        <div class="flex items-end">
          <button type="submit" class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
            Añadir usuario
          </button>
        </div>
      </div>
    </form>

    <!-- Modal -->
    <div v-if="modalVisible" class=" z-[100] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

      <div class="bg-white p-6 shadow-lg w-96 relative" style="border-radius: 30px 0px 0px 0px;">
        <!-- Botón de cerrar (X) -->
        <button @click="modalVisible = false" 
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center">
          &times;
        </button>

        <p class="text-[#2A5CAA] font-bold mb-4 items-center">
          ¡Invitación enviada con exito!
        </p>

        <!-- Mensaje principal -->
        <p class="text-gray-800 font-medium mb-4">
          El usuario <span class="font-bold">{{ form.nombres }}</span> ha sido invitado a unirse a ContaFlow con el rol de <span class="font-bold">{{ form.rol }}</span>.
        </p>

        <!-- Segundo mensaje separado -->
        <p class="text-gray-600"><i class='bx bx-envelope' style='color:#2a5caa'  ></i>
          Se ha enviado un correo a <span class="font-bold">{{ form.correo || 'ejemplo@gmail.com' }}</span> con un enlace de activación.
        </p>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// Estado del formulario
const form = reactive({
  first_name: "",
  last_name: "",
  phone_numbre: "",
  email: "",
  role: "Cliente PYME",
});

// Estado del modal
const modalVisible = ref(false);

// Función para manejar el envío del formulario
const enviarFormulario = () => {
  modalVisible.value = true;
};

// fetch("", {

// })
// .then(res => res.json())
// .then(json => {
//   console.log(json)
// })
// .catch(err => {
//   console.error(err)
// })
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
</style>
