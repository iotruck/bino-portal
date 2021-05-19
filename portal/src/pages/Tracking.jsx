
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import User from '../components/UserData';
import SelectTravel from '../components/TrackingTravel'
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
            <User name={props.name} />

            <div className="sliderTracking">
                <SelectTravel codigo="JLMQ0110dasq" trucker="Waldesio da Silva" truck="Volkswagen Constellation" load="Pneus" coust="1423.34" />
                <SelectTravel codigo="JLMQ0110dasq" trucker="Waldesio da Silva" truck="Volkswagen Constellation" load="Pneus" coust="1423.34" />
                <SelectTravel codigo="JLMQ0110dasq" trucker="Waldesio da Silva" truck="Volkswagen Constellation" load="Pneus" coust="1423.34" />
                <SelectTravel codigo="JLMQ0110dasq" trucker="Waldesio da Silva" truck="Volkswagen Constellation" load="Pneus" coust="1423.34" />
                <SelectTravel codigo="JLMQ0110dasq" trucker="Waldesio da Silva" truck="Volkswagen Constellation" load="Pneus" coust="1423.34" />

            </div>
            {/* <User name={props.name} /> */}

            <div className="codeNumber">
                {
                    travel.map((travel) => (
                        travel.codigo
                    ))
                }

            </div>

            <div className="destination">

                <span className="text-destination">DESTINO: </span>{props.destination}
            </div>

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


            <InfoTravel trucker={props.trucker} truck={props.truck} travelDetails={props.travelDetails} details={props.details} detailsDate={props.detailsDate} detailsLastLog={props.detailsLastLog} />



        </React.Fragment>
    );
}

