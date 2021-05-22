export default function FormTruck() {
    return (
        <form id="formCaminhao">
            <h3 id="h3Form">Cadastro de caminhões</h3> <br /> <br />
            <label> Nome/descrição </label>
            <input /> <br />
            <label> Modelo </label>
            <input /> <br />

            <div className="inline-form">

                <div>
                    <label> Placa </label>
                    <input /> <br />
                </div>

                <div>
                    <label> Marca </label>
                    <input /> <br />
                </div>

            </div>

            <div className="inline-form">

                <div>
                    <label> Combustível</label>
                    <input /> <br />
                </div>

                <div>
                    <label> Status </label>
                    <input />
                </div>

            </div>
            <br />
            <button>Cadastrar</button>
        </form>
    );
}