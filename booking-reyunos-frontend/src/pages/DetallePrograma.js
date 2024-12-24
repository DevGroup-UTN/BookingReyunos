import React from "react";
import { useParams } from "react-router-dom";

const programasData = {
  utn: {
    titulo: "Programa UTN",
    descripcion:
      "El Programa UTN incluye módulos académicos acreditables que promueven el desarrollo profesional en diversas áreas. Ideal para estudiantes interesados en ampliar sus conocimientos con certificación de calidad.",
    img: "https://via.placeholder.com/600x400?text=Programa+UTN",
    detalles: [
      "Duración: 6 meses.",
      "Modalidad: Presencial y virtual.",
      "Certificación oficial de la UTN.",
    ],
  },
  vea: {
    titulo: "Programa VEA",
    descripcion:
      "El Programa VEA organiza viajes de estudios académicos que combinan aprendizaje y experiencias culturales en diferentes destinos. Diseñado para estudiantes de todas las disciplinas.",
    img: "https://via.placeholder.com/600x400?text=Programa+VEA",
    detalles: [
      "Incluye alojamiento y transporte.",
      "Duración: De 1 a 2 semanas.",
      "Actividades: Seminarios y excursiones.",
    ],
  },
  recreativo: {
    titulo: "Programa Recreativo",
    descripcion:
      "El Programa Recreativo es ideal para turismo académico, ofreciendo experiencias en destinos emblemáticos con actividades de aprendizaje y recreación.",
    img: "https://via.placeholder.com/600x400?text=Programa+Recreativo",
    detalles: [
      "Duración: 3 a 7 días.",
      "Actividades recreativas y educativas.",
      "Incluye guía turística especializada.",
    ],
  },
};

const DetallePrograma = () => {
  const { programaId } = useParams();
  const programa = programasData[programaId];

  if (!programa) {
    return <h1>Programa no encontrado</h1>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{programa.titulo}</h1>
      <img
        src={programa.img}
        alt={programa.titulo}
        style={{ width: "100%", maxWidth: "600px", borderRadius: "8px" }}
      />
      <p style={{ marginTop: "20px", fontSize: "1.1rem" }}>{programa.descripcion}</p>
      <ul style={{ textAlign: "left", margin: "20px auto", maxWidth: "600px", fontSize: "1rem" }}>
        {programa.detalles.map((detalle, index) => (
          <li key={index}>{detalle}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetallePrograma;
