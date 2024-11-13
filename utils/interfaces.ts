interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

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

export { User ,Itinerary, Leg, Trip, Location, Stop };

