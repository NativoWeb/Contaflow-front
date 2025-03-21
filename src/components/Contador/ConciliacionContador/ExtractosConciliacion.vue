<template>
  <section class="w-full bg-white shadow-md  h-full">
    <h2 class="text-left text-[#2A5CAA] font-bold text-3xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3" >
        Carga de Extractos Bancarios y Contables
      </h2>
      
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
          <img src="@/assets/Archivos.svg" alt="Upload Icon" class="h-10 mb-3">
          <p>Subir Extracto Bancario</p>
          <input type="file" ref="fileInputBank" hidden @change="(event) => handleFileChange(event, 'bank')">
          <progress v-if="uploadProgressBank !== null" :value="uploadProgressBank" max="100" class="w-4/5 h-5 mt-2"></progress>
          <span v-if="uploadProgressBank !== null" class="text-sm font-bold">{{ fileNameBank }} - {{ uploadProgressBank }}%</span>
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
          <img src="@/assets/Archivos.svg" alt="Upload Icon" class="h-10 mb-3">
          <p>Subir Extracto Contable</p>
          <input type="file" ref="fileInputAccounting" hidden @change="(event) => handleFileChange(event, 'accounting')">
          <progress v-if="uploadProgressAccounting !== null" :value="uploadProgressAccounting" max="100" class="w-4/5 h-5 mt-2"></progress>
          <span v-if="uploadProgressAccounting !== null" class="text-sm font-bold">{{ fileNameAccounting }} - {{ uploadProgressAccounting }}%</span>
        </div>
      </div>

      <div class="flex justify-center mt-6 p-3">
        <button @click="router.push('/ResultadoConcilliacion')"  class="px-6 py-3 bg-[#08245B] hover:bg-[#2a4b8d] text-white text-lg font-semibold rounded-full transition duration-300">
          Procesar Conciliación
        </button>
      </div>
 
  </section>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";

import { useRouter } from "vue-router"; // Importar useRouter

const router = useRouter(); // Instancia de router

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

const dropFile = (event, type) => {
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