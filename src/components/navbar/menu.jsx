import React, { useState } from 'react';

export default function Menu() {
  return (
    <div className="products">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item product-font ml-20">
          <button className="nav-link button" type="button">Recomendaciones</button>
        </li>
        <li className="nav-item product-font ml-20">
          <button className="nav-link button" type="button">Subscriptions</button>
        </li>
        <li className="nav-item product-font ml-20">
          <button className="nav-link button" type="button">Special Offers</button>
        </li>
      </ul>
    </div>

  );
}
