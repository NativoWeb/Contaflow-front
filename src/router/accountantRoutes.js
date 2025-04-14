import TableClientsAccount from "@/components/accountants/TableClientsAccount.vue";
import TableConciliationAcconunt from "@/components/accountants/TableConciliationAcconunt.vue";
import TableCompanyAccount from "@/components/accountants/TableCompanyAccount.vue";

const accountantRoutes = [
  {
    path: '/lista_de_clientes',
    name: 'TableClientsAccount',
    component: TableClientsAccount
  },
  {
    path: '/tabla_de_conciliacion',
    name: 'TableConciliationAcconunt',
    component: TableConciliationAcconunt
  },
  {
    path: '/table_company',
    name: 'TableCompanyAccount',
    component: TableCompanyAccount
  },
]

export default accountantRoutes;