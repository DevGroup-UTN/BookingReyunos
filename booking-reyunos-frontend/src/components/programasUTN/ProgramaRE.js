import React from 'react';
import '../../styles/ProgramaRE.css'; // Importa el archivo CSS
import { Link } from 'react-router-dom';

function ProgramaUTN() {
  return (
    <div className="programa-utn-container">
        <Link to="/programas" className="volver-programas">
        &lt;&lt;&lt; Volver a Programas
      </Link> 
       <img src="/images/programas/programas3.png" alt="Programa UTN" />
       <h2>Turismo Académico Recreativo – Primarios y Secundarios</h2>

      <h3>Objetivos:</h3>
      <p>Realizar una combinación de actividades recreativas, formativas y educativas para los alumnos, con actividades académicas acordes a su edad, permitiendo incorporar conocimientos sobre la realidad de nuestro territorio, en cuanto a las industrias regionales, generación de energía y la distribución del agua. Además de conocer las bellezas de nuestros paisajes y poder disfrutar junto a sus compañeros de una estadía placentera.</p>
      <h3>Metodología:</h3>
<p>Los alumnos podrán incorporar conocimientos a través de la interacción con las maquetas que contamos en el complejo sobre, industrias regionales, generación de energía y riego, además se realizan charlas cortas y motivadoras, incorporando el aprendizaje a través del juego.</p>
<p>También contamos con un observatorio dentro del complejo, donde se realizará una velada astronómica, incluyendo una explicación a cielo abierto sobre la rotación de la tierra, constelaciones y planetas del sistema. Para luego ser observados por medio del telescopio.</p>
<p>Se dispondrá de tiempo libre para realizar actividades recreativas dentro del complejo y actividades acuáticas en el lago de Los Reyunos como: catamarán, tirolesa y escalada.</p>
<h3>Duración:</h3>
<p>La duración de la actividad puede ser variable teniendo en cuanta el contenido que cada universidad desea ver dependiendo de las especialidades de los estudiantes concurrentes.</p>

<h3>Destinatarios:</h3>
<p>El programa está destinado a alumnos de las distintas escuelas primarias y secundarias del país, adaptando el contenido a cada grupo.</p>

<h3>Matrícula:</h3>
<p>Se establece un cupo máximo de cuarenta y cinco (45) personas en total, dentro del cual se consideran incluidos 1 docentes a cargo de la delegación cada 10 estudiantes y los choferes de los medios de movilidad para el traslado.</p>

<h3>Acreditación:</h3>
<p>Una vez terminada la actividad se le entrega a cada estudiante un certificado con el contenido de los distintos módulos seleccionados y con su respectiva carga horaria.</p>
<h3>Costos:</h3>
<p>Los costos de las actividades que forman parte del programa serán variables teniendo en cuenta el contenido y la duración del módulo seleccionado por cada institución. Los mismos incluyen, la estadía (hospedaje en el Complejo con pensión completa; desayunos, almuerzos, meriendas y cenas), las actividades de capacitación (coordinación, carga docente, material de estudio), y las de recreación (sala juegos, playón deportivo, piscina, Internet y visita a la ciudad). Se suscribirán convenios específicos con el detalle de la actividad a desarrollar y su presupuesto.</p>
<h3>Contenidos:</h3>
<h3>Programa Analítico:</h3>

<h3>Unidad 1:</h3>
<p>Infraestructura Hidráulica para riego.</p>

<h3>Unidad 2:</h3>
<p>Sistemas de Generación y Transformación de energía</p>

<h3>Unidad 3:</h3>
<p>Desarrollo Económico, infraestructura y patrimonio cultural – Conicet</p>

<h3>Unidad 4:</h3>
<p>Industrias Regionales</p>

<h3>Unidad 5:</h3>
<p>Velada Astronómica</p>

<h3>Unidad 6:</h3>
<p>Desarrollo de Equipos de Trabajo</p>

<h3>Unidad 7:</h3>
<p>Energías Alternativas y medio ambiente</p>

    </div>
  );
}

export default ProgramaUTN;