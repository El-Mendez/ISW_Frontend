import React from 'react';
import './dashboard.scss';
import user from '../../assets/usericon.png';
function DashContent(){
    return(

        <section className="dash-container">
            <div className="dash1">
                Hola User, que bueno que estas aqui...
            </div>

            <div className="rowd1">
                <div className="r1">
                    <img src={user} alt="user" className="userimg" />
                    <div className="cr1">
                        <p className="crr1">Juan Ramos</p>
                        <p className="crr2">#20187</p>
                        <p className="crr2">Ingenieria Mecatronica</p>
                        <p className="crr2">2do año, 4to Semestre</p>

                    </div>
                </div>
                <div className="r2">

                </div>
            </div>

            <div className = "rowd2">
                <div className="r3">

                </div>
                <div className="r3">

                </div>
            </div>
        </section>
    );
}

export default DashContent;