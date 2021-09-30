import React from 'react';
import noFriends from '../../assets/f.svg';

function NoFriends() {
  return (
    <div className="">
      <img src={noFriends} className="noFriendsImg" alt="No hay recomendaciones" />
      <h3>
        Tal parece que no tienes a ningún amigo agregado.
        Ve a las recomendaciones para conocer a nuevas personas.
      </h3>
    </div>
  );
}

export default NoFriends;
