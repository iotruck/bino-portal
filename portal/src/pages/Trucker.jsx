import React, { useEffect, useState } from 'react'
import User from '../components/UserData'
import FormTruck from '../components/FormTruck'
import FormTrucker from '../components/FormTrucker'
import CardsTruck from '../components/CardsTruck'
import CardsTrucker from '../components/CardsTrucker'
import conn from '../service/conn'


export default function TruckerPage(props) {

  const [truckers, addTruckerInList] = useState([]);
  const [trucks, addTruckInList] = useState([]);

  useEffect(() => {
    async function getTruckers() {
      const response = await conn.get(`/trucker/company/${1}`);
      addTruckerInList(response.data);
    }
    
    async function getTrucks() {
      const response = await conn.get(`/truck/company/${1}`);
      addTruckInList(response.data);
     }


    getTruckers();
    getTrucks();

  });

  return (
    <React.Fragment>
      
      <User name={props.name} />
      <div className="cointainer">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" id="sliderbutton"></span>
        </label>
        <section className="section-forms">
          <FormTruck />
          <FormTrucker />
        </section>
        <section className="tags">
          <input placeholder="Procure um motorista da sua empresa" />
          <div className="caminhao">
            {
              truckers.map((trucker) => (
                <CardsTrucker name={trucker.name} cpf={trucker.cpf} cnh={trucker.cnh} />
              ))
            }
          </div>
          <input placeholder="Procure um caminhão da sua empresa" />
          <div className="motorista">
            {
              trucks.map((truck) => (
                <CardsTruck name={truck.name} brand={truck.truckBrand} type={truck.truckType} />
              ))
            }
          </div>
        </section>
      </div>

    </React.Fragment>
  );
}