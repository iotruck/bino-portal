import React, { useEffect, useState } from 'react'
import conn from '../service/conn'



export default function ActivesTravels(props) {

    const [travel, addTravelInList] = useState([])

    useEffect(() => {
        async function getTravel() {
            const response = await conn.get(`/travel/analyst/${1}`);
            addTravelInList(response.data);
        }

        console.log(travel);
        getTravel();

    });

    return (
        <div className="viagem">
            <div className="date">
                {
                    travel.map((travel) => (
                        travel.codigo
                    ))
                }
            </div>
            <div className="code">{props.code}</div>
            <div className="infos">
                <div className="truck">{props.truck}</div>
                <div className="driver">{props.driver}</div>
            </div>
            <div className="status-travel"></div>
        </div>
    );
}