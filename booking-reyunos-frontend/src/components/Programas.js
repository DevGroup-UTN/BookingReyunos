import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Programas.css";

const programas = [
  {
    id: "utn",
    titulo: "Programa UTN",
    descripcion:
      "Módulos Académicos Acreditables – UTN Objetivo:Integración de distintas Facultades.",
    img: "/images/programas/programas1.png",
    portada: "/images/programas/programas1.png", // Misma imagen que img
  },
  {
    id: "vea",
    titulo: "Programa VEA",
    descripcion:
      "Viajes de Estudios Académico – VEA Objetivos:Integración de distintas.",
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
  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActualizar(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="programas-container">
      <img
        src="/images/logo-utn-nav.png"
        alt="Fondo Programas"
        className="fondo-programas"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "150%",
          objectFit: "cover",
        }}
      />
      <div className="contenido-programas">
        <h1>Programas</h1>
        <div className="programas-grid">
          {programas.map((programa) => (
            <Link
              key={programa.id}
              to={`/programas/${programa.id}`}
              className="programa-card"
            >
              <img
                src={programa.portada}
                alt={programa.titulo}
                className="portada"
              />
              <div className="programa-content">
                <h2>{programa.titulo}</h2>
                <p>{programa.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programas;