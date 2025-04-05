<template> 
  <div class="navbar w-screen h-screen flex">
    <nav :class="{ 'open': isOpen }"> 
      <div class="close-container none">
        <button class="close" @click="toggleSidebar">X</button>
      </div>
      <ul v-if="data">
        <li>
          <div id="profile">
            <img class="w-20 h-20" src="@/assets/img_usuario.svg" alt="sa">
            <span>{{ data.first_name }}</span>
            <span>{{ data.role }}</span>
          </div>
        </li>
        
        
        <div class="list-container">
          <li>
            <router-link to="/home" class="flex gap-2 justify-center items-center">
              <img src="@/assets/home.svg" alt="Home Img">
              <span>Home</span>
            </router-link>
          </li>
          
          <!-- Componentes del Contador -->
          <div v-if="data.role == 'CONTADOR'">
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
    <div class="flex-1 p-6 mt-[140px] w-full lg:ml-[280px] h-full">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
  import getIdByToken from '@/hooks/getId';
  import UserService from '@/services/userService';
  import Cookies from 'js-cookie';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const isOpen = ref(false);
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

  onMounted(async () => {
    isLoading.value = true;
    try{
      await getUserService.getUserById(urlApi)
      data.value = getUserService.getData().value;
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
    router.push('/');
  };


</script>