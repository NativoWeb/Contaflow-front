<template>
  <div>
    <!-- Usando el componente Tabla con diferentes configuraciones -->
    <TablaView 
      :apiUrl="`${VUE_APP_URL}/clients/`"
      :clientList="'Lista de Conciliaciones '"
      :roles="'Usuarios'"
      :routes="'/con'"
      :columns="['Nit', 'Razón Social', 'Sector económico ', 'Dirección']"
    />
  </div>
</template>

<script setup>
import TablaView from './TablaView.vue';
</script>
