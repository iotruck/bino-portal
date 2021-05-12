import React from 'react';


const Point = (props) => {
  const {name} = props;
  return (
    <div className="markers"
      style={{cursor: 'pointer'}}
      title={name}
    />
  );
};


export default Point;