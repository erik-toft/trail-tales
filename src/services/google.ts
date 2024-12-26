// import axios from "axios";
// import { GeocodeResponse } from "../types/Google.types";

// export const getGeocodeAdress = async (address: string, city: string) => {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   // Kontrollera att API-nyckeln finns
//   if (!apiKey) {
//     throw new Error("Google Maps API key is missing");
//   }

//   try {
//     const res = await axios.get<GeocodeResponse>(
//       `https://maps.googleapis.com/maps/api/geocode/json`,
//       {
//         params: {
//           address: `${address}, ${city}`,
//           key: apiKey,
//         },
//       }
//     );

//     // Kontrollera om status är OK
//     if (res.data.status !== "OK") {
//       throw new Error(`Geocode API error: ${res.data.status}`);
//     }

//     return res.data; // Returnera data från API-svaret
//   } catch (error) {
//     // Hantera fel på ett bra sätt
//     console.error("Failed to fetch geocode data:", error);
//     throw error; // Kan returnera ett mer specifikt felmeddelande eller ett tomt svar här också
//   }
// };
