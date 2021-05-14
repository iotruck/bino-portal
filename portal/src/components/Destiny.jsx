import TruckLocal from '../assets/img/caminhao.png';
import React from 'react';


const Marker = (props) => {
  const { color, name, id } = props;
  return (
    <div className="markerd"
      style={{cursor: 'pointer'}}
      title={name}
    />
  );
};


export default Marker;