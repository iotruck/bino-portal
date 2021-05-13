import React, { useEffect, useState } from 'react'
import User from '../components/UserData'
import SearchBar from '../components/SearchBar'
import Input from '../components/Input'
import Cards from '../components/Cards'
import conn from '../service/conn'

export default function AdminPage(props) {

    const [analysts, addAnalystInList] = useState([])

    useEffect(() => {
        async function getAnalyst() {
            const response = await conn.get(`securityanalyst/company/${1}`);
            addAnalystInList(response.data);
        }


        getAnalyst();

    });

    return (
        <React.Fragment>
            <SearchBar />
            <User name={props.name} />

            <div className="section-forms-analyst">
                <form class="form-analyst">
                    <div className="form-initial">
                        <h3>Cadastro de analista</h3>
                        <Input label="Nome" />
                        <Input label="CPF" />
                        <Input label="Email" />
                        <Input label="Senha" />
                        <button>Cadastrar</button>
                    </div>
                </form>
            </div>


            <div className="list-analyst">
                <div className="assing-list">
                    <span className="status"></span>
                    <h3>Analistas Cadastrados</h3>
                </div>
                <div className="assign">
                    {
                        analysts.map((analyst) => (
                            <Cards name={analyst.name} email={analyst.email} company={analyst.company.name} />
                          ))
                    }
                   
                </div>
            </div>

        </React.Fragment>
    );
}


