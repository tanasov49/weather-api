import { ICountries, IStates, ICities, ICoordinates } from "../interfaces/interfaces";
export const defaultCountries: ICountries = {
    country: "",
    country_id: 0,
    latitude: 0,
    longitude: 0,
    state_boolean: false,
};
export const defaultStates: IStates = {
    state: "",
    state_id: "",
    latitude: 0,
    longitude: 0,
    city_boolean: false,
};

export const defaultCities: ICities = {
    city: "",
    city_id: 0,
    latitude: 0,
    longitude: 0,
};
export const defaultCoordinates:ICoordinates = {
    latitude: 0,
    longitude: 0
};