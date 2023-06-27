import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
interface ICountry {
    country: string,
    country_id: string
}
function Countries() {
    const defaultCountries:ICountry = {
        country: '',
        country_id: ''
    }
    const [countries, setCountries] = useState([]);
    const [selectCountry, setSelectCountry] = useState<boolean>(false);
    const [country, setCountry] = useState(defaultCountries);
    const handleCountryClick = (item: any) => {
        setCountry(item);
        setSelectCountry(false);
        getCities(item.country_id);
    }
    const getCities = (city: number) => {
        console.log(city);
        fetch(`http://localhost:90/api/product/read_one.php?country_id=${city}` + '&action=1',  {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            
        })
        .then((response) => response.json())
        .then((respose) => {
            console.log(respose)
        });
        
    }
    useEffect(() => {
        fetch("http://localhost:90/api/product/", {
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
    },[])
    const handleCountries = () => {
        if (!selectCountry) {
            setSelectCountry(true);
        } 
        else {
            setSelectCountry(false)
        };

    };
    const rootRef = useRef<HTMLUListElement>(null)
    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (setSelectCountry && rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setSelectCountry(false)
            } 
          }
        document.addEventListener('mousedown', handleClickOutSide)
        return () => {
          document.removeEventListener('mousedown', handleClickOutSide)
        }
      },[selectCountry])
    return (
        <div className="country">
            <button type="button" className="country__button" onClick={handleCountries}>
                Select country
            </button>
            <div className={selectCountry ? 'popup-countries popup-countries_active' : 'popup-countries'}>
                <ul ref={rootRef} className="countries">
                    {countries.map((item) => (
                        <li onClick={() => handleCountryClick(item)} key={item["country_id"]}>{item["country"]}</li>
                    ))}
                </ul>
            </div>
            <h3>{country ? `Select country: ${country.country}` : ''}</h3>
        </div>
    );
}

export default Countries;
