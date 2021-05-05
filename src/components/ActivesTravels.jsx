export default function ActivesTravels(props) {
    return (
        <div className="viagem">
            <div className="date">{props.date}</div>
            <div className="code">{props.code}</div>
            <div className="infos">
                <div className="truck">{props.truck}</div>
                <div className="driver">{props.driver}</div>
            </div>
            <div className="status-travel"></div>
        </div>
    );
}