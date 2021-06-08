
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import User from '../components/UserData';
import SelectTravel from '../components/TrackingTravel'
import TravelCost from '../components/TravelCost';
import InfoTravel from '../components/InfoTravel';
import GoogleMaps from '../components/GoogleMaps.jsx';
import conn from '../services/conn'

const travel = {
    "id": 0,
    "codigo": "",
    "destiny": {
    "id": 0,
    "address": "",
    "latitude": 0,
    "longitude": 0
  },
  "currentTruckPosition": {
    "id": 0,
    "address": "",
    "latitude": 0,
    "longitude": 0
  },
  "description": "",
  "dateTravel": "",
  "trucker": {
    "id": 0,
    "name": "",
    "cpf": "",
    "cnh": "",
    "birthDate": "",
    "phoneNumber": ""
  },
  "truck": {
    "id": 0,
    "name": "",
    "truckBrand": "",
    "truckType": "",
    "fuelType": ""
  },
  "analyst": {
    "id": 0,
    "name": "",
    "email": "",
    "admin": 0,
    "company": {
      "id": 0,
      "name": ""
    }
  },
  "estimatedValue": 0,
  "status": "READY"
};

export default function Tracking(props) {

    const [travels, setTravels] = useState([])
    const [selectTravel, setSelectTravel] = useState(travel)
    const [company, setCompany] = useState({
        "id": 0,
        "name": "",
        "email": "",
        "cnpj": "",
        "location": {
          "id": 0,
          "address": "",
          "latitude": 0,
          "longitude": 0
        },
        "subscriptions": ""
    });
    const [hasTravel, setHasTravel] = useState(false)
    const idAnalyst = localStorage.getItem("@login-app/user")
    const idCompany = localStorage.getItem("@login-app/company")

    const updateValuesTravel = async (travel) => {
        const response = await conn.get(`/travel/${idAnalyst}/${travel.id}`);
        const responseCompany = await conn.get(`/company/${idCompany}`);
        setSelectTravel(response.data);
        setCompany(responseCompany.data);
        console.log(travel);
    }

    async function getTravel() {
        const response = await conn.get(`/travel/analyst/${idAnalyst}`);
        if (response.status === 204)
            setHasTravel(false)
        else
            setTravels(response.data)
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
                            <SelectTravel 
                                codigo={travel.codigo} 
                                trucker={travel.trucker.name} 
                                truck={travel.truck.name} 
                                load={travel.description} 
                                onClick={() => {updateValuesTravel(travel)}} 
                                />
                        )) :
                        <SelectTravel codigo="Ainda não temos viagens aqui" />

                }
            </div>
            
            <div className="codeNumber">
                {
                    "Selecione uma das viagens acima"
                }

            </div>

           

            {
                selectTravel.id > 0 &&
                    <>

                        <div className="destination">
                            
                            <span className="text-destination">DESTINO: </span>
                            {
                                selectTravel.destiny.address
                            }
                        </div>

                        <div className="map">
                            <GoogleMaps travel={selectTravel} company={company} />
                        </div>
    
                        <TravelCost value={selectTravel.estimatedValue} />
    
                        <InfoTravel 
                            trucker={selectTravel.trucker.name} 
                            truck={selectTravel.truck.name} 
                            details={selectTravel.description} 
                            detailsDate={selectTravel.dateTravel} 
                            detailsLastLog={"-"} 
                        />
                    </>
            }
           



        </React.Fragment>
    );
}

