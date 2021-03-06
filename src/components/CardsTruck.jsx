import React, { useState, useEffect } from 'react';
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
        licensePlate: "",
        truckBrand: "",
        truckType: "",
        fuelType: "",
        status: "",
        company: {
            id: `${idCompany}`
        },
        isDeleted: false
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
            company: {
                id: `${idCompany}`
            },
        });
    };

    useEffect(() => {
        setTruckValues({
            ...truck,
            name: props.name,
            licensePlate: props.licensePlate,
            truckBrand: props.brand,
            truckType: props.type,
            fuelType: props.fuelType,
            status: props.condintion,
            isDeleted: false
        });

    }, 1)

    return (
        <>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                className="ModalTruck"
                overlayClassName="Overlay"
            >
                <h1>
                    <p> Editar informa????es do caminh??o </p>
                    <i className="fas fa-times" onClick={() => setModalOpen(false)} ></i>
                </h1>


                <form id="updateTruck" onSubmit={putTruck}>

                    <label> Nome/descri????o </label>
                    <input placeholder={props.name} name="name" value={truck.name} onChange={updateTruckValues} /> <br />


                    <div>
                        <label> Marca </label>
                        <input placeholder={props.brand} name="truckBrand" value={truck.truckBrand} onChange={updateTruckValues} /> <br />
                    </div>

                    <div>
                        <label> Combust??vel</label>
                        <select className="enumFuelUpdate" name="fuelType" onChange={updateTruckValues}>
                            <option selected>Selecione</option>
                            <option value={Number(0)}>S10</option>
                            <option value={Number(1)}>S500</option>
                        </select>
                    </div>



                    <div>
                        <label> Tipo do caminh??o</label>
                        <select className="enumTruckTypeUpdate" name="truckType" onChange={updateTruckValues}>
                            <option selected>Selecione</option>
                            <option value={Number(0)}>Carroceria</option>
                            <option value={Number(1)}>Ba??</option>
                        </select>
                    </div>

                    <div>
                        <label> Placa </label>
                        <input placeholder={props.licensePlate} name="licensePlate" value={truck.licensePlate} onChange={updateTruckValues} />
                    </div>

                    <div>
                        <label> Status </label>
                        <input placeholder={props.condintion} name="status" value={truck.status} onChange={updateTruckValues} />
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
                    <p> Tem certeza que deseja excluir este caminh??o? </p>
                    <i className="fas fa-times" onClick={() => setModalConfirmOpen(false)} ></i>
                </h1>

                <h4> Marca: <span> {props.brand} </span> </h4>
                <h4> Tipo: <span> {props.type} </span> </h4>
                <h4> Combust??vel: <span> {props.fuelType} </span> </h4>
                <h4> Placa: <span> {props.licensePlate} </span> </h4>


                <button id="cancelDelete" onClick={() => setModalConfirmOpen(false)} >
                    Cancelar
                    </button>

                <button id="deleteButton" onClick={() => deleteTruck()}>
                    Sim, tenho
                    </button>

            </Confirm>

            <div className="cards">

                <div className="itens-options">
                    {
                        props.hasTruck ?
                            <React.Fragment>
                                <i className="fas fa-edit" onClick={() => setModalOpen(true)} ></i>
                                <i className="fas fa-trash-alt" onClick={() => setModalConfirmOpen(true)}></i>
                            </React.Fragment>
                            :
                            <React.Fragment />
                    }
                    <h3 id="h3Truck">{props.name}</h3>
                </div>


                <p>
                    <h6>Marca: </h6> <label> {props.brand} </label>
           
                    <h6>Tipo: </h6> <label> {props.type} </label>
                </p>
                <p>
                    <h6>Combust??vel: </h6> <label> {props.fuelType} </label>
              
                    <h6>Placa: </h6> <label> {props.licensePlate} </label>
                </p>
            </div>
        </>
    );
}