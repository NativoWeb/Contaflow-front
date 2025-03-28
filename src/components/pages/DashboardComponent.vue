<template> 
  <div class="navbar w-screen h-screen flex">
    <nav :class="{ 'open': isOpen }"> 
      <div class="close-container none">
        <button class="close" @click="toggleSidebar">X</button>
      </div>
      <ul v-if="user">
        <li>
          <div id="profile">
            <img class="w-20 h-20" src="../../assets/img_usuario.svg" alt="sa">
            <span>{{ user.first_name }}</span>
            <span>{{ user.role }}</span>
          </div>
        </li>
        <div class="list-container">

          <!-- Componentes del Administrador -->
          <div v-if="user.role == 'ADMIN'" class="flex flex-col justify-center items-start gap-4">
            <li class="">
              <button type="button" class="flex justify-center items-center transition duration-75" @click="toggleDropdown">
                <img src="@/assets/usuario.svg" alt="Ícono" class="icon-img">
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap mr-2">Gestión de usuarios</span>
                <svg class="w-3 h-3 transition-transform md:ml-1" :class="{ 'rotate-180': isOpenDropdown }" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <ul :class="{ 'max-h-0 opacity-0': !isOpenDropdown, 'max-h-40 opacity-100': isOpenDropdown }" class=" overflow-hidden transition-all duration-500 ease-in-out mb-1 mt-2 flex items-start justify-start flex-col gap-2"
  >
                <li><router-link to="/RegistroContador" class="flex items-center w-full p-2 text-[#08245B] pl-8">Registro de Contador</router-link></li>
                <li><router-link to="/RegistroAuditor" class="flex items-center w-full p-2 text-[#08245B] pl-8">Registro de Auditor</router-link></li>
                <li><router-link to="/RegistroCliente" class="flex items-center w-full p-2 text-[#08245B] pl-8">Registro de Cliente PYME</router-link></li>
              </ul>
            </li>

            <li>
              <router-link to="/EmpresaRegistro" class="flex gap-2 justify-center items-center">
                <img src="@/assets/empresass.svg" alt="Ícono" class="icon-img">
                <span>Empresas</span>
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
          
          <!-- Componentes del Contador -->
          <div v-if="user.role == 'CONTADOR'">
            <li>
            <router-link>
              <span>Mis Conciliaciones</span>
            </router-link>
            </li>
            
            <li>
            <router-link>
              <span>Mis Clientes</span>
            </router-link>
            </li>

            <li>
            <router-link>
              <span>Mis Empresas</span>
            </router-link>
            </li>

            <li>
            <router-link>
              <span>Mi Cuenta</span>
            </router-link>
            </li>
          </div>

          <!-- Componentes del Auditor -->


          <!-- Componentes del Cliente -->
          <li v-if="user.role == 'CLIENTE'">
            <router-link href="#" class="flex gap-2 justify-center items-center">
              <img src="@/assets/circulo.svg" alt="Ícono" class="icon-img">
              <span>Mis Conciliaciones</span>
            </router-link>
          </li>

        </div>
      </ul>
      <div v-else class="loader flex flex-col items-center justify-center w-40 h-40 m-auto">
        <div class="text-red-700" v-if="!isLoading">
          {{ error }}
          <img class="mt-10 w-[100px] h-[100px]" src="../../assets/error_status.svg" alt="">
        </div>
        <div v-else>
          <img src="../../assets/loader.svg" alt="carga">
        </div>
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
        <img class="max-w-[200px] max-h-[200px] mx-auto" src="../../../public/logo.svg" alt="Logo">
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
  const token = Cookies.get('jwt');
  const userId = getIdByToken(token);
  const user = ref();
  const error = ref();
  const isLoading = ref(false);

  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
  };

  const toggleDropdown = () => {
    isOpenDropdown.value = !isOpenDropdown.value;
  };

  fetch(`http://127.0.0.1:8000/users/${userId}/`)
  .then(res => {
    isLoading.value = true;
    if(!res.ok) throw new Error(`${res.status} error de tipo: ${res.statusText}`) 
    return res.json()
  })
  .then(json => {
    user.value = json
  })
  .catch(err => {
    isLoading.value = false;
    error.value = err;
  })

  // Función para cerrar sesión
  const CerrarSesion = () => {
    Cookies.remove('jwt'); 
    router.push('/');
  };

</script>