import TableClientsAccount from "@/components/accountants/TableClientsAccount.vue";
import TableCompanyAccount from "@/components/accountants/TableCompanyAccount.vue";
import ConciliationsInfo from "@/components/accountants/ConciliationsInfo.vue";
import CreateConciliations from "@/components/accountants/CreateConciliations.vue";

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
    component: CreateConciliations
  },
  {
    path: '/table_company',
    name: 'TableCompanyAccount',
    component: TableCompanyAccount
  },
]

export default accountantRoutes;