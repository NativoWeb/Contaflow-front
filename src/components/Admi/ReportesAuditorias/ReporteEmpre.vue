<template>
    <section class="contenido z-10">
      <div class="p-6 flex flex-col gap-6 w-full">
        <!-- Título separado con margen inferior -->
        <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg mb-4">
            Reporte de Conciliación Bancaria y Contable
        </h2>
        <!-- División 1 -->
        <div class="w-full bg-white shadow-lg rounded-lg">
  
          <div>
            <div class="p-3 flex justify-between items-center bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
              <!-- Título -->
              <h2 class="text-[#2A5CAA] font-bold text-2xl">
                Seleccióne Empresa
              </h2>
              <!-- Formulario de búsqueda -->
              <form class="flex items-center max-w-sm">
                <label for="simple-search" class="sr-only">Search</label>
                <div class=" w-full">
                  <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Buscar" required />
                </div>
                <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </form>
            </div>
          </div>
  
          <!-- Botones de bancos con nombres -->
          <div class="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center">
            <button 
              v-for="(banco, index) in bancos" 
              :key="index" 
              class="flex flex-col items-center p-2 rounded-lg transition hover:scale-105 focus:outline-none">
              <img 
                :src="banco.imagen" 
                :alt="banco.nombre"
                class="rounded-full w-24 h-24 cursor-pointer"
              />
              <span class="text-sm font-medium text-gray-700 mt-2">{{ banco.nombre }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const bancos = ref([
    { imagen: require('@/assets/E1.svg'), nombre: 'Empresa A' },
    { imagen: require('@/assets/E3.svg'), nombre: 'Empresa B' },
  ]);
  </script>
  