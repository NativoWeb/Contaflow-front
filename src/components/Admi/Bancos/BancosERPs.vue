<template>
    <section class="contenido z-10">
      <div class="p-6 flex flex-col gap-6 w-full">
        <!-- División 1 -->
        <div class="w-full bg-white shadow-lg rounded-lg">
          <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg">
            Agregar Banco - Disponibles
          </h2>
          <div class="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  place-items-center">
            <img 
              v-for="(banco, index) in bancos" 
              :key="index" 
              :src="banco.imagen" 
              alt="Banco"
              class="rounded-full w-30 h-30 cursor-pointer" 
              @click="seleccionarBanco(banco)"
            />
          </div>
        </div>
  
<!-- División 2 -->
<div class="w-full bg-white shadow-lg rounded-lg">
  <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg">
    Mis Bancos
  </h2>
  <div class="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center">
    <div v-for="(banco, index) in bancosAgregados" :key="index" class="flex flex-col items-center">
      <img  
        :src="banco.imagen" 
        alt="Banco"
        class="rounded-full w-30 h-30 cursor-pointer" 
        @click="mostrarDetalles(banco)"
      />
      <!-- Mostrar Titular y Número de Cuenta -->
      <p class="text-sm text-[#2A5CAA] font-semibold mt-2">{{ banco.titular }}</p>
      <p class="text-sm text-gray-600">{{ banco.numeroCuenta }}</p>
    </div>
  </div>
</div>

      </div>
    </section>

  
<!-- Modal -->
<div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
  
  <div class="bg-white p-6 md:p-10 rounded-tl-[60px] w-full max-w-[750px]">
    
    <h2 class="text-xl text-[#2A5CAA] font-bold text-center md:text-left">Agregar Cuenta</h2>
    
    <div class="flex flex-col md:flex-row items-center md:items-start mt-4">
      
      <!-- Imagen del banco con mayor tamaño -->
      <div class="w-full md:w-[40%] flex justify-center items-center mb-4 md:mb-0">
        <img :src="bancoSeleccionado?.imagen" alt="Banco" class="w-40 h-40 md:w-60 md:h-60 rounded-full" />
      </div> 

      <!-- Contenedor del formulario -->
      <div class="w-full md:w-[60%]">
        <form @submit.prevent="confirmarBanco">
          <div class="mb-4">
            <label class="block text-sm font-medium text-[#193368]">Titular de la cuenta</label>
            <input type="text" v-model="form.titular" class="w-full p-2 border rounded-full bg-[#F5F5F5] text-[#193368]">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-[#193368]">Número de cuenta</label>
            <input type="text" v-model="form.numeroCuenta" class="text-[#193368] w-full p-2 border rounded-full bg-[#F5F5F5]">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-[#193368] mb-2">Tipo de cuenta</label>
            <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div class="flex items-center">
                <input id="ahorro-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded-sm">
                <label for="ahorro-checkbox" class="ml-2 text-sm font-medium text-[#193368]">Ahorro</label>
              </div>
              <div class="flex items-center">
                <input id="corriente-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded-sm">
                <label for="corriente-checkbox" class="ml-2 text-sm font-medium text-[#193368]">Corriente</label>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-[#193368]">Tipo de Identificación</label>
            <select v-model="form.tipoIdentificacion" class="w-full p-2 border rounded-full bg-[#F5F5F5] text-[#193368]">
              <option value="nit">NIT</option>
              <option value="cedula">Cédula Ciudadanía</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-[#193368]">Número de Identificación</label>
            <input type="text" v-model="form.numeroIdentificacion" class="w-full p-2 border rounded-full bg-[#F5F5F5] text-[#193368]">
          </div>
          <div class="flex justify-center md:justify-start mt-4 gap-2">
            <button type="button" @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded-full">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#08245B] text-white rounded-full">Confirmar</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>

  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const bancos = ref([
    { imagen: require('@/assets/BC.svg') },
    { imagen: require('@/assets/DD.svg') },
    { imagen: require('@/assets/BBVA.svg') },
    { imagen: require('@/assets/BAV.svg') },
    { imagen: require('@/assets/BA.svg') },
    { imagen: require('@/assets/Itau.svg') },
    { imagen: require('@/assets/BP.svg') },
    { imagen: require('@/assets/BB.svg') },
    { imagen: require('@/assets/BMM.svg') },
    { imagen: require('@/assets/Colpatria.svg') }
  ]);
  
  const showModal = ref(false);
  const form = ref({
    titular: '',
    numeroCuenta: '',
    tipoCuenta: '',
    tipoIdentificacion: '',
    numeroIdentificacion: ''
  });
  const bancosAgregados = ref([]);
  const bancoSeleccionado = ref(null);
  
  const seleccionarBanco = (banco) => {
    bancoSeleccionado.value = banco;
    showModal.value = true;
  };
  
  const confirmarBanco = () => {
    bancosAgregados.value.push({ ...bancoSeleccionado.value, ...form.value });
    showModal.value = false;
    form.value = { titular: '', numeroCuenta: '', tipoCuenta: 'corriente', tipoIdentificacion: 'dni', numeroIdentificacion: '' };
  };
  
  const mostrarDetalles = (banco) => {
    alert(`Titular: ${banco.titular}\nNúmero de cuenta: ${banco.numeroCuenta}\nTipo: ${banco.tipoCuenta}\nID: ${banco.tipoIdentificacion} - ${banco.numeroIdentificacion}`);
  };
  </script>