
export interface RideConfig {
  date: string;
  takeOffTime: string;
  bikes: string[];
  routeGo: string[];
  routeBack: string[];
}

export interface WeatherData {
  condition: string;
  temp: number;
  humidity: number;
}

export interface Checkpoint {
  location: string;
  estimatedArrival: string;
  distanceFromPrev: number;
  description: string;
}

export interface BikeSpec {
  model: string;
  engine: string;
  power: string;
  torque: string;
  fuelCapacity: string;
  weight: string;
}

export interface RideAdvice {
  safety: string[];
  bikePrep: string[];
  gear: string[];
}
