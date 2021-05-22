import React, { useEffect, useState } from 'react';
import User from '../components/UserData';
import SearchBar from '../components/SearchBar';
import { fetchLocalMapBox } from '../api';
import AsyncSelect from 'react-select/async';
import CardTravel from '../components/CardTravel';
import conn from './../services/conn'

export default function Travel(props) {

    const [address, setAddress] = useState([]);
    const [orderLocation, setOrderLocation] = useState([]);
    const [travels, setTravel] = useState([]);
    const [hasTravels, setHasTravels] = useState(false)

    const [travel, setTravelValues] = useState({
            codigo: "",
            dateTravel: "",
            description: "",
            estimatedValue: 1200,
            destiny: {
                address: "",
                latitude: 100000,
                longitude: 300000
            },
            currentTruckPosition: {
                address: "",
                latitude: 100000,
                longitude: 300000
            },
            trucker: {
                id: ""
            },
            truck: {
                id: ""
            },
            analyst: {
                id: ""
            },
            status: "" 
    })


    const idAnalyst = localStorage.getItem("@login-app/user")

    async function getTravel() {
        const response = await conn.get(`/travel/analyst/${idAnalyst}`)
        setTravel(response.data)

        if (response.status === 204)
            setHasTravels(false)
        else
            setHasTravels(true)
    }

    useEffect(() => {
        getTravel()
    }, [])

    const loadOptions = async (inputValue) => {
        const response = await fetchLocalMapBox(inputValue);

        const places = response.data.features.map((item) => {
            return ({
                label: item.place_name,
                value: item.place_name,
                position: {
                    lat: item.center[1],
                    lng: item.center[0]
                },
                place: item.place_name,
            });
        });

        return (places);
    };

    const handleChangeSelect = (place) => {
        setAddress(place);
        setOrderLocation({
            latitude: place.position.lat,
            longitude: place.position.lng,
            address: place.label
        });
    };

    return (
        <>
            <SearchBar />
            {/* <User name={props.name} /> */}
            <div className="section-forms-travel">
                <form className="form-travel">
                    <div className="form-inputs">
                        <h3>Cadastro de viagem</h3>
                        <label htmlFor="id-codigo">Código</label>
                        <input id="id-codigo" className="input-travel" />
                        <label htmlFor="id-destinatario" id="label-destinatario">Destinatário</label>
                        <AsyncSelect
                            id="id-destinatario"
                            loadOptions={loadOptions}
                            placeholder=""
                            className="input-recipient"
                            onChange={value => handleChangeSelect(value)}
                        />
                        <label id="label-descricao" htmlFor="id-descricao">Descrição carga</label>
                        <input id="id-descricao" className="input-travel" />
                        <div className='inputs-grid'>
                            <div>
                                <label htmlFor="id-data">Data da viagem</label>
                                <input id="id-data" className="input-grid" />
                            </div>
                            <div>
                                <label htmlFor="id-motorista">Motorista</label>
                                <input id="id-motorista" className="input-grid" />
                            </div>
                            <div>
                                <label htmlFor="id-caminhao">Caminhão</label>
                                <input id="id-caminhao" className="input-grid" />
                            </div>
                            <div>
                                <label htmlFor="id-valor">Valor estimado</label>
                                <input id="id-valor" className="input-grid" />
                            </div>
                        </div>
                        <button>Cadastrar</button>
                    </div>
                </form>
            </div>

            <div className="list-travel">
                {
                    hasTravels ?
                        travels.map((travel) => (
                            <CardTravel date={travel.dateTravel} code={travel.codigo} truck={travel.truck.name} 
                                driver={travel.trucker.name} codigo={travel.codigo} description={travel.description} 
                                    coust={travel.estimatedValue} address={travel.destiny.address}/>
                        ))
                    :
                        <CardTravel code="Não há viagens ativas" />
                    
                    
                }
            </div>
        </>
    );
}