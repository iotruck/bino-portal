import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Confirm from 'react-modal';
import conn from './../services/conn'

Modal.setAppElement('#root');

export default function CardsTrucker(props) {

    const [modalIsOpen, setModalOpen] = useState(false)
    const [modalConfirmIsOpen, setModalConfirmOpen] = useState(false)
    const idCompany = localStorage.getItem("@login-app/company")


    const [trucker, setTruckerValues] = useState({
        birthDate: "",
        certification: "",
        cnh: "",
        cpf: "",
        name: "",
        phoneNumber: "",
        company: {
            id: idCompany
        }
    })

    const deleteTrucker = async () => {
        const response = await conn.delete(`/trucker/${Number(props.truckerId)}`).then(() => {
            window.location.reload();
        }).catch(err => {
            alert("Erro ao deletar motorista")
        })
    };


    const putTrucker = async (event) => {
        event.preventDefault();
        const response = await conn.put(`/trucker/${Number(props.truckerId)}`, {
            ...trucker
        }).then(() => {
            window.location.reload();
        }).catch(err => {
            alert("Ocorreu um erro ao atualizar :[ \nAltere todos os valores e tente novamente")
        })

    }



    const updateTruckerValues = (event) => {
        const { value, name } = event.target;

        setTruckerValues({
            ...trucker,
            [name]: value
        });
    };

    useEffect(() => {
        setTruckerValues({
            ...trucker,
            certification: "",
            cnh: props.cnh,
            cpf: props.cpf,
            name: props.name,
            phoneNumber: props.phoneNumber
        })
    }, 1)


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


                <form id="updateTrucker" onSubmit={putTrucker}>

                    <label htmlFor="name"> Nome </label>
                    <input type="text" name="name" value={trucker.name} onChange={updateTruckerValues} placeholder={props.name} />

                    <label htmlFor="cpf"> CPF </label>
                    <input type="text" name="cpf" value={trucker.cpf} onChange={updateTruckerValues} placeholder={props.cpf} />

                    <label htmlFor="birthDate"> Nascimento </label>
                    <input type="date" name="birthDate" value={trucker.birthDate} onChange={updateTruckerValues} />

                    <label htmlFor="phoneNumber" id="labelPhoneNumber"> Telefone </label>
                    <input type="text" name="phoneNumber" value={trucker.phoneNumber} onChange={updateTruckerValues} placeholder={props.phoneNumber} />

                    <label htmlFor="cnh" id="labelCnh"> CNH </label>
                    <input type="text" name="cnh" value={trucker.cnh} onChange={updateTruckerValues} placeholder={props.cnh} />

                    <label htmlFor="digito" id="labelDig"> Certificação </label>
                    <input type="text" name="certification" value={trucker.certification} onChange={updateTruckerValues} placeholder={props.certification} />


                    <button id="cancelTrucker" onClick={() => setModalOpen(false)} >
                        Cancelar
                    </button>

                    <button id="saveTrucker">
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
                    <p> Tem certeza que deseja excluir este caminhoneiro? </p>
                    <i className="fas fa-times" onClick={() => setModalConfirmOpen(false)} ></i>
                </h1>

                <h4> Nome: <span> {props.name} </span> </h4>
                <h4> CPF: <span> {props.cpf} </span> </h4>
                <h4> CNH: <span> {props.cnh} </span> </h4>


                <button id="cancelDelete" onClick={() => setModalConfirmOpen(false)} >
                    Cancelar
                    </button>

                <button id="deleteButton" onClick={() => deleteTrucker()}>
                    Sim, tenho
                    </button>

            </Confirm>

            <div className="cards">

                <div className="itens-options">
                    {
                        props.hasTrucker ?
                            <React.Fragment>
                                <i className="fas fa-edit" onClick={() => setModalOpen(true)} ></i>
                                <i className="fas fa-trash-alt" onClick={() => setModalConfirmOpen(true)} ></i>
                            </React.Fragment>
                            :
                            <React.Fragment />
                    }

                    <h3 id="h3Trucker">{props.name}</h3>
                </div>
                <p>
                    <h6>CPF: </h6> <label> {props.cpf} </label>
                </p>
                <p>
                    <h6>Nascimento: </h6> <label> {props.birthDate} </label>
                    <h6>Telefone: </h6> <label> {props.phoneNumber} </label>
                </p>
                <p>
                    <h6>CNH: </h6> <label> {props.cnh} </label>

                </p>
            </div>
        </>
    );
}