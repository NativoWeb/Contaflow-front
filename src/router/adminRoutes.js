import AccountantsView from "@/views/admin/AccountantsView.vue";
import ClientsView from "@/views/admin/ClientsView.vue";
import AuditorsView from "@/views/admin/AuditorsView.vue";
import AuditorDetail from "@/components/admin/info/AuditorDetail.vue";
import ClientDetails from "@/components/admin/info/ClientDetails.vue";
import AccountantDetails from "@/components/admin/info/AccountantDetails.vue";
import ListaCon from "@/components/admin/ListaCon.vue";
import EmpresaCon from "@/components/admin/EmpresaCon.vue";
import ExtractoCon from "@/components/admin/ExtractoCon.vue";
import ResultadoCon from "@/components/admin/ResultadoCon.vue.vue";
import ModificarCon from "@/components/admin/ModificarCon.vue";
import ListaReporte from "@/components/admin/ListaReporte.vue";
import ReporteAdmin from "@/components/admin/ReporteAdmin.vue";
import ClientsAccAudTable from "@/components/admin/info/ClientsAccAudTable.vue";
import AssignClientDetail from "@/components/admin/crud/assign/AssignClientDetail.vue";
import ConciliationDetails from "@/components/admin/conciliations/ConciliationDetails.vue";
import RemoveClientDetail from "@/components/admin/crud/assign/RemoveClientDetail.vue";

const adminRoutes = [
  // registro y tabla de usuarios y empresas
  {
    path: 'contadores',
    component: AccountantsView,
    props: true
  },
  {
    path: 'clientes',
    component: ClientsView,
    props: true
  },
  {
    path: 'auditores',
    component: AuditorsView,
    props: true
  },
  // detalles de cada usuario y empresas
  {
    path: 'contador/:id',
    component: AccountantDetails,
    props: true
  },
  {
    path: 'cliente/:id',
    component: ClientDetails,
    props: true
  },
  {
    path: 'auditor/:id',
    component: AuditorDetail,
    props: true
  },
  // conciliaciones
  {
    path: 'conciliacion', 
    name: 'EmpresaCon',
    component: EmpresaCon
  },
  {
    path: 'ListaCon',
    name: 'ListaCon',
    component: ListaCon
  },
  {
    path: 'ExtractoCon',
    name: 'ExtractoCon',
    component: ExtractoCon
  },
  {
    path: 'ResultadoCon',
    name: 'ResultadoCon',
    component: ResultadoCon
  },
  {
    path: 'ModificarCon',
    name: 'ModificarCon',
    component: ModificarCon
  },
  {
    path: 'ListaReporte',
    name: 'ListaReporte',
    component: ListaReporte
  },
  {
    path: 'ReporteAdmin',
    name: 'ReporteAdmin',
    component: ReporteAdmin
  },
  // relaciones 
  {
    path: 'contador/clientes_contador/:role/:id',
    name: 'ClientesContador',
    component: ClientsAccAudTable
  },
  {
    path: 'auditor/clientes_auditor/:role/:id',
    name: 'ClientesAuditor',
    component: ClientsAccAudTable
  },
  // relaciones detalles, asignaciones y remover
  {
    path: 'contador/clientes_contador/accountants/:role=:userId/detalles_cliente=:id',
    name: 'ClientsDetailsAccountant',
    component: AssignClientDetail
  },
  {
    path: 'auditor/clientes_auditor/auditors/:role=:userId/detalles_cliente=:id',
    name: 'ClientsDetailsAuditor',
    component: AssignClientDetail
  },
  {
    path: 'contador/clientes_contador/accountants/:role=:userId/remover_cliente=:id',
    name: 'ClientsRemoveAccountant',
    component: RemoveClientDetail
  },
  {
    path: 'auditor/clientes_auditor/auditors/:role=:userId/remover_cliente=:id',
    name: 'ClientsRemoveAuditors',
    component: RemoveClientDetail
  },
  // conciliaciones
  {
    path: '/conciliation=:id',
    name: 'ConciliationDetails',
    component: ConciliationDetails
  },
]

export default adminRoutes;