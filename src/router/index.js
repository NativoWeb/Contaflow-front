import { createRouter, createWebHistory } from "vue-router";
import Cookies from 'js-cookie';
import getIdByToken from "@/hooks/getId";
import NavHeader from "@/views/NavHeader.vue";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import commonRoutes from "./commonRoutes";
import clientRoutes from "./clientRoutes";
import accountantRoutes from "./accountantRoutes";
import auditorRoutes from "./auditorRoutes";

const VUE_APP_URL = process.env.VUE_APP_URL;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'NavHeader',
      component: NavHeader,
      beforeEnter: (to, from, next) => {
        const token = Cookies.get('jwt')  
        const userId = getIdByToken(token);

        if (!token) {
          next('/login')
        }
        else {
          if (userId.statu === 'Inactivo') {
            alert(`Tu cuenta esta inactivo, no puedes acceder a Contaflow!`);
            Cookies.remove('jwt');
            next('login')
          }
          else {
            fetch(`${VUE_APP_URL}/users/${userId}/`)
            .then(res => res.json())
            .then(json => {
              json.is_temp_password ? next('/password') : next()
            })
          }
        }
      },
      children: [
        ...adminRoutes,
        ...commonRoutes,
        ...clientRoutes,
        ...accountantRoutes,
        ...auditorRoutes
      ],
    },
      ...authRoutes,
  ],
});

export default router;