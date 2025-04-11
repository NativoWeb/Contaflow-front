<template>
  <div class="bg-gray-50 p-6 rounded-lg shadow">
    <h3 class="text-2xl font-bold text-[#2A5CAA] mb-4">Conciliación Bancaria</h3>

    <div v-if="isLoading" class="text-center text-gray-500">Cargando conciliación...</div>

    <div v-else class="space-y-4 text-gray-700">
      <div class="flex">
        <p class="font-semibold w-48">Fecha de Conciliación:</p>
        <p>{{ conciliation.date }}</p>
      </div>

      <div class="flex">
        <p class="font-semibold w-48">Banco:</p>
        <p>{{ conciliation.bank }}</p>
      </div>

      <div class="flex">
        <p class="font-semibold w-48">Cuenta Bancaria:</p>
        <p>{{ conciliation.accountNumber }}</p>
      </div>

      <div class="flex">
        <p class="font-semibold w-48">Saldo en Libros:</p>
        <p>${{ conciliation.bookBalance.toLocaleString() }}</p>
      </div>

      <div class="flex">
        <p class="font-semibold w-48">Saldo en Banco:</p>
        <p>${{ conciliation.bankBalance.toLocaleString() }}</p>
      </div>

      <div class="flex">
        <p class="font-semibold w-48 text-red-500">Diferencia:</p>
        <p class="text-red-500 font-semibold">
          ${{ (conciliation.bankBalance - conciliation.bookBalance).toLocaleString() }}
        </p>
      </div>

      <div class="flex">
        <p class="font-semibold w-48">Observaciones:</p>
        <p>{{ conciliation.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);
const conciliation = ref({});

onMounted(() => {
  setTimeout(() => {
    conciliation.value = {
      date: '2025-03-01',
      bank: 'Bancolombia',
      accountNumber: '1234-5678-9012',
      bookBalance: 1023400,
      bankBalance: 1000000,
      notes: 'Conciliación pendiente por verificar ajuste contable del mes anterior.'
    };
    isLoading.value = false;
  }, 1000);
});
</script>
