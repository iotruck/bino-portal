import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CardsTruck(props) {

    const [modalIsOpen, setModalOpen] = useState(false)

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


                <form id="updateTruck">
                    
                    <label htmlFor="model"> Modelo </label>
                    <input type="text" id="model" placeholder={props.name} />

                    <label htmlFor="brand"> Marca </label>
                    <input type="text" id="brand" placeholder={props.brand} />

                    <label htmlFor="type" > Tipo </label>
                    <input type="text" id="type" placeholder={props.type} />

                    <button id="cancelTruck" onClick={() => setModalOpen(false)} >
                        Cancelar
                    </button>

                    <button id="saveTruck">
                        Salvar
                    </button>
                </form>

            </Modal>
            <div className="cards">

                <div className="itens-options">
                    <i class="fas fa-edit" onClick={() => setModalOpen(true)}></i>
                    <i class="fas fa-trash-alt"></i>
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