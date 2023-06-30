import React, { useContext } from "react";
import "./styles.scss";
import Countries from "../../UI/Countries/Countries";
import Popup from "../../UI/Popup/Popup";
import { ModalContext } from "../../../context/ModalContext";
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
        handleStateClick
    } = useContext(ModalContext);
    return (
        <main className="main">
            <h2>Select item</h2>
            <Popup
                refPopup={rootRefCountries}
                selectPopup={selectCountry}
                textButton="Select countries"
                clickList={handleCountries}
            >
                <ul className="popup-container-list">
                    {countries.map((item: any) => (
                        <li
                            className="popup-container-list__item"
                            key={item["country_id"]}
                            onClick={() => handleCountryClick(item)}
                        >
                            {item["country"]}
                        </li>
                    ))}
                </ul>
            </Popup>
            {country.country && country.state_boolean && (
                <Popup clickList={handleStates} textButton="Select states" refPopup={rootRefState} selectPopup={selectStateVal} titlePopup={country.country}>
                    <ul className="popup-container-list">
                        {states.map((item) =>
                        <li onClick={() => handleStateClick(item)} key={item['state_id']} className="popup-container-list__item">{item['state']}</li>
                        )}
                    </ul>
                </Popup>
            )}
        </main>
    );
}

export default Main;
