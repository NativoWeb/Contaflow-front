<template>

  <RegisterComponent
    :apiUrl="`${VUE_APP_URL}/accountants/email/`"
    :usersForm="userData"
    :title="`Registro de los Contadores`"
    />

  <UsersTableComponent       
    :clientList="'Contadores Registrados'"
    :apiUrl="`${VUE_APP_URL}/accountants/`"
    :roles="'contadores'"
    :routes="`contador`"/>

</template>

<script setup>
  import UsersTableComponent from '@/components/admin/common/UsersTableComponent.vue';
  import RegisterComponent from '@/components/admin/common/RegisterComponent.vue';
  
  const VUE_APP_URL = process.env.VUE_APP_URL; 
  const userData = {
    first_name: '',
    last_name: '',
    id_type: 'Seleccione una opción',
    id_number: '',
    phone_number: '',
    username: '',
    email: '',
    status: 'Pendiente',
    role: 'CONTADOR',
    clients: [],
    conciliations: []
  }
</script>