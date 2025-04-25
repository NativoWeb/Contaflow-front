<template>
  <RegisterClient/>
  <UsersTableComponent
    :clientList="'Clientes Registrados'"
    :apiUrl="`${VUE_APP_URL}/clients/`"
    :roles="'clientes'"
    :routes="`cliente`"
    />
</template>


<script setup>
  import UsersTableComponent from '@/components/admin/common/UsersTableComponent.vue';
  import RegisterClient from '@/components/admin/common/RegisterClient.vue';

  const VUE_APP_URL = process.env.VUE_APP_URL;
</script>