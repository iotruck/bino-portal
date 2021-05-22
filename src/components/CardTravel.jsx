import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CardTravel = (props) => {

  const [modalIsOpen, setModalOpen] = useState(false)

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalOpen(false)}
        className="ModalTravel"
        overlayClassName="Overlay"
      >

        <h1>
          <p> Editar informações da viagem </p>
          <i className="fas fa-times" onClick={() => setModalOpen(false)} ></i>
        </h1>


        <form id="updateTravel">
          <label htmlFor="code"> Código <i className="fas fa-lock"></i> </label>
          <input type="text" id="code" placeholder={props.codigo} disabled/>
          
          <label htmlFor="receiver"> Destinatário </label>
          <input type="text" id="receiver" placeholder={props.address}/>

          <label htmlFor="description"> Descrição </label>
          <input type="text" id="description" placeholder={props.description} />

          <label htmlFor="date" id="dateTravel"> Data </label>
          <input type="date" id="date"/>

          <label htmlFor="model"> Caminhão </label>
          <input type="text" id="model" placeholder={props.truck} />

          <label htmlFor="driver" id="driver"> Motorista </label>
          <input type="text" id="driver" placeholder={props.driver} />

          <label htmlFor="price"> Valor estimado </label>
          <input type="text" id="price" placeholder={props.coust} />

          

          <button id="cancelTravel" onClick={() => setModalOpen(false)} >
            Cancelar
                    </button>

          <button id="saveTravel">
            Salvar
                    </button>
        </form>
      </Modal>

      <div className="card-travel">

        <div className="date-travel">{props.date}</div>
        <div className="code-travel">{props.code}</div>
        <div className="infos-travel">
          <div className="truck-travel">{props.truck}</div>
          <div className="driver-travel">{props.driver}</div>
        </div>
        <div className="itens-options">
          <i className="fas fa-edit" onClick={() => setModalOpen(true)}></i>
          <i className="fas fa-trash-alt"></i>
        </div>
        <div className="status-travel"></div>
      </div>
    </>
  );
}

export default CardTravel;
