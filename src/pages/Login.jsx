import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'
import conn from '../services/conn'

import coruja from '../assets/img/coruja.png'

const formCadastro = () => {
    return {
        formCadastro: "block",
        formLogin: "none",
        btnCadastro: "btn btnactive",
        btnLogin: "btn"
    }
}

const formLogin = () => {
    return {
        formCadastro: "none",
        formLogin: "block",
        btnCadastro: "btn",
        btnLogin: "btn btnactive"
    }
}

const Login = () => {

    const history = useHistory();

    const [stateForm, setStateForm] = useState(formLogin);

    const [stateError, setStateError] = useState('none');

    const [loginValues, setLoginValues] = useState({
        email: '',
        password: ''
    });

    const [company, setCompany] = useState({
        name: "",
        email: "",
        cnpj: "",
        password: "",
        location: {
            address: "",
            latitude: -23.486220000,
            longitude: -46.771780000
        },
        subscriptions: "CLASSIC"
    })

    const post = async (event) => {
        event.preventDefault();


        const response = await conn.post(`/company/`, {
            ...company
        }).then(() => {
            console.log("Empresa cadastrada com sucesso");
            window.location.reload();
            
        }).catch((err) => {
            alert("Alguma informação inválida, por favor, revize o formulário e tente novamente")
        })

    }

    const setValuesDisplay = () => {
        if (stateForm.formCadastro === "block") {
            setStateForm(formLogin);
        } else {
            setStateForm(formCadastro);
        }
    };

    const updateCompanyValues = (event) => {
        const { value, name } = event.target;

        setCompany({
            ...company,
            [name]: value,
            location:{
                ...company.location,
                [name]: value
            }
        });
    };


    const updateLoginValues = (event) => {
        const { value, name } = event.target;

        setLoginValues({
            ...loginValues,
            [name]: value,
        });
    };

    const requestLogin = (event) => {
        event.preventDefault();
        conn.post(`/securityanalyst/login/`, loginValues).then((value) => {
            if (value.status === 200) {
                localStorage.setItem("@login-app/user", value.data.id);
                localStorage.setItem("@login-app/company", value.data.company.id);
                history.push('/');
            }
        }).catch(() => {

            setStateError('block')
        });
    };

    return (
        <div className="tela-login" id="tela-login">
            <div className="fundo-login">
                <div className="content">
                    <li><a className="back-link" href="http://iotruck.com.br/" id="btnvoltar"> Voltar </a></li>
                    <img src={coruja} alt="" />
                    <div className="container">
                        <div className="row">
                            <h1>
                                Atravessando todas as <br />
                            fronteiras, juntos.
                        </h1>
                        </div>
                        <div className="row">
                            <h3>Boas vindas a iotruck.</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="formulario">
                <div className="content">
                    <div className="flex">
                        <a className={stateForm.btnCadastro} id="btncadastro" onClick={setValuesDisplay}>CADASTRO</a>
                        <p>ou</p>
                        <a className={stateForm.btnLogin} id="btnlogin" onClick={setValuesDisplay}>LOGIN</a>
                    </div>
                    <form id="Cadastro" style={{ display: stateForm.formCadastro }} onSubmit={post}>
                        <div className="row-center">
                            <label>NOME DA EMPRESA</label> <input name="name" value={company.name} onChange={updateCompanyValues} placeholder="Ex. TransCar" />
                        </div>
                        <div className="row-center">
                            <label>E-MAIL</label> <input name="email" value={company.email} onChange={updateCompanyValues} placeholder="Ex. contato@transcar.com.br" />
                        </div>
                        <div className="row">
                            <div className="column">
                                <label>SENHA</label> <input type="password" name="password" value={company.password} onChange={updateCompanyValues} placeholder="Ex. 2021@TransCar" />
                            </div>
                            <div className="column">
                                <label>CNPJ</label> <InputMask mask="99.999.999/9999-99" name="cnpj" value={company.cnpj} onChange={updateCompanyValues} placeholder="Ex. 27.859.355/0001-97" />
                            </div>
                        </div>
                        <div className="row-center">
                            <label>LOGRADOURO</label> <input name="address" value={company.location.address} onChange={updateCompanyValues} placeholder="Ex. Avenida Paulista, 2143 - Cerqueira César - 13 Andar - Ap nº 209" />
                        </div>
                        <div className="row">
                            <div className="column">
                                <label>PLANO</label> <input name="subscriptions" value={company.subscriptions} onChange={updateCompanyValues} />
                            </div>
                        </div>
                        <div className="div-termos-enviar">
                            <div className="div-termos">
                                <input type="checkbox"  /><span className="termos">Li e concordo com os <u>termos de uso</u>.</span>
                            </div>
                            <button >ENVIAR</button>
                        </div>
                    </form>







                    <form id="Login" style={{ display: stateForm.formLogin }} onSubmit={requestLogin}>
                        <div className="row-center">
                            <label>EMAIL</label> <input name="email" value={loginValues.email} onChange={updateLoginValues} placeholder="Ex. contato@transcar.com.br" />
                        </div>
                        <div className="row-center">
                            <label >SENHA</label> <input type="password" name="password" value={loginValues.password} onChange={updateLoginValues} placeholder="Ex. 2021@TransCar" />
                        </div>
                        <div className="row-login">
                            <div>
                                <p className="error" style={{ display: stateError }}>Usuário ou senha inválido</p>
                            </div>
                            <button>ENTRAR</button>
                        </div>
                    </form>



                </div>
            </div>
        </div>

    );
}

export default Login;
