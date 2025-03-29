import { createRouter, createWebHistory } from "vue-router";
import Cookies from 'js-cookie';
import ManageUsers from "@/components/Admi/Usuarios/ManageUsers.vue";
import NewPassword from "@/components/NewPassword.vue";
import getIdByToken from "@/hooks/getId";
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

//Empresa Admin
import EmpresaRegistro from "@/components/Admi/Empresa/EmpresaRegistro.vue";
import EditarEmpresa from "@/components/Admi/Empresa/EditarEmpresa.vue";
// Contador
import MenuContador from "@/components/Contador/MenuContador.vue";
import EmpresaConciliacion from "@/components/Contador/ConciliacionContador/EmpresaConciliacion.vue";
import ListaConciliaciones from "@/components/Contador/ConciliacionContador/ListaConciliaciones.vue";
import ExtractosConciliacion from "@/components/Contador/ConciliacionContador/ExtractosConciliacion.vue";
import ResultadoConcilliacion from "@/components/Contador/ConciliacionContador/ResultadoConcilliacion.vue";
import ModificarConciliacion from "@/components/Contador/ConciliacionContador/ModificarConciliacion.vue";
import EmpresaReporte from "@/components/Contador/Reportes/EmpresaReporte.vue";
import ListaReporteContador from "@/components/Contador/Reportes/ListaReporteContador.vue";
import ReportesContador from "@/components/Contador/Reportes/ReportesContador.vue";
import EmpresasContador from "@/components/Contador/EmpresaContador/EmpresasContador.vue";
import CuentaContador from "@/components/Contador/Cuenta/CuentaContador.vue";

import DatosUsuario from "@/components/Admi/Registros/DatosUsuario.vue";
import UsersDetails from "@/components/UsersDetails.vue";
import AuditorDetail from "@/components/AuditorDetail.vue";
import ContadorDetails from "@/components/ContadorDetails.vue";
import AccountantsComponent from "@/components/pages/AccountantsComponent.vue";
import ClientsComponent from "@/components/pages/ClientsComponent.vue";
import AuditorsComponent from "@/components/pages/AuditorsComponent.vue";
import LoginUser from "@/components/LoginUser.vue";

const VUE_APP_URL = process.env.VUE_APP_URL;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/Dashboard',
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
                            fetch(`${VUE_APP_URL}/users/${userId}/`)
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
                    path: '/contador',
                    component: AccountantsComponent,
                    props: true
                },
                {
                    path: '/clientes',
                    component: ClientsComponent,
                    props: true
                },
                {
                  path: '/auditores',
                  component: AuditorsComponent,
                  props: true
                },
                {
                    path: '/contador/:id',
                    component: ContadorDetails,
                    props: true
                },
                    {
                    path: '/auditores/:id',
                    component: AuditorDetail,
                    props: true
                },
                {
                    path: '/cliente/:id',
                    component: UsersDetails,
                    props: true
                },
                
                {
                    path: '/DatosUsuario',
                    name: 'DatosUsuario',
                    component: DatosUsuario
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
                
            ]
        },
        {
            path: "/",
            name: "Login",
            component: LoginUser
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
        

         // 🔹 RUTA DE CONTADOR 
         {
            path: '/MenuContador',
            name: 'MenuContador',
            component: MenuContador,
            children: [
                {
                    path: '/EmpresaConciliacion',
                    name: 'EmpresaConciliacion',
                    component: EmpresaConciliacion
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
                    path: '/ResultadoConcilliacion',
                    name: 'ResultadoConcilliacion',
                    component: ResultadoConcilliacion
                },
                {
                    path: '/ModificarConciliacion',
                    name: 'ModificarConciliacion',
                    component: ModificarConciliacion
                },
                {
                    path: '/EmpresaReporte',
                    name: 'EmpresaReporte',
                    component: EmpresaReporte
                },
                {
                    path: '/ListaReporteContador',
                    name: 'ListaReporteContador',
                    component: ListaReporteContador
                },
                {
                    path: '/ReportesContador',
                    name: 'ReportesContador',
                    component: ReportesContador
                },
                {
                    path: '/EmpresasContador',
                    name: 'EmpresasContador',
                    component: EmpresasContador
                },
                {
                    path: '/CuentaContador',
                    name: 'CuentaContador',
                    component: CuentaContador
                },
            ]
        }
    ],
});

export default router;