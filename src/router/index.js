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
import getIdByToken from "@/hooks/getId";
import ExtractosConciliacion from '@/components/Contador/ConciliacionContador/ExtractosConciliacion.vue'
import MenuContador from '@/components/Contador/MenuContador.vue'; // Ajusta la ruta si es necesario
import DashboarContador from "@/components/Contador/DashboarContador/DashboarContador.vue";
import ReportesContador from "@/components/Contador/Reportes/ReportesContador.vue";
import EmpresaReporte from "@/components/Contador/Reportes/EmpresaReporte.vue";
import InformeGeneral from "@/components/Contador/Reportes/InformeGeneral.vue";
import ListaConciliaciones from '@/components/Contador/ConciliacionContador/ListaConciliaciones.vue';


import BancosERPs from "@/components/Admi/Bancos/BancosERPs.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/empresa', 
            name: 'Empresa',
            component: EmpresaRegistro
        },
        
        {
            path: '/MenuContador', 
            name: 'MenuContador',
            component: MenuContador
        },
        {
            path: '/DashboarContador',
            name: 'DashboarContador',
            component: DashboarContador
        },
        {
            path: '/conciliaciones', 
            name: 'EmpresaConciliacion',
            component: EmpresaConciliacion
        },
        {
            path: '/BancosConciliacion', 
            name: 'BancosConciliacion',
            component: BancosConciliacion
        },
        {
            path: '/ListaConciliaciones',
            name: 'ListaConciliaciones',
            component: ListaConciliaciones
        },
        {
            path: '/ExtractosConciliacion', 
            name: 'ExtractosConciliacion',
            component: ExtractosConciliacion
        },
        {
            path: '/reportes', 
            name: 'ReportesContador',
            component: ReportesContador
        },
        {
            path: '/EmpresaReporte', 
            name: 'EmpresaReporte',
            component: EmpresaReporte
        },
        {
            path: '/InformeGeneral',
            name: 'InformeGeneral',
            component: InformeGeneral
        },
        {
            path: '/empresas', 
            name: 'EmpresasConta',
            component: EmpresasConta
        },
        {
            path: '/cuenta', 
            name: 'CuentaContador',
            component: CuentaContador
        },
        {
            path: '/editar-perfil', 
            name: 'EditarPerfilCon',
            component: EditarPerfilCon
        },
        {
            path: '/cambiar-contrasena', 
            name: 'CambiarPasswordCon',
            component: CambiarPasswordCon
        },
        {
            path: '/ManageUsers', 
            name: 'ManageUsers',
            component: ManageUsers
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
                // tomar el token y el id 
                const token = Cookies.get('jwt');
                const userId = getIdByToken(token);

                // en caso de que no alla un token en las cookies redirecciona al registro
                if (!token) {
                    next('/')
                }
                else {
                    fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
                    .then(res => res.json())
                    .then(json => {
                        // si la contraseña es temporal ir directamente al cambio de contraseña
                        if (json.is_temp_password){
                            next('/password');
                        }
                        // si la contraseña no es temporal ir directamente a user
                        else {
                            next();
                        }
                    })
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
            component: NewPassword,
            // En caso de que no haya un token
            beforeEnter: (to, from, next) => {
                const token = Cookies.get('jwt')
                
                if (!token) {
                    next('/')
                }
                else {
                    next()
                }
                
            }
        },
        {
            path: '/BancosERPs',
            name : 'BancosERPs',
            component: BancosERPs
        }
    ],
});

export default router;