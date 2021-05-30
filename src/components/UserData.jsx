import React, { Profiler, useEffect, useState } from 'react'
import conn from '../services/conn'
import Modal from 'react-modal'


export default function UserData(props) {
    function viewPassword(){
        let inputPassword = document.getElementById('passInput');
        let iconEye = document.getElementById('eyeIcon2');

        if(inputPassword.type === 'text'){
            inputPassword.type = 'password';
            iconEye.classList.add('fa-eye');
            iconEye.classList.remove('fa-eye-slash');
        }else{
            inputPassword.type = 'text';
            iconEye.classList.add('fa-eye-slash');
            iconEye.classList.remove('fa-eye');
        }}

    const [analyst, setAnalyst] = useState([])
    const [modalIsOpen, setModalOpen] = useState(false)

    const idAnalyst = localStorage.getItem("@login-app/user")

    async function getAnalyst() {
        const response = await conn.get(`/securityanalyst/${idAnalyst}`)
        setAnalyst(response.data)
    }

    useEffect(() => {
        getAnalyst()
    }, [])

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                className= "profilecontainer"
                overlayClassName="Overlay"
            >
                <i className="fas fa-times" style={{color: "whitesmoke", padding: "18px", fontSize: "18px", cursor: "pointer"}}
                 onClick={() => setModalOpen(false)} ></i>

                <div className="background-profile">
                    <div className="infosuser">
                        <div className="userphoto"> </div>
                        <div className="infos">
                            <label style={{fontSize: "12px"}}> olá, </label> <br />
                            <label style={{color: "orange"}}>{analyst.name}</label> <br />
                            <button>Sair</button>
                        </div>
                    </div>
                    <div className="edit-profile">
                        <span> Minha conta</span>
                        <div className="edit">
                            <label>Nome</label>
                            <input value={analyst.name} /> <br /> <br />
                            <label>E-mail</label>
                            <input value={analyst.email} /> <br /> <br />
                            <label>Senha </label> 
                            <input value={analyst.password} type="password" id="passInput" /> 
                            <i className="fa fa-eye" id="eyeIcon2" onClick={viewPassword} style={{cursor: "pointer", paddingLeft: "7px"}}></i>
                            <br />
                            <button>Salvar mudanças</button>
                        </div>
                    </div>
                </div>
             
              

            </ Modal>
            <div className="user">
                <div className="datas">
                    <p className="name-user">{analyst.name}</p>
                    <p className="account" onClick={() => setModalOpen(true)}>Minha conta</p>
                </div>
                <div className="icon">
                    <div className="icon-img">
                        <div className="status"></div>
                    </div>

                </div>
            </div>
        </>
    );
}