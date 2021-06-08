import React from 'react';


const Marker = ({ color, name, id }) => {
  return (
    <div className="markerd"
      style={{cursor: 'pointer'}}
      title={name}
    />
  );
};


export default Marker;