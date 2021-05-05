export default function CardsTruck() {
    return (  <div className="cards">

        <div className="itens-options">
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash-alt"></i>
        <h3 id="h3Truck">KIA BAÚ BRANCO 01</h3> 
        </div>
        
     
        <p>
            <h6>Modelo: </h6> <label> Baú grande </label>
        </p>
        <p>
            <h6>Placa: </h6> <label> GRE-0345 </label>
            <h6>Combustível: </h6> <label> Diesel </label>
        </p>
        <p>
            <h6>Marca: </h6> <label> Kia </label>
            <h6>Status: </h6> <label> Disponível </label>
        </p>
    </div>
    );
}