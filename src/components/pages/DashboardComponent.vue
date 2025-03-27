<template> 
  <div class="navbar w-screen h-screen flex">
      <nav :class="{ 'open': isOpen }"> 
          <div>
            <button class="close" @click="toggleSidebar">X</button>
          </div>
          <ul>
            <li>
              <div v-if="user" id="profile">
                <div id="photo">
                  <img class="profile" src="" alt="Perfil"/>
                </div>
                <span>{{ user.first_name }}</span>
                <span>{{ user.role }}</span>
              </div>
              <div v-else>
                <p>Cargando usuario...</p>
              </div>
            </li>
            <div class="list-container">
              <li>
    <router-link href="#" class="flex gap-2 justify-center items-center">
      <img src="@/assets/circulo.svg" alt="Ícono" class="icon-img">
      <span >Dashboard</span>
    </router-link>
  </li>

              
              <li>
          <button type="button" class="flex justify-center items-center transition duration-75" @click="toggleDropdown">
            <img src="@/assets/usuario.svg" alt="Ícono" class="icon-img">
            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap mr-2">Gestión de usuarios</span>
            <svg class="w-3 h-3 transition-transform md:ml-1" :class="{ 'rotate-180': isOpenDropdown }" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <ul 
  :class="{ 'max-h-0 opacity-0': !isOpenDropdown, 'max-h-40 opacity-100': isOpenDropdown }"
  class="overflow-hidden transition-all duration-500 ease-in-out mb-1 mt-2 flex items-start justify-start flex-col gap-2"
>
            <li><router-link to="/RegistroContador" class="flex items-center w-full p-2 text-[#08245B] pl-8">Registro de Contador</router-link></li>
            <li><router-link to="/RegistroAuditor" class="flex items-center w-full p-2 text-[#08245B] pl-8">Registro de Auditor</router-link></li>
            <li><router-link to="/RegistroCliente" class="flex items-center w-full p-2 text-[#08245B] pl-8">Registro de Cliente PYME</router-link></li>
          </ul>
        </li>
        
        <li>
    <router-link to="/EmpresaRegistro" class="flex gap-2 justify-center items-center">
      <img src="@/assets/empresass.svg" alt="Ícono" class="icon-img">
      <span >Empresas</span>
    </router-link>
  </li>
  <li>
    <router-link to="/BancosERPs" class="flex gap-2 justify-center items-center">
      <img src="@/assets/BancoErps.svg" alt="Ícono" class="icon-img">
      <span >Bancos y ERPs</span>
    </router-link>
  </li>
  <li>
    <router-link to="/conciliacion" class="flex gap-2 justify-center items-center">
      <img src="@/assets/conciliacion.svg" alt="Ícono" class="icon-img">
      <span >Conciliaciones</span>
    </router-link>
  </li>
  <li>
    <router-link to="ReporteEmpre" class="flex gap-2 justify-center items-center">
      <img src="@/assets/informe.svg" alt="Ícono" class="icon-img">
      <span >Reportes financieros y auditoría</span>
    </router-link>
  </li>
  <li>
    <router-link to="/PerfilAdmin" class="flex gap-2 justify-center items-center">
      <img src="@/assets/configuracion.svg" alt="Ícono" class="icon-img">
      <span >Configuración</span>
    </router-link>
  </li>
          </div>
        </ul>
      </nav>
      
      
          <div class="fixed w-full">
            <header class="z-10 bg-[#08245B] h-[130px] flex items-center justify-between px-6 py-4">
        <!-- Menú lateral -->
        <div>
          <button @click="toggleSidebar" class="mobile-menu-button">
            <img src="@/assets/menu.svg" alt="Menú" class="icon-img" />
          </button>
        </div>
      
        <!-- Logo -->
        <img class="max-w-[200px] max-h-[200px] mx-auto" src="../../../public/logo.svg" alt="Logo">
  <!-- Botón de cerrar sesión -->
  <button 
  title="Cerrar Sesión"
  @click="CerrarSesion"
  class="absolute right-6 top-1/2 transform -translate-y-1/2 md:static md:translate-y-0 
         flex items-center justify-center p-2 rounded-full hover:scale-110 transition-all duration-300"
>
  <img src="@/assets/Salir.svg" alt="Cerrar sesión" class="w-10 h-10" />
</button>

</header>

    </div>
    
    <div class="flex-1 p-6 mt-[140px] w-full lg:ml-[280px] h-full">
        <router-view/>   
    </div>
    
  </div>

</template>

<script setup>
import getIdByToken from '@/hooks/getId';
import Cookies from 'js-cookie';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(false);
const isOpenDropdown = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const toggleDropdown = () => {
  isOpenDropdown.value = !isOpenDropdown.value;
};

const token = Cookies.get('jwt');
const userId = getIdByToken(token);

const user = ref()

fetch(`http://127.0.0.1:8000/users/${userId}/`)
.then(res => res.json())
.then(json => {
  user.value = json
});

// Función para cerrar sesión
const CerrarSesion = () => {
  Cookies.remove('jwt'); // Eliminar token
  router.push('/'); // Redirigir al login
};

</script>

  
<script>


</script>