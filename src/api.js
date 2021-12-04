import axios from "axios";

const mapboxToken = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;
//const binoApiUrl = process.env.REACT_APP_ACCESS_BINO_API_URL;

export function fetchLocalMapBox(local) {
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${"pk.eyJ1IjoiaWdvcmJlemVycmFkZXYiLCJhIjoiY2tsNjFkb2dpMHAyMTJ2cHJzM3Fydm13aiJ9.X6mVBTztFI9Wc4f04FOohA"}`);
}