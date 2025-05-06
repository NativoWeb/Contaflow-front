<template>
  <section class="w-full bg-white shadow-lg rounded-xl p-6 md:p-10">
    <h2 class="text-left text-[#2A5CAA] font-extrabold text-4xl mb-10 bg-gradient-to-r from-[#f0f4ff] to-[#e0eaff] p-4 rounded-lg shadow-sm">
      Carga de Extractos Bancarios y Contables
    </h2>
  
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div class="bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 scale-95 animate-pulse-once">
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="relative">
            <svg class="w-16 h-16 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="text-gray-700 font-medium">Procesando, por favor espere...</p>
        </div>
      </div>
    </div>

    <div v-if="err" colspan="5" class="flex flex-col justify-center">
      <span class="ml-2 my-6">Ocurrio un error {{ err }}</span>
    </div>
    
    <form @submit.prevent="sendExtracts">
      <div class="flex flex-wrap justify-center gap-10 md:gap-16">

        <!-- Extractos Bancarios -->
        <div 
          class="w-full md:w-1/3 h-64 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 shadow-sm hover:shadow-md"
          :class="{ 'ring-2 ring-blue-400': isDraggingBank }"
          @dragover.prevent="isDraggingBank = true"
          @dragleave="isDraggingBank = false"
          @drop="(event) => dropFile(event, 'bank')"
          @click="selectFile('bank')"
        >
          <input type="file" ref="fileInputBank" accept=".pdf, .xls, .xlsx" hidden @change="(event) => handleFileChange(event, 'bank')">

          <div v-if="!fileBank" class="flex flex-col items-center">
            <img src="@/assets/Archivos.svg" alt="Upload Icon" class="h-12 mb-3 opacity-70">
            <p class="text-gray-600 font-medium">Subir Extracto Bancario</p>
          </div>

          <div v-else class="flex flex-col items-center">
            <img :src="fileBank.type == 'application/pdf' ? require('@/assets/pdf.svg') : require('@/assets/xls.svg')" alt="File Icon" class="h-12 mb-3">
            <p class="text-sm font-bold text-gray-800 truncate max-w-[90%]">{{ fileNameBank }}</p>
          </div>
        </div>

        <!-- Extractos Contables -->
        <div 
          class="w-full md:w-1/3 h-64 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 shadow-sm hover:shadow-md"
          :class="{ 'ring-2 ring-blue-400': isDraggingAccounting }"
          @dragover.prevent="isDraggingAccounting = true"
          @dragleave="isDraggingAccounting = false"
          @drop="(event) => dropFile(event, 'accounting')"
          @click="selectFile('accounting')"
        >
          <input type="file" ref="fileInputAccounting" accept=".pdf, .xls, .xlsx" hidden @change="(event) => handleFileChange(event, 'accounting')">

          <div v-if="!fileAccounting" class="flex flex-col items-center">
            <img src="@/assets/Archivos.svg" alt="Upload Icon" class="h-12 mb-3 opacity-70">
            <p class="text-gray-600 font-medium">Subir Extracto Contable</p>
          </div>

          <div v-else class="flex flex-col items-center">
            <img :src="fileAccounting.type == 'application/pdf' ? require('@/assets/pdf.svg') : require('@/assets/xls.svg')" alt="File Icon" class="h-12 mb-3">
            <p class="text-sm font-bold text-gray-800 truncate max-w-[90%]">{{ fileNameAccounting }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-10">
        <button
          type="submit"
          :disabled="!fileBank || !fileAccounting"
          :class="[
            'px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md',
            (!fileBank || !fileAccounting)
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white'
          ]"
        >
          Procesar Conciliación
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import router from "@/router";
import Cookies from "js-cookie";
import { ref } from "vue";
import { useRoute } from "vue-router";
import conciliationService from "@/services/conciliationService.js";

const clientName = useRoute().params.nameClient;
const clientId = useRoute().params.id;
const auditorId = useRoute().params.auditorId;
const auditorName = useRoute().params.auditorName;
const accountantId = localStorage.getItem('id');
const isDraggingBank = ref(false);
const isDraggingAccounting = ref(false);
const fileNameBank = ref(null);
const fileNameAccounting = ref(null);
const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
const fileInputBank = ref(null);
const fileInputAccounting = ref(null);
const fileBank = ref(null);
const fileAccounting = ref(null);
const VUE_APP_URL = process.env.VUE_APP_URL;
const conService = new conciliationService();
const err = ref(null);
const isLoading = ref(false);
const data = ref(null);

const selectFile = (type) => {
  if (type === "bank") fileInputBank.value.click();
  else fileInputAccounting.value.click();
}

const handleFileChange = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  if (type === "bank") {
    fileNameBank.value = file.name;
    fileBank.value = file;
  } else {
    fileNameAccounting.value = file.name;
    fileAccounting.value = file;
  }
}

const dropFile = (event, type) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (!file) return;

  if (!allowedTypes.includes(file.type)) {
    alert('Tipo de archivo no permitido. Solo se permiten PDF y Excel.');
    return;
  }

  if (type === "bank") {
    isDraggingBank.value = false;
    fileNameBank.value = file.name;
    fileBank.value = file;
  } else {
    isDraggingAccounting.value = false;
    fileNameAccounting.value = file.name;
    fileAccounting.value = file;
  }
};

const sendExtracts = async () => {
  isLoading.value = true;
  try{
    await conService.sendFile(`http://localhost:5678/webhook-test/contaflow`, fileBank.value, fileAccounting.value)
    data.value = conService.getData().value
    console.log(data.value)
    sendToBack(data.value[0].text)
    }
    catch(error){
      console.log(error)
      err.value = conService.getError().value
    }
    finally{
      isLoading.value = false
    }
}

  

// Convertir a servicio
const sendToBack = async (dataConciliation) => {
  try {
    const res = await fetch(`${VUE_APP_URL}/conciliations/register/`, {
      method: 'POST',
      body: JSON.stringify({
        'response': dataConciliation,
        'client': clientId,
        'company': clientName,
        'accountant': accountantId,
        'auditor': auditorId,
        'auditor_name': auditorName,
        'bank': "Param"
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}` 
      }
    })
    const json = await res.json()
    const conciliationId = json.id;
    router.push(`/conciliacion_informacion/conciliacion=${conciliationId}`)
  }
  catch(err){
    console.log(err);
  }
}
</script>