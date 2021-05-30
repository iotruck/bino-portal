import React, { useState, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import Destiny from '../components/Destiny';
import Point from '../components/Point';
import api from '../services/api';


const SimpleMap = (props) => {

  const [listaLocais, addListaLocais] = useState([]);
  useEffect(() => {
    async function getLocals() {
      const resposta = await api.get("/local")
      addListaLocais(resposta.data);
    }
    getLocals();
  });

  const [center, setCenter] = useState({ lat: -23.555172425586818, lng: -46.663018731806126 });
  const [zoom, setZoom] = useState(11);
  return (
    <div style={{ width: '105vh', height: '40vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD8pBN-9gQmaWdmxxLOuPwtlycNBy2e6wI' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {listaLocais.map((local) => (
          <Point
            lat={local.latitudeS}
            lng={local.longitudeS}
            name="Ponto de partida"
          />
        ))}
        {listaLocais.map((local) => (
          <Marker
            lat={local.latitude}
            lng={local.longitude}
            name="Localização caminhão"
          />
        ))}
        {listaLocais.map((local) => (
          <Destiny
            lat={local.latitudeF}
            lng={local.longitudeF}
            name="Destino"
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;

// {
//   "id": "1",
//   "latitude": "-23.59990085632878",
//   "longitude": "-46.62815487205582",
//   "latitudeF": "-23.450657674378128",
//   "longitudeF": "-46.54378034883436"
// }