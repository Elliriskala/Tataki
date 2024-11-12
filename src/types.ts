interface Itinerary {
    duration: number;
    legs: Leg[];
  }

  interface Leg {
    mode: string;
    trip?: Trip;
    from: Location;
    to: Location;
    startTime: number;
    endTime: number;
    distance: number;
  }

  interface Trip {
    tripHeadsign: string;
    routeShortName: string;
  }

  interface Location {
    lat: number;
    lon: number;
    name: string;
    stop?: Stop;
  }

  interface Stop {
    code: string;
    name: string;
  }

export { Itinerary, Leg, Trip, Location, Stop };