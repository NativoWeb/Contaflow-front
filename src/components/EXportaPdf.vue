<template>
  <div>
    <!-- Botón de descarga -->
    <button
      class="btn btn-primary text-white mb-2"
      @click="PDF"
    >
      Descargar pdf
    </button>

    <button
      class="btn btn-primary text-white mb-2"
      @click="excel"
    >
      Descargar excel
    </button> 

   


    <!-- Contenido para exportar a PDF -->
    <div id="element-to-pdf">

  
<div class="container mt-5">
<!-- Título -->
<div class="text-center mb-4">
  <h1 class="text-primary">La Importancia de los Cursos en Línea</h1>
</div>

<!-- Tarjeta de contenido -->
<div class="card shadow rounded-4 p-4">
  <div class="card-body">
    <p class="fs-5">
      En la actualidad, los <strong>cursos en línea</strong> se han consolidado como una herramienta clave para el aprendizaje moderno. Gracias a su flexibilidad, permiten que personas de todo el mundo accedan a educación de calidad sin importar su ubicación geográfica.
    </p>
    <p class="fs-5">
      Estos cursos brindan la posibilidad de estudiar a cualquier hora, con materiales actualizados, clases grabadas, y contenidos interactivos. Además, muchas plataformas ofrecen cursos impartidos por expertos reconocidos en distintas áreas del conocimiento.
    </p>
    <p class="fs-5">
      Desde la programación y el diseño web, hasta idiomas y habilidades blandas, existe una amplia variedad de temáticas que responden a las necesidades del mundo laboral actual. La formación continua mediante cursos en línea mejora las oportunidades profesionales y permite mantenerse competitivo en un entorno cada vez más cambiante.
    </p>
    <p class="fs-5">
      En definitiva, aprovechar los recursos educativos digitales es una decisión estratégica que contribuye al crecimiento personal y profesional de cualquier individuo.
    </p>
  </div>
</div>
</div>

<div class="container mt-5">
<!-- Título principal -->
<h2 class="text-center mb-4 text-primary">Lista de Cursos en Línea</h2>

<!-- Tabla responsive con clases de Bootstrap -->
<div class="table-responsive">
  <table class="table table-striped table-hover table-bordered">
    <thead class="table-dark">
      <tr>
        <th>#</th>
        <th>Nombre del Curso</th>
        <th>Instructor</th>
        <th>Duración</th>
        <th>Disponibilidad</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Introducción a la Programación</td>
        <td>Ana Martínez</td>
        <td>6 semanas</td>
        <td>Disponible</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Diseño Web con HTML y CSS</td>
        <td>Juan Pérez</td>
        <td>4 semanas</td>
        <td>Disponible</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Fundamentos de Base de Datos</td>
        <td>Laura Gómez</td>
        <td>5 semanas</td>
        <td>No disponible</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Desarrollo con JavaScript</td>
        <td>Carlos Ruiz</td>
        <td>8 semanas</td>
        <td>Disponible</td>
      </tr>
    </tbody>
  </table>
</div>
      </div>
    </div>

    
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import exportFromJSON from 'export-from-json'

export default {
  name: 'CursoPDF',
  data() {
    return {
      items: [ // ✅ Datos para exportar a Excel
        {
          id: 1,
          curso: 'Introducción a la Programación',
          instructor: 'Ana Martínez',
          duracion: '6 semanas',
          disponibilidad: 'Disponible'
        },
        {
          id: 2,
          curso: 'Diseño Web con HTML y CSS',
          instructor: 'Juan Pérez',
          duracion: '4 semanas',
          disponibilidad: 'Disponible'
        },
        {
          id: 3,
          curso: 'Fundamentos de Base de Datos',
          instructor: 'Laura Gómez',
          duracion: '5 semanas',
          disponibilidad: 'No disponible'
        },
        {
          id: 4,
          curso: 'Desarrollo con JavaScript',
          instructor: 'Carlos Ruiz',
          duracion: '8 semanas',
          disponibilidad: 'Disponible'
        }
      ]
    }
  },
  methods: {
    PDF() {
      var element = document.getElementById('element-to-pdf');
      var opt = {
        margin:       0.5,
        filename:     'Exportado_pdf.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 3},
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      // New Promise-based usage:
      html2pdf().from(element).set(opt).save();
    },

    excel() {
      const data = this.items
      const fileName = 'Descargar_excel'
      const exportType = exportFromJSON.types.xls // ✅ Corregido aquí también
      exportFromJSON({ data, fileName, exportType })
    }
  }
}
</script>
