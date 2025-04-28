<template>
  <section class="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
    <!-- Encabezado con gradiente mejorado -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-10 border border-blue-100">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Carga de Extractos Bancarios y Contables
      </h2>
      <p class="text-gray-600 text-lg">Selecciona o arrastra tus archivos para comenzar el proceso</p>
    </div>
      
    <!-- Contenedor principal de las zonas de carga -->
    <div class="flex flex-col md:flex-row justify-center gap-8 p-2">
      <!-- Zona de carga - Extracto Bancario -->
      <div 
        class="drop-zone flex-1 min-h-[320px] border-3 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-all duration-300 ease-in-out"
        :class="{
          'border-blue-400 bg-blue-50/50 shadow-inner scale-[0.99]': isDraggingBank,
          'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30': !isDraggingBank
        }"
        @dragover.prevent="isDraggingBank = true"
        @dragleave="isDraggingBank = false"
        @drop="handleDrop($event, 'bank')"
        @click="selectFile('bank')"
      >
        <div class="flex flex-col items-center justify-center h-full w-full">
          <div class="bg-white p-4 rounded-full mb-5 shadow-md border border-blue-100">
            <img src="@/assets/Archivos.svg" alt="Upload Icon" class="h-10 w-10 text-blue-500">
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Extracto Bancario</h3>
          <p class="text-gray-500 text-sm mb-5">Formatos soportados: .xlsx, .csv</p>
          
          <div v-if="uploadProgressBank !== null" class="w-full mt-5 space-y-3">
            <div class="flex justify-between text-sm text-gray-600">
              <span class="truncate max-w-[180px] font-medium">{{ fileNameBank }}</span>
              <span class="font-semibold">{{ uploadProgressBank }}%</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div 
                class="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-300 ease-out" 
                :style="{ width: uploadProgressBank + '%' }"
              ></div>
            </div>
          </div>
          <button v-else class="mt-3 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
            Seleccionar archivo
          </button>
        </div>
        <input 
          type="file" 
          ref="fileInputBank" 
          hidden 
          @change="handleFileChange($event, 'bank')"
          accept=".xlsx,.csv"
        >
      </div>

      <!-- Zona de carga - Extracto Contable -->
      <div 
        class="drop-zone flex-1 min-h-[320px] border-3 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-all duration-300 ease-in-out"
        :class="{
          'border-blue-400 bg-blue-50/50 shadow-inner scale-[0.99]': isDraggingAccounting,
          'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30': !isDraggingAccounting
        }"
        @dragover.prevent="isDraggingAccounting = true"
        @dragleave="isDraggingAccounting = false"
        @drop="handleDrop($event, 'accounting')"
        @click="selectFile('accounting')"
      >
        <div class="flex flex-col items-center justify-center h-full w-full">
          <div class="bg-white p-4 rounded-full mb-5 shadow-md border border-blue-100">
            <img src="@/assets/Archivos.svg" alt="Upload Icon" class="h-10 w-10 text-blue-500">
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Extracto Contable</h3>
          <p class="text-gray-500 text-sm mb-5">Formatos soportados: .xlsx, .csv</p>
          
          <div v-if="uploadProgressAccounting !== null" class="w-full mt-5 space-y-3">
            <div class="flex justify-between text-sm text-gray-600">
              <span class="truncate max-w-[180px] font-medium">{{ fileNameAccounting }}</span>
              <span class="font-semibold">{{ uploadProgressAccounting }}%</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div 
                class="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-300 ease-out" 
                :style="{ width: uploadProgressAccounting + '%' }"
              ></div>
            </div>
          </div>
          <button v-else class="mt-3 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
            Seleccionar archivo
          </button>
        </div>
        <input 
          type="file" 
          ref="fileInputAccounting" 
          hidden 
          @change="handleFileChange($event, 'accounting')"
          accept=".xlsx,.csv"
        >
      </div>
    </div>

    <!-- Botón de acción -->
    <div class="flex justify-center mt-12">
      <button 
        @click="handleProcess" 
        class="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
        :disabled="!isReadyToProcess"
        :class="{
          'opacity-80 cursor-not-allowed grayscale-[30%]': !isReadyToProcess,
          'hover:shadow-xl transform hover:scale-[1.02] active:scale-95': isReadyToProcess
        }"
      >
        <span>Procesar Conciliación</span>
        <svg v-if="isReadyToProcess" class="w-6 h-6 ml-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </section>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";

// Variables reactivas
const isDraggingBank = ref(false);
const isDraggingAccounting = ref(false);
const uploadProgressBank = ref(null);
const uploadProgressAccounting = ref(null);
const fileNameBank = ref("");
const fileNameAccounting = ref("");

// Refs para los inputs de archivo
const fileInputBank = ref(null);
const fileInputAccounting = ref(null);

const selectFile = (type) => {
  if (type === "bank") fileInputBank.value.click();
  else fileInputAccounting.value.click();
};

const handleFileChange = (event, type) => {
  const file = event.target.files[0];
  if (file) uploadFile(file, type);
};

const handleDrop = (event, type) => {
  event.preventDefault();
  if (type === "bank") isDraggingBank.value = false;
  else isDraggingAccounting.value = false;

  const file = event.dataTransfer.files[0];
  if (file) uploadFile(file, type);
};

const uploadFile = async (file, type) => {
  if (type === "bank") {
      fileNameBank.value = file.name;
      uploadProgressBank.value = 0;
  } else {
      fileNameAccounting.value = file.name;
      uploadProgressAccounting.value = 0;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  try {
      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              if (type === "bank") uploadProgressBank.value = progress;
              else uploadProgressAccounting.value = progress;
          }
      });

      console.log("Archivo subido con éxito:", response.data);
      setTimeout(() => {
          if (type === "bank") uploadProgressBank.value = null;
          else uploadProgressAccounting.value = null;
      }, 3000);
  } catch (error) {
      console.error("Error al subir el archivo", error);
  }
};
</script>