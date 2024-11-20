import React from "react";
import "../styles/infraestructura.css";

function Infraestructura() {
  return (
    <div className="infra-container">
      <h1 className="infra-h1">INFRAESTRUCTURA</h1>
      <h2 className="infra-h2">Aulas</h2>
      <p className="infra-p">
        El Centro cuenta con cuatro amplias aulas, totalmente equipadas con
        computadoras y tecnología de red e internet "wi-fi". Además del
        mobiliario adecuado para la realización de actividades académicas y de
        investigación.
      </p>

      {/* Contenedor de las imágenes centradas */}
      <div className="images-container">
        <img
          className="infra-images"
          src="/images/infraestructura/infra-1.avif"
          alt="Aula 1"
        />
        <img
          className="infra-images"
          src="/images/infraestructura/infra-2.avif"
          alt="Aula 2"
        />
        <img
          className="infra-images"
          src="/images/infraestructura/infra-3.avif"
          alt="Aula 3"
        />
      </div>
      <div>
        <h2 className="infra-h2">Auditorio</h2>
        <p className="infra-p">Un amplio Auditorio con capacidad para 50 personas está disponible para disertaciones, conferencias y teleconferencias. Posee un televisor de 40' con Home Theatre</p>
      </div>
      <div className="images-container">
        <img className="infra-images" src="/images/infraestructura/infra-4.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-5.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-6.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-7.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-8.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-9.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-10.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-11.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-12.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-13.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-14.avif" alt=""/>
      </div>
      <div>
        <h2 className="infra-h2">Equipamiento</h2>
        <p className="infra-p">Todas las intalaciones del Centro: (aulas, auditorio, cocheras techadas, equipamiento informático, comedor, sanitarios, etc.) brindan comodidad a docentes, alumnos y al público que lo visita. Observatorio Astronómico.</p>
      </div>
      <div className="images-container">
        <img className="infra-images" src="/images/infraestructura/infra-15.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-16.avif" alt=""/>
      </div>
      <div>
        <h2 className="infra-h2">Observatorio</h2>
        <p className="infra-p">Cuenta con una cúpula semiesférica de 3,5 metros de diámetro con movimiento motorizado, la apertura del párpado de observación es lateral y de accionamiento manual.</p>
        <p className="infra-p">Telescopio principal: MEADE LX200R-Optica tipo Ritchey-chrétion con ACF – apertura útil 406 mm (16’’). Distancia focal: 4064 mm (f/10) con tratamiento del espejo principal de ultra alta transmisión (UHTC). Buscador de 8x50 mm. Montura ecuatorial tipo columna fija y construida en fábrica para la latitud de Los Reyunos.</p>
        <p className="infra-p">Incluye sistema Autostar II para búsqueda y seguimiento automático de objetos celeste con una base de datos incluida de 147,541 objetos. Posee además un sistema de GPS Sony de 16 canales y sensores para nivelación y norte. Complementan varios oculares tipo de 5 elementos Plossl de 1,25’’ y 2’’. Un barlow, un reductorde focal y filtro varios. Una cámara ccd MEADE DSI II y programas específicos.</p>
        <p className="infra-p">Telescopio auxiliar: MEADE ETX 90 AT- Óptica tipo Maksutov-Cassegrain- apertura útil 90 mm con autostar I y dos oculares Plossl de 1,25’’</p>
      </div>
      <div className="images-container">
        <img className="infra-images" src="/images/infraestructura/infra-17.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-18.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-19.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-20.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-21.avif" alt=""/>
        <img className="infra-images" src="/images/infraestructura/infra-22.avif" alt=""/>
      </div>
      <div>
        <h2 className="infra-h2">Planos del complejo</h2>
      </div>
      <div className="images-container">
      <img className="planos-images" src="/images/infraestructura/planos.png" alt=""/>
      </div>
    </div>
  );
}

export default Infraestructura;
