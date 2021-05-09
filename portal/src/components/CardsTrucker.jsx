import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CardsTrucker() {

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
                    <input type="text" id="name" placeholder="Waldesio da Silva Pereira" />

                    <label htmlFor="cpf"> CPF </label>
                    <input type="text" id="cpf" placeholder="012.345.678-90" />

                    <label htmlFor="birthDate"> Nasc </label>
                    <input type="date" id="birthDate" />

                    <label htmlFor="phoneNumber" id="labelPhoneNumber"> Telefone </label>
                    <input type="text" id="phoneNumber" placeholder="(11) 91234-1234" />

                    <label htmlFor="cnh" id="labelCnh"> CNH </label>
                    <input type="text" id="cnh" placeholder="000123456789" />

                    <label htmlFor="digito" id="labelDig"> Dígito </label>
                    <input type="text" id="digito" placeholder="B+" />

                    <label htmlFor="certifications" id="labelCertifications"> Certificações </label>
                    <input type="text" id="certifications" placeholder="Inflamavéis" />

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
                    <h3 id="h3Trucker">WALDESIO PEREIRA</h3>
                </div>
                <p>
                    <h6>CPF: </h6> <label> 01203623389 </label>
                </p>
                <p>
                    <h6>Nascimento: </h6> <label> 03/04/1989 </label>
                    <h6>Telefone: </h6> <label> 1191234567 </label>
                </p>
                <p>
                    <h6>CNH: </h6> <label> 000123456789 </label>
                    <h6>Certificação: </h6> <label> inflamáveis C </label>
                </p>
            </div>
        </>
    );
}