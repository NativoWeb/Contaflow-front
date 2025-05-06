import TableConciliationAud from "@/components/auditors/TableConciliationAud.vue";
import TableClientsAud from "@/components/auditors/TableClientsAud.vue";
import ConciliationsToSign from "@/components/auditors/conciliations/ConciliationsToSign.vue";
import SignConciliation from "@/components/auditors/conciliations/SignConciliation.vue";
import MyConciliations from "@/components/auditors/conciliations/MyConciliations.vue";

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
  },
  {
    path: '/firmar_conciliacion=:id',
    name: 'SignConciliation',
    component: SignConciliation
  },
  {
    path: '/detalles_conciliacion_auditor=:id',
    name: 'ConciliationDetailsAuditor',
    component: MyConciliations
  },
  {
    path: '/detalles_cliente_auditor=:id',
    name: 'ClientDetailsAuditor',
    component: SignConciliation
  }
]

export default  auditorRoutes;