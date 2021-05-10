import React from 'react';

function CarouselAsset(props) {
  const asset = props;
  return (
    <div className="carousel-asset-container">
      <div className="carousel-asset">
        <picture>
          <img src={`${asset.img}`} alt="CAROUSEL" className="product-img" />
        </picture>
      </div>
    </div>

  );
}

export default CarouselAsset;
