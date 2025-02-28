import { createRouter, createWebHistory } from "vue-router";
import RegisterComponent from '../components/RegisterComponent.vue';
import EmpresaRegistro from '../components/Admi/EmpresaRegistro.vue';
import Cookies from 'js-cookie';
import ManageUsers from "@/components/ManageUsers.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/empresa",
            name: "EmpresaRegistro",
            component: EmpresaRegistro,
        },
        {
            path: "/",
            name: "RegisterComponent",
            component: RegisterComponent,
        },
        {
            path: "/admin",
            component: ManageUsers,
            beforeEnter: (to, from, next) => {
                if (!Cookies.get('jwt')) {
                    next('/')
                }
                else {
                    next()
                }
            }
        }
    ],
});

export default router;