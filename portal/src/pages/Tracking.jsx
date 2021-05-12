import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import User from '../components/UserData';
import TravelCost from '../components/TravelCost';
import InfoTravel from '../components/InfoTravel';
// import GoogleMap from '../components/GoogleMap.jsx';
import GoogleMaps from '../components/GoogleMaps.jsx';


export default function Tracking(props) {
    return (
        <React.Fragment>
            <SearchBar />
            <User name={props.name} />
            <div className="codeNumber">
                {props.code}
            </div>

            <div className="destination">
                <span className="text-destination">DESTINO: </span>{props.destination}
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
                <GoogleMaps/>
            </div>
           
            <TravelCost value={props.value} />

            <InfoTravel trucker={props.trucker} truck={props.truck} travelDetails={props.travelDetails} details={props.details} detailsDate={props.detailsDate} detailsLastLog={props.detailsLastLog}/>

        </React.Fragment>
    );
} 

