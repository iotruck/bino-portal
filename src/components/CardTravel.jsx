import React, { useState } from 'react';
import Modal from 'react-modal';
import Confirm from 'react-modal';
import conn from '../services/conn'

Modal.setAppElement('#root');

const CardTravel = (props) => {

  const [modalIsOpen, setModalOpen] = useState(false)
  const [modalConfirmIsOpen, setModalConfirmOpen] = useState(false)

  const deleteTravel = async () => {
    const response = await conn.delete(`/travel/${Number(props.id)}`)

    if(response.status === 200)
      window.location.reload()
    else
      setModalConfirmOpen(false)
  }

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

      <Confirm
        isOpen={modalConfirmIsOpen}
        onRequestClose={() => setModalConfirmOpen(false)}
        className="Delete"
        overlayClassName="Overlay"
      >

        <h1>
          <p> Tem certeza que deseja excluir esta viagem? </p>
          <i className="fas fa-times" onClick={() => setModalConfirmOpen(false)} ></i>
        </h1>

        <h4> Código: <span> {props.codigo} </span> </h4>
        <h4> Descrição: <span> {props.description} </span> </h4>
        <h4> Caminhão: <span> {props.truck} </span> </h4>
        <h4> Motorista: <span> {props.driver} </span> </h4>
        

        <button id="cancelDelete" onClick={() => setModalConfirmOpen(false)} >
            Cancelar
                    </button>

        <button id="deleteButton" onClick={() => deleteTravel()}>
            Sim, tenho
                    </button>

      </Confirm>

      <div className="card-travel">

        <div className="date-travel">{props.date}</div>
        <div className="code-travel">{props.code}</div>
        <div className="infos-travel">
          <div className="truck-travel">{props.truck}</div>
          <div className="driver-travel">{props.driver}</div>
        </div>
        <div className="itens-options">
          {
            props.hasTravels ? (
              <React.Fragment>
                <i className="fas fa-edit" onClick={() => setModalOpen(true)}></i>
                <i className="fas fa-trash-alt" onClick={() => setModalConfirmOpen(true)}></i>
              </React.Fragment>
            ):
            <React.Fragment></React.Fragment>
            
          }
          
        </div>
        
      </div>
    </>
  );
}

export default CardTravel;
