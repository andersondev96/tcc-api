import axios from "axios";

interface ICoordinates {
  lat: number;
  lng: number;
}

interface IAddress {
  formattedAddress: string;
  street: string | undefined;
  district: string | undefined;
  city: string | undefined;
  state: string | undefined;
  cep: string | undefined;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyA3UJXQ9XI4twt4L-9mdAsoa-uNNnMR71E";

export async function getCurrentLocalization(): Promise<ICoordinates | undefined> {
  const response = await axios.get("https://geolocation-db.com/json/");
  const data = response.data;

  return {
    lat: data.latitude,
    lng: data.longitude
  };
}

export async function getAddressFromCoordinates(coords: ICoordinates): Promise<IAddress | undefined> {
  const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json";

  const response = await axios.get(apiUrl, {
    params: {
      latlng: `${coords.lat},${coords.lng}`,
      key: GOOGLE_MAPS_API_KEY
    }
  });

  if (response.status === 200 && response.data.status === "OK" && response.data.results.length > 0) {

    const result = response.data.results[0];
    const addressComponents = result.address_components;

    const formattedAddress = result.formatted_address;
    const street = addressComponents.find((component) => component.types.includes("route"))?.long_name ? addressComponents.find((component) => component.types.includes("route"))?.long_name : "";
    const district = addressComponents.find((component) => component.types.includes("sublocality"))?.long_name ? addressComponents.find((component) => component.types.includes("sublocality"))?.long_name : "";
    const city = addressComponents.find((component) => component.types.includes("administrative_area_level_2"))?.long_name ? addressComponents.find((component) => component.types.includes("administrative_area_level_2"))?.long_name : "";
    const stateComponent = addressComponents.find((component) => component.types.includes("administrative_area_level_1"));
    const state = stateComponent ? stateComponent.short_name.replace("State of ", "") : "";
    const cep = addressComponents.find((component) => component.types.includes("postal_code"))?.long_name ? addressComponents.find((component) => component.types.includes("postal_code"))?.long_name : "";

    return {
      formattedAddress,
      street,
      district,
      city,
      state,
      cep
    };
  } else {
    return undefined;
  }
}