import React from 'react';
import noRecommendation from '../../assets/no_recommendation.svg';

function NoSuggestionItem() {
  return (
    <div className="">
      <img src={noRecommendation} className="noSuggestionsImg" alt="No hay recomendaciones" />
      <h2>No hemos podido encontrar alguna recomendación para ti</h2>
    </div>
  );
}

export default NoSuggestionItem;
