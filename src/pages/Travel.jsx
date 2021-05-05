import React, {useState}  from 'react';
import User from '../components/UserData';
import SearchBar from '../components/SearchBar';
import { fetchLocalMapBox } from '../api';
import AsyncSelect from 'react-select/async';
import CardTravel from '../components/CardTravel';

export default function Travel(props) {

    const [address, setAddress] = useState(() => {}); 
    const [orderLocation, setOrderLocation] = useState();

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
            <User name={props.name} />
            <div className="section-forms-travel">
                <form className="form-travel">
                    <div className="form-inputs">
                        <h3>Cadastro de viagem</h3>
                        <label htmlFor="id-codigo">Código</label>
                        <input id="id-codigo" className="input-travel"/>
                        <label htmlFor="id-destinatario" id="label-destinatario">Destinatário</label> 
                        <AsyncSelect
                        id="id-destinatario"
                        loadOptions={loadOptions}
                        placeholder=""
                        className="input-recipient"
                        onChange={value => handleChangeSelect(value)}
                        /> 
                        <label id="label-descricao" htmlFor="id-descricao">Descrição carga</label>
                        <input id="id-descricao" className="input-travel"/>
                        <div className='inputs-grid'>
                            <div>
                                <label htmlFor="id-data">Data da viagem</label>
                                <input id="id-data" className="input-grid"/>
                            </div>
                            <div>
                                <label htmlFor="id-motorista">Motorista</label>
                                <input id="id-motorista" className="input-grid"/>
                            </div>
                            <div>
                                <label htmlFor="id-caminhao">Caminhão</label>
                                <input id="id-caminhao" className="input-grid"/>
                            </div>
                            <div>
                                <label htmlFor="id-valor">Valor estimado</label>
                                <input id="id-valor" className="input-grid"/>
                            </div>
                        </div>
                        <button>Cadastrar</button>
                    </div>
                </form>
            </div>

            <div className="list-travel">
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva"/>
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            <CardTravel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
            </div>
        </>
    );
}