import React from "react";
import { Link } from "react-router-dom";
import "../styles/Programas.css";

const programas = [
  {
    id: "utn",
    titulo: "Programa UTN",
    descripcion: "Módulos Académicos Acreditables – UTN Objetivo:Integración de distintas Facultades.",
    img: "/images/programas/programas1.png",
    portada: "/images/programas/programas1.png", // Misma imagen que img
  },
  {
    id: "vea",
    titulo: "Programa VEA",
    descripcion: "Viajes de Estudios Académico – VEA Objetivos:Integración de distintas.",
    img: "/images/programas/programas2.png",
    portada: "/images/programas/programas2.png",
  },
  {
    id: "recreativo",
    titulo: "Programa Recreativo",
    descripcion: "Turismo Académico Recreativo – Primarios y Secundarios.",
    img: "/images/programas/programas3.png",
    portada: "/images/programas/programas3.png",
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