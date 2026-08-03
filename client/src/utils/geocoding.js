// export async function geocodeAddress(address) {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//         address
//       )}`
//     );

//     const data = await response.json();

//     if (!data.length) return null;

//     return {
//       lat: parseFloat(data[0].lat),
//       lng: parseFloat(data[0].lon),
//     };
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

export async function geocodeAddress(address) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch location");
    }

    const data = await response.json();

    if (data.length === 0) {
      return null;
    }

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}