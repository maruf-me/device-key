import { DEVICE_KEY } from "../../../app.config";
import { generateFingerprint } from "../fingerprint";

export const getDeviceId = async (): Promise<{ deviceId: string }> => {
  let deviceId = "server-mode";
  if (typeof window !== "undefined") {
    const existing = localStorage.getItem(DEVICE_KEY);
    if (existing) {
      deviceId = existing;
    } else {
      deviceId = await generateFingerprint();
      localStorage.setItem(DEVICE_KEY, deviceId);
    }
  }

  return { deviceId };
};
