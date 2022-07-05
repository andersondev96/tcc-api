const ACCESS_TOKEN_MAP_BOX = `access_token=${import.meta.env.VITE_ACCESS_TOKEN_MAP_BOX}`;

export const fetchLocalMapBox = (local: string) => 
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
  )
    .then(response => response.json())
    .then(data => data);
