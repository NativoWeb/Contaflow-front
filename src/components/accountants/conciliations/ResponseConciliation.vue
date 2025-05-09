<template>
   <section v-if="data" class="p-5">
    <div class="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Resumen de Conciliación Bancaria</h1>

     <!-- Información general  -->
    <div class="flex flex-col items-start">
      <p><span class="font-semibold">Auditor:</span> {{ data.auditor_name }}</p>
      <p><span class="font-semibold">Banco:</span> {{ data.response.Banco }}</p>
      <p><span class="font-semibold">Cliente:</span> {{ data.company }}</p>
      <p><span class="font-semibold">Estado:</span> {{ data.response.conciliacionBancaria.estado }}</p>
    </div> 

     <!-- Errores  -->
    <div v-if="data.response.conciliacionBancaria.errores.length > 0" class="space-y-8">
       <!-- Error por tipo -->
       <!-- Depósitos  -->
      <div v-if="data.response.conciliacionBancaria.errores[0].detalles.length > 0">
        <h2 class="text-xl font-semibold text-blue-700">Diferencia en los depósitos</h2>
        <table class="w-full table-auto mt-2 border text-left text-gray-700">
          <thead class="bg-blue-100">
            <tr>
              <th class="px-4 py-2">Fecha</th>
              <th class="px-4 py-2">Estado Banco</th>
              <th class="px-4 py-2">Auxiliar</th>
              <th class="px-4 py-2">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            <tr 
            v-for="details in data.response.conciliacionBancaria.errores[0].detalles"
            :key="details"
            class="border-t">
            <td class="px-4 py-2">{{ details.fecha }}</td>
            <td class="px-4 py-2">{{ details.estadoBanco || "No asignado"}}</td>
            <td class="px-4 py-2">{{ details.auxiliar || "No asignado"}}</td>
            <td class="px-4 py-2">{{ details.diferencia }}</td></tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h2>En los depósitos no hay diferencias</h2>
      </div>

       <!-- Cheques  -->
      <div v-if="data.response.conciliacionBancaria.errores[1].detalles.length > 0">
        <h2 class="text-xl font-semibold text-blue-700">Diferencia en los cheques</h2>
        <table class="w-full table-auto mt-2 border text-left text-gray-700">
          <thead class="bg-blue-100">
            <tr>
              <th class="px-4 py-2">Fecha</th>
              <th class="px-4 py-2">Estado Banco</th>
              <th class="px-4 py-2">Auxiliar</th>
              <th class="px-4 py-2">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            <tr 
            v-for="details in data.response.conciliacionBancaria.errores[1].detalles"
            :key="details"
            class="border-t">
            <td class="px-4 py-2">{{ details.fecha }}</td>
            <td class="px-4 py-2">{{ details.estadoBanco || "No asignado"}}</td>
            <td class="px-4 py-2">{{ details.auxiliar || "No asignado"}}</td>
            <td class="px-4 py-2">{{ details.diferencia }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h2>En los cheques no hay diferencias</h2>
      </div>

       <!-- Saldo final  -->
      <div v-if="data.response.conciliacionBancaria.errores[2].detalles.length > 0">
        <h2 class="text-xl font-semibold text-blue-700">Diferencia en el saldo final</h2>
        <table class="w-full table-auto mt-2 border text-left text-gray-700">
          <thead class="bg-blue-100">
            <tr>
              <th class="px-4 py-2">Fecha</th>
              <th class="px-4 py-2">Estado Banco</th>
              <th class="px-4 py-2">Auxiliar</th>
              <th class="px-4 py-2">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            <tr 
            v-for="details in data.response.conciliacionBancaria.errores[2].detalles"
            :key="details"
            class="border-t">
            <td class="px-4 py-2">{{ details.fecha }}</td>
            <td class="px-4 py-2">{{ details.estadoBanco || "No asignado"}}</td>
            <td class="px-4 py-2">{{ details.auxiliar || "No asignado"}}</td>
            <td class="px-4 py-2">{{ details.diferencia }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex gap-20">
        <button @click="redirectBack">Cancelar</button>
        <button @click="isAcceptToogle">Guardar</button>
      </div>
    </div>
    <div v-else>
      <h1>En el saldo final no diferencias</h1>
    </div>
  </div>
  </section>

  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6 flex flex-col items-center text-center">
      <div class="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
        <img src="@/assets/loader.svg" alt="">
      </div>
    </div>
  </div>
</div>

<div v-if="saveConciliationAlert" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6 flex flex-col items-center text-center">
      <div class="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
        <svg class="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">¿Deseas guardar esta conciliación?</h3>
      <p class="text-gray-600 mb-6">La conciliación será enviada al auditor para su revisión.</p>
      <button 
        @click="sendConciliation"
        type="button" 
        class="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Aceptar
      </button>
    </div>
  </div>
</div>

<div v-if="successfullSave" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6 flex flex-col items-center text-center">
      <div class="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Extracto guardado</h3>
      <p class="text-gray-600 mb-6">El extracto fue guardado de manera exitosa.</p>
      <button 
        @click=succesfullySave
        type="button" 
        class="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Aceptar
      </button>
    </div>
  </div>
</div>

</template>

<script setup>
import router from '@/router';
import ConciliationService from '@/services/conciliationService';
import { ref } from 'vue';

const conciliationService = new ConciliationService();
const saveConciliationAlert = ref("");
const successfullSave = ref(false);
const err = ref("");
const isLoading = ref(false);
const data = JSON.parse(localStorage.getItem("conciliationData"));
const VUE_APP_URL = process.env.VUE_APP_URL;
const urlAPi = `${VUE_APP_URL}/conciliations/register/`;

const sendConciliation = async () => {
  isLoading.value = true;
  try {
    await conciliationService.saveConciliation(urlAPi, data);
  }
  catch(error){
    err.value = conciliationService.getError().value;
  }
  finally{
    successfullSave.value = true;
    saveConciliationAlert.value = false;
    isLoading.value = false;
    localStorage.removeItem("conciliationData");
  }
}

const isAcceptToogle = () => {
  saveConciliationAlert.value = !saveConciliationAlert.value
}

const succesfullySave = () => {
  successfullSave.value = !successfullSave.value;
  router.push({name: 'CreateConciliation'})
}

const redirectBack = () => {
  router.back()
}
</script>