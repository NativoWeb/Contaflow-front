<template>
  <div>
    <!-- Formulario -->
    <form @submit.prevent="addUser" class="w-full p-6">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Nombres:
          </label>
          <input v-model="userForm.first_name" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus nombres">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Apellidos:
          </label>
          <input v-model="userForm.last_name" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus apellidos">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Celular:
          </label>
          <input v-model="userForm.phone_number" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese su celular">
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Correo:
          </label>
          <input v-model="userForm.username" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="email" placeholder="Ingrese su correo">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Rol:
          </label>
          <div>
            <select  class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500">
              <option value="ADMIN">Administrador</option>
              <option value="CONTADOR">Contador</option>
              <option value="AUDITOR">Auditor</option>
              <option value="CLIENTE">Cliente PYME</option>
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
  </div>
</template>


<script setup>
import { reactive } from "vue";
import Cookies from 'js-cookie';

// Estado del formulario
const userForm = reactive({
  first_name: "",
  last_name: "",
  phone_number: "",
  username: "",
  role: "CLIENTE",
});

function addUser(){
  fetch('http://127.0.0.1:8000/users/email/', {
    method: 'POST',
    body: JSON.stringify(userForm),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        alert("Acceso denegado")
      }
      if (res.status === 400 ){
        alert("Los datos no pueden estar vacios")
      }
      if (res.status === 403){
        alert("Tu rol no permite registrar usuarios")
      }
      throw new Error(`Hubo un error de estado ${res.status}`)
    }
    else {
      return res.json()
    }
  })
  .then(() => {
    alert("Se envio un correo al usuario")
    location.reload()
  })
  .catch(err => {
    console.error(err)
  })
}
</script>