import React, {createContext, useEffect, useRef, useState} from 'react';
interface IModalContext {
    countries: {},
    country: {},
    states: {},
    stateVal: {},
    handleCountryClick: (item: any) => void,
    handleCountries: () => void
    
}
export const ModalContext = createContext<IModalContext>({
    countries: Array,
    country: Array,
    states: Array,
    stateVal: Array,
    handleCountryClick: () => {},
    handleCountries: () => {}
})
interface ICountries {
    country: string,
    country_id: number
}
interface IStates {
    state: string,
    state_id: number,

}
export const ModalState = ({children}: {children: React.ReactNode}) => {
    const urlFetch: string = 'http://localhost:90/api';
    const defaultValuesCountries:ICountries = {
        country: '',
        country_id: 0
    }
    const defaultValuesStates:IStates = {
        state: '',
        state_id: 0
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
            });
    }, []);
    const [countries, setCountries] = useState<Object>([]);
    const [country, setCountry] = useState(defaultValuesCountries);
    const [selectCountry, setSelectCountry] = useState<boolean>(false);
    const [states, setStates]= useState(defaultValuesStates);
    const [stateVal, setStateVal] = useState<Object>(defaultValuesStates);
    const [selectStateVal, setSelectStateVal] = useState<boolean>(false);


    const handleCountryClick = (item: any) => {
        setSelectCountry(item);
        setSelectCountry(false);
    }
    const handleCountries = () => {
        if (!selectCountry) {
            setSelectCountry(true);
        } else {
            setSelectCountry(false);
        }
    }
    const rootRefCountries = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (
                (setSelectCountry &&
                    rootRefCountries.current &&
                    !rootRefCountries.current.contains(e.target as Node))
            ) {
                setSelectCountry(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [selectCountry]);
    return (
        <ModalContext.Provider value={{countries, country, states, stateVal, handleCountryClick, handleCountries}}>{children}</ModalContext.Provider>
    )
}


