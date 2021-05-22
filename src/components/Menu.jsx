import { Link } from "react-router-dom";
export default function Menu() {
    return (
        <div className="sideMenu">
            <ul>

                <li>
                    <Link to="/">
                        <i className="fas fa-home"></i>
                    </Link>
                </li>

                <li>
                    <Link to="/new-travel">
                        <i className="fas fa-map"></i>
                    </Link>
                </li>

                <li>
                    <Link to="/new-collaborator">
                        <i className="fas fa-user-plus"></i>
                    </Link>
                </li>

                <li>
                    <Link to="/new-analyst">
                        <i className="fas fa-user-shield"></i>
                    </Link>
                </li>

                <li>
                    <Link to="/tracking">
                        <i className="fas fa-boxes"></i>
                    </Link>
                </li>

                <li>
                    <Link to="/notify">
                        <i className="fas fa-bell"></i>
                    </Link>
                </li>

            </ul>
        </div>
    );
}