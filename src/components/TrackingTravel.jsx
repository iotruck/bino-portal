import React from 'react';

export default function TrackingTravel(props) {
    return (
        <>
            <div className="cardTravel">
                <p>
                    <h3>{props.codigo}</h3>
                </p>
                <p>
                    <h5>Caminhoneiro</h5>
                    <h4>{props.trucker}</h4>
                </p>

                <p>

                    <h5>Caminhão</h5>
                    <h4>{props.truck}</h4>
                </p>

                <p>
                    <h5>Carga</h5>
                    <h4>{props.load}</h4>
                </p>

                <p>
                    <h4 className="coust">R$ {props.coust}</h4>
                </p>
            </div>
        </>
    )
}