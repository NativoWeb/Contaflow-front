<template>
    <RegisterComponent
        :apiUrl="`${VUE_APP_URL}/auditor/email/`"
        :usersForm="userData"
        :title="`Registro de los Auditores 1`"
    />

    <UsersTableComponent
        :clientList="'Lista de Auditores'"
        :apiUrl="`${VUE_APP_URL}/auditor/`"
        :roles="'Auditores'"
        :routes="`auditores`"
        />

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
  role: 'AUDITOR',
  clients: [],
}

</script>