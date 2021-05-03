import React from 'react';
import User from '../components/UserData';
import SearchBar from '../components/SearchBar';
import Input from '../components/Input';
import Cards from '../components/Cards';

export default function AdminPage(props) {
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
                <Cards name="Igor Rafael Ferreira da Fonseca Bezerra" cpf="5050505050" email="i.bezerra@iotruck.com.br" senha="123deoliveira4"/>
                <Cards name="Gabriel Almeida Carrera" cpf="5050505050" email="g.carrera@iotruck.com.br" senha="ovomaltine"/>
                <Cards name="Cristóvão Colombo" cpf="5050505050" email="c.colombo@iotruck.com.br" senha="nesquik"/>
            </div>
            </div>

        </React.Fragment>
    );
}


