import React from 'react';

const Badge = ({ badge, isColor }) => (
  <div className='badge'>
    <img className='badge-img' src={badge.icon} alt='badge img' />
    <div className='badge-val' style={isColor ? { color: '#104418f6' } : { color: '#555151' }}>
      {badge.val}
    </div>
    <div className='badge-text'>{badge.text}</div>
  </div>
);

export default Badge;
