import React from 'react';

export default function Input(props) {
  return (
    <>
      <div className="input-container mt-3">
        <span className={`material-icons input-icon ${props.filled ? 'is-filled' : ' '}`}>
          {props.icon}
        </span>
        <input
          className="input ms-1"
          type="text"
          name={props.name}
          placeholder={props.holder}
          onInput={props.onChange}
          {...props.register}

        />
      </div>
      {/* <small className="text-danger text-small d-block mb-2 mt-1"> */}
      {/*  <div className="d-flex align-items-center ps-2"> */}
      {/*    {props.errors */}
      {/*      ? <span className="material-icons me-1">error_outline</span> */}
      {/*      : null} */}
      {/*    {props.errors?.message} */}
      {/*  </div> */}
      {/* </small> */}
    </>

  );
}
