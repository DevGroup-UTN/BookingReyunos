import React from "react";
import { Link } from "react-router-dom";
import "../styles/Programas.css";

const programas = [
  {
    id: "utn",
    titulo: "Programa UTN",
    descripcion: "Módulos Académicos Acreditables – UTN.",
    img: "/images/programas/programas1.png",
    portada: "/images/programas/programas1.png", // Misma imagen que img
  },
  {
    id: "vea",
    titulo: "Programa VEA",
    descripcion: "Viajes de Estudios Académicos – VEA.",
    img: "/images/programas/programa-vea-imagen.jpg",
    portada: "/images/programas/programa-vea-portada.jpg",
  },
  {
    id: "recreativo",
    titulo: "Programa Recreativo",
    descripcion: "Turismo Académico Recreativo.",
    img: "/images/programas/programa-recreativo-imagen.jpg",
    portada: "/images/programas/programa-recreativo-portada.jpg",
  },
];

const Programas = () => {
  return (
    <div className="programas-container">
      <h1>Programas</h1>
      <div className="programas-grid">
        {programas.map((programa) => (
          <Link key={programa.id} to={`/programas/${programa.id}`} className="programa-card">
            <img src={programa.portada} alt={programa.titulo} className="portada" />
            <div className="programa-content">
              <h2>{programa.titulo}</h2>
              <p>{programa.descripcion}</p>
            </div>
          </Link>
        ))
        }
      </div>
    </div>
  );
};

export default Programas;