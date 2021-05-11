import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import User from '../components/UserData'
import TravelCost from '../components/TravelCost'
import InfoTravel from '../components/InfoTravel'
import MapImage from '../assets/img/mapa.png'
import conn from '../service/conn'


export default function Tracking(props) {

    const [travel, addTravelInList] = useState([])

    useEffect(() => {
        async function getTravel() {
            const response = await conn.get(`/travel/analyst/${2}`);
            addTravelInList(response.data);
        }


        getTravel();

    });

    return (
        <React.Fragment>
            <SearchBar />
            <User name={props.name} />
            <div className="codeNumber">
                {
                    travel.map((travel) => (
                        travel.codigo
                    ))
                }

            </div>

            <div className="destination">
                <span className="text-destination">DESTINO: </span>
                {
                    travel.map((travel) => (
                        travel.destiny.address
                    ))
                }
            </div>

            <div className="last-notify">
                <div className="status-notify"></div>
                <span className="date-notify">{props.dateLastNotify}</span>
                <span className="message-notify">{props.messageLastNotify}</span>
            </div>
            <div className="penultimate-notification">
                <div className="status-notify"></div>
                <span className="date-notify">{props.datePenultimateNotify}</span>
                <span className="message-notify">{props.messagePenultimateNotify}</span>
            </div>
            <div className="map">
                <img src={MapImage} alt="" />
            </div>

            <TravelCost value={props.value} />

            <InfoTravel
                trucker={travel.map((travel) => (travel.trucker.name))}
                truck={travel.map((travel) => (travel.truck.name))}
                travelDetails={travel.map((travel) => (travel.description))}
                details={props.details}
                detailsDate={travel.map((travel) => (travel.dateTravel))}
                detailsLastLog={props.detailsLastLog} />

        </React.Fragment>
    );
}
