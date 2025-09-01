export interface LocationInfo {
  timezone: TimezoneInfo;
  language: LanguageInfo;
  coordinates?: GeolocationCoordinates;
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
