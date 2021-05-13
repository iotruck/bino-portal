import React from 'react';
import SearchBar from '../components/SearchBar';
import User from '../components/UserData';
import SelectTravel from '../components/TrackingTravel'
import TravelCost from '../components/TravelCost';
import InfoTravel from '../components/InfoTravel';
import MapImage from '../assets/img/mapa.png'

export default function Tracking(props) {
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
            <div className="codeNumber">
                {props.code}
            </div>

            <div className="destination">
                <span className="text-destination">DESTINO: </span>{props.destination}
            </div>
            <div className="map">
                <img src={MapImage} alt="" />
            </div>

            <TravelCost value={props.value} />

            <InfoTravel trucker={props.trucker} truck={props.truck} travelDetails={props.travelDetails} details={props.details} detailsDate={props.detailsDate} detailsLastLog={props.detailsLastLog} />

        </React.Fragment>
    );
}
