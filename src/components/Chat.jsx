import React from 'react';


export default function Chat(props) {
    return (
        <React.Fragment>

            <div className="chatBox">
                <div className="infos">
                    <h1 className="chatCodeTravel">
                        {props.senderName}
                    </h1>

                    <p>
                        {props.message}
                    </p>

                    <h4>
                        {props.dateTime}
                    </h4>
                </div>


            </div>
        </React.Fragment>
    )
}