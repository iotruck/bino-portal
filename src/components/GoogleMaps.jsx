import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import Destiny from '../components/Destiny';
import Point from '../components/Point';
import conn from '../services/conn';

const travelInit = {
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

const SimpleMap = (props) => {

  const [travel, setTravel] = useState(travelInit);
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

  const [center, setCenter] = useState({ lat: -23.5202203, lng: -46.7001548});
  const [zoom, setZoom] = useState(12);

  const updateCurrentLocation = async () => {
    const response = await conn.get(`/location/${travel.currentTruckPosition.id}`)
    setTravel({
      ...travel,
      currentTruckPosition: {
        latitude: response.data.latitude,
        longitude:response.data.longitude,
      }
    })
}

  useEffect(() => {
   setTravel(props.travel)
   setCompany(props.company)
   const interval = setInterval(() => {
      updateCurrentLocation()
   }, 1000);
  return () => clearInterval(interval);
  });



  return (
    <div style={{ width: '105vh', height: '40vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD2wlW5RMbbLWOR7EJLjhc9LrW6XjKiETA' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
          <Point
            lat={company.location.latitude}
            lng={company.location.longitude}
            name="Ponto de partida"
          />
          <Marker
            lat={travel.currentTruckPosition.latitude}
            lng={travel.currentTruckPosition.longitude}
            name="Localização caminhão"
          />
          <Destiny
            lat={travel.destiny.latitude}
            lng={travel.destiny.longitude}
            name="Destino"
          />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;
