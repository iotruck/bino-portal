import React, { useEffect, useState } from 'react'
import User from '../components/UserData'
import SearchBar from '../components/SearchBar'
import Input from '../components/Input'
import Cards from '../components/Cards'
import conn from '../services/conn'

export default function AdminPage(props) {

    const [analysts, setAnalyst] = useState([])
    const [hasAnalyts, setHasAnalyts] = useState(false)

    const idCompany = localStorage.getItem("@login-app/company")


    async function getAnalyst() {
        const response = await conn.get(`securityanalyst/company/${idCompany}`);
        setAnalyst(response.data);

        if (response.status === 204)
            setHasAnalyts(false)
        else
            setHasAnalyts(true)

    }

    useEffect(() => {
        getAnalyst();
    }, []);

    return (
        <React.Fragment>
            <SearchBar />
            {/* <User name={props.name} /> */}

            <div className="section-forms-analyst">
                <form className="form-analyst">
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
                        hasAnalyts ?
                            analysts.map((analyst) => (
                                <Cards name={analyst.name} email={analyst.email} company={analyst.company.name} />
                            )) :
                            <Cards name="Não há nenhum analista" email="-" company="-"/>

                    }

                </div>
            </div>

        </React.Fragment>
    );
}


