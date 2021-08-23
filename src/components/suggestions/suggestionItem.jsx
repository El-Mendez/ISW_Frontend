import React from 'react';
import {MdClass} from 'react-icons/md'
import {AiFillCustomerService, AiFillContacts} from 'react-icons/ai'
function SuggestionItem(props) {
  const item = props;
  return (
    <div className="container suggestions">
      <div className="row align-items-center">
        <div className="col-4 ">
          <span className="material-icons suggestionsImages ">
            account_circle
          </span>
        </div>
        <div className="col suggestions">
          <div className="row align-items-start">
            <h1>{item.nombre +" "+ item.apellido}</h1>
          </div>
          <div className="row align-items-start">
            <h2>{item.apellido.substring(0, 3)+item.carne+"@uvg.edu.gt"}
            </h2>
            <div className="infoser">
              <MdClass className="infoUser"/>
              <AiFillCustomerService className="infoUser"/>
              <AiFillContacts className="infoUser"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionItem;
