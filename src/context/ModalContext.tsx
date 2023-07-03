import React, { createContext, useEffect, useRef, useState } from "react";
import { IModalContext, ICoordinates } from "../interfaces/interfaces";
import {defaultCoordinates,  defaultStates, defaultCities, defaultCountries} from "../defaults/defaults";

export const ModalContext = createContext<IModalContext>({
    countries: [],
    country: defaultCountries,
    states: [],
    stateVal: defaultStates,
    cities: [],
    city: defaultCities,
    selectCity: false,
    handleCountryClick: () => {},
    handleCountries: () => {},
    selectCountry: false,
    rootRefCountries: null,
    rootRefState: null,
    rootRefCity: null,
    selectStateVal: false,
    handleStates: () => {},
    handleStateClick: () => {},
    handleCities: () => {},
    handleCityClick: () => {},
    coordinates: defaultCoordinates,
    handleWeatherApi: () => {},
    weather: {},
    temperature: {}
});
interface ICities {
    city: string;
    city_id: number;
    latitude: number;
    longitude: number;
}
export const ModalState = ({ children }: { children: React.ReactNode }) => {
    const urlFetch: string = "http://localhost:90/api";
    useEffect(() => {
        fetch(`${urlFetch}/countries/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({ action: 1 }),
        })
            .then((response) => response.json())
            .then((respose) => {
                setCountries(respose);
            });
    }, []);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(defaultCountries);
    const [selectCountry, setSelectCountry] = useState<boolean>(false);
    const [states, setStates] = useState([]);
    const [stateVal, setStateVal] = useState(defaultStates);
    const [selectStateVal, setSelectStateVal] = useState<boolean>(false);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState(defaultCities);
    const [selectCity, setSelectCity] = useState<boolean>(false);
    const [coordinates, setCoordinates] = useState(defaultCoordinates);
    const [weather, setWeather] = useState([])
    const [temperature, setTemperature] = useState([])
    const handleCoordinates = (item: ICoordinates) => {
        setCoordinates({
            latitude: item.latitude,
            longitude: item.longitude
        })
    };
    const handleCountryClick = (item: any) => {
        handleCountries();
        setCountry(item);
        setStateVal(defaultStates);
        handleCoordinates(item);
        handleWeatherApi(coordinates.latitude, coordinates.longitude);
        if (item.state_boolean) {
            getStates(item.country_id);
        }
    };
    const handleCountries = () => {
        if (!selectCountry) {
            setSelectCountry(true);
        } else {
            setSelectCountry(false);
        }
    };
    const handleStateClick = (item: any) => {
        handleStates();
        setStateVal(item);
        setCity(defaultCities);
        handleCoordinates(item);
        handleWeatherApi(coordinates.latitude, coordinates.longitude);
        if (item.city_boolean) {
            getCities(item.state_id);
        }
    };
    const handleStates = () => {
        if (!selectStateVal) {
            setSelectStateVal(true);
        } else {
            setSelectStateVal(false);
        }
    };
    const handleCities = () => {
        if (!selectCity) {
            setSelectCity(true);
        } else {
            setSelectCity(false);
        }
    };
    const handleCityClick = (item: ICities) => {
        handleCities();
        setCity(item);
        handleCoordinates(item);
        handleWeatherApi(coordinates.latitude, coordinates.longitude);
    };
    const rootRefCountries = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (
                setSelectCountry &&
                rootRefCountries.current &&
                !rootRefCountries.current.contains(e.target as Node)
            ) {
                setSelectCountry(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [selectCountry]);
    const getStates = (country: number) => {
        fetch(`${urlFetch}/states/?country_id=${country}` + "&action=1", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => response.json())
            .then((respose) => {
                setStates(respose);
            });
    };
    const rootRefState = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (
                selectStateVal &&
                rootRefState.current &&
                !rootRefState.current.contains(e.target as Node)
            ) {
                setSelectStateVal(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [selectStateVal]);
    const handleWeatherApi = (lat: number, lon: number) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d807e15c397cc3b68b5c64ef1bd87d46`)
        .then((response) => response.json())
        .then((respose) => {
            setWeather(respose.weather[0]);
            setTemperature(respose.main)
        });
    }
    console.log(temperature)
    console.log(weather)
    const getCities = (state: number) => {
        fetch(`${urlFetch}/cities/?state_id=${state}` + "&action=1", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => response.json())
            .then((respose) => {
                setCities(respose);
            });
    };
    const rootRefCity = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (
                selectCity &&
                rootRefCity.current &&
                !rootRefCity.current.contains(e.target as Node)
            ) {
                setSelectCity(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [selectCity]);
    return (
        <ModalContext.Provider
            value={{
                countries,
                country,
                states,
                stateVal,
                handleCountryClick,
                handleCountries,
                selectCountry,
                rootRefCountries,
                rootRefState,
                selectStateVal,
                handleStates,
                handleStateClick,
                cities,
                city,
                selectCity,
                handleCities,
                handleCityClick,
                rootRefCity,
                coordinates,
                handleWeatherApi,
                weather,
                temperature
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
