import React, { useEffect, useState } from 'react'
import FormTruck from '../components/FormTruck'
import FormTrucker from '../components/FormTrucker'
import CardsTruck from '../components/CardsTruck'
import CardsTrucker from '../components/CardsTrucker'
import conn from '../services/conn'


export default function TruckerPage(props) {

  const [truckers, addTruckerInList] = useState([]);
  const [trucks, addTruckInList] = useState([]);
  const [hasTrucker, setHasTrucker] = useState(false);
  const [hasTruck, setHasTruck] = useState(false);
  const [truckLicense, setTruckLicense] = useState([])


  const idCompany = localStorage.getItem("@login-app/company")


  async function getTruckers() {
    const response = await conn.get(`/trucker/company/${idCompany}`);
    addTruckerInList(response.data);

    if (response.status === 204)
      setHasTrucker(false)
    else
      setHasTrucker(true)
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
    const response = await conn.get(`/truck/company/${idCompany}`);
    addTruckInList(response.data);

    if (response.status === 204)
      setHasTruck(false)
    else
      setHasTruck(true)
  }

  const getLicense = async () => {
    const response = await conn.get(`/truck/${props.truckId}`)
}

  useEffect(() => {
    getTruckers()
    getTrucks()
    getLicense()
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
          <h5>Motoristas cadastrados na sua empresa</h5>
          <div className="caminhao">
            {
              hasTrucker ?
                truckers.map((trucker) => (
                  <CardsTrucker name={trucker.name} cpf={trucker.cpf} cnh={trucker.cnh} birthDate={trucker.birthDate} phoneNumber={trucker.phoneNumber} />
                )) :
                <CardsTrucker name="Não há motoristas cadastrados" cpf="-" cnh="-" birthDate="-" phoneNumber="-" />
            }
          </div>
          <h5>Caminhões cadastrados na sua empresa</h5>
          <div className="motorista">
            {
              hasTruck ?
                trucks.map((truck) => (
                  <CardsTruck name={truck.name} brand={truck.truckBrand} type={truck.truckType} fuelType={truck.fuelType} licensePlace={truck.licensePlace} status={truck.status} truckId={truck.id}/>
                )) :
                <CardsTruck name="Não há caminhões cadastrados" brand="-" type="-" fuelType="-" />

            }
          </div>
        </section>
      </div>

    </React.Fragment>
  );
}