import React from 'react';
import '../styles/home.css';

function Home() {
  return (
    <div className='mapa_google'>
        <iframe className="google_map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6568.637855826389!2d-68.642394!3d-34.596096!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x28e87ee99f8e2789!2sUTN%20-%20Los%20Reyunos!5e0!3m2!1ses!2sar!4v1615907804207!5m2!1ses!2sar"></iframe>
    </div>
  );
}

export default Home;
