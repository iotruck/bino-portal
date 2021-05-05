export default function SearchBar() {
    return (
        <div className="bar">
            <div className="icon-search">
                <i className="fas fa-search"></i>
            </div>

            <div className="input-search">
                <input id="search" className="input-field" type="text" placeholder="PROCURE POR UMA VIAGEM"></input>
            </div>
        </div>
    );
}