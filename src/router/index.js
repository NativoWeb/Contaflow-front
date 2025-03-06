import { createRouter, createWebHistory } from "vue-router";
import RegisterComponent from '../components/RegisterComponent.vue';
import EmpresaRegistro from '@/components/Admi/EmpresaRegistro.vue';// import Cookies from 'js-cookie';
import ManageUsers from "@/components/ManageUsers.vue";

import EditarUsuario from "../components/Admi/EditarUsuario.vue";
import EditarEmpresa from '../components/Admi/EditarEmpresa.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/empresa', 
            name: 'Empresa',
            component: EmpresaRegistro
        },
        {
        
        },
        {
            path: "/",
            name: "RegisterComponent",
            component: RegisterComponent,
        },
        {
            path: "/usuario",
            name: "Usuario",
            component: ManageUsers,
            // beforeEnter: (to, from, next) => {
            //     if (!Cookies.get('jwt')) {
            //         next('/')
            //     }
            //     else {
            //         next()
            //     }
            // }
        },
        {
            path: "/editarUser",
            name: "EditarUsuario",
            component: EditarUsuario,
        },
        {
            path: "/editarEmpresa",
            name: "EditarEmpresa",
            component: EditarEmpresa,
        },
    ],
});

export default router;