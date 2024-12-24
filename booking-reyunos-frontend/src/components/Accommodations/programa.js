import React from "react";
import { Link } from "react-router-dom";
import "../styles/Programas.css";

const programas = [
  {
    id: "utn",
    titulo: "Programa UTN",
    descripcion: "Módulos Académicos Acreditables – UTN.",
    img: "https://via.placeholder.com/300x200?text=Programa+UTN",
  },
  {
    id: "vea",
    titulo: "Programa VEA",
    descripcion: "Viajes de Estudios Académicos – VEA.",
    img: "https://via.placeholder.com/300x200?text=Programa+VEA",
  },
  {
    id: "recreativo",
    titulo: "Programa Recreativo",
    descripcion: "Turismo Académico Recreativo.",
    img: "https://via.placeholder.com/300x200?text=Programa+Recreativo",
  },
];

const Programas = () => {
  return (
    <div className="programas-container">
      <h1>Programas</h1>
      <div className="programas-grid">
        {programas.map((programa) => (
          <div key={programa.id} className="programa-card">
            <img src={programa.img} alt={programa.titulo} />
            <div className="programa-content">
              <h2>{programa.titulo}</h2>
              <p>{programa.descripcion}</p>
              <Link to={`/${programa.id}`} className="leer-mas">
                Leer más »
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programas;
