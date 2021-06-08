import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import InputMask from 'react-input-mask'
import { fetchLocalMapBox } from '../api'
import AsyncSelect from 'react-select/async'
import CardTravel from '../components/CardTravel'
import conn from './../services/conn'

export default function Travel() {

    function enableError() {
        if (document.getElementById("errorrr").style.display == 'none') {
            document.getElementById("errorrr").style.display = 'block';
        }
    }

    const [address, setAddress] = useState([]);
    const [orderLocation, setOrderLocation] = useState([]);
    const [travels, setTravel] = useState([]);
    const [truck, setTruck] = useState();
    const [trucker, setTrucker] = useState();
    const [hasTravels, setHasTravels] = useState(false);
    const [company, setCompany] = useState({
        address: "",
        latitude: 0,
        longitude: 0
    });
    const [travel, setTravelValues] = useState({
        codigo: "",
        dateTravel: "",
        description: "",
        estimatedValue: "",
        status: "READY",
        
    })

    const postTravel = async (event) => {
        event.preventDefault();
      
        const postValue = {
            ...travel,
            destiny: {
                ...orderLocation
            },
            currentTruckPosition: {
                ...company
            },
            trucker: {
                id: trucker
            },
            truck: {
                id: truck
            },
            analyst: {
                id: idAnalyst
            },
        }

       const response = await conn.post(`/travel/`, {
            ...postValue
        }).then(() => {
            window.location.reload();
        }).catch((err) => {
           enableError();
        })          
    }

    const updateTravelValues = (event) => {
        const { value, name } = event.target;

        setTravelValues({
            ...travel,
            [name]: value
        });
    };


    const idAnalyst = Number(localStorage.getItem("@login-app/user"))

    async function getTravel() {
        const response = await conn.get(`/travel/analyst/${idAnalyst}`)
        setTravel(response.data)

        if (response.status === 204)
            setHasTravels(false)
        else
            setHasTravels(true)
    }

    async function getCompany() {
        const response = await conn.get(`/securityanalyst/${idAnalyst}`)
        if (response.status === 200) {
            console.log(response.data)
            const location = {
                address: response.data.company.location.address,
                latitude: response.data.company.location.latitude,
                longitude: response.data.company.location.longitude
            }
            setCompany(location);
        }
    }

    useEffect(() => {
        getTravel();
        getCompany();
    }, [])

    const updateTrucker = async (event) => {
        event.preventDefault();
        const response = await conn.get(`/trucker/cpf/${event.target.value}`)
        .then(response => {
            setTrucker(response.data.id);
        }).catch((err) => {
            console.log("motorista não encontrado");
        })
    }

    const updateTruck =  async (event) => {
        event.preventDefault()
        const response = await conn.get(`/truck/plate/${event.target.value}`)
        .then(response => {
           setTruck(response.data.id)
        }).catch((err) => {
            console.log("caminhão não encontrado");
        })
    }

    

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
                        <input id="id-codigo" placeholder="VG0001" className="input-travel" name="codigo" value={travel.codigo} onChange={updateTravelValues} />
                        <label htmlFor="id-destinatario" id="label-destinatario">Destinatário</label>
                        <AsyncSelect
                            id="id-destinatario"
                            loadOptions={loadOptions}
                            placeholder="AV Paulista 23"
                            className="input-recipient"
                            onChange={value => handleChangeSelect(value)}
                        />
                        <label id="label-descricao" htmlFor="id-descricao">Descrição carga</label>
                        <input id="id-descricao" placeholder="Material de construção" className="input-travel" name="description" value={travel.description} onChange={updateTravelValues} />
                        <div className='inputs-grid'>
                            <div>
                                <label htmlFor="id-motorista">CPF do Motorista</label>
                                <InputMask mask="999.999.999-99" id="id-motorista" placeholder="123.456.789-10" className="input-grid" onChange={updateTrucker} />
                            </div>
                            <div>
                                <label htmlFor="id-caminhao">Placa do caminhão</label>
                                <input id="id-caminhao" placeholder="ABC-0123" className="input-grid" onChange={updateTruck} />
                            </div>
                            <div>
                                <label htmlFor="id-data">Data da viagem</label>
                                <input type="date" id="id-data" placeholder="22/06/2021" className="input-grid" name="dateTravel" value={travel.dateTravel} onChange={updateTravelValues} />
                            </div>
                            <div>
                                <label htmlFor="id-valor">Valor estimado</label>
                                <input id="id-valor" placeholder="R$ 6980,90" className="input-grid" name="estimatedValue" value={travel.estimatedValue} onChange={updateTravelValues} />
                            </div>
                        </div>
                        <div style={{ display: 'flex'}}>
                        <button>Cadastrar</button>
                        <span id="errorrr" style={{ display: 'none', color: 'red', paddingTop: '3vh' }}>
                            Alguma informação inválida - revise o formulário.</span>
                        </div>
                        
                    </div>
                </form>
            </div>

            <div className="list-travel">
                {
                    hasTravels ?
                        travels.map((travel) => (
                            <CardTravel id={travel.id} date={travel.dateTravel} truck={travel.truck.licensePlate}
                                driver={travel.trucker.cpf} codigo={travel.codigo} description={travel.description}
                                coust={travel.estimatedValue} address={travel.destiny.address} hasTravel={hasTravels} status={travel.status}/>
                        ))
                        :
                        <CardTravel code="Não há viagens ativas" hasTravel={hasTravels} />
                }
            </div>
        </>
    );
}