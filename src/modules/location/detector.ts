import type { LocationInfo, TimezoneInfo, LanguageInfo } from './types';

export const getTimezoneInfo = (): TimezoneInfo => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const dst = isDST(now);
  
  return {
    timezone,
    offset: -offset, // Convert to positive for east of UTC
    dst,
  };
};

export const getLanguageInfo = (): LanguageInfo => {
  const languages = Array.from(navigator.languages);
  
  return {
    current: navigator.language,
    types: languages,
    primary: languages[0] || navigator.language,
  };
};

export const getLocationInfo = async (): Promise<LocationInfo> => {
  const timezone = getTimezoneInfo();
  const language = getLanguageInfo();
  
  let coordinates: GeolocationCoordinates | undefined;
  
  // Try to get geolocation if available and permitted
  if (navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          enableHighAccuracy: false,
        });
      });
      coordinates = position.coords;
    } catch (error) {
      // Geolocation failed or denied, continue without coordinates
    }
  }
  
  return {
    timezone,
    language,
    coordinates,
  };
};

// Helper function to detect DST
function isDST(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  return date.getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
