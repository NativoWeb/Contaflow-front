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
                  <img class="profile" src="@/assets/img_usuario.svg" alt="Perfil"/>
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
            <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                     <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                  </svg>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            <ul id="dropdown-example" class="hidden py-2 space-y-2">
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                  </li>
            </ul>
         </li>
              <li class="li-container" @click="toggleSidebar" v-for="(item, index) in menuItems" :key="index">
              <router-link class="flex gap-2 justify-center items-center" :to="item.link">
                <img :src="item.image" :alt="item.name" class="icon-img" />
                <span>{{ item.name }}</span>
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


const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
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
export default {
  data() {
    return {
      isOpen: true,
      isMenuOpen: false,
      menuItems: [
        { name: "Dashboard", link: "/UsuariosAdmin", image: require("@/assets/circulo.svg") },
        { name: "Gestión de roles y usuarios", link: "/usuarios", image: require("@/assets/usuario.svg") },
        { name: "Empresas", link: "/EmpresaRegistro", image: require("@/assets/empresass.svg") },
        { name: "Bancos y ERPs", link: "/BancosERPs", image: require("@/assets/BancoErps.svg") },
        { name: "Configuración", link: "/PerfilAdmin", image: require("@/assets/configuracion.svg") }, 
        { name: "Conciliaciones", link: "/conciliacion", image: require("@/assets/conciliacion.svg") },
        { name: "Reportes financieros y auditoría", link: "/ReporteEmpre", image: require("@/assets/informe.svg") }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};


</script>
