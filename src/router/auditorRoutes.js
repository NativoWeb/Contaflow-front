import TableConciliationAud from "@/components/auditors/TableConciliationAud.vue";
import TableClientsAud from "@/components/auditors/TableClientsAud.vue";
import ConciliationsToSign from "@/components/auditors/conciliations/ConciliationsToSign.vue";

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
  },
  {
    path: '/conciliaciones_firmar',
    name: 'ConciliationsToSign',
    component: ConciliationsToSign
  }
]

export default  auditorRoutes;