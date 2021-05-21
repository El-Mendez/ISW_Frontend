import React from 'react';
import GoogleLogin from 'react-google-login';

function GoogleLog(){ 

    const respuestaGoogle=(respuesta)=>{
        console.log(respuesta);
        console.log(respuesta.profileObj);
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