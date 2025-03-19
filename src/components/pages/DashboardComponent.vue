<template>
  <div class="navbar w-screen h-screen flex flex-col">
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
                <p>Cargando Usuario...</p>
              </div>
            </li>
            <div class="list-container">
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
      <header class="bg-[#08245B] h-[130px] flex items-center justify-center px-6 py-4" style="z-index: 1000;">
        <div class="relative left-6">
          <button @click="toggleSidebar" class="mobile-menu-button">
            <img src="@/assets/menu.svg" alt="Menú" class="icon-img" />
          </button>
        </div>
        <img class="max-w-[200px] max-h-[200px]" src="../../../public/logo.svg" alt="Logo">
      </header>
    </div>
    
    <div class="flex-1 p-5 mt-[140px] w-full lg:ml-[275px]">
      <router-view/>
    </div>

    <!-- Footer Moderno y Responsivo -->
    <footer class="bg-gradient-to-r from-[#08245B] to-[#0A3D91] text-white text-center py-6 mt-auto w-full">
      <!-- Derechos Reservados -->
      <div class="text-sm opacity-75 mt-3">&copy; 2024 Todos los derechos reservados - Tramicat.</div>
    </footer>

  </div>
</template>

<script setup>
import getIdByToken from '@/hooks/getId';
import Cookies from 'js-cookie';
import { ref } from 'vue';

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
})

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
        { name: "Empresas", link: "/empresa", image: require("@/assets/empresass.svg") },
        { name: "Bancos y ERPs", link: "/BancosERPs", image: require("@/assets/BancoErps.svg") },
        { name: "Configuración", link: "/PerfilAdmin", image: require("@/assets/configuracion.svg") }, 
        { name: "Conciliaciones", link: "/conciliacion", image: require("@/assets/conciliacion.svg") },
        { name: "Reportes financieros y auditoría", link: "/ReporteEmpre", image: require("@/assets/informe.svg") },
        { name: "Cerrar sesión", link: "#", image: require("@/assets/cerrar-sesion.svg") }
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
