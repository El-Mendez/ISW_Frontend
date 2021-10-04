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
          <a className="rr1" href="https://uvg.instructure.com/">
            <div />
          </a>
          <a className="rr2" href="https://portal.uvg.edu.gt/">
            <div />
          </a>
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
        <a href="https://caveuvg.blogspot.com/2018/10/bienvenidos-jacks-cave.html" className="r3">
          <div />
        </a>
        <a href="https://www.uvg.edu.gt/vida-estudiantil/asociaciones-y-clubes/" className="r31">
          <div />
        </a>
        <a href="https://www.uvg.edu.gt/vida-estudiantil/arte-cultura-deporte/" className="r32">
          <div />
        </a>
        <a href="#" className="r33">
          <div />
        </a>
        <a href="#" className="r34">
          <div />
        </a>
        <a href="#" className="r35">
          <div />
        </a>
      </div>
    </section>
  );
}

export default DashContent;
