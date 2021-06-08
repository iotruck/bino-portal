export default function Chat(props) {
    return (
        <div className="chats">
            <div className="icon-img"></div>
            <div className="infos">
                <div className="code"> {props.code} </div>
                <div className="message">{props.message} </div>
            </div>
        </div>
    );
}