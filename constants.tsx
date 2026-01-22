
import React from 'react';
import { RideConfig, BikeSpec } from './types';

export const RIDE_DATA: RideConfig = {
  date: '2026-01-25',
  takeOffTime: '06:30',
  bikes: ['Honda RS 150', 'Yamaha Y16'],
  routeGo: ['Setapak', 'Bentong', 'Raub', 'Kuala Lipis', 'Jerantut'],
  routeBack: ['Jerantut', 'Temerloh', 'Karak', 'Setapak']
};

export const STOP_COORDS: Record<string, [number, number]> = {
  'Setapak': [3.1895, 101.7118],
  'Bentong': [3.5230, 101.9100],
  'Raub': [3.7934, 101.8569],
  'Kuala Lipis': [4.1848, 102.0524],
  'Jerantut': [3.9370, 102.3551],
  'Temerloh': [3.4475, 102.4173],
  'Karak': [3.4116, 102.0360]
};

export const BIKE_SPECS: BikeSpec[] = [
  {
    model: 'Honda RS 150',
    engine: '149.2cc, Liquid Cooled, DOHC',
    power: '15.6 HP @ 9,000 RPM',
    torque: '13.5 Nm @ 6,500 RPM',
    fuelCapacity: '4.5 Litres',
    weight: '122 kg'
  },
  {
    model: 'Yamaha Y16',
    engine: '155cc, Liquid Cooled, SOHC, VVA',
    power: '17.7 HP @ 9,500 RPM',
    torque: '14.4 Nm @ 8,000 RPM',
    fuelCapacity: '5.4 Litres',
    weight: '119 kg'
  }
];

export const ICONS = {
  Map: <i className="fa-solid fa-map-location-dot"></i>,
  Clock: <i className="fa-regular fa-clock"></i>,
  Bike: <i className="fa-solid fa-motorcycle"></i>,
  Road: <i className="fa-solid fa-road"></i>,
  Gas: <i className="fa-solid fa-gas-pump"></i>,
  Warning: <i className="fa-solid fa-triangle-exclamation"></i>,
  Weather: <i className="fa-solid fa-cloud-sun"></i>,
  Tools: <i className="fa-solid fa-screwdriver-wrench"></i>,
  Compass: <i className="fa-solid fa-compass"></i>,
  ArrowRight: <i className="fa-solid fa-arrow-right"></i>,
};
