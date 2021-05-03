export default function Cards(props) {
    return (
        <div className="card-person">
            <div className="itens-options">
                <h4 max-length="100">{props.name}</h4>
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
            <div className="itens-list">
                <b>CPF:</b>{props.cpf}
                <b>Email:</b>{props.email}
                <b>Senha:</b>{props.senha}
            </div>
        </div>
    );

}