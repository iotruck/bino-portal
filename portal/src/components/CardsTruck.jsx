import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CardsTruck() {

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
                    <label htmlFor="placa"> Placa </label>
                    <input type="text" id="placa" placeholder="FREP 0921" />

                    <label htmlFor="model"> Modelo </label>
                    <input type="text" id="model" placeholder="Hyundai HR 2021" />

                    <label htmlFor="brand"> Marca </label>
                    <input type="text" id="brand" placeholder="Hyundai" />

                    <label htmlFor="fuel"> Combustível </label>
                    <input type="text" id="fuel" placeholder="Diesel S10" />

                    <label htmlFor="type" > Tipo </label>
                    <input type="text" id="type" placeholder="Baú" />

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
                    <h3 id="h3Truck">KIA BAÚ BRANCO 01</h3>
                </div>


                <p>
                    <h6>Modelo: </h6> <label> Baú grande </label>
                </p>
                <p>
                    <h6>Placa: </h6> <label> GRE-0345 </label>
                    <h6>Combustível: </h6> <label> Diesel </label>
                </p>
                <p>
                    <h6>Marca: </h6> <label> Kia </label>
                    <h6>Status: </h6> <label> Disponível </label>
                </p>
            </div>
        </>
    );
}