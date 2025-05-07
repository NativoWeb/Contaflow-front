<template>
  <section v-if="data" class="p-5">
    <div class="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Resumen de Conciliación Bancaria</h1>

    <!-- Información general -->
    <div class="grid grid-cols-2 gap-4 text-gray-700">
      <p><span class="font-semibold">Auditor:</span> {{ data.auditor_name }}</p>
      <p><span class="font-semibold">Banco:</span> {{ data.response.Banco }}</p>
      <p><span class="font-semibold">Cliente:</span> {{ data.company }} (ID: {{ data.id }})</p>
      <p><span class="font-semibold">Identificación:</span> {{ data.identification_number }}</p>
      <p><span class="font-semibold">Estado:</span> {{ data.response.conciliacionBancaria.estado }}</p>
      <!-- <p><span class="font-semibold">Errores:</span> Sí</p> -->
      <!-- <p><span class="font-semibold">Status:</span> Pendiente</p> -->
      <p><span class="font-semibold">Fecha de creación:</span> {{ data.created_at }}</p>
    </div>

    <!-- Errores -->
    <div v-if="data.response.conciliacionBancaria.errores.length > 0" class="space-y-8">
      <!-- Error por tipo -->
      <!-- Depósitos -->
      <div v-if="data.response.conciliacionBancaria.errores[0].detalles > 0">
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
            class="border-t"><td class="px-4 py-2">Sep. 4</td><td class="px-4 py-2">180,500.00</td><td class="px-4 py-2">180,510.00</td><td class="px-4 py-2">10.00</td></tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h2>Hola Mundo</h2>
      </div>

      <!-- Cheques -->
      <div>
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
            <tr class="border-t"><td class="px-4 py-2">Sep. 6</td><td class="px-4 py-2">-</td><td class="px-4 py-2">60,200.00</td><td class="px-4 py-2">60,200.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 12</td><td class="px-4 py-2">-</td><td class="px-4 py-2">30,000.00</td><td class="px-4 py-2">30,000.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 17</td><td class="px-4 py-2">220,100.00</td><td class="px-4 py-2">220,200.00</td><td class="px-4 py-2">100.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 18</td><td class="px-4 py-2">-</td><td class="px-4 py-2">70,620.00</td><td class="px-4 py-2">70,620.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 19</td><td class="px-4 py-2">70,200.00</td><td class="px-4 py-2">60,200.00</td><td class="px-4 py-2">10,000.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 23</td><td class="px-4 py-2">-</td><td class="px-4 py-2">80,310.00</td><td class="px-4 py-2">80,310.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 24</td><td class="px-4 py-2">-</td><td class="px-4 py-2">300,650.00</td><td class="px-4 py-2">300,650.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 25</td><td class="px-4 py-2">-</td><td class="px-4 py-2">90,400.00</td><td class="px-4 py-2">90,400.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 25</td><td class="px-4 py-2">160,800.00</td><td class="px-4 py-2">160,080.00</td><td class="px-4 py-2">720.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 26</td><td class="px-4 py-2">-</td><td class="px-4 py-2">170,419.00</td><td class="px-4 py-2">170,419.00</td></tr>
            <tr class="border-t"><td class="px-4 py-2">Sep. 28</td><td class="px-4 py-2">-</td><td class="px-4 py-2">200,086.00</td><td class="px-4 py-2">200,086.00</td></tr>
          </tbody>
        </table>
      </div>

      <!-- Saldo final -->
      <div>
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
            <tr class="border-t"><td class="px-4 py-2">Sep. 30</td><td class="px-4 py-2">1,137,092.00</td><td class="px-4 py-2">865,767.00</td><td class="px-4 py-2">271,325.00</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <h1>No Hay errores</h1>
    </div>
  </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import UserService from '@/services/userService';

const getUserService = new UserService();
const conciliationId = useRoute().params.conciliationId;
const isLoading = ref(false);
const data = ref(null);
const err = ref(null);
const VUE_APP_URL = process.env.VUE_APP_URL;
const accountantId = localStorage.getItem('id');
const uri = `/accountants/${accountantId}/`;


onMounted(async () => {
  isLoading.value = true;
  try {
    await getUserService.getUserById(`${VUE_APP_URL}${uri}`)
    data.value = getUserService.getData().value
    data.value.conciliations_data.forEach(el => {
      if (el.id == conciliationId) {
        data.value = el;
        console.log(data.value.response)
      }
    })
  }
  catch (error) {
    err.value = getUserService.getError().value
  } finally {
    isLoading.value = false;
  }
})

// const formateDate = date => {
//   const new_date = new Date(date)
//   return `${new_date.getDate()}/${new_date.getMonth() + 1}/${new_date.getFullYear()}`
//   }



</script>