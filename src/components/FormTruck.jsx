function CheckTruck() {
    let fc = document.getElementById("formCaminhao");
    if(fc.Nome.value == "" || fc.Placa.value =="" || fc.Modelo.value == "" 
        || fc.Marca.value == "" || fc.Combustivel.value == "" || fc.Status.value == "") {
      document.getElementById("error").style.display = 'block';
    } else {
        alert("Caminhão cadastrado com sucesso.");
    }
  }

export default function FormTruck() {
    return (
        <form id="formCaminhao">
        <h3 id="h3Form" style={{color: 'blue'}}>Cadastro de caminhões</h3> <br/> <br/>
        <label> Nome/descrição </label>
        <input name="Nome" placeholder="CAMINHAO 01"/> <br />
        <label> Modelo </label>
        <input name="Modelo" placeholder="Baú"/> <br />

        <div className="inline-form">

        <div>
            <label> Placa </label>
            <input name="Placa" placeholder="ABC-1234"/> <br />
        </div>

        <div>
             <label> Marca </label>
            <input name="Marca" placeholder="KIA"/> <br />
        </div>

        </div>
       
       <div className="inline-form">

       <div>
            <label> Combustível</label>
            <input name="Combustivel" placeholder="DIESEL"/> <br/>
        </div>

        <div>
            <label> Status </label>
            <input name="Status" placeholder="Livre"/>
        </div>

       </div>
       <br/>
       <button onClick={CheckTruck}>Cadastrar</button>
       <span id="error" style={{display: 'none', color: 'red', paddingTop: '3vh'}}>
           Alguma informação inválida. Por favor, revise o formulário.</span>
    </form>
    );
}