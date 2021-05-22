
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

    const [travels, setTravels] = useState([])
    const [hasTravel, setHasTravel] = useState(false)
    const idAnalyst = localStorage.getItem("@login-app/user")

    const updateValuesTravel = () => {
        console.log("é nois man")
    }

    async function getTravel() {
        const response = await conn.get(`/travel/analyst/${idAnalyst}`);
        setTravels(response.data);

        if (response.status === 204)
            setHasTravel(false)
        else
            setHasTravel(true)
    }

    useEffect(() => {
        getTravel();
    }, []);

    return (
        <React.Fragment>
            <SearchBar />
            <User name={props.name} />

            <div className="sliderTracking">
                {
                    hasTravel ?
                        travels.map((travel) => (
                            <SelectTravel codigo={travel.codigo} trucker={travel.trucker.name} truck={travel.truck.name} load={travel.description} coust="-" onClick={updateValuesTravel}/>
                        )) :
                        <SelectTravel codigo="Ainda não temos viagens aqui" />

                }
            </div>
            {/* <User name={props.name} /> */}

            <div className="codeNumber">
                {
                    "Selecione uma das viagens acima"
                }

            </div>

            <div className="destination">

                <span className="text-destination">DESTINO: </span>
                {
                    "-"
                }
            </div>
            <div>
                <span className="text-destination">DESTINO: </span>
                {
                    "-"
                }

            </div>


            <div className="map">
                <GoogleMaps />
            </div>

            <TravelCost value={"-"} />


            <InfoTravel trucker={"-"} truck={"-"} travelDetails={"-"} details={"-"} detailsDate={"-"} detailsLastLog={"-"} />



        </React.Fragment>
    );
}

