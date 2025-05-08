import TableConciliationAud from "@/components/auditors/TableConciliationAud.vue";
import TableClientsAud from "@/components/auditors/TableClientsAud.vue";
import ConciliationsToSign from "@/components/auditors/conciliations/ConciliationsToSign.vue";
import SignConciliation from "@/components/auditors/conciliations/SignConciliation.vue";
import ConciliationsClientsList from "@/components/auditors/ConciliationsClientsList.vue";
import ConciliationsClientsDetails from "@/components/auditors/ConciliationsClientsDetails.vue";
import MyConciliationsDetails from "@/components/auditors/conciliations/MyConciliationsDetails.vue";

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
    path: '/auditor/firmar_conciliacion=:id',
    name: 'SignConciliation',
    component: SignConciliation
  },
  {
    path: '/detalles_conciliacion_auditor=:id',
    name: 'ConciliationDetailsAuditor',
    component: MyConciliationsDetails
  },
  {
    path: '/detalles_cliente_auditor=:id',
    name: 'ClientDetailsAuditor',
    component: SignConciliation
  },
  {
    path: '/auditor/lista_conciliaciones_cliente=:id',
    name: 'ClientsConciliationsAuditor',
    component: ConciliationsClientsList
  },
  {
    path: '/auditor/informacion_cliente/:id',
    name: 'ConciliationsDetailsAuditor',
    component: ConciliationsClientsDetails
  }
]

export default  auditorRoutes;