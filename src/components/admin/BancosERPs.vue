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
<div class="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] p-3 rounded-t-lg">
  <h2 class="text-xl font-bold text-[#2A5CAA] mb-2 md:mb-0">
    Mis Bancos
  </h2>
  <div class="flex items-center bg-white rounded-full border border-gray-300 px-4 py-2 w-full md:w-80">
    <svg class="w-6 h-6 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input 
      type="text" 

      v-model="searchQuery" 
      placeholder="Buscar..." 
      class="outline-none border-none text-base w-full" 
    />
  </div>
</div>

<div class="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center">
  <div v-for="(banco, index) in filteredBancos" :key="index" class="flex flex-col items-center">
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
          <p v-if="errors.titular" class="text-red-500 text-xs mt-1">{{ errors.titular }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-[#193368]">Número de cuenta</label>
          <input type="text" v-model="form.numeroCuenta" class="text-[#193368] w-full p-2 border rounded-full bg-[#F5F5F5]">
          <p v-if="errors.numeroCuenta" class="text-red-500 text-xs mt-1">{{ errors.numeroCuenta }}</p>
        </div>
        <div class="mb-4">
<label class="block text-sm font-medium text-[#193368] mb-2">Tipo de cuenta</label>
<div class="flex flex-col md:flex-row items-start md:items-center gap-4">
  <div class="flex items-center">
    <input id="ahorro-radio" type="radio" v-model="form.tipoCuenta" value="ahorro" class="w-4 h-4 text-blue-600 border-gray-300">
    <label for="ahorro-radio" class="ml-2 text-sm font-medium text-[#193368]">Ahorro</label>
  </div>
  <div class="flex items-center">
    <input id="corriente-radio" type="radio" v-model="form.tipoCuenta" value="corriente" class="w-4 h-4 text-blue-600 border-gray-300">
    <label for="corriente-radio" class="ml-2 text-sm font-medium text-[#193368]">Corriente</label>
  </div>
</div>
<p v-if="errors.tipoCuenta" class="text-red-500 text-xs mt-1">{{ errors.tipoCuenta }}</p>
</div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-[#193368]">Tipo de Identificación</label>
          <select v-model="form.tipoIdentificacion" class="w-full p-2 border rounded-full bg-[#F5F5F5] text-[#193368]">
            <option value="nit">NIT</option>
            <option value="cedula">Cédula Ciudadanía</option>
          </select>
          <p v-if="errors.tipoIdentificacion" class="text-red-500 text-xs mt-1">{{ errors.tipoIdentificacion }}</p>

        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-[#193368]">Número de Identificación</label>
          <input type="text" v-model="form.numeroIdentificacion" class="w-full p-2 border rounded-full bg-[#F5F5F5] text-[#193368]">
          <p v-if="errors.numeroIdentificacion" class="text-red-500 text-xs mt-1">{{ errors.numeroIdentificacion }}</p>
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
import { ref, reactive, computed } from "vue";

const bancos = ref([
{ nombre: "BC", imagen: require("@/assets/BC.svg") },
{ nombre: "DD", imagen: require("@/assets/DD.svg") },
{ nombre: "BBVA", imagen: require("@/assets/BBVA.svg") },
{ nombre: "BAV", imagen: require("@/assets/BAV.svg") },
{ nombre: "BA", imagen: require("@/assets/BA.svg") },
{ nombre: "Itau", imagen: require("@/assets/Itau.svg") },
{ nombre: "BP", imagen: require("@/assets/BP.svg") },
{ nombre: "BB", imagen: require("@/assets/BB.svg") },
{ nombre: "BMM", imagen: require("@/assets/BMM.svg") },
{ nombre: "Colpatria", imagen: require("@/assets/Colpatria.svg") }
]);

const showModal = ref(false);
const searchQuery = ref("");

const form = reactive({
titular: "",
numeroCuenta: "",
tipoCuenta: "",
tipoIdentificacion: "",
numeroIdentificacion: "",
});

const errors = reactive({
titular: "",
numeroCuenta: "",
tipoCuenta: "",
tipoIdentificacion: "",
numeroIdentificacion: "",
});

const bancosAgregados = ref([]);
const bancoSeleccionado = ref(null);

const seleccionarBanco = (banco) => {
// Buscar si el banco ya está registrado
const bancoExistente = bancosAgregados.value.find((b) => b.nombre === banco.nombre);

if (bancoExistente) {
  // Si ya está registrado, llenar el formulario con los datos existentes
  Object.assign(form, bancoExistente);
} else {
  // Si es nuevo, limpiar el formulario
  Object.assign(form, {
    titular: "",
    numeroCuenta: "",
    tipoCuenta: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
  });
}

bancoSeleccionado.value = banco;
showModal.value = true;
};

const confirmarBanco = () => {
// Validaciones antes de guardar
if (!form.titular) {
  errors.titular = "El titular es obligatorio.";
  return;
}
if (!/^[0-9]+$/.test(form.numeroCuenta)) {
  errors.numeroCuenta = "El número de cuenta solo debe contener números.";
  return;
}
if (!form.tipoCuenta) {
  errors.tipoCuenta = "Seleccione un tipo de cuenta.";
  return;
}
if (!form.tipoIdentificacion) {
  errors.tipoIdentificacion = "Seleccione un tipo de identificación.";
  return;
}
if (!form.numeroIdentificacion) {
  errors.numeroIdentificacion = "Ingrese un número de identificación válido.";
  return;
}

// Verificar si ya existe el banco en la lista de agregados
const index = bancosAgregados.value.findIndex((b) => b.nombre === bancoSeleccionado.value.nombre);

if (index !== -1) {
  // Actualizar datos del banco existente
  bancosAgregados.value[index] = { ...bancoSeleccionado.value, ...form };
} else {
  // Agregar un nuevo banco
  bancosAgregados.value.push({ ...bancoSeleccionado.value, ...form });
}

showModal.value = false;
};

const mostrarDetalles = (banco) => {
  alert(`Titular: ${banco.titular}\nNúmero de cuenta: ${banco.numeroCuenta}\nTipo: ${banco.tipoCuenta}\nID: ${banco.tipoIdentificacion} - ${banco.numeroIdentificacion}`);
};

// Computed para filtrar bancos agregados
const filteredBancos = computed(() => {
return bancosAgregados.value.filter((banco) =>
  banco.titular.toLowerCase().includes(searchQuery.value.toLowerCase())||
  banco.numeroCuenta.toLowerCase().includes(searchQuery.value.toLowerCase())
);
});

</script>
