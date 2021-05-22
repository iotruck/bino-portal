import axios from "axios";

const mapboxToken = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;
//const binoApiUrl = process.env.REACT_APP_ACCESS_BINO_API_URL;

export function fetchLocalMapBox(local) {
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`);
}