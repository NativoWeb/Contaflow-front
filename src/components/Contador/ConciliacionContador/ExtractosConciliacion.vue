<template>
    <MenuContador />
    <section class="contenido z-10 ">
        <div class="relative overflow-x-auto shadow-md w-full bg-white " style="height: 100%;">
            <h2 class="text-left text-[#2A5CAA] font-bold text-3xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
                Carga de Extractos Bancarios y Contables
            </h2>   
             <!-- Contenedor de los archivos alineados -->
             <div class="flex flex-col items-center space-y-12 p-3" >
                <!-- Primera fila de archivos -->
                <div class="flex flex-wrap justify-center gap-20 w-full">
                    <!-- Primer archivo -->
                    <div class="flex flex-col items-center ">
                        <h3 class="text-lg font-semibold text-[#2A5CAA] mb-2">Extracto Bancario</h3>
                        <label for="extracto-bancario" class="flex flex-col items-center justify-center w-72 h-52 border-2 border-[#2A5CAA] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <img class="w-12 h-12 mb-3 text-gray-500" src="@/assets/Archivos.svg" alt="Archivos">

                                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click para subir</span> o arrastra aquí</p>
                                <p class="text-xs text-gray-500">PDF, JPG, PNG (MAX. 5MB)</p>
                            </div>
                            <input id="extracto-bancario" type="file" class="hidden" />
                        </label>
                    </div>

                    <!-- Segundo archivo -->
                    <div class="flex flex-col items-center">
                        <h3 class="text-lg font-semibold text-[#2A5CAA] mb-2">Extracto Contable</h3>
                        <label for="extracto-contable" class="flex flex-col items-center justify-center w-72 h-52 border-2 border-[#2A5CAA] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <img class="w-12 h-12 mb-3 text-gray-500" src="@/assets/Archivos.svg" alt="Archivos">
                                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click para subir</span> o arrastra aquí</p>
                                <p class="text-xs text-gray-500">PDF, JPG, PNG (MAX. 5MB)</p>
                            </div>
                            <input id="extracto-contable" type="file" class="hidden" />
                        </label>
                    </div>
                </div>

                 <!-- Botón para enviar -->
                 <button class="mt-6 px-6 py-3 bg-[#08245B] hover:bg-[#2a4b8d] text-white text-lg font-semibold rounded-full  transition duration-300">
                    Procesar Conciliación
                </button>

            </div>
        </div>
    </section>
</template>

  
  <script setup>
  import MenuContador from '../MenuContador.vue';
  </script>
  
  <style scoped>
  .contenido {
    padding: 21px;
    transition: margin-left 0.3s ease;
    padding-top: 250px;
    background-color: #F5F5F5;
    margin-left: 80px; /* Esto se aplica por defecto en pantallas de escritorio */
    height: 100vh;
  }
  
  .menu-lateral.open ~ .contenido {
    margin-left: 309px;
    width: calc(100% - 309px);
  }
  
  /* Media query para pantallas móviles */
  @media (max-width: 768px) {
    .contenido {
      margin-left: 0; /* Esto se aplica en pantallas móviles */
      padding-top: 110px;
      height: 100%;
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
  