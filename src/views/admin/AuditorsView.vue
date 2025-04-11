<template>
    <RegisterComponent
        :apiUrl="`${VUE_APP_URL}/auditors/email/`"
        :usersForm="userData"
        :title="`Registro de los Auditores`"
    />

    <UsersTableComponent
        :clientList="'Auditores Registrados'"
        :apiUrl="`${VUE_APP_URL}/auditors/`"
        :roles="'auditores'"
        :routes="`auditor`"
        />
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
  status: 'Pendiente',
  role: 'AUDITOR',
  clients: [],
  conciliations: []
}
</script>