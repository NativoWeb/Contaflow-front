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

import AccountantDetails from "@/components/admin/info/AccountantDetails.vue";
import EditCompanies from "@/components/admin/companies/EditCompanies.vue";
import CompaniesView from "@/views/companies/CompaniesView.vue";

import AuditorDetail from "@/components/admin/info/AuditorDetail.vue";
import ClientDetails from "@/components/admin/info/ClientDetails.vue";
import LoginUser from "@/views/auth/LoginView.vue";
import AccountantsView from "@/views/admin/AccountantsView.vue";
import ClientsView from "@/views/admin/ClientsView.vue";
import AuditorsView from "@/views/admin/AuditorsView.vue";
// import NavbarHeader from "@/components/common/NavbarHeader.vue";
import DashboardView from "@/components/common/DashboardView.vue";
import AdminContext from "@/views/context/AdminContext.vue";
import NavbarHeader from "@/components/common/NavbarHeader.vue";

const VUE_APP_URL = process.env.VUE_APP_URL;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/',
          name: 'navbar',
          component: NavbarHeader,            
          beforeEnter: (to, from, next) => {
            const token = Cookies.get('jwt')  
              if (!token) {
                next('/login')
              }
              else {
                next()
              }
              
          }
        },
        {
            path: '/administrador',
            name: 'Administrador',
            component: AdminContext,
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
                            next('/login')
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
                    path: '/contadores',
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
                    path: '/empresas',
                    component: CompaniesView
                },
                {
                    path: '/empresas/editar',
                    name: 'EditarEmpresa',
                    component: EditCompanies
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
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: DashboardView
                },
            ]
        },
        {
            path: "/login",
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
                    next('/login')
                }
                else {
                    next()
                }
                
            }
        },
    ],
});

export default router;