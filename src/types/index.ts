// Re-export all types from modules
export type { OSInfo } from '../modules/os';
export type { NetworkInfo } from '../modules/network';
export type { BrowserInfo } from '../modules/browser';
export type { DeviceBasicInfo, BatteryInfo } from '../modules/device';
export type { FingerprintInfo } from '../modules/fingerprint';
export type { UserAgentInfo } from '../modules/user-agent';
export type { LocationInfo, TimezoneInfo, LanguageInfo } from '../modules/location';

// Main device info type
export interface Device {
  os: import('../modules/os').OSInfo;
  browser: import('../modules/browser').BrowserInfo;
  device: import('../modules/device').DeviceBasicInfo;
  network: import('../modules/network').NetworkInfo;
  location: import('../modules/location').LocationInfo;
  userAgent: string;
}
