export default function Notification(props) {
    return (
        <div className="notify">
            <div className="code">{props.code}</div>
                <div className="message">{props.message}</div>
            
            <div className="status-notify"></div>
        </div>
    );
}