import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí puedes usar fetch o axios para enviar los datos
  };

  return (
    <div id="containerUyC" style={{backgroundImage: "url('/images/logo-utn-nav.png')"}}>
      <h1>Ubicación y Contacto</h1>
      <div className="container">
        {/* Contenedor del mapa */}
        <div className="contenedor-contacto">
          <iframe
            title="Ubicación UTN Los Reyunos"
            className="contact-map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6568.637855826389!2d-68.642394!3d-34.596096!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x28e87ee99f8e2789!2sUTN%20-%20Los%20Reyunos!5e0!3m2!1ses!2sar!4v1615907804207!5m2!1ses!2sar"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Formulario */}
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
