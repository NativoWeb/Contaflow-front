<template> 
  <div class="navbar w-screen h-screen flex">
      <nav :class="{ 'open': isOpen }"> 
          <div>
            <button class="close" @click="toggleSidebar">X</button>
          </div>
          <ul>
            <li>
              <div id="profile">
                <div id="photo">
                  <img class="profile" src="@/assets/img_usuario.svg" alt="Perfil"/>
                </div>
                <span>Maria Rivera</span>
                <span>Admin</span>
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
    
    <div class="flex-1 p-6 mt-[140px] w-full lg:ml-[300px]">
      <router-view/>
    </div>
  </div>
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

<style scoped>
@tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  
  #profile {
    display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  padding-bottom: 10px; /* Espaciado para la línea */
  border-bottom: 1px solid #ccc; /* Línea delgada debajo de la foto */
  width: 100%;
  text-align: center;
  }

  header{
    z-index:1000;
  }
  
  #profile{
    border:none;
  }
  
  nav {
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
  
  .list-container{
    display:flex;
    flex-direction:column;
    align-items:start;
    gap:20px;
    justify-content: center;
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
    z-index: 250;
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
  
  a:hover{
      scale:1.1;
      transition:all ease-in-out .2s;
    }
  
    a:active{
      scale:1;
      color:#163a8369 ;
      transition:all ease-in-out .2s;
    }
  
   @media (max-width: 768px) {
  
    .mobile-menu-button{
      display:block;
      width:48px;
      height:48px;
    }
  
  
  
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

</style>