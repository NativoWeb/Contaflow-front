<template>
  <MenuContador />

  <section class="contenido z-10">
    <div class="relative overflow-x-auto shadow-md">
      <section class="w-full bg-white shadow-md">
        
        <!-- Contenedor del título con imagen -->
        <div class="flex items-center gap-4 h-[99px] mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-6 rounded-md">
          <img src="@/assets/img_usuario.svg" alt="Empresa Logo" class="w-16 h-16 object-cover rounded-full ">
          <h2 class="text-[#2A5CAA] font-bold text-2xl">Yina Calderon</h2>
        </div>

        <div>
          <!-- Información del usuario -->
          <div class="w-full p-6">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
              
              <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Nombre:</label>
                <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.nombre }}</p>
              </div>

              <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Apellido:</label>
                <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.apellido }}</p>
              </div>

              <!-- Botón Editar Perfil -->
              <div class="hidden md:flex items-end">
                <button @click="router.push('/editar-perfil')" class="w-full md:w-[80%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
                  Editar perfil
                </button>
              </div>

              <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Número de Identificación:</label>
                <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.identificacion }}</p>
              </div>

              <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Rol:</label>
                <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.rol }}</p>
              </div>

              <!-- Botón Cambiar Contraseña -->
              <div class="hidden md:flex items-end">
                <button @click="router.push('/cambiar-contrasena')" class="w-full md:w-[80%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
                  Cambiar contraseña
                </button>
              </div>

              <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Correo:</label>
                <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.correo }}</p>
              </div>

              <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Celular:</label>
                <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.celular }}</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import MenuContador from '../MenuContador.vue';
import { reactive } from "vue";
import { useRouter } from "vue-router"; // Importar useRouter

const router = useRouter(); // Instancia de router

const form = reactive({
  nombre: "Yina",
  apellido: "Calderon",
  identificacion: "123456789",
  rol: "Administrador",
  correo: "yina@example.com",
  celular: "3001234567"
});
</script>


<style scoped>
.contenido {
  padding: 20px;
  transition: margin-left 0.3s ease;
  padding-top: 250px;
  background-color: #F5F5F5;
  margin-left: 80px;
  height: 100vh;
}

.menu-lateral.open ~ .contenido {
  margin-left: 309px;
  width: calc(100% - 309px);
}

@media (max-width: 768px) {
  .contenido {
    margin-left: 0;
    padding-top: 110px;
  }

  .menu-lateral.open ~ .contenido {
    margin-left: 0;
    width: 100%;
    padding-top: 110px;
  }
}

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
