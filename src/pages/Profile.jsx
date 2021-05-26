import React, { useEffect, useState } from 'react'
// 
import Modal from 'react-modal';

function seePassword() {
    var x = document.getElementById("passInput");
    var img = document.getElementById("imgedit");
    if (x.type === "password") {
      x.type = "text";
      img.src="eye.png";
    } else {
      x.type = "password";
      img.src="closed.png";
    }
  }


export default function Profile(props) {

    // const [analyst, setAnalyst] = useState([])
    const [modalIsOpen, setModalOpen] = useState(false)

    // const idAnalyst = localStorage.getItem("@login-app/user")

    // async function getAnalyst() {
    //     const response = await conn.get(/securityanalyst/idAnalyst)
    //     setAnalyst(response.data)
    // }

    // useEffect(() => {
    //     getAnalyst()
    // }, [])

    return (
        <>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                className="ModalTruck"
                overlayClassName="Overlay"
            >
                <h1>
                    <p> Informações da sua conta </p>
                    <i className="fas fa-times" onClick={() => setModalOpen(false)} ></i>
                </h1>
                <div className="profilecontainer">
                    <div className="background">
                        <div className="infosuser">
                            <div className="userphoto"> </div>
                            <div className="infos">
                                <label> olá, </label> <br />
                                <label>SANDRA CUNHA</label> <br />
                                <button>sair</button>
                            </div>
                        </div>
                        <div className="edit-profile">
                            <span> Minha conta</span>
                            <div className="edit">
                                <label>E-mail</label>
                                <input value="seuemail@gmail.com" /> <br /> <br />
                                <label>Senha</label>
                                <input value="miNh4Senh4" type="password" id="passInput" />
                                <img src="closed.png" id="imgedit" onClick={seePassword}/>
                                <br />
                                <button>Salvar mudanças</button>
                            </div>
                        </div>
                    </div>
            </div>
            </ Modal>
                <>
                    <div className="user">
                        <div className="datas">
                            {/* <p className="name-user">{analyst.name}</p> */}
                            <p className="account" onClick={() => setModalOpen(true)}>Minha conta</p>
                        </div>
                        <div className="icon">
                            <div className="icon-img">
                                <div className="status"></div>
                            </div>

                        </div>
                    </div>
                </>
        </>
    );
}

