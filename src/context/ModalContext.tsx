import React, { createContext, useEffect, useRef, useState } from "react";
interface IModalContext {
    countries: any;
    country: [];
    states: any;
    stateVal: {};
    handleCountryClick: (item: any) => void;
    handleCountries: () => void;
    selectCountry: boolean;
    rootRefCountries: any;
    rootRefState: any;
    selectStateVal: boolean;
    handleStates: () => void;
    handleStateClick: (item: any) => void;
}
export const ModalContext = createContext<IModalContext>({
    countries: [],
    country: [],
    states: [],
    stateVal: Array,
    handleCountryClick: () => {},
    handleCountries: () => {},
    selectCountry: false,
    rootRefCountries: null,
    rootRefState: null,
    selectStateVal: false,
    handleStates: () => {},
    handleStateClick: () => {},
});
interface ICountries {
    country: string;
    country_id: number;
    latitude: number;
    longitude: number;
    state_boolean: boolean;
}
interface IStates {
    state: string;
    state_id: string;
    latitude: number;
    longitude: number;
    city_boolean: boolean;
}
interface ICities {
    city: string;
    city_id: number;
    latitude: number;
    longitude: number;
}
export const ModalState = ({ children }: { children: React.ReactNode }) => {
    const urlFetch: string = "http://localhost:90/api";
    const defaultCountries: ICountries = {
        country: "",
        country_id: 0,
        latitude: 0,
        longitude: 0,
        state_boolean: false,
    };
    const defaultStates: IStates = {
        state: "",
        state_id: "",
        latitude: 0,
        longitude: 0,
        city_boolean: false,
    };
    const defaultCities:ICities = {
        city: '',
        city_id: 0,
        latitude: 0,
        longitude: 0
    }
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
                console.log(respose);
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
    const handleCountryClick = (item: any) => {
        handleCountries();
        setCountry(item);
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
                console.log(respose);
            });
    };
    const rootRefState = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (
                setSelectStateVal &&
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
    console.log(cities)
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
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
