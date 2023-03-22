import axios from "axios";

interface ICoordinates {
  lat: number;
  lng: number;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyA3UJXQ9XI4twt4L-9mdAsoa-uNNnMR71E";

export async function getCoordinatesFromCEP(cep: string): Promise<ICoordinates | undefined> {
  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await axios.get(endpoint);
  console.log(response);
  const data = response.data;

  if (data.status === "OK") {
    const location = data.results[0].geometry.location;

    return {
      lat: location.lat,
      lng: location.lng
    };
  } else {
    return undefined;
  }

}