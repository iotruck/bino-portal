export default function UserData(props) {
    return (
        <div className="user">
            <div className="datas">
                <p className="name-user">{props.name}</p>
                <p className="account">Minha conta</p>
            </div>
            <div className="icon">
                <div className="icon-img">
                <div className="status"></div>
                </div>
                
            </div>
        </div>
    );
}