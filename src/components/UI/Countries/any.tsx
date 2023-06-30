import React, { useState, useEffect, useRef, useContext } from "react";
import "./styles.scss";

interface ICountry {
    country: string;
    country_id: number;
}
interface IStates {
    state: string;
    state_id: number;
}
function Countries() {


    const defaultStates: IStates = {
        state: "",
        state_id: 0,
    };

    const [selectCountry, setSelectCountry] = useState<boolean>(false);
    const [states, setStates] = useState([]);
    const [selectState, setSelectState] = useState<boolean>(false);

    const handleStates = () => {
        if (!selectState) {
            setSelectState(true);
        } else {
            setSelectState(false);
        }
    };
    const getStates = (country: number) => {
        fetch(
            `http://localhost:90/api/states/?country_id=${country}` +
                "&action=1",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
            .then((response) => response.json())
            .then((respose) => {
                setStates(respose);
            });
    };

    const rootRefCountry = useRef<HTMLUListElement>(null);
    const rootRefState = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (
                (setSelectCountry &&
                    rootRefCountry.current &&
                    !rootRefCountry.current.contains(e.target as Node))
            ) {
                setSelectCountry(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [selectCountry]);
    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (
                (setSelectState &&
                    rootRefState.current &&
                    !rootRefState.current.contains(e.target as Node))
            ) {
                setSelectState(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [selectState]);
    console.log(states);
    return (
        <div className="country">
            <button
                type="button"
                className="button-selected"
                onClick={handleCountries}
            >
                Select country
            </button>
            <div className={selectCountry ? "popup popup_active" : "popup"}>
                <ul ref={rootRefCountry} className="popup-container">
                    {countries.map((item) => (
                        <li
                            onClick={() => handleCountryClick(item)}
                            key={item["country_id"]}
                        >
                            {item["country"]}
                        </li>
                    ))}
                </ul>
            </div>
            <h3>{country ? `Selected country: ${country.country}` : ""}</h3>
            {country.country && (
                <>
                    <button
                        type="button"
                        className="button-selected"
                        onClick={handleStates}
                    >
                        Select state
                    </button>
                    <div
                        className={selectState ? "popup popup_active" : "popup"}
                    >
                        <ul ref={rootRefState} className="popup-container">
                            {states.map((item) => (
                                <li key={item["state_id"]}>{item["state"]}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default Countries;
