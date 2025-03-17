<template>
    <SidebarMenu />
    <section class="contenido z-10">
      <div class="p-6 flex flex-col gap-6 w-full">
        <!-- División 1 -->
        <div class="w-full bg-white shadow-lg rounded-lg">
          <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg">
            Agregar Banco - Disponibles
          </h2>
          <div class="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
          <div class="p-4 flex w-[400px] flex-col items-center gap-4">
            <img 
              v-for="(banco, index) in bancosAgregados" 
              :key="index" 
              :src="banco.imagen" 
              alt="Banco"
              class="rounded-full w-30 h-30 cursor-pointer" 
              @click="mostrarDetalles(banco)"
            />
            <ul>
                <li>Titular: </li>
                <li>N° Cuenta:</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-tl-[60px] border w-[650px] shadow-lg flex">
        
        <img :src="bancoSeleccionado?.imagen" alt="Banco" class="w-120 h-120 mr-4 rounded-full self-center" />
        
        <div class="flex-1">
          <h2 class="text-xl text-[#2A5CAA] font-bold mb-9">Agregar Cuenta</h2>
          <form @submit.prevent="confirmarBanco">
            <div class="mb-2">
              <label class="block text-sm font-medium">Titular de la cuenta</label>
              <input type="text" v-model="form.titular" class="w-full p-2 border rounded-full bg-[#F5F5F5]">
            </div>
            <div class="mb-2">
              <label class="block text-sm font-medium">Número de cuenta</label>
              <input type="text" v-model="form.numeroCuenta" class="w-full p-2 border rounded-full bg-[#F5F5F5]">
            </div>
            <div class="mb-2">
                <label class="block text-sm font-medium">Tipo de cuenta</label>

                <div class="flex items-center gap-4">
                    <div class="flex items-center">
                    <input id="ahorro-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="ahorro-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-justify">Ahorro</label>
                    </div>

                    <div class="flex items-center">
                    <input id="corriente-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="corriente-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-justify">Corriente</label>
                    </div>
                </div>
            </div>

            <div class="mb-2">
              <label class="block text-sm font-medium">Tipo de Identificación</label>
              <select v-model="form.tipoIdentificacion" class="w-full p-2 border rounded-full bg-[#F5F5F5]">
                <option value="nit">NIT</option>
                <option value="cedula">Cedula Ciudadania</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="block text-sm font-medium">Número de Identificación</label>
              <input type="text" v-model="form.numeroIdentificacion" class="w-full p-2 border rounded-full bg-[#F5F5F5]">
            </div>
            
            <div class="flex justify-end mt-4 gap-2">
              <button type="button" @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded-lg">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import SidebarMenu from '@/components/SidebarMenu.vue';
  
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