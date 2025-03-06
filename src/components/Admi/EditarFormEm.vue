<template>
    <div>
      <!-- Formulario -->
      <form id="editForm" class="p-6 w-ful">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <!-- Columna de la foto -->
                <div class="flex flex-col items-center">
                    <img class="rounded-full w-[160px] h-[160px] mb-2" src="../../assets/empresass.svg" alt="image description">
                    <input type="file" id="photo" name="photo" accept="image/*" class="mt-2">
                </div>

                <!-- Campos de información -->
                <div class="flex flex-col">
                    <label for="nombre" class="font-bold">NIT</label>
                    <input type="text" id="nombre" name="nombre" required class="p-2 border border-gray-300 rounded-lg mb-2">

                    <label for="direccion" class="font-bold">Razón Social</label>
                    <input type="text" id="direccion" name="direccion" required class="p-2 border border-gray-300 rounded-lg mb-2">
                    
                </div>
                
                <div class="flex flex-col">
                    <label for="celular" class="font-bold">Dirección</label>
                    <input type="text" id="celular" name="celular" required class="p-2 border border-gray-300 rounded-lg mb-2">
                    
                    <label for="apellido" class="font-bold">Sector Económico *</label>
                    <select id="rol" class="p-2 border border-gray-300 rounded-lg mb-2">
                        <option value="Comercio y Ventas">Comercio y Ventas</option>
              <option value="Restaurantes y Gastronomía">Restaurantes y Gastronomía</option>
              <option value="Construcción e Infraestructura">Construcción e Infraestructura</option>
              <option value="Servicios Profesionales">Servicios Profesionales</option>
              <option value="Finanzas y Seguros">Finanzas y Seguros</option>
              <option value="Industria y Manufactura">Industria y Manufactura</option>
              <option value="Transporte y Logística">Transporte y Logística</option>
              <option value="Salud y Medicina">Salud y Medicina</option>
              <option value="Educación y Formación">Educación y Formación</option>
              <option value="Tecnología e Informática">Tecnología e Informática</option>
                    </select>
                </div>
            </div>
            <!-- Contenedor de los botones alineados a la derecha -->
            <div class="flex justify-end p-3">
                <div class="flex gap-4">
                    <button type="button" id="cancelar" class="px-4 py-2 border border-gray-800 rounded-lg bg-white text-gray-800">
                        Cancelar
                    </button>
                    <button type="submit" id="guardar" class="px-4 py-2 bg-[#08245B] text-white rounded-lg">
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    </div>
  </template>
    
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
  