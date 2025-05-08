<template>
  <section v-if="data" class="p-5">
   <div class="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
   <h1 class="text-2xl font-bold text-gray-800">Resumen de Conciliación Bancaria</h1>
<!-- Información general  -->
<div class="flex flex-col items-start">
     <p><span class="font-semibold">Auditor:</span> {{ data.auditor_name }}</p>
     <p><span class="font-semibold">Banco:</span> {{ data.response.Banco }}</p>
     <p><span class="font-semibold">Cliente:</span> {{ data.company }}</p>
     <p><span class="font-semibold">Identificación:</span> #{{ data.identification_number }}</p>
     <p><span class="font-semibold">Estado:</span> {{ data.response.conciliacionBancaria.estado }}</p>
     <!-- <p><span class="font-semibold">Errores:</span> Sí</p>   -->
     <p><span class="font-semibold">Firma:</span> {{  data.status }}</p>  
     <p><span class="font-semibold">Fecha de creación:</span> {{ formateDate(data.created_at) }}</p>
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
       <button @click="isRejectToogle">Rechazar</button>
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

<!-- Modal para firmar o cancelar la conciliación -->
<div v-if="signConciliationAlert" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"> 
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6 flex flex-col items-center text-center">
      <div class="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
        <svg class="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">¿Deseas firmar esta conciliación?</h3>
      <p class="text-gray-600 mb-6">Puedes confirmar tu firma o cancelar el proceso.</p>
      <div class="flex gap-4 w-full max-w-xs">
        <button 
          @click="cancelConciliation"
          type="button"
          class="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
        >
          Cancelar
        </button>
        <button 
          @click="signConciliation"
          type="button" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
        >
          Firmar
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal de éxito al firmar conciliación -->
<div v-if="signSuccesAlert" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6 flex flex-col items-center text-center">
      <div class="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Conciliación firmada</h3>
      <p class="text-gray-600 mb-6">La conciliación fue firmada de manera exitosa.</p>
      <button 
        @click="successSign"
        type="button"
        class="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
      >
        Aceptar
      </button>
    </div>
  </div>
</div>

<!-- Modal para firmar o cancelar la conciliación -->
<div v-if="rejectConciliationAlert" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"> 
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6 flex flex-col items-center text-center">
      <div class="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
        <svg class="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">¿Deseas rechazar esta conciliación?</h3>
      <p class="text-gray-600 mb-6">Puedes rechazar tu firma o cancelar el proceso.</p>
      <div class="flex gap-4 w-full max-w-xs">
        <button 
          @click="cancelConciliation"
          type="button"
          class="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
        >
          Cancelar
        </button>
        <button 
          @click="rejectConciliation"
          type="button" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
        >
          Firmar
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal de rechazo exitoso -->
<div v-if="rejectedConciliationAlert" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 transform transition-all duration-300 scale-95">
    <div class="p-6 flex flex-col items-center text-center">
      <div class="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
        <svg class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Conciliación rechazada</h3>
      <p class="text-gray-600 mb-6">Has rechazado la conciliación. El proceso no continuará.</p>
      <button 
        @click="rejectedSign"
        type="button"
        class="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
      >
        Cerrar
      </button>
    </div>
  </div>
</div>


</template>

<script setup>
// import router from '@/router';
import ConciliationService from '@/services/conciliationService';
import UserService from '@/services/userService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const userService = new UserService();
const conciliationService = new ConciliationService();
const data = ref("")
const isLoading = ref(false);
const signConciliationAlert = ref(false);
const signSuccesAlert = ref(false);
const rejectConciliationAlert = ref(false);
const rejectedConciliationAlert = ref(false); 
const auditorId = localStorage.getItem('id');
const conciliationId = useRoute().params.id;
const VUE_APP_URL = process.env.VUE_APP_URL;
const urlApi = `${VUE_APP_URL}/auditors/${auditorId}/`
const signUrlApi = `${VUE_APP_URL}/conciliations/update/${conciliationId}/`

onMounted(async () => {
  isLoading.value = true;
  try {
    await userService.getUserById(urlApi)
    data.value = userService.getData().value.conciliations_data;
    data.value.forEach(el => {
      if (el.id == conciliationId) {
        data.value = el;
      }
    })
  }
  catch(error){
    console.log(error)
  }
  finally{
    isLoading.value = false;
  }
})

const signConciliation = async () => {
  isLoading.value = true;
  try{
    await conciliationService.signConciliation(signUrlApi, { "status": "Firmada"})
  }
  catch(error){
    console.log(error)
  }
  finally{
    signConciliationAlert.value = false;
    signSuccesAlert.value = true;
    isLoading.value = false;
  }
}

const rejectConciliation = async () => {
  isLoading.value = true;
  try{
    await conciliationService.signConciliation(signUrlApi, { "status": "Rechazada"})
  }
  catch(error){
    console.log(error)
  }
  finally{
    rejectConciliationAlert.value = false;
    rejectedConciliationAlert.value = true;
    isLoading.value = false;
  }
}

const isAcceptToogle = () => {
  signConciliationAlert.value = !signConciliationAlert.value;
}

const successSign = () => {
  signSuccesAlert.value = !signSuccesAlert.value
}

const isRejectToogle = () => {
  rejectConciliationAlert.value = !rejectConciliationAlert.value
}

const rejectedSign = () => {
  rejectedConciliationAlert.value = !rejectedConciliationAlert.value
}

const formateDate = date => {
  const new_date = new Date(date)
  return `${new_date.getDate()}/${new_date.getMonth() + 1}/${new_date.getFullYear()}`
  }
</script>