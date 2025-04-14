import TablaContador from "@/components/clients/TablaContador.vue";
import TablaAuditore from "@/components/clients/TablaAuditore.vue";
import TablaEmpresas from "@/components/clients/TablaEmpresas.vue";
import TablaConciliacionn from "@/components/clients/TablaConciliacionn.vue";

const clientRoutes = [
  {
    path: '/tabla_de_contador',
    name:'TablaContador',
    component: TablaContador
  },
  {
    path: 'tabla_de_auditor',
    name: TablaAuditore,
    component: TablaAuditore
  },
  {
    path: '/tabla_de_empresa',
    name: 'TablaEMpresas',
    component: TablaEmpresas
  },
  {
    path: '/tabla_de_conciliaciones',
    name: 'TablaConciliacionn',
    component: TablaConciliacionn
  },
]

export default clientRoutes;