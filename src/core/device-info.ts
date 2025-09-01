import { getOSInfo } from "../modules/os";
import { getBrowserInfo } from "../modules/browser";
import { getDeviceInfoBasic } from "../modules/device";
import { getNetworkInfo } from "../modules/network";
import { getUserAgent } from "../modules/user-agent";
import { getLocationInfo } from "../modules/location";
import type { Device } from "../types";

export const getDeviceInfo = async (): Promise<Device> => {
  const os = getOSInfo();
  const browser = getBrowserInfo();
  const network = getNetworkInfo();
  const { userAgent } = getUserAgent();
  const device = await getDeviceInfoBasic();
  const location = await getLocationInfo();

  return {
    os,
    device,
    browser,
    network,
    location,
    userAgent,
  };
};