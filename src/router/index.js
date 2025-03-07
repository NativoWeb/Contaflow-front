import { createRouter, createWebHistory } from "vue-router";
import RegisterComponent from '../components/RegisterComponent.vue';

import EmpresaRegistro from '../components/Admi/EmpresaRegistro.vue';
import Cookies from 'js-cookie';
import ManageUsers from "@/components/ManageUsers.vue";


import EditarEmpresa from "@/components/Admi/EditarEmpresa.vue"
import EditarUsuario from "../components/Admi/EditarUsuario.vue";
import NewPassword from "@/components/NewPassword.vue";
import CuentaContador from '@/components/Contador/Cuneta/CuentaContador.vue'
import EditarPerfilCon from '@/components/Contador/Cuneta/EditarPerfilCon.vue'
import CambiarPasswordCon from '@/components/Contador/Cuneta/CambiarPasswordCon.vue'
import EmpresaConciliacion from '@/components/Contador/ConciliacionContador/EmpresaConciliacion.vue'
import EmpresasConta from '@/components/Contador/EmpresaContador/EmpresasConta.vue'
import BancosConciliacion from '@/components/Contador/ConciliacionContador/BancosConciliacion.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/empresa', 
            name: 'Empresa',
            component: EmpresaRegistro
        },
        {
            path: '/BancosConciliacion', 
            name: 'BancosConciliacion',
            component: BancosConciliacion
        },
        {
            path: '/EmpresasConta', 
            name: 'EmpresasConta',
            component: EmpresasConta
        },
        {
            path: '/EmpresaConciliacion', 
            name: 'EmpresaConciliacion',
            component: EmpresaConciliacion
        },
        {
            path: '/CambiarPasswordCon', 
            name: 'CambiarPasswordCon',
            component: CambiarPasswordCon
        },
        {
            path: '/EditarPerfilCon', 
            name: 'EditarPerfilCon',
            component: EditarPerfilCon
        },
        {
            path: '/ManageUsers', 
            name: 'ManageUsers',
            component: ManageUsers
        },
        {
            path: '/contador', 
            name: 'CuentaContador',
            component: CuentaContador
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
            path: '/EditarEmpresa', 
            name: 'EditarEmpresa',
            component: EditarEmpresa,
        },
        {
            path: "/password",
            component: NewPassword
        }
    ],
});

export default router;