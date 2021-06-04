import React, { useState } from 'react'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'
import Confirm from 'react-modal'
import { fetchLocalMapBox } from '../api'
import AsyncSelect from 'react-select/async'
import conn from '../services/conn'

Modal.setAppElement('#root');

const CardTravel = (props) => {

  const [modalIsOpen, setModalOpen] = useState(false)
  const [modalConfirmIsOpen, setModalConfirmOpen] = useState(false)
  const [address, setAddress] = useState([]);
  const [orderLocation, setOrderLocation] = useState([]);

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

  const deleteTravel = async () => {
    const response = await conn.delete(`/travel/${Number(props.id)}`)

    if (response.status === 200)
      window.location.reload()
    else
      setModalConfirmOpen(false)
  }

  const [travel, setTravelValues] = useState({
    codigo: `${props.codigo}`,
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
    status: "1"
  })

  const updateTravel = async (event) => {
    event.preventDefault();
    const response = await conn.put(`/travel/${props.id}`, {
      ...travel
    })

    if (response.status === 200)
      window.location.reload();
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
      trucker: {
        ...travel.trucker,
        [name]: value
      },
      truck: {
        ...travel.truck,
        [name]: value
      },
      analyst: {
        id: `${idAnalyst}`
      },
    });
  };

  const idAnalyst = localStorage.getItem("@login-app/user")


  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalOpen(false)}
        className="ModalTravel"
        overlayClassName="Overlay"
      >

        <h1>
          <p> Editar informações da viagem </p>
          <i className="fas fa-times" onClick={() => setModalOpen(false)} ></i>
        </h1>


        <form id="updateTravel" onSubmit={updateTravel}>
          <label htmlFor="code"> Código <i className="fas fa-lock"></i> </label>
          <input type="text" placeholder={props.codigo} name="codigo" value={travel.codigo} onChange={updateTravelValues} disabled />

          <label htmlFor="id-destinatario" id="label-destinatario">Destinatário</label>
          <AsyncSelect
            loadOptions={loadOptions}
            placeholder={props.address}
            className="inputDestinary"
            onChange={value => handleChangeSelect(value)}
          />

          <label htmlFor="description"> Descrição </label>
          <input type="text" id="description" placeholder={props.description} name="description" value={travel.description} onChange={updateTravelValues}/>

          <label htmlFor="date" id="dateTravel"> Data </label>
          <InputMask mask="99/99/9999" id="date" name="dateTravel" value={travel.dateTravel} onChange={updateTravelValues}/>

          <label htmlFor="model"> Caminhão </label>
          <input type="text" id="model" placeholder={props.truck} name="id" value={travel.truck.id} onChange={updateTravelValues}/>

          <label htmlFor="driver" id="driver"> Motorista </label>
          <input type="text" id="driver" placeholder={props.driver} name="id" value={travel.trucker.id} onChange={updateTravelValues}/>

          <label htmlFor="price"> Valor estimado </label>
          <input type="text" id="price" placeholder={props.coust} name="estimatedValue" value={travel.estimatedValue} onChange={updateTravelValues}/>



          <button id="cancelTravel" onClick={() => setModalOpen(false)} >
            Cancelar
                    </button>

          <button id="saveTravel">
            Atualizar
                    </button>
        </form>
      </Modal>

      <Confirm
        isOpen={modalConfirmIsOpen}
        onRequestClose={() => setModalConfirmOpen(false)}
        className="Delete"
        overlayClassName="Overlay"
      >

        <h1>
          <p> Tem certeza que deseja excluir esta viagem? </p>
          <i className="fas fa-times" onClick={() => setModalConfirmOpen(false)} ></i>
        </h1>

        <h4> Código: <span> {props.codigo} </span> </h4>
        <h4> Descrição: <span> {props.description} </span> </h4>
        <h4> Caminhão: <span> {props.truck} </span> </h4>
        <h4> Motorista: <span> {props.driver} </span> </h4>


        <button id="cancelDelete" onClick={() => setModalConfirmOpen(false)} >
          Cancelar
                    </button>

        <button id="deleteButton" onClick={() => deleteTravel()}>
          Sim, tenho
                    </button>

      </Confirm>

      <div className="card-travel">

        <div className="date-travel">{props.date}</div>
        <div className="code-travel">{props.code}</div>
        <div className="infos-travel">
          <div className="truck-travel">{props.truck}</div>
          <div className="driver-travel">{props.driver}</div>
        </div>
        <div className="itens-options">
          {
            props.hasTravel ? (
              <React.Fragment>
                <i className="fas fa-edit" onClick={() => setModalOpen(true)}></i>
                <i className="fas fa-trash-alt" onClick={() => setModalConfirmOpen(true)}></i>
              </React.Fragment>
            ) :
              <React.Fragment></React.Fragment>

          }

        </div>

      </div>
    </>
  );
}

export default CardTravel;
