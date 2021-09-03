import React from 'react';

export default function ProfileItem(props) {
    return (
        <ul>
            {props.contact.map((item)=>{
                return(
                    <li>
                        <p>Red social: {item}</p>
                    </li>
                );
            })}
        </ul>
    );
}
