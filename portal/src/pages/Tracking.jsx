
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import User from '../components/UserData';
import TravelCost from '../components/TravelCost';
import InfoTravel from '../components/InfoTravel';
// import GoogleMap from '../components/GoogleMap.jsx';
import GoogleMaps from '../components/GoogleMaps.jsx';
import conn from '../services/conn'


export default function Tracking(props) {

    const [travel, addTravelInList] = useState([])
    const idAnalyst = localStorage.getItem("@login-app/user")


    async function getTravel() {
        const response = await conn.get(`http://localhost:8080/travel/analyst/${idAnalyst}`);
        addTravelInList(response.data);
    }

    useEffect(() => {
        getTravel();
    });

    return (
        <React.Fragment>
            <SearchBar />
            {/* <User name={props.name} /> */}
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


            <div className="map">
                <GoogleMaps />
            </div>

            <TravelCost value={props.value} />

            <InfoTravel
                trucker={travel.map((travel) => (travel.trucker.name))}
                truck={travel.map((travel) => (travel.truck.name))}
                travelDetails={travel.map((travel) => (travel.description))}
                details={props.details}
                detailsDate={travel.map((travel) => (travel.dateTravel))}
                detailsLastLog={props.detailsLastLog}
            />

        </React.Fragment>
    );
}

