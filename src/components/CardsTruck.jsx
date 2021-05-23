import React, { useState } from 'react';
import Modal from 'react-modal';
import Confirm from 'react-modal';
import conn from './../services/conn'


Modal.setAppElement('#root');

export default function CardsTruck(props) {

    const [modalIsOpen, setModalOpen] = useState(false)
    const [modalConfirmIsOpen, setModalConfirmOpen] = useState(false)
    const idCompany = localStorage.getItem("@login-app/company")

    const [truck, setTruckValues] = useState({
        name: "",
        licensePlace: "",
        truckBrand: "",
        truckType: "",
        fuelType: "",
        status: "",
        company: {
            id: ""
        }
    })

    const deleteTruck = async () => {
        const response = await conn.delete(`/truck/${Number(props.truckId)}`)
    
        if (response.status === 200)
          window.location.reload()
        else
          setModalConfirmOpen(false)
      }


    const putTruck = async (event) => {
        event.preventDefault();
        const response = await conn.put(`/truck/${Number(props.truckId)}`, {
            ...truck
        })

        if (response.status === 200)
            window.location.reload()

    }

    

    const updateTruckValues = (event) => {
        const { value, name } = event.target;

        setTruckValues({
            ...truck,
            [name]: value,
            licensePlace: `${props.licensePlace}`,
            company: {
                id: `${idCompany}`
            },
        });
    };


    return (
        <>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                className="ModalTruck"
                overlayClassName="Overlay"
            >
                <h1>
                    <p> Editar informações do caminhoneiro </p>
                    <i className="fas fa-times" onClick={() => setModalOpen(false)} ></i>
                </h1>


                <form id="updateTruck" onSubmit={putTruck}>

                    <label> Nome/descrição </label>
                    <input placeholder={props.name} name="name" value={truck.name} onChange={updateTruckValues} /> <br />


                    <div>
                        <label> Marca </label>
                        <input placeholder={props.brand} name="truckBrand" value={truck.truckBrand} onChange={updateTruckValues} /> <br />
                    </div>

                    <div>
                        <label> Combustível</label>
                        <select className="enumFuelUpdate" name="fuelType" onChange={updateTruckValues}>
                            <option value={Number(0)}>S10</option>
                            <option value={Number(1)}>S500</option>
                        </select>
                    </div>



                    <div>
                        <label> Tipo do caminhão</label>
                        <select className="enumTruckTypeUpdate" name="truckType" onChange={updateTruckValues}>
                            <option value={Number(0)}>Carroceria</option>
                            <option value={Number(1)}>Baú</option>
                        </select>
                    </div>

                    <div>
                        <label> Status </label>
                        <input placeholder={props.status} name="status" value={truck.status} onChange={updateTruckValues} />
                    </div>
                    <br />

                    <button id="cancelTruck" onClick={() => setModalOpen(false)} >
                        Cancelar
                    </button>

                    <button id="saveTruck">
                        Salvar
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

                <h4> Marca: <span> {props.brand} </span> </h4>
                <h4> Tipo: <span> {props.type} </span> </h4>
                <h4> Combustível: <span> {props.fuelType} </span> </h4>


                <button id="cancelDelete" onClick={() => setModalConfirmOpen(false)} >
                    Cancelar
                    </button>

                <button id="deleteButton" onClick={() => deleteTruck()}>
                    Sim, tenho
                    </button>

            </Confirm>

            <div className="cards">

                <div className="itens-options">
                    <i className="fas fa-edit" onClick={() => setModalOpen(true)}></i>
                    <i className="fas fa-trash-alt" onClick={() => setModalConfirmOpen(true)}></i>
                    <h3 id="h3Truck">{props.name}</h3>
                </div>


                <p>
                    <h6>Marca: </h6> <label> {props.brand} </label>
                </p>
                <p>
                    <h6>Tipo: </h6> <label> {props.type} </label>
                </p>
                <p>
                    <h6>Combustível: </h6> <label> {props.fuelType} </label>
                </p>
            </div>
        </>
    );
}