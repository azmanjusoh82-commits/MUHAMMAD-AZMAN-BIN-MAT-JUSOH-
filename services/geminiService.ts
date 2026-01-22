
import { GoogleGenAI, Type } from "@google/genai";
import { RideConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRideItinerary = async (config: RideConfig) => {
  const prompt = `Generate a detailed itinerary for a motorcycle ride on ${config.date} starting at ${config.takeOffTime}. 
  Bikes: ${config.bikes.join(', ')}.
  Route Go: ${config.routeGo.join(' -> ')}.
  Route Back: ${config.routeBack.join(' -> ')}.
  
  CRITICAL: Suggest the most strategic PETROL STATIONS (Petronas, Shell, BHP, etc.) along the route. 
  Note that the Honda RS150 has a 4.5L tank and Yamaha Y16 has 5.4L, meaning stops every 100-130km are vital.
  
  Provide estimated arrival times, distances, and specific bike-related advice.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                location: { type: Type.STRING },
                time: { type: Type.STRING },
                distanceFromStart: { type: Type.NUMBER },
                notes: { type: Type.STRING }
              },
              required: ["location", "time", "distanceFromStart", "notes"]
            }
          },
          fuelStations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                location: { type: Type.STRING },
                brand: { type: Type.STRING },
                whyStop: { type: Type.STRING }
              },
              required: ["name", "location", "brand", "whyStop"]
            }
          },
          safetyAdvice: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          bikeMaintenance: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["itinerary", "fuelStations", "safetyAdvice", "bikeMaintenance"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};
