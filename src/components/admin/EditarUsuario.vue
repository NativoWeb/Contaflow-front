<template>
  <section class="w-full bg-white shadow-md">
    <h2 class="text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
      Gestión de Usuarios y Roles
    </h2>

    <!-- Formulario -->
    <form id="editForm" class="p-6 w-ful">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <!-- Columna de la foto -->
                <div class="flex flex-col items-center">
                    <img class="rounded-full w-[160px] h-[160px] mb-2" src="" alt="image description">
                    <input type="file" id="photo" name="photo" accept="image/*" class="mt-2">
                    <label for="photo" class="">Estado</label>
                </div>

                <!-- Campos de información -->
                <div class="flex flex-col">
                    <label for="nombre" class="font-bold">Nombre</label>
                    <input type="text" id="nombre" name="nombre" required class="p-2 border border-gray-300 rounded-lg mb-2">

                    <label for="apellido" class="font-bold">Rol</label>
                    <select id="rol" class="p-2 border border-gray-300 rounded-lg mb-2">
                        <option value="Administrador">Administrador</option>
              <option value="Contador">Contador</option>
              <option value="Auditor">Auditor</option>
              <option value="Cliente PYME">Cliente PYME</option>
                    </select>
                    <label for="cedula" class="font-bold">Correo</label>
                    <input type="text" id="cedula" name="cedula" required class="p-2 border border-gray-300 rounded-lg mb-2">
                </div>

                <div class="flex flex-col">
                    <label for="celular" class="font-bold">Apellidos</label>
                    <input type="text" id="celular" name="celular" required class="p-2 border border-gray-300 rounded-lg mb-2">

                    <label for="direccion" class="font-bold">Celular</label>
                    <input type="text" id="direccion" name="direccion" required class="p-2 border border-gray-300 rounded-lg mb-2">
                </div>
            </div>

            <!-- Cambiar contraseña y botones -->
            <div class="flex flex-col md:flex-row justify-between items-center p-3">
    <div class="flex flex-col w-full md:w-1/2">
        <label for="nuevaContraseña" class="font-bold">Nueva Contraseña</label>
        <input type="password" id="nuevaContraseña" name="nuevaContraseña" 
            class="p-2 border border-gray-300 rounded-lg mb-2 w-full md:w-97">

        <label for="confirmarContraseña" class="font-bold">Confirmar Contraseña</label>
        <input type="password" id="confirmarContraseña" name="confirmarContraseña" 
            class="p-2 border border-gray-300 rounded-lg mb-2 w-full md:w-97">
    </div>

    <div class="flex gap-4 mt-4 md:mt-0">
        <button @click="router.push('/usuarios')" type="button" id="cancelar" class="px-4 py-2 border border-gray-800 rounded-lg bg-white text-gray-800">Cancelar</button>
        <button type="submit" id="guardar" class="px-4 py-2 bg-[#08245B] text-white rounded-lg">Guardar</button>
    </div>
</div>

        </form>
    
  </section>

  </template>

<script setup>
import { useRouter } from "vue-router"; // Importar useRouter

const router = useRouter(); // Instancia de router

</script>