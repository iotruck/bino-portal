import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Cards(props) {

    const [modalIsOpen, setModalOpen] = useState(false)

    function viewPassword(){
        let inputPassword = document.getElementById('password');
        let iconEye = document.getElementById('eyeIcon');

        if(inputPassword.type == 'text'){
            inputPassword.type = 'password';
            iconEye.classList.remove('fa-eye');
            iconEye.classList.add('fa-eye-slash');
        }else{
            inputPassword.type = 'text';
            iconEye.classList.remove('fa-eye-slash');
            iconEye.classList.add('fa-eye');
        }
    }

    return (

        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                className="ModalAnalyst"
                overlayClassName="Overlay"
            >

                <h1>
                    <p> Editar informações do analista </p>
                    <i className="fas fa-times" onClick={() => setModalOpen(false)} ></i>
                </h1>


                <form id="updateTravel">
                    <label htmlFor="name"> Nome <i class="fas fa-lock"></i> </label>
                    <input type="text" id="name" placeholder={props.name}/>

                    <label htmlFor="email"> E-mail </label>
                    <input type="text" id="email" placeholder={props.email} />

                

                    <button id="cancelAnalyst" onClick={() => setModalOpen(false)} >
                        Cancelar
                    </button>

                    <button id="saveAnalyst">
                        Salvar
                    </button>
                </form>
            </Modal>


            <div className="card-person">
                <div className="itens-options">
                    <h4 max-length="100">{props.name}</h4>
                    <i class="fas fa-edit" onClick={() => setModalOpen(true)}></i>
                    <i class="fas fa-trash-alt"></i>
                </div>
                <div className="itens-list">
                    <b>E-mail:</b>{props.email}
                    <b>Empresa:</b>{props.company}
                </div>
            </div>
        </>
    );

}