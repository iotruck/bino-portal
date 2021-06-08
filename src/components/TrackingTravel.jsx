import React from 'react';  

export default function TrackingTravel(props) {
    return (
        <>
            <div className="cardTravel" onClick={props.onClick}>
                <p>
                    <h3>{props.codigo}</h3>
                </p>
                <p>

                    <h4>{props.trucker}</h4>
                </p>

                <p>


                    <h4>{props.truck}</h4>
                </p>

                <p>

                    <h4>{props.load}</h4>
                </p>

               
            </div>
        </>
    )
}