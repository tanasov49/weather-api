import React, { useContext } from "react";
import "./styles.scss";

import Popup from "../../UI/Popup/Popup";
import { ModalContext } from "../../../context/ModalContext";
import Weather from "../../UI/Weather/Weather";
function Main() {
    const {
        countries,
        country,
        handleCountryClick,
        handleCountries,
        selectCountry,
        rootRefCountries,
        rootRefState,
        selectStateVal,
        handleStates,
        states,
        stateVal,
        handleStateClick,
        rootRefCity,
        selectCity,
        handleCities,
        cities,
        city,
        handleCityClick
    } = useContext(ModalContext);
    return (
        <main className="main">
            <Popup
                refPopup={rootRefCountries}
                selectPopup={selectCountry}
                textButton="Select countries"
                clickList={handleCountries}
                titlePopup="Select country"
            >
                <ul className="popup-container-list">
                    {countries.map((item: any) => (
                        <li
                            className="popup-container-list__item"
                            key={item.country_id}
                            onClick={() => handleCountryClick(item)}
                        >
                            {item.country}
                        </li>
                    ))}
                </ul>
            </Popup>
            {country.country && country.state_boolean && (
                <Popup
                    clickList={handleStates}
                    textButton="Select states"
                    refPopup={rootRefState}
                    selectPopup={selectStateVal}
                    titlePopup="Select state"
                >
                    <ul className="popup-container-list">
                        {states.map((item) => (
                            <li
                                onClick={() => handleStateClick(item)}
                                key={item.state_id}
                                className="popup-container-list__item"
                            >
                                {item.state}
                            </li>
                        ))}
                    </ul>
                </Popup>
            )}
            {country.country &&
                country.state_boolean &&
                stateVal.city_boolean && (
                    <Popup
                        titlePopup="Select city"
                        textButton="Select cities"
                        refPopup={rootRefCity}
                        selectPopup={selectCity}
                        clickList={handleCities}
                    >
                        <ul className="popup-container-list">
                            {cities.map((item) => (
                                <li
                                    onClick={() => handleCityClick(item)}
                                    key={item.city}
                                    className="popup-container-list__item"
                                >
                                    {item.city}
                                </li>
                            ))}
                        </ul>
                    </Popup>
                )}
            {country.country && (
                <h3>{`Selected country: ${country.country}`}</h3>
            )}
            {country.state_boolean && (
                <h3>{`Selected state: ${stateVal.state}`}</h3>
            )}
            {country.state_boolean && stateVal.state && (
                <h3>{`Selected city: ${city.city}`}</h3>
            )}
            {country.country && (
                <Weather />
            )}
        </main>
    );
}

export default Main;
