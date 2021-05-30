import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Cards from '../components/Cards'
import conn from '../services/conn'

export default function AdminPage(props) {

    const [analysts, setAnalyst] = useState([])
    const [hasAnalyts, setHasAnalyts] = useState(false)

    const idCompany = localStorage.getItem("@login-app/company")
    const idAnalyst = localStorage.getItem("@login-app/user")


    const [analyst, setAnalystValues] = useState({
        name: "",
        email: "",
        password: "",
        company: {
            id: `${idCompany}`
        }
    })


    const post = async (event) => {
        event.preventDefault();
        const response = await conn.post(`/securityanalyst/`, {
            ...analyst
        }).then((response) => {
            window.location.reload()
        }).catch((err) => {
            alert("Confira os dados, não conseguimos adicionar esse analista :[")
        })
    }

    const updateAnalystValues = (event) => {
        const { value, name } = event.target;

        setAnalystValues({
            ...analyst,
            [name]: value
        });
    };

     function viewPassword(){
        let inputPassword = document.getElementById('id-password');
        let iconEye = document.getElementById('eyeIcon');

        if(inputPassword.type === 'text'){
            inputPassword.type = 'password';
            iconEye.classList.add('fa-eye');
            iconEye.classList.remove('fa-eye-slash');
        }else{
            inputPassword.type = 'text';
            iconEye.classList.add('fa-eye-slash');
            iconEye.classList.remove('fa-eye');
        }
    }

    async function getAnalyst() {
        const response = await conn.get(`/securityanalyst/company/${idCompany}`);
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
                <form className="form-analyst" onSubmit={post}>
                    <div className="form-initial">
                        <h3>Cadastro de analista</h3>
                        <div>
                            <label htmlFor="id-nome">Nome</label>
                            <input id="id-nome" placeholder="Nome para o novo analista" className="input-grid" name="name" value={analyst.name} onChange={updateAnalystValues} />
                        </div>
                        <div>
                            <label htmlFor="id-email">E-mail</label>
                            <input id="id-email" placeholder="E-mail de acesso" className="input-grid" name="email" value={analyst.email} onChange={updateAnalystValues} />
                        </div>
                        <div>
                            <label htmlFor="id-password">Senha  <i className="fa fa-eye" id="eyeIcon" onClick={viewPassword}></i></label>
                            <input id="id-password" type="password" placeholder="Senha para acessar" className="input-grid" name="password" value={analyst.password} onChange={updateAnalystValues} />
                        </div>
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
                                <Cards name={analyst.name} email={analyst.email} company={analyst.company.name} hasAnalyts={hasAnalyts} id={analyst.id}/>
                            )) :
                            <Cards name="Não há nenhum analista" email="-" company="-" hasAnalyts={hasAnalyts}/>

                    }

                </div>
            </div>

        </React.Fragment>
    );
}


