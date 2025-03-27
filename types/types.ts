// types.ts (or wherever your type is defined)
export interface ScooterData {
  _id: string;
  imei: string;
  code: string;
  raw: string;
  battery: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
  model?: string;
  online?: "Online" | "Offline";
  cableLock?: boolean;
  helmetLock?: boolean;
  batteryLock?: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  accountType: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ride {
  _id: string;
  user: string;
  scooter: string;
  status: string;
  pick: {
    long: string;
    lat: string;
  };
  pickAt: string;
  drop: {
    long: string;
    lat: string;
  };
  dropAt: string;
  dropImage: string;
  createdAt: string;
  updatedAt: string;
}

// Example of how your Review type might look
export interface Review {
  _id: string;
  user: {
    _id: string;
    email: string;
    phone: string;
    name: string;
    accountType: string;
    image: string;
  };
  scooter: {
    _id: string;
    imei: string;
    model: string;
    name: string;
    battery: number;
    online: boolean;
    helmetLock: boolean;
    batteryLock: boolean;
    cableLock: boolean;
    latitude: number;
    longitude: number;
  };
  ride: {
    _id: string;
    status: string;
    pick: { lat: string; long: string };
    drop: { lat: string; long: string };
    pickAt: string;
    dropAt: string;
  };
  review: string;
  rating: number;
  createdAt: string;
}

export interface ReviewCardProps {
  review: Review;
}
