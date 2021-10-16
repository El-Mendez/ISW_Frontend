import React, { useState } from 'react';
import Axios from 'axios';

export default function ImageTesting() {
  const [file, setFile] = useState('');

  const jonSubmit = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('carne', 191025);
    try {
      const res = await Axios.post('http://localhost:3000/free/profile/image',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const hadleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div className="container">
        <div className="file m-4">
          <input type="file" onChange={hadleOnChange} name="file" />
          <label htmlFor="customFile">
            Choose file
          </label>
        </div>
        <button id="logIn" onClick={jonSubmit} className="btn-fill arrow-button" type="submit">
          UPLOAD IMAGE
          <span
            className="material-icons position-absolute ms-1"
          >
            arrow_forward
          </span>
        </button>
      </div>

    </>
  );
}
