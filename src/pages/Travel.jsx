import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchLocalMapBox } from '../api';
import AsyncSelect from 'react-select/async';
import CardTravel from '../components/CardTravel';
import conn from './../services/conn'

export default function Travel() {

    const [address, setAddress] = useState([]);
    const [orderLocation, setOrderLocation] = useState([]);
    const [travels, setTravel] = useState([]);
    const [hasTravels, setHasTravels] = useState(false)

    const [travel, setTravelValues] = useState({
        codigo: "",
        dateTravel: "",
        description: "",
        estimatedValue: "1200",
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
        status: "1"
    })

    const postTravel = async (event) => {
        event.preventDefault();
        const response = await conn.post(`/travel/`, {
            ...travel
        })

        if (response.status === 201)
            alert("Nova viagem criada")
        else
            alert("Erro ao criar")
    }

    const updateTravelValues = (event) => {
        const { value, name } = event.target;

        setTravelValues({
            ...travel,
            [name]: value,
            destiny: {
                address: `${orderLocation.address}`,
                latitude: `${orderLocation.latitude}`,
                longitude: `${orderLocation.longitude}`
            },
            currentTruckPosition: {
                address: `${orderLocation.address}`,
                latitude: `${orderLocation.latitude}`,
                longitude: `${orderLocation.longitude}`
            },
            truck: {
                ...travel.truck,
                [name]: value
            },
            trucker: {
                ...travel.trucker,
                [name]: value
            },
            analyst: {
                id: `${idAnalyst}`
            },
        });
    };


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
            <div className="section-forms-travel">
                <form className="form-travel" onSubmit={postTravel}>
                    <div className="form-inputs">
                        <h3>Cadastro de viagem</h3>
                        <label htmlFor="id-codigo">Código</label>
                        <input id="id-codigo" placeholder="Digite o código da viagem" className="input-travel" name="codigo" value={travel.codigo} onChange={updateTravelValues} />
                        <label htmlFor="id-destinatario" id="label-destinatario">Destinatário</label>
                        <AsyncSelect
                            id="id-destinatario"
                            loadOptions={loadOptions}
                            placeholder="Digite o endereço do destino"
                            className="input-recipient"
                            onChange={value => handleChangeSelect(value)}
                        />
                        <label id="label-descricao" htmlFor="id-descricao">Descrição carga</label>
                        <input id="id-descricao" placeholder="Descreva o que vai ser entregue" className="input-travel" name="description" value={travel.description} onChange={updateTravelValues} />
                        <div className='inputs-grid'>
                            <div>
                                <label htmlFor="id-data">Data da viagem</label>
                                <input id="id-data" type="date" className="input-grid" name="dateTravel" value={travel.dateTravel} onChange={updateTravelValues} />
                            </div>
                            <div>
                                <label htmlFor="id-motorista">Motorista</label>
                                <input id="id-motorista" placeholder="ID do Motorista" className="input-grid" name="id" value={travel.trucker.id} onChange={updateTravelValues} />
                            </div>
                            <div>
                                <label htmlFor="id-caminhao">Caminhão</label>
                                <input id="id-caminhao" placeholder="ID do Caminhão" className="input-grid" name="id" value={travel.truck.id} onChange={updateTravelValues} />
                            </div>
                            <div>
                                <label htmlFor="id-valor">Valor estimado</label>
                                <input id="id-valor" placeholder="Custo estimado da viagem" className="input-grid" name="estimatedValue" value={travel.estimatedValue} onChange={updateTravelValues} />
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
                            <CardTravel id={travel.id} date={travel.dateTravel} code={travel.codigo} truck={travel.truck.name}
                                driver={travel.trucker.name} codigo={travel.codigo} description={travel.description}
                                coust={travel.estimatedValue} address={travel.destiny.address} hasTravel={hasTravels} />
                        ))
                        :
                        <CardTravel code="Não há viagens ativas" hasTravel={hasTravels} />
                }
            </div>
        </>
    );
}