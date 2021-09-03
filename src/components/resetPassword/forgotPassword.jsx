import React, { useState } from 'react';
import ForgotPasswordMessage from './forgotPasswordMessage';
import ForgotPasswordForm from './forgotPasswordForm';

export default function ForgotPassword() {
  const [reset, setReset] = useState(false);

  return (
    <div className="vh-100 d-flex align-content-center justify-content-center bg-beige">
      <div className="forgot-password-container mx-4">
        {reset
          ? <ForgotPasswordMessage />
          : (
            <ForgotPasswordForm
              handleClick={() => setReset(true)}
            />
          )}
      </div>
    </div>
  );
}
