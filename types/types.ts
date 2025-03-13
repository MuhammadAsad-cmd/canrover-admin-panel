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
  