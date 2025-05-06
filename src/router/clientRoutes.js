import TablaContador from "@/components/clients/TablaContador.vue";
import TablaAuditore from "@/components/clients/TablaAuditore.vue";
import TablaConciliation from "@/components/clients/TablaConciliation.vue";
import ConciliationDetails from "@/components/clients/ConciliationDetails.vue";

const clientRoutes = [
  {
    path: '/tabla_de_contador',
    name:'TablaContador',
    component: TablaContador
  },
  {
    path: 'tabla_de_auditor',
    name: 'TablaAuditore',
    component: TablaAuditore
  },
  {
    path: '/tabla_de_conciliaciones',
    name: 'TablaConciliation',
    component: TablaConciliation
  },
  {
    path: '/detalles_conciliacion_cliente=:id',
    name: 'ConcilientionDetailsClient',
    component: ConciliationDetails
  }
]

export default clientRoutes;