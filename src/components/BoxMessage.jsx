import React, { useEffect, useState } from 'react';
import conn from './../services/conn'


export default function BoxMessage(props) {
    
    return (
    <div>
        <div>
            <h1>
                <p>
                    <span>{props.codeTravel}</span>
                </p>
            </h1>
        </div>

    </div>
    )
}