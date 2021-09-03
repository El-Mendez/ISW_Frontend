import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileItem(props) {
  return (
    <ul>
      {props.contact.map((item) => (
        <li>
          <p>
            Red social:
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}

ProfileItem.propTypes = {
  contact: PropTypes.arrayOf(PropTypes.string),
};

ProfileItem.defaultProps = {
  contact: ['Is', 'Not', 'Working'],
};
