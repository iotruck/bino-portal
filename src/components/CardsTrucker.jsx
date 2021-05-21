import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CardsTrucker(props) {

    const [modalIsOpen, setModalOpen] = useState(false)

    return (

        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                className="ModalTrucker"
                overlayClassName="Overlay"
            >
                <h1>
                    <p> Editar informações do caminhoneiro </p>
                    <i className="fas fa-times" onClick={() => setModalOpen(false)} ></i>
                </h1>


                <form id="updateTrucker">
                    <label htmlFor="name"> Nome </label>
                    <input type="text" id="name" placeholder={props.name} />

                    <label htmlFor="cpf"> CPF </label>
                    <input type="text" id="cpf" placeholder={props.cpf} />

                    <label htmlFor="birthDate"> Nascimento </label>
                    <input type="date" id="birthDate" />

                    <label htmlFor="phoneNumber" id="labelPhoneNumber"> Telefone </label>
                    <input type="text" id="phoneNumber" placeholder={props.phoneNumber} />

                    <label htmlFor="cnh" id="labelCnh"> CNH </label>
                    <input type="text" id="cnh" placeholder={props.cnh} />

                    <label htmlFor="digito" id="labelDig"> Dígito </label>
                    <input type="text" id="digito" placeholder={props.digito} />

                
                    <button id="cancelTrucker" onClick={() => setModalOpen(false)} >
                        Cancelar
                    </button>

                    <button id="saveTrucker">
                        Salvar
                    </button>
                </form>

            </Modal>

            <div className="cards">

                <div className="itens-options">
                    <i class="fas fa-edit" onClick={() => setModalOpen(true)} ></i>
                    <i class="fas fa-trash-alt"></i>
                    <h3 id="h3Trucker">{props.name}</h3>
                </div>
                <p>
                    <h6>CPF: </h6> <label> {props.cpf} </label>
                </p>
                <p>
                    <h6>Nascimento: </h6> <label> {props.birhtDate} </label>
                    <h6>Telefone: </h6> <label> {props.phoneNumber} </label>
                </p>
                <p>
                    <h6>CNH: </h6> <label> {props.cnh} </label>
                    
                </p>
            </div>
        </>
    );
}