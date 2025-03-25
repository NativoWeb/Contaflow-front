<template>
  <section class="w-full h-full bg-white shadow-md">
    <!-- Contenedor del título con imagen -->
    <div class="flex items-center gap-4 h-[99px] mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-6 rounded-md">
      <img src="@/assets/img_usuario.svg" alt="Empresa Logo" class="w-16 h-16 object-cover rounded-full">
      <h2 class="text-[#2A5CAA] font-bold text-2xl">Yina Calderon</h2>
    </div>

    <div class="w-full p-6">
      <!-- Diseño adaptable con Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
        
        <!-- Primera fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Nombre:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.nombre }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Apellido:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.apellido }}</p>
        </div>

        <!-- Botón Editar Perfil (solo en escritorio) -->
        <div class="hidden md:flex items-end">
          <button @click="router.push('/EditarPerfilCon')" class="w-full md:w-[80%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
            Editar perfil
          </button>
        </div>

        <!-- Segunda fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Número de Identificación:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.identificacion }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Correo:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.correo }}</p>
        </div>

        <!-- Botón Cambiar Contraseña (solo en escritorio) -->
        <div class="hidden md:flex items-end">
          <button @click="router.push('/CambiarPasswordCon')" class="w-full md:w-[80%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
            Cambiar contraseña
          </button>
        </div>

        <!-- Tercera fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Celular:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.celular }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Rol:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ form.rol }}</p>
        </div>

      </div>

      <!-- Botones en móvil (se muestran debajo de todo) -->
      <div class="mt-4 flex flex-col gap-4 md:hidden">
        <button @click="router.push('/EditarPerfilCon')" class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
          Editar perfil
        </button>
        <button @click="router.push('/CambiarPasswordCon')" class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
          Cambiar contraseña
        </button>
      </div>

    </div>

    <EmpresaForm />
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  nombre: "Yina",
  apellido: "Calderon",
  identificacion: "123456789",
  rol: "Administrador",
  correo: "yina@example.com",
  celular: "3001234567"
});
</script>
