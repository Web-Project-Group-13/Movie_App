import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];
  
  // Lisää tähtiä ratingin mukaan (täysi tähti tai tyhjä tähti)
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i <= rating ? 'gold' : 'gray',
          fontSize: '24px',
          marginRight: '5px'
        }}
        >    
     {i <= rating ? '★' : '☆'}
      </span>
    )
  }

  return <div>{stars}</div>; // Näyttää tähtiä
};

export default StarRating;
