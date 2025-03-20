import { createRouter, createWebHistory } from "vue-router";

import Cookies from 'js-cookie';
import ManageUsers from "@/components/Admi/Usuarios/ManageUsers.vue";


import NewPassword from "@/components/NewPassword.vue";
import getIdByToken from "@/hooks/getId";

import CuentaContador from '@/components/Contador/Cuenta/CuentaContador.vue'
import EditarPerfilCon from '@/components/Contador/Cuenta/EditarPerfilCon.vue'
import CambiarPasswordCon from '@/components/Contador/Cuenta/CambiarPasswordCon.vue'
import EmpresaConciliacion from '@/components/Contador/ConciliacionContador/EmpresaConciliacion.vue'
import EmpresasConta from '@/components/Contador/EmpresaContador/EmpresasConta.vue'
import BancosConciliacion from '@/components/Contador/ConciliacionContador/BancosConciliacion.vue'
import ExtractosConciliacion from '@/components/Contador/ConciliacionContador/ExtractosConciliacion.vue'
import MenuContador from '@/components/Contador/MenuContador.vue'; // Ajusta la ruta si es necesario
import DashboarContador from "@/components/Contador/DashboarContador/DashboarContador.vue";
import ReportesContador from "@/components/Contador/Reportes/ReportesContador.vue";
import EmpresaReporte from "@/components/Contador/Reportes/EmpresaReporte.vue";
import ListaConciliaciones from '@/components/Contador/ConciliacionContador/ListaConciliaciones.vue';
import DashboardComponent from "@/components/pages/DashboardComponent.vue";
import ListaCon from "@/components/Admi/Conciliacion/ListaCon.vue";

import BancosERPs from "@/components/Admi/Bancos/BancosERPs.vue";
import EmpresaCon from "@/components/Admi/Conciliacion/EmpresaCon.vue";
import ExtractoCon from "@/components/Admi/Conciliacion/ExtractoCon.vue";
import ResultadoCon from "@/components/Admi/Conciliacion/ResultadoCon.vue.vue";
import ModificarCon from "@/components/Admi/Conciliacion/ModificarCon.vue";

import ReporteEmpre from "@/components/Admi/ReportesAuditorias/ReporteEmpre.vue";
import ListaReporte from "@/components/Admi/ReportesAuditorias/ListaReporte.vue";
import ReporteAdmin from "@/components/Admi/ReportesAuditorias/ReporteAdmin.vue";


import PerfilAdmin from "@/components/Admi/Perfil/PerfilAdmin.vue";
import EditarPerfilAdmin from "@/components/Admi/Perfil/EditarPerfilAdmin.vue";
import ContraseñaAdmin from "@/components/Admi/Perfil/ContraseñaAdmin.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

import EditarUsuario from "@/components/Admi/Usuarios/EditarUsuario.vue";


//Empresa Admin
import EmpresaRegistro from "@/components/Admi/Empresa/EmpresaRegistro.vue";
import EditarEmpresa from "@/components/Admi/Empresa/EditarEmpresa.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: DashboardComponent,
            children: [
                {
                    path: "/usuarios",
                    name: "usuarios",
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
                            fetch(`http://127.0.0.1:8000/users/${userId}/`)
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
                    path: '/EditarUsuario',
                    name: 'EditarUsuario',
                    component: EditarUsuario
                },

                {
                    path: '/EmpresaRegistro',
                    name: 'EmpresaRegistro',
                    component: EmpresaRegistro
                },
                {
                    path: '/EditarEmpresa',
                    name: 'EditarEmpresa',
                    component: EditarEmpresa
                },
            
                {
                    path: '/BancosERPs',
                    name : 'BancosERPs',
                    component: BancosERPs
                },
                {
                    path: '/conciliacion', 
                    name: 'EmpresaCon',
                    component: EmpresaCon
                },
                {
                    path: '/ListaCon',
                    name: 'ListaCon',
                    component: ListaCon
                },
                {
                    path: '/ExtractoCon',
                    name: 'ExtractoCon',
                    component: ExtractoCon
                },
                {
                    path: '/ResultadoCon',
                    name: 'ResultadoCon',
                    component: ResultadoCon
                },
                {
                    path: '/ModificarCon',
                    name: 'ModificarCon',
                    component: ModificarCon
                },
                {
                    path: '/ReporteEmpre',
                    name: 'ReporteEmpre',
                    component: ReporteEmpre
                },
                {
                    path: '/ListaReporte',
                    name: 'ListaReporte',
                    component: ListaReporte
                },
                {
                    path: '/ReporteAdmin',
                    name: 'ReporteAdmin',
                    component: ReporteAdmin
                },

                {
                    path: '/PerfilAdmin',
                    name: 'PerfilAdmin',
                    component: PerfilAdmin
                },
                {
                    path: '/EditarPerfilAdmin',
                    name: 'EditarPerfilAdmin',
                    component: EditarPerfilAdmin
                },
                {
                    path: '/ContraseñaAdmin',
                    name: 'ContraseñaAdmin',
                    component: ContraseñaAdmin
                }
                
            ]
        },
        {
            path: "/login",
            name: "Login",
            component: RegisterComponent
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
        
    ],
});

export default router;