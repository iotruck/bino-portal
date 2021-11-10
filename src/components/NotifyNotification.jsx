export default function NotifyNotification(props) {
    return (
        <div className="notification">
            <div id="codeNotify" className="code">{props.code}</div>
            <div className="date">{props.date}</div>
                <div id="messageNotify" className="message">{props.message}</div>
            
            <div>
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    );
}