import TableClientsAccount from "@/components/accountants/TableClientsAccount.vue";
import TableCompanyAccount from "@/components/accountants/TableCompanyAccount.vue";
import ConciliationsInfo from "@/components/accountants/ConciliationsInfo.vue";
import CreateConciliationss from "@/components/accountants/CreateConciliations.vue";
import SelectClient from "@/components/accountants/conciliations/SelectClient.vue";
import CreateConciliation from "@/components/accountants/conciliations/CreateConciliation.vue";
import ResponseConciliation from "@/components/accountants/conciliations/ResponseConciliation.vue";
import SelectAuditor from "@/components/accountants/conciliations/SelectAuditor.vue";

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
    path: '/table_company',
    name: 'TableCompanyAccount',
    component: TableCompanyAccount
  },
  {
    path: '/crear_conciliacion',
    name: 'CreateConciliation',
    component: SelectClient
  },
  {
    path: '/cliente=:id/seleccionar_auditor',
    name: 'SelectAuditor',
    component: SelectAuditor
  },
  {
    path: '/cliente=:id/seleccionar_auditor/auditor=:auditorId/seleccionar_extracto',
    name: 'SelectExtract',
    component: CreateConciliation
  },
  {
    path: '/respuesta_conciliacion',
    name: "ResponseConciliation",
    component: ResponseConciliation
  },
  {
    path: '/conciliacion_informacion/conciliacion=:conciliationId',
    name: "ConciliationInformation",
    component: ResponseConciliation
  }
]

export default accountantRoutes;