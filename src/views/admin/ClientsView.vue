<template>
  <RegisterClient/>
  <ClientsTableComponent
    :clientList="'Clientes Registrados'"
    :apiUrl="`${VUE_APP_URL}/clients/`"
    :roles="'clientes'"
    :routes="`cliente`"
    />
</template>


<script setup>
  import RegisterClient from '@/components/admin/common/RegisterClient.vue';
  import ClientsTableComponent from '@/components/admin/common/ClientsTableComponent.vue';

  const VUE_APP_URL = process.env.VUE_APP_URL;
</script>