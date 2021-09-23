import React from 'react';

export default function ProfileItem(props) {
  const item = props;
  return (
    <ul>
      {item.contact.map((socialMedia) => (
        /* Debido a que el usuario no puede tener datos
        repetidos (redes sociales, cursos, hobbies),
        podemos colocar como key el mismo valor y
        evitarnos el error al querer modificar los valores
        del usuario */
        <li key={socialMedia}>
          <p>
            {item.type === 1 ? 'Red social: ' : '- ' }
            {socialMedia}
          </p>
        </li>
      ))}
    </ul>
  );
}
