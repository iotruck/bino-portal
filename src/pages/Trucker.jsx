import React, { useEffect, useState } from 'react'
import FormTruck from '../components/FormTruck'
import FormTrucker from '../components/FormTrucker'
import CardsTruck from '../components/CardsTruck'
import CardsTrucker from '../components/CardsTrucker'
import conn from '../services/conn'
import Modal from 'react-modal'


export default function TruckerPage(props) {

  const [truckers, addTruckerInList] = useState([]);
  const [trucks, addTruckInList] = useState([]);
  const [hasTrucker, setHasTrucker] = useState(false);
  const [hasTruck, setHasTruck] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false)
  const idCompany = localStorage.getItem("@login-app/company")

  async function getTruckers() {
    const response = await conn.get(`/trucker/company/${idCompany}`)
    
    if(response.status === 200){
      setHasTrucker(true)
      addTruckerInList(response.data);
    }else{
      setHasTrucker(false)
    }
  }
  function ChangeForm() {
    let fm = document.getElementById("formMotorista");
    let fc = document.getElementById("formCaminhao");

    if (fm.style.display == 'block') {
      fm.style.display = 'none';
      fc.style.display = 'block';
    } else {
      fm.style.display = 'block';
      fc.style.display = 'none';
    }
  }


  async function getTrucks() {
    const response = await conn.get(`/truck/company/${idCompany}`)

    if (response.status === 200){
      setHasTruck(true)
      addTruckInList(response.data);
    }else{
      setHasTruck(false)
    }
  }
  const getLicense = async () => {
    const response = await conn.get(`/truck/${props.truckId}`)
  }
  useEffect(() => {
    getTruckers()
    getTrucks()
  }, []);

  return (
    <React.Fragment>

      <div className="cointainer">
        <i className="fas fa-truck"></i>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" id="sliderbutton" onClick={ChangeForm}></span>
        </label>
        <i className="fas fa-id-card-alt"></i>
        <section className="section-forms">
          <FormTruck />
          <FormTrucker />

        </section>
        <section className="tags">
          <h5 style={{ fontWeight: '130' }}> Motoristas cadastrados na sua empresa</h5>
          <div className="caminhao">
            {
              hasTrucker ?
                truckers.map((trucker) => (
                  <CardsTrucker name={trucker.name} cpf={trucker.cpf} email={trucker.email} password={trucker.password} 
                  cnh={trucker.cnh} birthDate={trucker.birthDate} phoneNumber={trucker.phoneNumber} truckerId={trucker.id} hasTrucker={hasTrucker} />
                )) : <CardsTrucker name="N??o h?? motoristas cadastrados" email="-" password="-"
                cpf="-" cnh="-" birthDate="-" phoneNumber="-" />
            }
          </div>
          <h5 style={{ fontWeight: '130' }}>Caminh??es cadastrados na sua empresa</h5>
          <div className="motorista">
            {
              hasTruck ?
                trucks.map((truck) => (
                  <CardsTruck name={truck.name} brand={truck.truckBrand} type={truck.truckType} fuelType={truck.fuelType} licensePlate={truck.licensePlate} condintion={truck.status} truckId={truck.id} hasTruck={hasTruck} />
                )) : <CardsTruck name="N??o h?? caminh??es cadastrados" brand="-" type="-" fuelType="-" />

            }
          </div>
         
        </section>

      </div>

    </React.Fragment>
  );
}