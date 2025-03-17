<template>
  <header class="flex items-center justify-center px-6 py-4">
    <img src="../../../public/logo.svg" alt="Logo">
  </header>

  <button @click="toggleSidebar" class="mobile-menu-button">
    <img src="@/assets/menu.svg" alt="Menú" class="icon-img" />
  </button>
  
  <div>
    <nav :class="{ 'open': isOpen }">  
      <div>
        <button class="close" @click="toggleSidebar">X</button>
      </div>
      <ul>
        <li>
          <div class="flex flex-col gap-2 items-center" id="profile">
            <div id="photo">
              <img class="profile" src="@/assets/img_usuario.svg" alt="Perfil" />
            </div>
            <span>Maria Rivera</span>
            <span>Admin</span>
          </div>
        </li>
        <div class="items-container flex gap-4 flex-col items-start mt-5">
          <li class="li-container" @click="toggleSidebar" v-for="(item, index) in menuItems" :key="index">
            <router-link class="flex gap-2 justify-center items-center" :to="item.link">
              <img :src="item.image" :alt="item.name" class="icon-img" />
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </div>
      </ul>
    </nav>
  </div>
  <main>
    <router-view>

    </router-view>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>
  
<script>
export default {
  data() {
    return {
      isOpen: true,
      isMenuOpen: false,
      menuItems: [
        { name: "Dashboard", link: "#", image: require("@/assets/circulo.svg") },
        { name: "Gestión de roles y usuarios", link: "/usuario", image: require("@/assets/usuario.svg") },
        { name: "Empresas", link: "/empresa", image: require("@/assets/empresass.svg") },
        // { name: "Configuración", link: "/configuracion", image: require("@/assets/configuracion.svg") }, 
        { name: "Conciliaciones", link: "#", image: require("@/assets/conciliacion.svg") },
        { name: "Reportes financieros y auditoría", link: "#", image: require("@/assets/informe.svg") },
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

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* nav {
  margin-right:30px;
  width: 19%;
  max-width: 280px;
  min-width: 200px;
  position: fixed;
  display:block;
  top: 80px;
  background-color: white;
  height: 100vh;
  padding: 30px;
  display: flex;
  box-shadow: 2px 0 10px rgba(170, 170, 170, 0.2);
  transition: transform 0.3s ease-in-out;
  border-radius: 0 20px 0 0;
  z-index: 30;
}

.close{
  width:60px;
  height:60px;
  font-size: 40px;
  border-radius:50%;
  color:#08245B;
  display:none;
}

.items-container{
    align-content:start;
  }

.mobile-menu-button {
  display: none;
  top:40px;
  left:20px;
  position: fixed;
  z-index: 20;
  scale:2;
  border: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

span {
  font-size: 18px;
  color: #08245B;
}

@media (max-width: 768px) {

  ul{
    width:100%;
    height:100%;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:start;
    margin-top:40px;
    gap:20px;
  }
  
  .profile{
    width:100%;
    max-width:220px;
    height:220px;
  }

  ul li {
    text-align: center;
  }

  nav {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    top: 0;
    height: 100vh;
    padding: 20px;
    border-radius:0;
    transform: translateX(-100%);
  }

  nav span{
    font-size:25px;
  }

  nav.open {
    transform: translateX(0);
  }

  .close{
    display:block;
    position:absolute;
  }

  .items-container{
    width:100%;
    height:auto;
    align-content:center;
    gap:40px;
    font-size:50px;
  }

  .items-container li{
    width:100%;
    transition: scale 0.3s ease-in-out;
    cursor: pointer;
  }

  .items-container li:hover{
    scale:1.3;
  }

  .mobile-menu-button {
    display: block;
  }
}
header{
    background-color:#08245B;
    z-index:20;
    position:fixed;
    width:100%;
  }
  img{
    width:50%;
    max-width:185px;
    height:100px;
  } */
</style>