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
                  <!-- <span>{{ user.first_name }}</span>
                  <span>{{ user.role }}</span> -->
                </div>
                <!-- <div v-else>
                  <p>Cargando usuario...</p>
                </div> -->
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
  <button title="Cerrar Sesión"
  @click="CerrarSesion"
  class="bg-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#EEEEEE] transition-all duration-300
         absolute right-6 top-1/2 transform -translate-y-1/2 md:static md:translate-y-0"
>
  <img src="@/assets/cerrar-sesion.svg" alt="Cerrar sesión" class="w-6 h-6" />
</button>

</header>
      </div>
      
      <div class="flex-1 p-6 mt-[140px] w-full lg:ml-[280px] h-full">
          <router-view/>   
      </div>
      
    </div>
  
  </template>
  
  
    
  <script>
  export default {
    data() {
      return {
        isOpen: true,
        isMenuOpen: false,
        menuItems: [
          { name: "Dashboard", link: "#", image: require("@/assets/circulo.svg") },
          { name: "Conciliaciones", link: "/EmpresaConciliacion", image: require("@/assets/conciliacion.svg") },
          { name: "Reportes", link: "/EmpresaReporte", image: require("@/assets/informe.svg") },
          { name: "Empresas", link: "/EmpresasContador", image: require("@/assets/empresass.svg") },
          { name: "Cuenta", link: "#", image: require("@/assets/usuario.svg") }, 
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
  