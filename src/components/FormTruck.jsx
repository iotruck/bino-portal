import React, { useState, useEffect } from 'react'
import conn from './../services/conn'


export default function FormTruck() {
    const idCompany = localStorage.getItem("@login-app/company")
    const [truck, setTruckValues] = useState({
        name: "",
        licensePlace: "",
        truckBrand: "",
        truckType: "",
        fuelType: "",
        status: "",
        company: {
            id: ""
        }
    })

    

    const postTruck = async (event) => {
        event.preventDefault();
        const response = await conn.post(`/truck/`, {
            ...truck
        })

        if (response.status === 201)
            window.location.reload()
        else
            alert("Erro ao criar")
        
    }

    const updateTruckValues = (event) => {
        const { value, name } = event.target;

        setTruckValues({
            ...truck,
            [name]: value,
            company: {
                id: `${idCompany}`
            },
        });
    };

    return (
        <form id="formCaminhao" onSubmit={postTruck}>
            <h3 id="h3Form" style={{color: 'blue'}}>Cadastro de caminhões</h3> <br/> <br/>
            <label> Nome/descrição </label>
            <input placeholder="Qual o nome do caminhão?" name="name" value={truck.name} onChange={updateTruckValues} /> <br />

            
            
                <div>
                    <label> Placa </label>
                    <input placeholder="CAMINHAO 01" name="licensePlace" value={truck.nalicensePlace} onChange={updateTruckValues}/> <br />
                </div>
            

            <div className="inline-form">
                <div>
                    <label> Marca </label>
                    <input placeholder="KIA" name="truckBrand" value={truck.truckBrand} onChange={updateTruckValues}/> <br />
                </div>

                <div>
                    <label> Combustível</label>
                    <select className="enumFuel" name="truckType" onChange={updateTruckValues}>
                        <option value={Number(0)}>S10</option>
                        <option value={Number(1)}>S500</option>
                    </select>
                </div>

            </div>
            <div className="inline-form">
                <div>
                    <label> Tipo do caminhão</label>
                    <select className="enumTruckType" name="fuelType" onChange={updateTruckValues}>
                        <option value={Number(0)}>Carroceria</option>
                        <option value={Number(1)}>Baú</option>
                    </select>
                </div>
        
                <div>
                    <label> Status </label>
                    <input placeholder="Como ele está?" name="status" value={truck.status} onChange={updateTruckValues}/>
                </div>
            </div>
            <br />
            <button>Cadastrar</button>
            <span id="error" style={{display: 'none', color: 'red', paddingTop: '3vh'}}>
           Alguma informação inválida. Por favor, revise o formulário.</span>
        </form>
    );
}