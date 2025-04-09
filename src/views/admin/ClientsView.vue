<template>
  <RegisterComponent
    :apiUrl="`${VUE_APP_URL}/clients/email/`"
    :usersForm="userData"
    :title="`Registro de los Clientes PYME`"
    />

  <UsersTableComponent
    :clientList="'Lista de Clientes'"
    :apiUrl="`${VUE_APP_URL}/clients/`"
    :roles="'Clientes'"
    :routes="`cliente`"
    />
</template>


<script setup>
  import UsersTableComponent from '@/components/admin/common/UsersTableComponent.vue';
  import RegisterComponent from '@/components/admin/common/RegisterComponent.vue';

  const VUE_APP_URL = process.env.VUE_APP_URL;
  const userData = {
    first_name: '',
    last_name: '',
    id_type: 'Seleccione',
    id_number: '',
    phone_number: '',
    username: '',
    status: 'Pendiente',
    role: 'CLIENTE',
    companies: [],
    conciliations: [],
  }
</script>