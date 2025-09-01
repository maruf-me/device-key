// Main exports - Default export is the rich device info object
import { getDeviceInfo } from "./core/device-info";

// Module exports for granular usage
export { getOSInfo } from "./modules/os";
export { getNetworkInfo } from "./modules/network";
export { getBrowserInfo, detectIncognitoMode } from "./modules/browser";
export { getBatteryInfo, getDeviceId, getDeviceInfoBasic } from "./modules/device";
export { getUserAgent, parseUserAgent } from "./modules/user-agent";
export { getLocationInfo, getTimezoneInfo, getLanguageInfo } from "./modules/location";
export { generateFingerprint, getCanvasFingerprint, getWebGLFingerprint } from "./modules/fingerprint";

// Core exports
export { getDeviceInfo };

// Type exports
export type * from "./types";

// Default export
export default getDeviceInfo;


(async () => {
  const deviceInfo = await getDeviceInfo();
  console.log(deviceInfo);
})();
