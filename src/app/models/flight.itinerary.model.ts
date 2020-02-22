import { FlightInfo } from "./flight.info.model";
import { Fare } from "./fare.model";

export class FlightItinerary {
  airlineCodes: string[];
  airlineNames: string[];
  originPoint: string;
  originCountry: string;
  originCity: string;
  departureTime: string;
  departureOffser: number = 0;
  destinationPoint: string;
  destinationCountry: string;
  destinationCity: string;
  arrivalTime: string;
  ariivalOffset: number = 0;
  journeyDuration: number;
  layoverPorts: string[];
  layoverDurations: number[];
  layoverCities: string[];
  layoverAirportNames: string[];
  flightInfos: FlightInfo[];
  fare: Fare;
}
