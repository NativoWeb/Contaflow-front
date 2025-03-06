import { createRouter, createWebHistory } from "vue-router";
import RegisterComponent from '../components/RegisterComponent.vue';

import EmpresaRegistro from '../components/Admi/EmpresaRegistro.vue';
import Cookies from 'js-cookie';
import ManageUsers from "@/components/ManageUsers.vue";

import EditarUsuario from "../components/Admi/EditarUsuario.vue";
import NewPassword from "@/components/NewPassword.vue";
// import parseJWT from "@/hooks/decodeJWT";

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
            beforeEnter: (to, from, next) => {
                if (!Cookies.get('jwt')) {
                    next('/')
                }
                else {
                    next()
                }
            }
        },
        {
            path: "/editarUser",
            name: "EditarUsuario",
            component: EditarUsuario,
        },
        {
            path: "/password",
            component: NewPassword,
            // beforeEnter: (to, from, next) => {
            //     const token = Cookies.get('jwt')
            //     const decodedToken = parseJWT(token)
                
            //     if (token) {
            //         if (decodedToken && decodedToken.is_temp_password){
            //             next()
            //         }
            //         else {
            //             next('/usuario')
            //         }
            //     }
            //     else {
            //         next('/')
            //     }
            // }
        }
    ],
});

export default router;