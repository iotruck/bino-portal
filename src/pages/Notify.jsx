import React from 'react';
import User from '../components/UserData';
import NotifyNotification from '../components/NotifyNotification';
import ChatBox from '../components/Chat';


export default function Notify(props) {
    return (
        <React.Fragment>

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
                                Viagens <span>ativas</span>
                            </p>
                        </h1>
                    </div>
                    <div className="notify-screen">
                        <NotifyNotification code="GF4657688" date="18:30" message="Última atualização há 4 horas" />
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


                    <ChatBox 
                        senderName="Sandra Cunha" 
                        message="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Sunt minima ad accusantium quia ducimus est error perferendis, 
                        numquam perspiciatis praesentium modi fugiat molestias."
                        dateTime = "22:43"
                        />


                </div>
            </div>
        </React.Fragment>
    )
}