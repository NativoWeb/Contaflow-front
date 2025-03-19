<template>
  <div>
    <!-- Formulario -->
    <form @submit.prevent="enviarFormulario" class="w-full p-8">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            NIT:
          </label>
          <input v-model="form.nit" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese su NIT">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Razón Social:
          </label>
          <input v-model="form.razonSocial" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese la Razón Social">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Dirección:
          </label>
          <input v-model="form.direccion" class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese la Dirección">
        </div>
      </div>
  
      <!-- Segunda fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Sector económico:
          </label>
          <div>
            <select  class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500">
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
        <div class="flex items-end">
          <button class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
            Añadir Empresa
          </button>
        </div>
      </div>
    </form>

    <!-- Modal -->
    <div v-if="modalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div class="bg-white p-6 shadow-lg w-96 relative rounded-tl-3xl">
        <!-- Botón de cerrar (X) -->
        <button @click="modalVisible = false" 
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center">
          &times;
        </button>
        <p class="text-[#2A5CAA] font-bold mb-4 text-center">
          ¡Empresa agregada con éxito!
        </p>
        <p class="text-gray-800 font-medium mb-4 text-center">
          La empresa <span class="font-bold">{{ form.razonSocial }}</span> ha sido agregada exitosamente a ContaFlow.
        </p>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";

// Estado del formulario
const form = ref({
  nit: "",
  razonSocial: "",
  direccion: "",
  sector: ""
});

// Estado del modal
const modalVisible = ref(false);

// Función para manejar el envío del formulario
const enviarFormulario = () => {
  if (form.value.nit && form.value.razonSocial && form.value.direccion && form.value.sector) {
    modalVisible.value = true;
  } else {
    alert("Por favor, complete todos los campos antes de enviar el formulario.");
  }
};
</script>
  
