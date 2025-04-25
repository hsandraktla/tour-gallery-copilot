import React from 'react';

// TourCard component to display details of a single tour
function TourCard({ id, name, info, image, price, onRemove }) {
  return (
    <div className="tour-card">
      {/* Display the tour image */}
      <img src={image} alt={name} className="tour-image" />
      
      <div className="tour-details">
        {/* Display the tour name */}
        <h2>{name}</h2>
        
        {/* Display the tour information */}
        <p>{info}</p>
        
        {/* Display the tour price */}
        <h3>${price}</h3>
        
        {/* Button to remove the tour */}
        <button className="btn-remove" onClick={() => onRemove(id)}>
          Not Interested
        </button>
      </div>
    </div>
  );
}

export default TourCard;