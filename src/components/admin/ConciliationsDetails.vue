<template>
  <section v-if="data" class="p-5">
   <div class="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
   <h1  class="text-2xl font-bold text-gray-800">Resumen de Conciliación Bancaria</h1>
<!-- Información general  -->
<div class="flex flex-col items-start">
     <p><span class="font-semibold">Auditor:</span> {{ data.auditor_name }}</p>
     <p><span class="font-semibold">Banco:</span> {{ data.response.Banco }}</p>
     <p><span class="font-semibold">Cliente:</span> {{ data.company }}</p>
     <p><span class="font-semibold">Identificación:</span> #{{ data.identification_number }}</p>
     <p><span class="font-semibold">Estado:</span> {{ data.response.conciliacionBancaria.estado }}</p>
     <!-- <p><span class="font-semibold">Errores:</span> Sí</p>   -->
     <p><span class="font-semibold">Firma:</span> {{ data.status }}</p>  
     <p><span class="font-semibold">Fecha de creación:</span> {{ formateDate(data.created_at) }}</p>
   </div> 

    <!-- Errores  -->
   <div v-if="data.response.conciliacionBancaria.comparaciones.length > 0" class="space-y-8">
      <!-- Error por tipo -->
      <!-- Depósitos  -->
     <div v-if="data.response.conciliacionBancaria.comparaciones[0].detalles.length > 0">
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
           v-for="details in data.response.conciliacionBancaria.comparaciones[0].detalles"
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
     <div v-if="data.response.conciliacionBancaria.comparaciones[1].detalles.length > 0">
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
           v-for="details in data.response.conciliacionBancaria.comparaciones[1].detalles"
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
     <div v-if="data.response.conciliacionBancaria.comparaciones[2]">
       <h2 class="text-xl font-semibold text-blue-700">Diferencia en el saldo final</h2>
       <table 
       v-if="data.response.conciliacionBancaria.comparaciones[2].detalles.length > 0"
       class="w-full table-auto mt-2 border text-left text-gray-700">
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
           v-for="details in data.response.conciliacionBancaria.comparaciones[2].detalles"
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
   </div>
   <div v-else>
     <h1>En el saldo final no diferencias</h1>
   </div>
    

 </div>
 </section>
</template>

<script setup>
import ConciliationService from '@/services/conciliationService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const conciliationsService = new ConciliationService();
const data = ref("");
const err = ref("");
const conciliationId = useRoute().params.id;
const VUE_APP_URL = process.env.VUE_APP_URL;
const urlApi = `${VUE_APP_URL}/conciliations/${conciliationId}/`
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    await conciliationsService.getConciliationById(urlApi)
    data.value = conciliationsService.getData().value;
  }
  catch(error){
    err.value = error;
  }
  finally{
    isLoading.value = false;
  }
})

const formateDate = date => {
  const new_date = new Date(date)
  return `${new_date.getDate()}/${new_date.getMonth() + 1}/${new_date.getFullYear()}`
  }

</script>