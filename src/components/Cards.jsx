import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Confirm from 'react-modal';
import conn from '../services/conn'


Modal.setAppElement('#root');

export default function Cards(props) {

    const [modalConfirmIsOpen, setModalConfirmOpen] = useState(false)
    const [modalIsOpen, setModalOpen] = useState(false)
    const [password, setPassword] = useState([])

    const idCompany = localStorage.getItem("@login-app/company")
    const idAnalyst = localStorage.getItem("@login-app/user")




    const [analyst, setAnalystValues] = useState({
        name: "",
        email: "",
        password: ``,
        company: {
            id: `${idCompany}`
        }
    })

    const update = async (event) => {
        event.preventDefault();

        const response = await conn.put(`/securityanalyst/${Number(props.id)}`, {
            ...analyst
        })

        if (response.status === 200)
            window.location.reload()
        else
            setModalConfirmOpen(false)

    }

    const updateAnalystValues = (event) => {
        const { value, name } = event.target;
        console.log(analyst);
        console.log("Analista " + idAnalyst);
        console.log("Props " + props.id);
        setAnalystValues({
            ...analyst,
            password: `${password}`,
            [name]: value
        });
    };

    async function getPassword() {
        const response = await conn.get(`/securityanalyst/${Number(props.id)}`);
        setPassword(response.data.password);
    }

    const deleteAnalyst = async () => {
        const response = await conn.delete(`/securityanalyst/${Number(props.id)}`)

        if (response.status === 200)
            window.location.reload()
        else
            setModalConfirmOpen(false)
    }

    useEffect(() => {
        getPassword();

        setAnalystValues({
            ...analyst,
            name: props.name,
            email: props.email,
        })
    }, 1)

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


                <form id="updateTravel" onSubmit={update}>
                    <label htmlFor="name"> Nome </label>
                    <input type="text" id="name" placeholder={props.name} name="name" value={analyst.name} onChange={updateAnalystValues} />

                    <label htmlFor="email"> E-mail </label>
                    <input type="text" id="email" placeholder={props.email} name="email" value={analyst.email} onChange={updateAnalystValues} />



                    <button id="cancelAnalyst" onClick={() => setModalOpen(false)} >
                        Cancelar
                    </button>

                    <button id="saveAnalyst">
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
                    <p> Tem certeza que deseja excluir este analista? </p>
                    <i className="fas fa-times" onClick={() => setModalConfirmOpen(false)} ></i>
                </h1>

                <h4> Nome: <span> {props.name} </span> </h4>
                <h4> E-mail: <span> {props.email} </span> </h4>


                <button id="cancelDelete" onClick={() => setModalConfirmOpen(false)} >
                    Cancelar
                    </button>

                <button id="deleteButton" onClick={() => deleteAnalyst()}>
                    Sim, tenho
                    </button>

            </Confirm>


            <div className="card-person">
                <div className="itens-options">
                    {
                        props.hasAnalyts ?
                            <React.Fragment>
                                <h4 max-length="100">{props.name}</h4>
                                <i className="fas fa-edit" onClick={() => setModalOpen(true)}></i>
                                <i className="fas fa-trash-alt" onClick={() => setModalConfirmOpen(true)}></i>
                            </React.Fragment> :
                            <React.Fragment></React.Fragment>

                    }

                </div>
                <div className="itens-list">
                    <b>E-mail:</b>{props.email}
                    <b>Empresa:</b>{props.company}
                </div>
            </div>
        </>
    );

}