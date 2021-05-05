import React from 'react';
import User from '../components/UserData';
import FormTruck from '../components/FormTruck'
import FormTrucker from '../components/FormTrucker'
import CardsTruck from '../components/CardsTruck';
import CardsTrucker from '../components/CardsTrucker';

export default function TruckerPage(props) {
    return (
        <React.Fragment>
            {/* <SearchBar /> */}
            <User name={props.name} />
                <div className="cointainer">
                <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round" id="sliderbutton"></span>
                        </label>
                      <section className="section-forms">
                        <FormTruck/>
                        <FormTrucker/>
                      </section>
                      <section className="tags">
                      <input placeholder="Procure um motorista da sua empresa"/>
                        <div className="caminhao">
                            <CardsTrucker />
                            <CardsTrucker />
                            <CardsTrucker />
                        </div>
                        <input placeholder="Procure um caminhão da sua empresa"/>
                        <div className="motorista">
                            <CardsTruck />
                            <CardsTruck />
                            <CardsTruck />
                        </div>
                      </section>
                </div>

        </React.Fragment>
    );
}