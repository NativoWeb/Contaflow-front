<template>
  <!-- Barra Superior -->
  <header class="barra-superior relative flex items-center h-20 bg-gray-200 px-6">
  <!-- Logo centrado -->
  <div class="absolute left-1/2 transform -translate-x-1/2 ">
    <img src="../../public/logo.svg" alt="Logo" class="w-full max-w-xs ">
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
            <img src="@/assets/img_usuario.svg" alt="Perfil" />
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
          <div id="name"><span>Maria Rivera</span></div>
          <div id="designation">Admin</div>
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  background: #F5F5F5;
  display: flex;
  height: 100vh;
}

/* Barra Superior */
.barra-superior {
  background: #08245B;
  width: 100%;
  height: 200px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  z-index: 100;
}



/* Menú Lateral */
.menu-lateral {
  background: #FFFFFF;
  width: 80px;
  height: calc(100vh - 118px); /* Ocupa todo el alto de la pantalla */
  position: fixed;
  top: 118px;
  left: 0;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 0 20px 0 0;
  box-shadow: 2px 0 10px rgba(170, 170, 170, 0.2);
  transition: width 0.3s ease;
  z-index: 100;

  /* Permite desplazamiento si el contenido es mayor al tamaño de la pantalla */
  overflow-y: auto;
  scrollbar-width: none; /* Oculta la barra en Firefox */
}

/* Ocultar la barra de desplazamiento en navegadores basados en WebKit (Chrome, Safari, Edge) */
.menu-lateral::-webkit-scrollbar {
  display: none;
}


.menu-lateral.open {
  width: 309px;
}



/* Botón #btn */
.menu-lateral #btn {
  width: 30px;
  height: 30px;
  object-fit: contain;
  cursor: pointer;
  margin-left: 25px; /* Centrado cuando el menú está cerrado */
  transition: margin-left 0.3s ease;
}

/* Imágenes de los iconos */
.menu-lateral .icon-img {
  width: 30px;
  height: 30px;
  object-fit: contain;
  border-radius: 5px;
  margin-right: 10px;
}
.menu-lateral .nav-list {
  margin-top: 20px;
  height: 100%;
}

.menu-lateral li {
  position: relative;
  margin: 10px 0;
  list-style: none;
}

.menu-lateral li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: #FFFFFF;
  position: relative;
  transition: all .5s ease;
  padding: 10px;
  border-radius: 5px;
  color: #193368;
  padding: 15px;
  font-size: 16px;
}

.menu-lateral li a .link_name {
  color: #193368;
  font-size: 20px;
  font-weight: 400;
  white-space: normal;
  word-wrap: break-word;
  max-width: auto;
  opacity: 0;
  transition: all 0.4s ease;
}

.menu-lateral.open li a .link_name {
  opacity: 1;
  font-family: 'Roboto', sans-serif;
}

.menu-lateral ul li a:hover {
  background: #B4C3DF;
}

#profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

#photo img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.3s ease;
}

#name, #designation {
  font-size: 18px;
  color: #193368;
  text-align: center;
  margin-top: 5px;
}

#profile.minimized {
  align-items: center;
}

#profile.minimized #photo img {
  width: 40px;
  height: 40px;
}

#profile.minimized #name,
#profile.minimized #designation {
  display: none;
}

.menu-lateral li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background-color: #F5F5F5;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  padding: 6px 14px;
  font-size: 18px;
  font-weight: 400;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  color: #193368;
  align-items: center;
}

.menu-lateral li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}

.menu-lateral.open li .tooltip {
  display: none;
}

/* Menú Hamburguesa (Móviles) */
.menu {
  display: none;
  width: 100%;
  padding-left: 10px;
  position: fixed;
  top: 8px;
  left: 0;
  z-index: 100;
}

.menu-toggle {
  font-size: 25px;
  cursor: pointer;
  color: white;
  text-align: left;
  width: 100%;
}

.menu-items {
  list-style: none;
  display: none;
  flex-direction: column;
  background: #FFFFFF;
  text-align: center;
  width: 80%;
  max-height: 90vh; /* Altura máxima del menú (80% de la altura de la pantalla) */
  overflow-y: auto; /* Habilita el scroll vertical */
  position: fixed;
  left: 0;
  padding-top: 20px;
  border-radius: 0 20px 0 0;
  box-shadow: 2px 0 10px rgba(170, 170, 170, 0.2);
  transition: max-height 0.5s ease, padding 0.5s ease;
}

.menu-items.show {
  display: flex;
  max-height: 90vh; /* Mantén la altura máxima */
  padding-bottom: 20px;
}

.menu-items li {
  position: relative;
  margin: 10px 0;
  list-style: none;
}

.menu-items li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: #FFFFFF;
  position: relative;
  transition: all 0.3s ease;
  padding: 15px;
  border-radius: 5px;
  color: #193368;
  font-size: 16px;
}

.menu-items li a:hover {
  background-color: #f0f0f0;
  color: #08245B;
  transform: translateX(5px);
}

.menu-items li a .link_name {
  color: #193368;
  font-size: 15px;
  font-weight: 400;
  white-space: normal;
  word-wrap: break-word;
  max-width: auto;
  opacity: 1;
  transition: all 0.4s ease;
  margin-left: 20px; /* Esto agrega espacio entre el icono y el texto */

}

/* Media query para pantallas móviles */
@media (max-width: 768px) {
  .barra-superior {
    height: 100px; /* Esto se aplica en pantallas móviles */
  }

  .menu ~ .barra-superior {
    height: 100px; /* Asegúrate de que el margen izquierdo sea 0 en móviles incluso cuando el menú esté abierto */
    width: 100%; /* Asegúrate de que el contenido ocupe el 100% del ancho en móviles */
  }
}

/* Responsividad */
@media (max-width: 768px) {
  .menu-lateral {
    display: none;
  }

  .menu {
    display: block;
  }

  .contenido {
    margin-left: 0;
    width: 100%;
    padding: 80px 20px 20px;
  }

  .botones {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>