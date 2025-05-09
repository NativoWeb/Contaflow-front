<template> 
  <div class="navbar h-screen flex">
    <nav :class="{ 'open': isOpen }"> 
      <div class="close-container none">
        <button class="close" @click="toggleSidebar">X</button>
      </div>
      <ul v-if="data" class="space-y-1">
  <!-- User Profile -->
  <li class="px-4 py-4 border-b border-gray-200">
    <div class="flex items-center space-x-3">
      <img class="w-12 h-12 rounded-full object-cover" src="@/assets/img_usuario.svg" alt="User profile">
      <div>
        <p class="font-medium text-gray-900">{{ data.first_name }}</p>
        <p class="text-sm text-gray-500 capitalize">{{ data.role.toLowerCase() }}</p>
      </div>
    </div>
  </li>

  <!-- Main Navigation -->
  <div class="px-2 py-3 space-y-1">
    <!-- Common Items -->
    <li>
      <router-link 
        @click="toggleSidebar" 
        to="/home" 
        class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
        active-class="bg-blue-50 text-blue-600 font-medium"
      >
        <img src="@/assets/home.svg" alt="Home" class="w-5 h-5 mr-3">
        <span class="text-sm">Página principal</span>
      </router-link>
    </li>

    <!-- ADMIN Content -->
    <template v-if="data.role == 'ADMIN'">
      <!-- Dropdown Menu -->
      <li>
        <button 
          type="button" 
          class="flex items-center justify-between w-full px-3 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          @click="toggleDropdown"
        >
          <div class="flex items-center">
            <img src="@/assets/usuario.svg" alt="Users" class="w-5 h-5 mr-3">
            <span class="text-sm">Gestión de usuarios</span>
          </div>
          <svg 
            class="w-4 h-4 transition-transform" 
            :class="{ 'rotate-180': isOpenDropdown }" 
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <ul 
          class="pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-300"
          :class="{ 'max-h-0': !isOpenDropdown, 'max-h-40': isOpenDropdown }"
        >
          <li>
            <router-link 
              @click="toggleSidebar" 
              to="/administradores" 
              class="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              active-class="bg-blue-50 text-blue-600"
            >
              Registro de Admins
            </router-link>
          </li>

          <li>
            <router-link 
              @click="toggleSidebar" 
              to="/contadores" 
              class="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              active-class="bg-blue-50 text-blue-600"
            >
              Registro de Contador
            </router-link>
          </li>
          <li>
            <router-link 
              @click="toggleSidebar" 
              to="/auditores" 
              class="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              active-class="bg-blue-50 text-blue-600"
            >
              Registro de Auditor
            </router-link>
          </li>
          <li>
            <router-link 
              @click="toggleSidebar" 
              to="/clientes" 
              class="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              active-class="bg-blue-50 text-blue-600"
            >
              Registro de Cliente PYME
            </router-link>
          </li>
        </ul>
      </li>

      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/conciliaciones_lista" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/conciliacion.svg" alt="Reconciliation" class="w-5 h-5 mr-3">
          <span class="text-sm">Conciliaciones</span>
        </router-link>
      </li>

      <!-- <li>
        <router-link 
          @click="toggleSidebar" 
          to="/ReporteEmpre" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/informe.svg" alt="Reports" class="w-5 h-5 mr-3">
          <span class="text-sm">Reportes financieros y auditoría</span>
        </router-link>
      </li> -->
    </template>

    <!-- CLIENTE Content -->
    <template v-if="data.role == 'CLIENTE'">
      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/tabla_de_conciliaciones" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/conciliacion.svg" alt="Reconciliations" class="w-5 h-5 mr-3">
          <span class="text-sm">Mis Conciliaciones</span>
        </router-link>
      </li>

      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/tabla_de_contador" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/contador.svg" alt="Accountants" class="w-5 h-5 mr-3">
          <span class="text-sm">Mis Contadores</span>
        </router-link>
      </li>

      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/tabla_de_auditor" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/auditor.svg" alt="Auditors" class="w-5 h-5 mr-3">
          <span class="text-sm">Mis Auditores</span>
        </router-link>
      </li>
    </template>

    <!-- AUDITOR Content -->
    <template v-if="data.role == 'AUDITOR'">
      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/conciliaciones_firmar" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/sign.svg" alt="Clients" class="w-5 h-5 mr-3">
          <span class="text-sm">Conciliacones por Firmar</span>
        </router-link>
      </li>

      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/tabla_clientes_aud" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/client.svg" alt="Clients" class="w-5 h-5 mr-3">
          <span class="text-sm">Mis Clientes</span>
        </router-link>
      </li>

      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/tabla_conciliacion_auditor" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/conciliacion.svg" alt="Reconciliations" class="w-5 h-5 mr-3">
          <span class="text-sm">Mis Conciliaciones</span>
        </router-link>
      </li>
    </template>

    <!-- CONTADOR Content -->
    <template v-if="data.role == 'CONTADOR'">

      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/crear_conciliacion" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/conciliacion.svg" alt="crear conciliacion" class="w-5 h-5 mr-3">
          <span class="text-sm">Crear Conciliación</span>
        </router-link>
      </li>

      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/lista_de_clientes" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/client.svg" alt="Clients" class="w-5 h-5 mr-3">
          <span class="text-sm">Mis Clientes</span>
        </router-link>
      </li>

      <li>
        <router-link 
          @click="toggleSidebar" 
          to="/lista_conciliaciones" 
          class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          active-class="bg-blue-50 text-blue-600 font-medium"
        >
          <img src="@/assets/conciliacion.svg" alt="Reconciliations" class="w-5 h-5 mr-3">
          <span class="text-sm">Mis Conciliaciones</span>
        </router-link>
      </li>
    </template>

    <!-- Common Bottom Item -->
    <li class="pt-2 border-t border-gray-200">
      <router-link 
        @click="toggleSidebar" 
        to="/perfil" 
        class="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
        active-class="bg-blue-50 text-blue-600 font-medium"
      >
        <img src="@/assets/manage-account.svg" alt="Account" class="w-5 h-5 mr-3">
        <span class="text-sm">Mi Cuenta</span>
      </router-link>
    </li>
  </div>
