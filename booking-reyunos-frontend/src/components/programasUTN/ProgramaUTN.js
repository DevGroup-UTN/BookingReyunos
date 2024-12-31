import React from 'react';
import '../../styles/ProgramaUTN.css'; // Importa el archivo CSS
import { Link } from 'react-router-dom';

function ProgramaUTN() {
  return (
    <div className="programa-utn-container">
      <Link to="/programas" className="volver-programas">
        &lt;&lt;&lt; Volver a Programas
      </Link> 

       <img src="/images/programas/programas1.png" alt="Programa UTN" />

      <h2>Módulos Académicos Acreditables - UTN</h2>

      <h3>Objetivo:</h3>
      <p>Integración de distintas Facultades Regionales de la UTN mediante el desarrollo de una actividad específica de formación de grado, en un tema común para todas las especialidades de las carreras de ingeniería, a través de un curso técnico/práctico denominado "Gestión y Desarrollo Territorial", cursado de modo intensivo in-situ, en el Centro CTDR "Los Reyunos".</p>

      <h3>Metodología:</h3>
      <p>Cursado presencial intensivo de lunes a viernes, en el Centro Tecnológico de Desarrollo Regional "Los Reyunos". Incluye actividades áulicas, análisis de maquetas, espacios de reflexión y debate, y visitas técnicas a los laboratorios reales de escala 1:1.</p>

      <h3>Duración:</h3>
      <p>La actividad se desarrolla en una (1) semana, comenzando los días lunes a las 09:00 hs (pudiendo arribar la delegación en la noche del domingo previo) y finalizando el día viernes siguiente a las 16:00 hs (inicio viaje de regreso de la delegación).</p>

      <h3>Destinación:</h3>
      <p>Para alumnos avanzados de cualquiera de las especialidades de las carreras de Ingeniería que estén cursando materias de los últimos años de la carrera. Cada Facultad resolverá la selección definitiva siguiendo parámetros propios a cada realidad local (promedios, participación en actividades de la Facultad, condición de becario, etc.)</p>

      <h3>Modalidad:</h3>
      <p>Cada viaje será realizado de manera compartida por dos (2) Facultades Regionales de distintos lugares del país, para favorecer la integración y dar lugar a la participación de todas las sedes de la UTN, una vez por año, durante los años subsiguientes.)</p>

      <h3>Matrícula:</h3>
      <p>Se establece, por cada Facultad, un cupo de veintidós (20) personas en total, dentro del cual se consideran incluidos 1 o 2 docentes a cargo de la delegación y los choferes de los medios de movilidad para el traslado; en el caso que así lo hubiere resuelto la Facultad.</p>

      <h3>Acreditación:</h3>
      <p>Con posterioridad a la visita educativa, cada unidad académica interviniente tendrá una instancia evaluativa para los estudiantes participantes, la cual será asistida y coordinada por el docente que acompañe al contingente. Cada estudiante deberá realizar un trabajo que vincule el conocimiento adquirido con la especialidad que cursa. Esta actividad con asistencia del docente, supone una carga horaria de 26hs.</p>
      <p>Una vez concluidas las fases completas cada unidad académica podrá certificar la acreditación de 3 hs dentro del espacio electivo correspondiente a la especialidad que cursa el estudiante.</p>

      <h3>Costos:</h3>
      <p>Los costos de las actividades que forman parte del programa, son cubiertas en su totalidad por el CTDR "Los Reyunos". Los mismos incluyen, la estadía (hospedaje en el Complejo con pensión completa; desayunos, almuerzos, meriendas y cenas), las actividades de capacitación (coordinación, carga docente, visitas técnicas locales, material de estudio), y las de recreación (sala juegos, playón deportivo, piscina, Internet y visita a la ciudad). Se excluyen los gastos de traslados entre las Facultades de origen y destino (ida y vuelta) que correrán por cuenta de la delegación visitante, debiendo adicionar en el costo del viaje alrededor de 300 Km. extras para los desplazamientos locales.</p>
      <h3>Contenidos:</h3>
      <h3>Programa Analítico:</h3>

      <h3>Unidad 1:</h3>
      <h3>La Ingeniería y el Desarrollo</h3>
      <p>Introducción al Desarrollo Local. La Ingeniería, la transdisciplinariedad y el Desarrollo Local. Diagnóstico Territorial: Recursos y Actores. Herramientas del Desarrollo Local: Plan Estratégico de Desarrollo, Agencias de Desarrollo, Gestión Asociada, Polos y Parques Tecnológicos, Inclusión Digital, Marca Ciudad, Emprendedorismo y Clusters, Identificación Geográfica Protegida, Identificación, Formulación y Gestión de Proyectos.</p>
      <p>Carga Horaria: 8 hs</p>
      <h3>Unidad 2:</h3>
      <h3>La Ingeniería y la Gestión</h3>
      <p>Competencias administrativas y de gestión del ingeniero; diseño de productos innovadores; gestión ambiental; administración de procesos industriales; priorización de inversiones; productividad de pymes; tecnología e innovación en las organizaciones.</p>
      <p>Carga Horaria: 8 hs</p>
      <h3>Unidad 3:</h3>
      <h3>Aprovechamientos Hidráulicos de propósitos múltiples I.</h3>
      <p>Cuencas hidrográficas. Aprovechamiento multipropósito. Complejo y sistema hidroeléctrico en ríos de montaña. Anteproyecto. Proyecto ejecutivo. Etapas de obras civiles, hidroelectromecánicas y complementarias. Complejos sistema río Diamante Reyunos y el Tigre: contratos de provisión, montajes, ensayos, pruebas, puesta en marcha operativa, marcha industrial. Correlación tecnológica con dique Agua del Toro y complejos Nihuil I, II y III.</p>
      <p>Carga Horaria: 8 hs.</p>

      <h3>Unidad 4:</h3>
      <h3>Aprovechamientos Hidráulicos de propósitos múltiples II.</h3>
      <p>Clasificación de Centrales Hidroeléctricas. Potencia instalada. Grandes, mini y micro centrales. Grupos turboalternadores sincrónicos: Grupo convencional turbina-alternador. Central combinada de tipo reversible turbina-alternador/ motor-bomba. Máquinas compensadoras sincrónicas rotativas de grandes potencias reactivas: inductivas y capacitivas. Sistemas de generación, transformación y transmisión de la energía. Sistemas electromecánicos instalados en diques y obras complementarias. Sistema de gestión de mantenimiento. Tipos de mantenimiento.</p>
      <p>Carga Horaria: 8 hs.</p>
      <h3>Unidad 5:</h3>
      <h3>Aprovechamientos Hidráulicos de propósitos múltiples III. Obras civiles.</h3>
      <p>Tipos de presas según su diseño. Criterios para la selección. Principios constructivos. Comportamientos funcionales. Verificación de cargas. Solicitaciones sísmicas. Definición y función de presas. Presas de regulación. Presas intermedias de acumulación. Presas de derivación para generación. Presas de compensación para bombeo y riego. Presas derivadoras para riego. Seguridad de presas. Auscultación de presas.</p>
      <p>Carga Horaria: 4 hs.</p>

      <h3>Unidad 6:</h3>
      <h3>Infraestructura Hidráulica para riego.</h3> 
      <p>Introducción. Ente administrador. Red de riego. Azud derivador móvil: Compuertas, vertedero, cámara desripiadora. Canal matriz. Cámara desarenadora. Canales marginales. Canales secundarios. Hijuelas principales. Riego superficial. Represas. Riego presurizado.</p>
      <p>Carga Horaria: 4 hs.</p>
      <h3>Unidad 7:</h3>
      <h3>Aprovechamientos Hidráulicos de propósitos múltiples IV. Parques de interconexión. Líneas de alta tensión.</h3>
      <p>Red en anillo de voz y datos, de los sistemas Nihuil y Diamante. Red de Comunicaciones. Nuevas Tecnologías en Comunicaciones aplicadas a Sistemas de Potencia. Integración con el Sistema de Comunicaciones Operativo (Onda Portadora).</p>
      <p>Despeje automático de generación (DAG): Automatismos utilizados como protecciones. Parques de interconexión y líneas de alta tensión: Esquema básico del Telecontrol. Alta tensión: interruptores, seccionadores, transformadores de medición, acoplamientos de onda portadora. Baja Tensión: sistema de servicios auxiliares.</p>
      <p>Carga Horaria: 3 hs.</p>
      <h3>Unidad 8:</h3>
      <h3>Proyectos de Infraestructura con Impacto Regional:</h3>
      <h3>Principios teóricos generales:</h3> 
      <p>
        A-Aprovechamiento integral del Río Grande. Trasvase Río Grande al Río Atuel: Proyecto de propósitos múltiples; Componentes del proyecto: ambiental (base cero, evaluación de componentes ambientales de las alternativas de obras); civil (presas de regulación de caudales, túneles, conducciones hidráulicas cerradas y abiertas, azudes y sifones, modelización del sistema), energético (generación en obras nuevas y generación adicional existentes de generación, líneas de transporte de energía); demanda hídrica de cultivos a implantar: situación con y sin proyecto (evaluación de suelos, evaluación de optimización de infraestructura existente, definición de nueva infraestructura para riego y otros usos, definición de modelos productivos); evaluación comparativa de alternativas de trasvase (evaluación socio - económica). Impacto regional.
      </p>
      <p>
      B- Paso las Leñas: Selección de alternativas de pasos fronterizos entre Argentina y Chile; descripción de las obras civiles del paso seleccionado; estudios geológicos; análisis de costos; estudios comparativos; Evaluación del Tránsito Medio Diario (TMDA); Impacto

      <p>Carga Horaria: 5 hs.</p>
      </p> 
      <h3>Unidad 9:</h3>
      <h3>Industrias Regionales</h3>

      <p>
      A-Industria del aceite de oliva: Características de la materia prima. Recolección. Almacenamiento. Lavado. Trituración. Prensado. Métodos de extracción: por presión, centrifugación, percolación o filtración selectiva. Coadyuvantes. Refinación. Decoloración. Desodorización. Fraccionamiento, envasado, almacenamiento del aceite. Composición. Clasificación del aceite de oliva.
        </p>
        <p>
        B- Industria Conservera: Pasterización. Esterilización. Destrucción Térmica. Industria del Tomate. Industria del Durazno. Desecación Industrial de frutas y verduras. Tipos de secaderos.
        </p>
        <p>
        C- Industria Enológica: El establecimiento enológico. Recepción y molienda. Fermentación. Conservación. Fraccionamiento. Vasija vinaria. Vinificación en blanco, rosado y tinto. Sistemas especiales de vinificación. Maduración y añejamiento de vinos. Espumantes. Champagne.
        </p>
        <p>Carga Horaria: 9 hs.</p>
        <h3>Unidad 10:</h3>
      <h3>Optativa (en función a la integración de especialidades de la Delegación)</h3>
      <p>
      A-Creatividad e Innovación Tecnológica: Definiciones sobre Creatividad. Avance e Innovación. Ciencia y Tecnología; Determinación de futuros. Proyecciones y prospectiva. La prospectiva tecnológica; El cerebro y la mente. Desarrollo cerebral. Redes neuronales. Técnicas creativas. Técnicas de pensamiento. Técnicas divergentes y convergentes. Análisis morfológico. Método de los actores críticos; Marketing creativo. Ingeniería de valor. Descripción y técnica. Economía digital; La creatividad aplicada a las empresas: Grandes. Pymes. Familiares. Micro empresas; La incubación de empresas; La vigilancia tecnológica y la Inteligencia competitiva
      </p>
      <p>
      B- Astronomía e Ingeniería: La Astronomía y su vínculo con la Ingeniería, en todas sus ramas de desarrollo. El impacto de la investigación básica en la aplicada. La transferencia de la tecnología asociada con la investigación astronómica a la sociedad. Historia del Telescopio en los siglos XX y XXI. Características del telescopio: óptica, mecánica, electrónica, equipo auxiliar, telescopios en el espacio. Uso individual del telescopio del Centro Los Reyunos: características y capacidades, usos, programas de investigación y educación y manejo remoto.
      </p>
      <p>
      C- Plataformas de Gestión Empresarial: Que es un sistema de gestión empresarial ERP:       Que es un ERP?, Porque hablamos de ERP?, Historia, cuán estándar debe implementarse un software, Situación antes de implementar un sistema ERP, Situación con la implementación de un sistema ERP. Sistemas ERP en la industria actual: Grandes competidores en la industria, Que es una implantación de un sistema ERP, Que es la parametrización, Arquitectura, Metodología, Mejores Practicas, Módulos, Soporte, Beneficios. Ecosistemas  de tecnologías integradas a sistemas ERP:  Complementos Tecnológicos en la gestión de una empresa, Porque hablamos de integración,  Sistemas Business Intellingence BI,  Sistemas  customer relationship management CRM, Sistemas supplier relationship management SRM,  Sistemas Enterprise Content Management ECM,  Sistemas Business Process Management BPM, Sistemas Business Workflow,  Soluciones mobile.
      </p>
      <p>Carga Horaria: 7 hs.</p>
  
    </div>
  );
}

export default ProgramaUTN;