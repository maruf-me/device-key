export interface DeviceBasicInfo {
  deviceId: string;
  deviceType: string;
  hardwareConcurrency: number;
  screen: { width: number; height: number; pixelRatio: number };
  battery: BatteryInfo;
}

export interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime: number | null;
}
