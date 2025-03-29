<template>

  <RegisterComponent
    :apiUrl="`${VUE_APP_URL}/accountants/email/`"
    :usersForm="userData"
    :title="`Registro de los Contadores`"
    />

  <UsersTableComponent       
    :clientList="'Lista de Contadores'"
    :apiUrl="`${VUE_APP_URL}/accountants/`"
    :roles="'Contadores'"
    :routes="`contador`"/>

</template>

<script setup>
  import UsersTableComponent from '@/components/common/UsersTableComponent.vue';
  import RegisterComponent from '@/components/common/RegisterComponent.vue';
  
  const VUE_APP_URL = process.env.VUE_APP_URL; 
  const userData = {
    first_name: '',
    last_name: '',
    id_type: 'Seleccione',
    id_number: '',
    phone_number: '',
    username: '',
    status: 'Pendiente',
    role: 'CONTADOR',
    clients: [],
  }

</script>