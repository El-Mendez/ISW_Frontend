import React from 'react';
import CarouselItem from './carouselItem';

function functionName() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide h-100" data-ride="carousel">
      <ol className="carousel-indicators text-primary">
        <li data-slide-to="0" className="active" />
        <li data-slide-to="1" />
        <li data-slide-to="2" />
      </ol>
      <div className="carousel-inner h-100">
        <div className="carousel-item active">
          <CarouselItem />
        </div>
        <div className="carousel-item h-100">
          <CarouselItem />
        </div>
        <div className="carousel-item h-100">
          <CarouselItem />
        </div>
      </div>
    </div>
  );
}

export default functionName;
