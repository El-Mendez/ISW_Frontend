import React from 'react';

export default function Circle(props) {
  return (
    <>
      <div className="d-flex align-items-center px-0">
        <div className="progress-activate-circle d-flex justify-content-center activate me-3">
          <h2 className="progress-number">1</h2>
        </div>
        <h1>{props.title}</h1>
      </div>
    </>
  );
}
