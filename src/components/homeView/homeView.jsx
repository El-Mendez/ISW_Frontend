import React from 'react';
import Carousel from '../carousel/carousel'

function HomeView() {
  return (
    <div className="main-view">
      <div className="carousel-space">
        <div className="position-relative carousel-main-container">
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default HomeView;
