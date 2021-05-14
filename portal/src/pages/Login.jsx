import { Component, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchLogin } from '../api'

import coruja from '../assets/img/coruja.png';

const formCadastro = () => {
    return {
        formCadastro: "block",
        formLogin: "none",
        btnCadastro: "btn btnactive",
        btnLogin:"btn"
    }
}

const formLogin = () => {
    return {
        formCadastro: "none",
        formLogin: "block",
        btnCadastro: "btn",
        btnLogin:"btn btnactive"
    }
}

const Login = () => {

  const history = useHistory();

  const [stateForm, setStateForm] = useState(formLogin);

  const [stateError, setStateError] = useState('none');

  const [loginValues, setLoginValues] = useState({
      email:'', password:''
  });

  const setValuesDisplay = () => {
    if(stateForm.formCadastro === "block") {
        setStateForm(formLogin);
    } else {
        setStateForm(formCadastro);
    }
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
    fetchLogin(loginValues).then((value) => {
        console.log(value);
            if(value.status == 200) {
                localStorage.setItem("@login-app/user",value.data.id);
            history.push('/');
            }
        }).catch(() => {
            console.log("Não funcionou")
            setStateError('block')
        });    
  };

  return (
      <div className="tela-login" id="tela-login">
        <div className="fundo-login">
            <div className="content">
                <li><a className="back-link" href="index.html" id="btnvoltar"> Voltar </a></li>
                <img src={coruja} alt=""/>
                <div className="container">
                    <div className="row">
                        <h1>
                            Atravessando todas as <br/>
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
                    <form id="Cadastro" style={{display: stateForm.formCadastro}}>
                        <div className="row-center">
                            <label>NOME DA EMPRESA</label> <input/>
                        </div>
                        <div className="row-center">
                            <label>E-MAIL</label> <input/>
                        </div>
                        <div className="row-center">
                            <label>NOME DA EMPRESA</label> <input/>
                        </div>
                        <div className="row">
                            <div className="column">
                                <label>SENHA</label> <input type="password"/>
                            </div>
                            <div className="column">
                                <label>CNPJ</label> <input/>
                            </div>
                        </div>
                        <div className="row-center">
                            <label>LOGRADOURO</label> <input/>
                        </div>
                        <div className="row">
                            <div className="column">
                                <label>CEP</label> <input/>
                            </div>
                            <div className="column">
                                <label>PLANO</label> <input/>
                            </div>
                        </div>
                        <div className="div-termos-enviar">
                            <div className="div-termos">
                                <input  type="checkbox"/><span className="termos">Li e concordo com os <u>termos de uso</u>.</span> 
                            </div>
                            <button >ENVIAR</button>
                        </div> 
                    </form>
                    <form id="Login" style={{display: stateForm.formLogin}}  onSubmit={requestLogin}>
                        <div className="row-center">
                            <label>EMAIL</label> <input name="email" value={loginValues.email}  onChange={updateLoginValues} />
                        </div>
                        <div className="row-center">
                            <label >SENHA</label> <input type="password" name="password" value={loginValues.password} onChange={updateLoginValues} />
                        </div>
                        <div className="row-login">
                            <div>
                                <p className="error" style={{display: stateError}}>Usuário ou senha inválido</p>
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
