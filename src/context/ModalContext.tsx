import React, { createContext, useEffect, useRef, useState } from "react";
import { IModalContext, ICoordinates } from "../interfaces/interfaces";
import {
    defaultCoordinates,
    defaultStates,
    defaultCities,
    defaultCountries,
} from "../defaults/defaults";

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
    temperature: {},
});
interface ICities {
    city: string;
    city_id: number;
    latitude: number;
    longitude: number;
}
export const ModalState = ({ children }: { children: React.ReactNode }) => {
    // Хук для хранения стран
    const [countries, setCountries] = useState([]);
    // Запись страны
    const [country, setCountry] = useState(defaultCountries);
    // Для открытия Popup
    const [selectCountry, setSelectCountry] = useState<boolean>(false);
    // Хук хранения штатов
    const [states, setStates] = useState([]);
    // Запись штата
    const [stateVal, setStateVal] = useState(defaultStates);
    // Для открытия Popup
    const [selectStateVal, setSelectStateVal] = useState<boolean>(false);
    // Хук хранения городов
    const [cities, setCities] = useState([]);
    // Запись города
    const [city, setCity] = useState(defaultCities);
    // Для открытия Popup
    const [selectCity, setSelectCity] = useState<boolean>(false);
    // Запись координат
    const [coordinates, setCoordinates] = useState(defaultCoordinates);
    // Хук хранения для облачности
    const [weather, setWeather] = useState([]);
    // Хук хранения температуры
    const [temperature, setTemperature] = useState([]);
    //Функция записи координат
    const handleCoordinates = (item: ICoordinates) => {
        setCoordinates({
            latitude: item.latitude,
            longitude: item.longitude,
        });
    };
    // Получить штаты по клику страны
    const handleCountryClick = (item: any) => {
        // Закрытие Popup по клику страны
        handleCountries();
        // Запись данных страны
        setCountry(item);
        // Если выбраны города, но нужно изменить страну, то обнуляем данные по штатам
        setStateVal(defaultStates);
        // Получение координат
        handleCoordinates(item);
        // Запись координат
        handleWeatherApi(coordinates.latitude, coordinates.longitude);
        // Если есть в выбранной стране штаты, то делаем поиск штатов
        if (item.state_boolean) {
            // Поиск штатов по id страны
            getStates(item.country_id);
        }
    };

    // Получить города по клику
    const handleStateClick = (item: any) => {
        // Закрытие Popup по клику города
        handleStates();
        // Запись данных штата
        setStateVal(item);
        // Если выбрали другой штат, то обнуляем список городов
        setCity(defaultCities);
        // Получение координат координат
        handleCoordinates(item);
        // Запись координат
        handleWeatherApi(coordinates.latitude, coordinates.longitude);
        // Если в штате есть города, то получаем список городов
        if (item.city_boolean) {
            getCities(item.state_id);
        }
    };
    // Клик по выбранному городу
    const handleCityClick = (item: ICities) => {
        // Закрытие Popup
        handleCities();
        // Запись города
        setCity(item);
        // Получение координат города
        handleCoordinates(item);
        // Запись координат города
        handleWeatherApi(coordinates.latitude, coordinates.longitude);
    };
    // Открытие Popup стран
    const handleCountries = () => {
        if (!selectCountry) setSelectCountry(true);
        else setSelectCountry(false);
    };
    // Открытие Popup штатов
    const handleStates = () => {
        if (!selectStateVal) setSelectStateVal(true);
        else setSelectStateVal(false);
    };
    // Открытие Popup городов
    const handleCities = () => {
        if (!selectCity) setSelectCity(true);
        else setSelectCity(false);
    };
    // Отслеживание состояния окна Popup
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
    // Отслеживание состояния окна Popup
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
    // Получение данных по погоде согласно координатам
    const apiWeather: string = 'd807e15c397cc3b68b5c64ef1bd87d46'
    const handleWeatherApi = (lat: number, lon: number) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiWeather}`
        )
            .then((response) => response.json())
            .then((respose) => {
                setWeather(respose.weather[0]);
                setTemperature(respose.main);
            });
    };
    // Url адрес хранения данных
    const urlFetch: string = "http://localhost:90/api";
    // Получение списка стран
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
    // Получение списка штатов
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
    // Получение списка городов
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
    // Отслеживание состояния окна Popup
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
                temperature,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
