<template>
    <RegisterComponent
        :apiUrl="`${VUE_APP_URL}/auditors/email/`"
        :usersForm="userData"
        :title="`Registro de los Auditores`"
    />

    <UsersTableComponent
        :clientList="'Lista de Auditores'"
        :apiUrl="`${VUE_APP_URL}/auditors/`"
        :roles="'Auditores'"
        :routes="`auditor`"
        />

</template>

<script setup>

import UsersTableComponent from '@/components/UsersTableComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';

const VUE_APP_URL = process.env.VUE_APP_URL;
const userData = {
  first_name: '',
  last_name: '',
  id_type: 'Seleccione',
  id_number: '',
  phone_number: '',
  username: '',
  status: 'Pendiente',
  role: 'AUDITOR',
  clients: [],
}

</script>