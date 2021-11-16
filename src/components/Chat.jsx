import React from 'react';


export default function Chat(props) {
    return (
        <React.Fragment>
            <div className="chatBox">
                <h1 className="chatCodeTravel">
                    {props.senderName}
                </h1>

                <h4>
                    {props.dateTime}

                </h4>
            </div>
        </React.Fragment>
    )
}