import PerfilView from "@/components/common/PerfilView.vue";
import HomeView from "@/components/common/HomeView.vue";

const commonRoutes = [
  {
    path: 'perfil',
    name: 'Perfil',
    component: PerfilView
  },  
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
]

export default commonRoutes;