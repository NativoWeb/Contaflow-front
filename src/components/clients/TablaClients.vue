<template>
  <div>
    <!-- Usando el componente Tabla con diferentes configuraciones -->
    <TablaView 
      :apiUrl="`${VUE_APP_URL}/clients/`"
      :clientList="'Lista de Clientes'"
      :roles="'Usuarios'"
      :routes="'/clientes'"
      :columns="['Nombre', 'Numero de documento', 'Correo', 'Celular', 'Estado']"
    />
  </div>
</template>

<script setup>
import TablaView from './TablaView.vue';
</script>
