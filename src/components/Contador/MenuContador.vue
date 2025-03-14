<template>
    <!-- Barra Superior -->
    <header class="barra-superior relative flex items-center h-20 bg-gray-200 px-6">
    <!-- Logo centrado -->
    <div class="absolute left-1/2 transform -translate-x-1/2 ">
      <img src="@/assets/image.png" alt="Logo" class="w-full max-w-xs ">
    </div>
  </header>
  
  
  
  
    <!-- Menú Lateral -->
    <nav class="menu-lateral" :class="{ open: isOpen }">
      <div class="logo_details">
        <img src="@/assets/lista.svg" alt="Menú" class="icon-img" @click="toggleSidebar" id="btn" />
      </div>
      <ul>
        <li>
          <div id="profile" :class="{ minimized: !isOpen }">
            <div id="photo">
              <img src='@/assets/img_usuario.svg' alt="" />
            </div>
            <div id="name" v-show="isOpen"><span>Maria Rivera</span></div>
            <div id="designation" v-show="isOpen">Admin</div>
          </div>
        </li>
        <li v-for="(item, index) in menuItems" :key="index">
          <!-- Usamos router-link para navegación -->
          <router-link class="button_slide slide_right" :to="item.link">
            <img :src="item.image" :alt="item.name" class="icon-img" />
            <span class="link_name" v-show="isOpen">{{ item.name }}</span>
          </router-link>
          <span class="tooltip" v-show="!isOpen">{{ item.name }}</span>
        </li>
      </ul>
    </nav>
  
    <!-- Menú Hamburguesa (Móviles) -->
    <header class="menu">
      <div class="menu-toggle" @click="toggleMenu">☰</div>
      <ul class="menu-items" :class="{ show: isMenuOpen }">
        <li>
          <div id="profile">
            <div id="photo">
              <img src="@/assets/img_usuario.svg" alt="Perfil" />
            </div>
            <div id="name"><span>Yina Calderon</span></div>
            <div id="designation">Contador(a)</div>
          </div>
        </li>
        <li v-for="(item, index) in menuItems" :key="index">
          <!-- Aquí cambiamos <a> por <router-link> -->
          <router-link class="button_slide slide_right" :to="item.link">
            <img :src="item.image" :alt="item.name" class="icon-img" />
            <span class="link_name">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </header>
  
    <!-- Contenido Principal -->
  
    
    
  </template>
  
  <script>
  export default {
    
    
    data() {
      return {
        isOpen: true,
        isMenuOpen: false,
        menuItems: [
          { name: "Dashboard", link: "/DashboarContador", image: require("@/assets/circulo.svg") },
          { name: "Conciliaciones", link: "/conciliaciones", image: require("@/assets/conciliacion.svg") },
          { name: "Reportes", link: "/reportes", image: require("@/assets/informe.svg") },
          { name: "Empresas", link: "/empresas", image: require("@/assets/empresass.svg") },
          { name: "Cuenta", link: "/cuenta", image: require("@/assets/usuario.svg") },
          { name: "Cerrar sesión", link: "#", image: require("@/assets/cerrar-sesion.svg") } // Podrías manejar logout aquí
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
  
 