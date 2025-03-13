<template>
    <MenuContador />
    <section class="contenido z-10 ">
      <div class="relative overflow-x-auto shadow-md">
        <section class="w-full  shadow-md">
          <h2 class="text-left text-[#2A5CAA] font-bold text-3xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
            Conciliación Bancaria
          </h2>
          <!-- Contenedor para las tarjetas (flexible en filas) -->
           <div>
            <div class=" p-3 flex justify-between items-center bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
                <!-- Título -->
                 <h2 class="text-[#2A5CAA] font-bold text-2xl">
                    Seleccióne Empresa
                </h2>
                <!-- Formulario de búsqueda -->
                <form class="flex items-center max-w-sm ">
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                    <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar" required />
                  </div>
                  <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                </form>
            </div>
        </div>
        
        <div class="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">        
          <!-- Tarjeta 1 -->
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center pb-10">
              <img class="w-45 h-45 rounded-full p-6" src="@/assets/E2.svg" alt="Bonnie image"/>
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Empresa 1</h5>
              <p class="mb-1 text-xl text-gray-900 dark:text-white">900123456-7</p>
            </div>
          </div>

          <!-- Tarjeta 2 -->
          

          <!-- Tarjeta 3 -->
          

          <!-- Tarjeta 4 -->
                   
        </div>

        <!--Siguiente fila-->
      </section>
    </div>
  </section>
  <FooterContaflow />
</template>

  
  <script setup>
  import FooterContaflow from '@/components/FooterContaflow.vue'
  import MenuContador from '../MenuContador.vue';
  </script>
  
  <style scoped>
  .contenido {
    padding: 20px;
    transition: margin-left 0.3s ease;
    padding-top: 250px;
    background-color: #F5F5F5;
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
  