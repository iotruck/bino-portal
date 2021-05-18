import React from 'react';
import User from '../components/UserData';
import NotifyNotification from '../components/NotifyNotification';


export default function Notify(props) {
    return (
        <React.Fragment>
            {/* <User name={props.name} /> */}
            <h1 className="welcome">
                <p>
                    Notificações
               </p>
            </h1>
            <div className="background">
                <div className="left title">
                    <div>
                    <h1>
                        <p>
                            Últimas <span>05 horas</span>
                        </p>
                    </h1>
                    </div>
                    <div className="notify-screen">
                    <NotifyNotification code="GF4657688" date="18:30" message="Última atualização há 4 horas"/>
                    <NotifyNotification code="FO76453P2" date="11:30" message="Chat não respondido (20 min)"/>
                    <NotifyNotification code="HKLMIHEY" date="01:30" message="Última atualização há 6 horas"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    <NotifyNotification code="HKLMIHEY" date="01:30" message="Última atualização há 6 horas"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    <NotifyNotification code="HKLMIHEY" date="01:30" message="Última atualização há 6 horas"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    <NotifyNotification code="HKLMIHEY" date="01:30" message="Última atualização há 6 horas"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    </div>
                </div>
                <hr className="line-dotted" />

                <div className="right title">
                    <div>
                    <h1>
                        <p>
                            Últimas <span>15 horas</span>
                        </p>
                    </h1>
                    </div>
                
                    <div className="notify-screen">
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    <NotifyNotification code="HKLMIHEY" date="01:30" message="Última atualização há 6 horas"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    <NotifyNotification code="HKLMIHEY" date="01:30" message="Última atualização há 6 horas"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    <NotifyNotification code="HKLMIHEY" date="01:30" message="Última atualização há 6 horas"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    <NotifyNotification code="HKLMIHEY" date="01:30" message="Última atualização há 6 horas"/>
                    <NotifyNotification code="886652431" date="20:30" message="Movimentação não registrada"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}