<template>
  <section class="w-full bg-white shadow-md  h-full">
    <h2 class="text-left text-[#2A5CAA] font-bold text-3xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3" >
      Carga de Extractos Bancarios y Contables
    </h2>
      
    <form @submit.prevent="sendFiles">
      <div class="flex flex-wrap justify-center gap-20 p-3">

        <!-- Extractos Bancarios -->
        <div 
        class="drop-zone w-[48%] h-64 md:w-1/3 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-100"
        :class="{ 'is-active': isDraggingBank }"
        @dragover.prevent="isDraggingBank = true"
        @dragleave="isDraggingBank = false"
        @drop="(event) => dropFile(event, 'bank')"
        @click="selectFile('bank')"
        >
        <input type="file" ref="fileInputBank" accept=".pdf, .xls, .xlsx"  hidden @change="(event) => handleFileChange(event, 'bank')">
        
          <div v-if="!fileBank" class="flex flex-col justify-center">
            <img src="@/assets/Archivos.svg" alt="Upload Icon" class="h-10 mb-3">
            <p>Subir Extracto Bancario</p>
          </div>

          <div v-else class="flex flex-col justify-center">
            <img v-if="fileBank.type == 'application/pdf'" src="@/assets/pdf.svg" alt="Upload Icon" class="h-10 mb-3">
            <img v-else src="@/assets/xls.svg" alt="Upload Icon" class="h-10 mb-3">
            <p class="text-sm font-bold">{{ fileNameBank }}</p>
          </div>
        </div>
      
        <!-- Extractos Contables -->
        <div 
        class="drop-zone w-1/2 h-64 md:w-1/3 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-100"
        :class="{ 'is-active': isDraggingAccounting }"
        @dragover.prevent="isDraggingAccounting = true"
        @dragleave="isDraggingAccounting = false"
        @drop="(event) => dropFile(event, 'accounting')"
        @click="selectFile('accounting')"
        >
          <input type="file" ref="fileInputAccounting" accept=".pdf, .xls, .xlsx"  hidden @change="(event) => handleFileChange(event, 'accounting')">
          
          <div>
            <div v-if="!fileAccounting" class="flex flex-col justify-center">
            <img src="@/assets/Archivos.svg" alt="Upload Icon" class="h-10 mb-3">
            <p>Subir Extracto Bancario</p>
            </div>

            <div v-else class="flex flex-col justify-center">
              <img v-if="fileAccounting.type == 'application/pdf'" src="@/assets/pdf.svg" alt="Upload Icon" class="h-10 mb-3">
              <img v-else src="@/assets/xls.svg" alt="Upload Icon" class="h-10 mb-3">
              <p class="text-sm font-bold">{{ fileNameAccounting }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-6 p-3">
        <button
          type="submit"
          :disabled="!fileBank || !fileAccounting"
          :class="[
            'px-6 py-3 text-white text-lg font-semibold rounded-full transition duration-300',
            (!fileBank || !fileAccounting)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#08245B] hover:bg-[#2a4b8d]'
          ]"> 
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

const clientId = useRoute().params.id;
const accountantId = localStorage.getItem('id');
const auditorId = useRoute().params.auditorId;
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

const sendFiles = async () => {
  const formData = new FormData();
  formData.append('data', fileBank.value);
  formData.append('data', fileAccounting.value);

  try {
    const res = await fetch(`http://localhost:5678/webhook-test/contaflow`, {
      method: 'POST',
      body: formData
    })
    const json = await res.json()
    sendToBack(json[0].text)
    // Llamado a la funcion de la otra peticion - guardar los archivos en la base de datos y el resultado de la conciliacion
  }
  catch (err) {
    console.log(err)
  }
}


const sendToBack = async (dataConciliation) => {
  try {
    const res = await fetch(`${VUE_APP_URL}/conciliations/register/`, {
      method: 'POST',
      body: JSON.stringify({
        'response': dataConciliation,
        'client': clientId,
        'accountant': accountantId,
        'auditor': auditorId
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