import React, { useState } from 'react'
import conn from './../services/conn'


export default function FormTruck() {

    function enableError() {
        if (document.getElementById("errorTruck").style.display === 'none') {
            document.getElementById("errorTruck").style.display = 'block';
        }
    }


    const idCompany = localStorage.getItem("@login-app/company")
    const [truck, setTruckValues] = useState({
        name: "",
        licensePlace: "",
        truckBrand: "",
        truckType: "",
        fuelType: "",
        status: "LIVRE",
        company: {
            id: ""
        }
    })



    const postTruck = async (event) => {
        event.preventDefault();
        const response = await conn.post(`/truck/`, {
            ...truck
        }).then(() => {
            window.location.reload();
        }).catch((error) => {
            enableError();
        })

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
            <h3 id="h3Form" style={{ color: 'blue' }}>Cadastro de caminhões</h3> <br /> <br />
            <label> Nome/descrição </label>
            <input placeholder="CAMINHAO 01" name="name" value={truck.name} onChange={updateTruckValues} /> <br />



            <div>
                <label> Placa </label>
                <input placeholder="ABC-0123" name="licensePlace" value={truck.nalicensePlace} onChange={updateTruckValues} /> <br />
            </div>


            <div>
                <label> Marca </label>
                <input placeholder="KIA" name="truckBrand" value={truck.truckBrand} onChange={updateTruckValues} /> <br />
            </div>

            <div className="inline-form">
                <div>
                    <label> Combustível</label>
                    <select className="enumFuel" name="fuelType" value={truck.fuelType} onChange={updateTruckValues}>
                        <option selected>Selecione</option>
                        <option value={0}>S10</option>
                        <option value={1}>S500</option>
                    </select>
                </div>
            </div>

            <div className="inline-form">
                <div>
                    <label> Tipo do caminhão</label>
                    <select className="enumTruckType" name="truckType" value={truck.truckType} onChange={updateTruckValues}>
                        <option selected>Selecione</option>
                        <option value={0}>Carreta</option>
                        <option value={1}>Baú</option>
                    </select>
                </div>
            </div>




            <br />
            <button>Cadastrar</button>
            <span id="errorTruck" style={{ display: 'none', color: 'red', paddingTop: '3vh' }}>
                Alguma informação inválida - revise o formulário.</span>
        </form>
    );
}