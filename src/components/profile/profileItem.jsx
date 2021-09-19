import React from 'react';

export default function ProfileItem(props) {
  const item = props;
  return (
    <ul>
      {item.contact.map((socialMedia, index) => (
        <li>
          <p id={index}>
            Red social:
            {socialMedia}
          </p>
        </li>
      ))}
    </ul>
  );
}

ProfileItem.defaultProps = {
  contact: ['Is', 'Not', 'Working'],
};
