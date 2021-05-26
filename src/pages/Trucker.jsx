import React from 'react';
import User from '../components/UserData';
import FormTruck from '../components/FormTruck'
import FormTrucker from '../components/FormTrucker'
import CardsTruck from '../components/CardsTruck';
import CardsTrucker from '../components/CardsTrucker';
import ButtonDownload from '../components/ButtonDownload';
import Profile from '../pages/Profile';


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



export default function TruckerPage(props) {
  return (
    <React.Fragment>
      {/* <SearchBar /> */}
      <Profile/>
      <User name={props.name} />
      <div className="cointainer">

           <label className="switch">
                <input type="checkbox" />
                <span className="slider round" id="sliderbutton" onClick={ChangeForm}></span>
            </label>
{/*  
        <div className="btnGroup">
            <ButtonDownload/> ou
            <input type="file" id="actual-btn" className="uplodBtn"/>
            <label for="actual-btn">No file chosen</label>
        </div> */}

        <section className="section-forms">
          <FormTruck />
          <FormTrucker />
        </section>
        <section className="tags">
          <input placeholder="Procure um motorista da sua empresa" />
          <div className="caminhao">
         
            <CardsTrucker />
            <CardsTrucker />
            <CardsTrucker />
          </div>
          <input placeholder="Procure um caminhão da sua empresa" />
          <div className="motorista">
            <CardsTruck />
            <CardsTruck />
            <CardsTruck />
          </div>
          <div className="btnGroup">
            <ButtonDownload/> <span>ou</span>
            <input type="file" id="actual-btn" className="uploadBtn"/>
            {/* <label for="actual-btn">No file chosen</label> */}
        </div>
        </section>
      </div>
    </React.Fragment>
  );
}