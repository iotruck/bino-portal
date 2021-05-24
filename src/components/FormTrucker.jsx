import React, { useState } from 'react'
import conn from './../services/conn'

export default function FormTrucker() {
    const idCompany = localStorage.getItem("@login-app/company")
    const [trucker, setTruckerValues] = useState({
        birthDate: "",
        certification: "",
        cnh: "",
        cpf: "",
        name: "",
        phoneNumber: "",
        company: {
            id: idCompany
        }
    })

    const postTrucker = async (event) => {
        event.preventDefault();
        const response = await conn.post(`/trucker/`, {
            ...trucker
        }).then(() => {
            window.location.reload();
        }).catch((error) => {
            alert("Verifique os dados, ocorreu um erro :[")
        })

    }

    const updateTruckerValues = (event) => {
        const { value, name } = event.target;

        setTruckerValues({
            ...trucker,
            [name]: value
        });
    };

    return (
        <form id="formMotorista" onSubmit={postTrucker} >
            <h3 id="h3Form">Cadastro de motoristas</h3> <br /> <br />
            <label> Nome e sobrenome </label>
            <input placeholder="Waldesio da Silva" name="name" value={trucker.name} onChange={updateTruckerValues} /> <br />

            <label> CPF </label>
            <input placeholder="123.456.789-10" name="cpf" value={trucker.cpf} onChange={updateTruckerValues}/> <br />

            <div className="inline-form">

                <div>
                    <label> Data de nascimento </label>
                    <input type="date" name="birthDate" value={trucker.birthDate} onChange={updateTruckerValues} /> <br />
                </div>

                <div>
                    <label> Telefone </label>
                    <input placeholder="(11)98765-4321" name="phoneNumber" value={trucker.phoneNumber} onChange={updateTruckerValues} /> <br />
                </div>

            </div>

            <div className="inline-form">

                <div>
                    <label> CNH</label>
                    <input placeholder="00123456789" name="cnh"  value={trucker.cnh} onChange={updateTruckerValues} /> <br />
                </div>

                <div>
                    <label> Certificação </label>
                    <input placeholder="Inflamáveis" name="certification" value={trucker.certification} onChange={updateTruckerValues} />
                </div>

            </div>
            <br />
            <button>Cadastrar</button>
            <span id="error" style={{ display: 'none', color: 'red', paddingTop: '3vh' }}>
                Alguma informação inválida. Por favor, revise o formulário.</span>
        </form>
    );
}