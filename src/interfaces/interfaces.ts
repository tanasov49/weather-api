export interface ICountries {
    country: string;
    country_id: number;
    latitude: number;
    longitude: number;
    state_boolean: boolean;
}
export interface IStates {
    state: string;
    state_id: string;
    latitude: number;
    longitude: number;
    city_boolean: boolean;
}
export interface ICities {
    city: string;
    city_id: number;
    latitude: number;
    longitude: number;
}
export interface ICoordinates {
    latitude: number;
    longitude: number;
}
export interface IModalContext {
    countries: ICountries[];
    country: ICountries;
    states: IStates[];
    stateVal: IStates;
    cities: ICities[];
    city: ICities;
    coordinates: ICoordinates;
    selectCity: boolean;
    handleCountryClick: (item: any) => void;
    handleCountries: () => void;
    selectCountry: boolean;
    rootRefCountries: any;
    rootRefState: any;
    rootRefCity: any;
    selectStateVal: boolean;
    handleStates: () => void;
    handleStateClick: (item: any) => void;
    handleCities: () => void;
    handleCityClick: (item: any) => void;
    handleWeatherApi: (lat: number, lon: number) => void;
    weather: any;
    temperature: any;
}