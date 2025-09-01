import { getBatteryInfo } from './battery';
import { getDeviceId } from './getDeviceId';
import type { DeviceBasicInfo } from './types';

export const getDeviceInfoBasic = async (): Promise<DeviceBasicInfo> => {
  const ua = navigator.userAgent;
  const deviceType = /Mobi|Android/i.test(ua)
    ? "Mobile"
    : /Tablet|iPad/i.test(ua)
    ? "Tablet"
    : "Desktop";

  let screenInfo: DeviceBasicInfo["screen"] = {
    width: window.screen.width,
    height: window.screen.height,
    pixelRatio: window.devicePixelRatio,
  };

  // Hardware concurrency (CPU cores)
  const hardwareConcurrency = navigator.hardwareConcurrency || 0;

  // Device ID (stable)
  const { deviceId } = await getDeviceId();

  return {
    deviceId,
    deviceType,
    hardwareConcurrency,
    screen: screenInfo,
    battery: await getBatteryInfo(),
  };
};
