function CheckTrucker() {
    let fm = document.getElementById("formMotorista");
    if(fm.Nome.value == "" || fm.CPF.value =="" || fm.Data.value == "" 
        || fm.Telefone.value == "" || fm.CNH.value == "" || fm.Cer.value == "") {
      document.getElementById("error").style.display = 'block';
    } else {
        alert("Motorista cadastrado com sucesso.");
    }
  }


export default function FormTrucker() {
    return (
        <form id="formMotorista">
        <h3 id="h3Form">Cadastro de motoristas</h3> <br/> <br/>
        <label> Nome e sobrenome </label>
        <input name="Nome" placeholder="Waldesio da Silva"/> <br />
        <label> CPF </label>
        <input name="CPF" placeholder="123.456.789-10"/> <br />

        <div className="inline-form">

        <div>
            <label> Data de nascimento </label>
            <input name="Data" placeholder="01/01/1000"/> <br />
        </div>

        <div>
             <label> Telefone </label>
            <input name="Telefone" placeholder="00987654321"/> <br />
        </div>

        </div>
       
       <div className="inline-form">

       <div>
            <label> CNH</label>
            <input name="CNH" placeholder="00123456789"/> <br/>
        </div>

        <div>
            <label> Certificação </label>
            <input name="Cer" placeholder="Inflamáveis"/>
        </div>

       </div>
       <br/>
       <button onClick={CheckTrucker}>Cadastrar</button>
       <span id="error" style={{display: 'none', color: 'red', paddingTop: '3vh'}}>
           Alguma informação inválida. Por favor, revise o formulário.</span>
    </form>
    );
}