</ul>
      <div v-if="err">
        <span>{{ err }}</span>
        <img class="mt-10 w-[100px] h-[100px]" src="@/assets/error_status.svg" alt="">
      </div>
      <div v-if="isLoading"  class="loader flex flex-col items-center justify-center w-40 h-40 m-auto">
        <img src="@/assets/loader.svg" alt="carga">
      </div>
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
        <img class="max-w-[200px] max-h-[200px] mx-auto" src="@/assets/logo.svg" alt="Logo">
      <!-- Botón de cerrar sesión -->
      <button 
        title="Cerrar Sesión"
        @click="CerrarSesion"
        class="absolute right-6 top-1/2 transform -translate-y-1/2 md:static md:translate-y-0 
        flex items-center justify-center p-2 rounded-full hover:scale-110 transition-all duration-300">
      
        <img src="@/assets/Salir.svg" alt="Cerrar sesión" class="w-10 h-10" />
      </button>
    </header>
  </div>
    <div class="flex-1 p-6 mt-[130px] w-full lg:ml-[280px]">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
  import getIdByToken from '@/hooks/getId';
  import UserService from '@/services/userService';
  import Cookies from 'js-cookie';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const isOpen = ref(false);
  const isOpenDropdown = ref(false);
  const token = Cookies.get('jwt');
  const userId = getIdByToken(token);
  const getUserService = new UserService();
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL; 
  const uri = `/users/${userId}/`
  const urlApi = VUE_APP_URL + uri;

  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
  };

  const toggleDropdown = () => {
    isOpenDropdown.value = !isOpenDropdown.value;
  };


  onMounted(async () => {
    isLoading.value = true;
    try{
      await getUserService.getUserById(urlApi)
      data.value = getUserService.getData().value;
      localStorage.setItem('id', data.value.id)
    }
    catch(error){
      err.value = getUserService.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

  // Función para cerrar sesión
  const CerrarSesion = () => {
    Cookies.remove('jwt'); 
    router.push('/login');
  };
</script>