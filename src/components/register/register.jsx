import React, { useState } from 'react';
import RegisterContainer from './registerContainer';
import RegisterAccountMessage from './registerAccountMessage';

export default function register() {
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      {confirm
        ? <RegisterAccountMessage />
        : (
          <RegisterContainer
            handleClick={() => setConfirm(true)}
          />
        )}
    </>
  );
}
