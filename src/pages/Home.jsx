import React, { useContext } from 'react';
import User from '../components/UserData';
import Travel from '../components/ActivesTravels';
import Notification from '../components/Notifications';
import Chat from '../components/Chat';
import Context from '../components/Section/Context';


import coruja from '../assets/img/coruja.png';
import blob from '../assets/img/blob.png';
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const history = useHistory();

    const { setToken } = useContext(Context);

    const logout = () => {
        setToken('null')
        history.push('/login')
    }

    return (
        
        <React.Fragment>
            <User name={props.name} />
            <img src={blob} className="blob" alt="" />
            <h1 className="welcome">
                <img src={coruja} className="brand-logo" alt="Seja bem vindo, estamos aqui pra lha ajudar" />
                <p>
                    Olá, <span>{props.name}</span> <i className="fas fa-sign-out-alt" onClick={logout}></i>
                </p>
            </h1>

            <div className="active-travels">
                <p>
                    <h3>Viagens ativas</h3>
                    <i className="fas fa-reply"></i>
                </p>
                <div id="active-travels-labels">
                    <Travel date="21/12" code="BSD1213" truck="Scannia FH-16" driver="Waldesio Silva" />
                    <Travel date="21/12" code="JBD4433" truck="Volkswagen HR90" driver="Bruna Oliveira" />
                    <Travel date="21/12" code="VBÇLJ21" truck="Mercedes 1113" driver="Mathues Rodrigues" />
                </div>
            </div>

            <div className="registered-trucks">
                <p>
                    caminhões registrados
                    <b>
                        {props.number_trucks}
                    </b>
                </p>
            </div>

            <div className="registered-drivers">
                <p>
                    caminhões registrados
                    <b>
                        {props.number_drivers}
                    </b>
                </p>
            </div>

            <div className="notifications">
                <p>
                    <h3>Atenção</h3>
                    <i className="fas fa-reply"></i>
                </p>

                <div id="notifies">
                    <Notification code="BSD1213" message="Está parado há 2 horas" />
                </div>
            </div>

            <div className="chat">
                <p>
                    <h3>Chats ativos</h3>
                </p>

                <Chat code="BSD1213" message="Houve um acidente na via"/>
            </div>

        </React.Fragment>
    );
}