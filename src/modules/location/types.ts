export interface LocationInfo {
  timezone: TimezoneInfo;
  language: LanguageInfo;
  coordinates?: GeolocationCoordinates;
  ipInfo?: IPInfo;
}

export interface IPInfo {
  publicIP: string;
  realIP?: string;
  isVPN: boolean;
  isProxy: boolean;
  isTor: boolean;
  country?: string;
  city?: string;
  isp?: string;
  confidence: number;
}

export interface TimezoneInfo {
  timezone: string;
  offset: number;
  dst: boolean;
}

export interface LanguageInfo {
  current: string;
  types: string[];
  primary: string;
}
