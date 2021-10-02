import React from 'react';
import './dashboard.scss';

function DashContent() {
  return (

    <section className="dash-container">
      <div className="dash1">
        Hola, que bueno que estas aqui
      </div>

      <div className="dv" />

      <div className="rowd1">
        <div className="r1">
          <div className="rr1" />
          <div className="rr2" />
        </div>
        <div className="r2" href="https://noticias.uvg.edu.gt">
          <form action="https://noticias.uvg.edu.gt"> 
            <button className="buttonl" type="submit">
              Ver más...
            </button>
          </form>
        </div>
      </div>

      <div className="dv" />

      <div className="rowd2">
        <div className="r3" />
        <div className="r3" />
        <div className="r3" />
        <div className="r3" />
        <div className="r3" />
        <div className="r3" />
      </div>
    </section>
  );
}

export default DashContent;
