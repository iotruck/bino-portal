import React, { Profiler, useEffect, useState } from 'react'
import conn from '../services/conn'
import Modal from 'react-modal'
import { useHistory } from 'react-router-dom';


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
        const response = await conn.put(`/securityanalyst/${idAnalyst}`, {
            ...analyst
        })

        if(response.status === 200)
            window.location.reload()
        else
              setModalOpen(false)

    }

    const updateAnalystValues = (event) => {
        const { value, name } = event.target;

        setAnalystValues({
            ...analyst,
            password : `${password}`,
            [name]: value
        });
    };

    async function getPassword() {
        const response = await conn.get(`securityanalyst/${idAnalyst}`);
        setPassword(response.data.password);
    }

    async function getAnalyst() {
        const response = await conn.get(`/securityanalyst/${idAnalyst}`)
        setAnalystValues(response.data)
    }

    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("@login-app/user");
        history.push('/login')
    }

    useEffect(() => {
        getAnalyst()
        getPassword()
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
                            <button onClick={logout}>Sair</button>
                        </div>
                    </div>
                    <div className="edit-profile">
                        <span> Minha conta </span>
                        <form className="edit" onSubmit={update}>
                            <label>Nome</label>
                            <input type="text" id="name" placeholder={analyst.name} name="name" value={analyst.name} onChange={updateAnalystValues}/> <br /> <br />

                            <label>E-mail</label>
                             <input type="text" id="email" placeholder={analyst.email} name="email" value={analyst.email} onChange={updateAnalystValues}/> <br /> <br />

                            <label>Senha </label> 
                            <input id="passInput" name="password" type="password"  placeholder={analyst.password} value={analyst.password} onChange={updateAnalystValues}
                             /> 
                            <i className="fa fa-eye" id="eyeIcon2" onClick={viewPassword} style={{cursor: "pointer", paddingLeft: "7px"}}></i>
                            <br />
                            <button>Salvar mudanças</button>
                        </form>
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