import React from 'react';
import GoogleLogin from 'react-google-login';
import history from '../history';

function GoogleLog(){

    const respuestaGoogle=(respuesta)=>{
        console.log(respuesta);
        console.log(respuesta.profileObj);
        console.log(respuesta.error);
        if (respuesta.error !== 'popup_closed_by_user'){
          history.push(`/data`);
          history.go();
        }
    }

    return(

        <div className="goog">
            <GoogleLogin
            clientId= "405374042535-g3sqooe9ncnj7lm394iu27u9vd99ma16.apps.googleusercontent.com"
            buttonText = "Ingresar con Google"
            onSuccess={respuestaGoogle}
            onFailure={respuestaGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>

    )

}

export default GoogleLog;
