import React from 'react';
import RegisterFormContainer from './registerFormcontainer';

function Register() {
    return (
      <div className={'d-flex justify-content-around bg-secondary vw-100 h-100'}>
        <RegisterFormContainer/>
        {/*<img src={test} className={'ml-5 d-none d-lg-block'}/>*/}
      </div>
    );
}

export default Register;
