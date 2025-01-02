import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contacto.css';

function Contacto() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email1: '',
    Email2: '',
    Phone: '',
    Country: '',
    State: '',
    Query: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que ambos correos coincidan
    if (formData.Email1 !== formData.Email2) {
      alert('Los correos electrónicos no coinciden. Por favor, verifícalos.');
      return;
    }

    try {
      // Enviar los datos al backend
      await axios.post('http://localhost:8080/contact/send', formData);

      // Mostrar mensaje de éxito y limpiar formulario
      alert('Consulta enviada con éxito. Nos pondremos en contacto contigo pronto.');
      setFormData({
        FirstName: '',
        LastName: '',
        Email1: '',
        Email2: '',
        Phone: '',
        Country: '',
        State: '',
        Query: '',
      });
    } catch (error) {
      // Manejar errores
      console.error('Error al enviar la consulta:', error.response?.data || error.message);
      alert('Hubo un error al enviar la consulta. Por favor, inténtelo nuevamente.');
    }
  };

  const distancias = [
    { lugar: "Ciudad San Rafael, Mendoza", distancia: "32 km" },
    { lugar: "Villa 25 de Mayo", distancia: "8 km" },
    { lugar: "Las Leñas", distancia: "235 km" },
    { lugar: "Valle Grande", distancia: "68 km" },
    { lugar: "Represa El Nihuil", distancia: "65 km" },
    { lugar: "Bodega Bianchi", distancia: "22.5 km" },
    { lugar: "Aeropuerto de San Rafael 'Santiago Germanó'", distancia: "24.2 km" },
    { lugar: "Terminal De Omnibus San Rafael", distancia: "32 km" },
  ];

  return (
    <div className="containerUyC" style={{ backgroundImage: "url('/images/logo-utn-nav.png')" }}>
      <h1>Ubicación y Contacto</h1>
      <div className="container">

        <div className="contenedor-contacto"> 
          <iframe
            title="Ubicación UTN Los Reyunos"
            className="contact-map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6568.637855826389!2d-68.642394!3d-34.596096!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x28e87ee99f8e2789!2sUTN%20-%20Los%20Reyunos!5e0!3m2!1ses!2sar!4v1615907804207!5m2!1ses!2sar" 
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="distancias-container">
            <h2>Distancias</h2>
            {distancias.map((item, index) => (
              <div className="distancia" key={index}>
                <span>{item.lugar}:</span>
                <span>{item.distancia}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-block">
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="Email1"
              value={formData.Email1}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Re-ingrese su Email:</label>
            <input
              type="email"
              name="Email2"
              value={formData.Email2}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="tel"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              placeholder="(Cod. País + Cod. Área + Número)"
            />
          </div>
          <div>
            <label>País:</label>
            <input
              type="text"
              name="Country"
              value={formData.Country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Provincia:</label>
            <input
              type="text"
              name="State"
              value={formData.State}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Consulta o comentario adicional:</label>
            <textarea
              name="Query"
              value={formData.Query}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Enviar Consulta</button>
        </form>

      </div>
    </div>
  );
}

export default Contacto;
