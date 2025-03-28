<template>
    <RegisterComponent
        :apiUrl="`${VUE_APP_URL}/auditor/email/`"
        :usersForm="userData"
        :title="`Registro de los Auditores 1`"
    />

    <UsersTableComponent
        :clientList="'Lista de Auditores'"
        :apiUrl="`${VUE_APP_URL}/auditor/`"
        :routes="`auditores`"
        />

</template>

<script setup>

import RegisterComponent from '../Admi/Registros/RegisterComponent.vue';
import UsersTableComponent from '../Admi/Registros/UsersTableComponent.vue';

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