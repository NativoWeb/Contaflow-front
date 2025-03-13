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
            <!-- Formulario -->
            <form class="w-full p-6">
              <!-- Botones arriba en móviles -->
              <div class="flex flex-col-reverse md:hidden gap-4 mb-4">
                <button class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
                  Editar perfil
                </button>
                <button class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
                  Cambiar contraseña
                </button>
              </div>
  
              <!-- Diseño móvil: una columna, escritorio: tres filas -->
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
                <!-- Primera fila en escritorio -->
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Nombre:</label>
                  <input v-model="form.nombre" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese el Nombre">
                </div>
  
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Apellido:</label>
                  <input v-model="form.apellido" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese el Apellido">
                </div>
  
                <!-- Botón Editar Perfil en escritorio -->
                <div class="hidden md:flex items-end">
                  <button class="w-full md:w-[80%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
                    Editar perfil
                  </button>
                </div>
  
                <!-- Segunda fila en escritorio -->
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Número de Identificación:</label>
                  <input v-model="form.identificacion" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese el Número">
                </div>
  
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Rol:</label>
                  <input v-model="form.rol" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese el Rol">
                </div>
  
                <!-- Botón Cambiar Contraseña en escritorio -->
                <div class="hidden md:flex items-end">
                  <button class="w-full md:w-[80%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
                    Cambiar contraseña
                  </button>
                </div>
  
                <!-- Tercera fila en escritorio -->
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Correo:</label>
                  <input v-model="form.correo" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese el Correo">
                </div>
  
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Celular:</label>
                  <input v-model="form.celular" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese el Celular">
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </section>
    <FooterContaflow />
  </template>
  
  
  
  <script setup>
  import MenuContador from '../MenuContador.vue';
  import FooterContaflow from '@/components/FooterContaflow.vue'
  import { reactive } from "vue";
  
  const form = reactive({
    nit: "",
    razonSocial: "",
    direccion: "",
    sector: "",
  });
  </script>
  
  <style scoped>
  .contenido {
    padding: 20px;
    transition: margin-left 0.3s ease;
    padding-top: 250px;
    background-color:  
    
    #F5F5F5;
    margin-left: 80px; /* Esto se aplica por defecto en pantallas de escritorio */
    height: 100vh;
  }
  
  .menu-lateral.open ~ .contenido {
    margin-left: 309px;
    width: calc(100% - 309px);
    height: 90%;
  }
  
  /* Media query para pantallas móviles */
  @media (max-width: 768px) {
    .contenido {
      margin-left: 0; /* Esto se aplica en pantallas móviles */
      padding-top: 110px;
    }
  
    .menu-lateral.open ~ .contenido {
      margin-left: 0; /* Asegúrate de que el margen izquierdo sea 0 en móviles incluso cuando el menú esté abierto */
      width: 100%; /* Asegúrate de que el contenido ocupe el 100% del ancho en móviles */
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
  