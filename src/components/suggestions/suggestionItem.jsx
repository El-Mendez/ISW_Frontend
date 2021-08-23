import React from 'react';

function SuggestionItem(props) {
  const item = props;
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-4 ">
          <span className="material-icons suggestionsImages ">
            account_circle
          </span>
        </div>
        <div className="col datos">
          <div className="row align-items-start">
            <h1>{item.nombre +" "+ item.apellido}</h1>
          </div>
          <div className="row align-items-start">
            <h2>{item.apellido.substring(0, 3)+item.carne+"@uvg.edu.gt"}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionItem;
