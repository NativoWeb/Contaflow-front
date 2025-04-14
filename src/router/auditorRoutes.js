import TableConciliationAud from "@/components/auditors/TableConciliationAud.vue";
import TableClientsAud from "@/components/auditors/TableClientsAud.vue";

const auditorRoutes = [
  {
    path: '/tabla_conciliacion_auditor',
    name: 'TableConciliationAud',
    component: TableConciliationAud
  },
  {
    path: '/tabla_clientes_aud',
    name: 'TableClientsAud',
    component: TableClientsAud
  }
]

export default  auditorRoutes;