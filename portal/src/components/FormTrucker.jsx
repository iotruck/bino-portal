export default function FormTrucker() {
    return (
        <form id="formMotorista">
        <h3 id="h3Form">Cadastro de Motoristas</h3> <br/> <br/>
        <label> Nome e sobrenome </label>
        <input /> <br />
        <label> CPF </label>
        <input /> <br />

        <div className="inline-form">

        <div>
            <label> Data de nascimento </label>
            <input /> <br />
        </div>

        <div>
             <label> Telefone </label>
            <input /> <br />
        </div>

        </div>
       
       <div className="inline-form">

       <div>
            <label> CNH</label>
            <input /> <br/>
        </div>

        <div>
            <label> Certificação </label>
            <input />
        </div>

       </div>
       <br/>
       <button>Cadastrar</button>
    </form>
    );
}