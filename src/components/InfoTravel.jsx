import motorista from '../assets/img/driver.png'
import caminhao from '../assets/img/truck.png'
import info from '../assets/img/info.png'

export default function InfoTravel(props) {
    return (
        <div className="info-travel">
            <span className="title">+INFORMAÇÕES</span>
            <div className="info">
                <img src={motorista}></img>
                <span className="stronginfo">{props.trucker}</span>
            </div>
            <div className="info">
            <img src={caminhao}></img>
                <span className="stronginfo">{props.truck}</span>
            </div>
            <div className="info">
            <img src={info}></img>
                <div className="details-info">

                    <span id="detailsTitle" className="stronginfo">{props.travelDetails}</span>

                    <span className="moreinfo">
                        Carga: {props.details}
                    </span>
                    <span className="moreinfo">
                        Data: {props.detailsDate}
                    </span>
                    <span className="moreinfo">
                        Ultimo Registro: {props.detailsLastLog}
                    </span>
                </div>
            </div>
        </div>
    );
}