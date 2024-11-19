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
          src="https://images.pxsol.com/1472/company/library/user/644395675259074f4cc99bf6daf81dae860ebcb705.jpeg?auto=format&browser=Chrome&ixlib=php-3.3.1&w=800&s=8446384da524fecec0f1eaf01aa8aba8"
          alt="Aula 1"
        />
        <img
          className="infra-images"
          src="https://images.pxsol.com/1472/company/library/user/11276924351e5e5dd4e9a055df7a9dcb38b499fa386.jpeg?auto=format&browser=Chrome&h=600&ixlib=php-3.3.1&s=159ce5abda0bf59e6870e7ad93548bfc"
          alt="Aula 2"
        />
        <img
          className="infra-images"
          src="https://images.pxsol.com/1472/company/library/user/12887913592470508d7d63cafd057e04bddf123d9ff.jpeg?auto=format&browser=Chrome&h=600&ixlib=php-3.3.1&s=6e1f4075c784ba78dda9d388bfb9163e"
          alt="Aula 3"
        />
      </div>
      <div>
        <h2 className="infra-h2">Auditorio</h2>
        <p className="infra-p">Un amplio Auditorio con capacidad para 50 personas está disponible para disertaciones, conferencias y teleconferencias. Posee un televisor de 40' con Home Theatre</p>
      </div>
    </div>
  );
}

export default Infraestructura;
