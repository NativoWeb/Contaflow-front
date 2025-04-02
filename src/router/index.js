import { createRouter, createWebHistory } from "vue-router";
import Cookies from 'js-cookie';
import ManageUsers from "@/components/admin/ManageUsers.vue";
import ChangePasswordView from "@/views/auth/ChangePasswordView.vue";
import getIdByToken from "@/hooks/getId";
import ListaCon from "@/components/admin/ListaCon.vue";
import BancosERPs from "@/components/admin/BancosERPs.vue";
import EmpresaCon from "@/components/admin/EmpresaCon.vue";
import ExtractoCon from "@/components/admin/ExtractoCon.vue";
import ResultadoCon from "@/components/admin/ResultadoCon.vue.vue";
import ModificarCon from "@/components/admin/ModificarCon.vue";
import ReporteEmpre from "@/components/admin/ReporteEmpre.vue";
import ListaReporte from "@/components/admin/ListaReporte.vue";
import ReporteAdmin from "@/components/admin/ReporteAdmin.vue";
import PerfilAdmin from "@/components/admin/PerfilAdmin.vue";
//Empresa Admin
import EmpresaRegistro from "@/components/admin/EmpresaRegistro.vue";
import EditarEmpresa from "@/components/admin/EditarEmpresa.vue";
import AuditorDetail from "@/components/admin/info/AuditorDetail.vue";
import ClientDetails from "@/components/admin/info/ClientDetails.vue";
import AccountantDetails from "@/components/admin/info/AccountantDetails.vue";
import DashboardView from "@/components/common/DashboardView.vue";

import LoginUser from "@/views/auth/LoginView.vue";
import AccountantsView from "@/views/admin/AccountantsView.vue";
import ClientsView from "@/views/admin/ClientsView.vue";
import AuditorsView from "@/views/admin/AuditorsView.vue";


const VUE_APP_URL = process.env.VUE_APP_URL;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/Dashboard',
            name: 'Dashboard',
            component: DashboardView,
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
                    component: AccountantsView,
                    props: true
                },
                {
                    path: '/clientes',
                    component: ClientsView,
                    props: true
                },
                {
                  path: '/auditores',
                  component: AuditorsView,
                  props: true
              },
                {
                    path: '/contador/:id',
                    component: AccountantDetails,
                    props: true
                },
                {
                    path: '/cliente/:id',
                    component: ClientDetails,
                    props: true
                },
                {
                    path: '/auditor/:id',
                    component: AuditorDetail,
                    props: true
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
            component: ChangePasswordView,
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