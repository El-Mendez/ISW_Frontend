import React, { useEffect } from 'react';
import { MdClass } from 'react-icons/md';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Link, useRouteMatch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { ACCEPT_REQUEST, CANCEL_REQUEST } from '../utils/rutas';

function FriendsItems(props) {
  // TODO utilizar proptypes, utilizar id
  const item = props;
  const { url } = useRouteMatch();
  const cookies = new Cookies();
  const token = cookies.get('session');
  function acceptRequest() {
    console.log(`${url}/profile/${item.carne}`);
    const request = async () => {
      try {
        await Axios.post(ACCEPT_REQUEST,
          {
            carne: item.carne,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        item.setAccept(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function cancelRequest() {
    const request = async () => {
      try {
        await Axios.post(CANCEL_REQUEST,
          {
            carne: item.carne,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        item.setAccept(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  return (
    <div className="container suggestions ">
      <div className="row align-items-center items">
        <div className="col-4 ">
          <span className="material-icons suggestionsImages ">
            account_circle
          </span>
        </div>
        <div className="col suggestions">
          <div className="row align-items-start">
            <h1>{`${item.nombre} ${item.apellido}`}</h1>
          </div>
          <div className="row align-items-start">
            <div className="infoser">
              {!item.type ? (
                <>
                  <AiOutlineCheck onClick={acceptRequest} className="infoUser" />
                  <AiOutlineClose onClick={cancelRequest} className="infoUser" />
                </>
              ) : null}
              <Link to={`${url}/profile/${item.carne}`} className="noDecorations">
                <MdClass className="infoUser" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendsItems;
