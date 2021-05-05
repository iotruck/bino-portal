export default function TravelCost(props) {
    return (
        <div className="travel-cost">
            <p>CUSTO DA VIAGEM</p>
            <div className="value-travel">
                R$ <span>{props.value}</span>
            </div>
        </div>
    );
}