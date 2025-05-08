import TableClientsAccount from "@/components/accountants/TableClientsAccount.vue";
import ConciliationsInfo from "@/components/accountants/ConciliationsDetails.vue";
import CreateConciliationss from "@/components/accountants/CreateConciliations.vue";
import SelectClient from "@/components/accountants/conciliations/SelectClient.vue";
import CreateConciliation from "@/components/accountants/conciliations/CreateConciliation.vue";
import ResponseConciliation from "@/components/accountants/conciliations/ResponseConciliation.vue";
import SelectAuditor from "@/components/accountants/conciliations/SelectAuditor.vue";
import ConciliationsList from "@/components/accountants/conciliations/ConciliationsList.vue";
import ClientDetails from "@/components/accountants/ClientDetails.vue";
import ConciliationsDetails from "@/components/accountants/ConciliationsDetails.vue";
import ConciliationsClientsList from "@/components/accountants/ConciliationsClientsList.vue";

const accountantRoutes = [
  {
    path: '/lista_de_clientes',
    name: 'TableClientsAccount',
    component: TableClientsAccount
  },
  {
    path: '/conciliaciones',
    name: 'TableConciliationAcconunt',
    component: ConciliationsInfo
  },
  {
    path: 'conciliaciones/crear_conciliacion',
    name: 'CreateConciliation',
    component: CreateConciliationss
  },
  {
    path: '/crear_conciliacion',
    name: 'CreateConciliation',
    component: SelectClient
  },
  {
    path: '/cliente=:id/:nameClient/seleccionar_auditor',
    name: 'SelectAuditor',
    component: SelectAuditor
  },
  {
    path: '/lista_conciliaciones_cliente=:id',
    name: 'ClientsConciliationsList',
    component: ConciliationsClientsList
  },
  {
    path: '/cliente=:id/:nameClient/seleccionar_auditor/auditor=:auditorId/:auditorName/seleccionar_extracto',
    name: 'SelectExtract',
    component: CreateConciliation
  },
  {
    path: '/conciliacion_informacion/conciliacion',
    name: "ConciliationInformation",
    component: ResponseConciliation
  },
  {
    path: '/lista_conciliaciones',
    name: 'ConciliationsList',
    component: ConciliationsList
  },
  {
    path: '/informacion_cliente/:id',
    name: 'ClientDetails',
    component: ClientDetails
  },
  {
    path: '/detalles_conciliacion=:id',
    name: 'ConciliationDeatils',
    component: ConciliationsDetails
  }
]

export default accountantRoutes;