import type { BrowserInfo } from './types';

export const getBrowserInfo = (): BrowserInfo => {
  const ua = navigator.userAgent;
  const vendor = navigator.vendor || "Unknown";

  let name = "Unknown";
  let version = "Unknown";
  let engine = "Unknown";

  // Detect browser name and version
  if (ua.includes("Edg")) {
    name = "Edge";
    version = ua.match(/Edg\/([\d.]+)/)?.[1] || "Unknown";
    engine = "Blink";
  } else if (ua.includes("Chrome") && !ua.includes("Edg")) {
    name = "Chrome";
    version = ua.match(/Chrome\/([\d.]+)/)?.[1] || "Unknown";
    engine = "Blink";
  } else if (ua.includes("Firefox")) {
    name = "Firefox";
    version = ua.match(/Firefox\/([\d.]+)/)?.[1] || "Unknown";
    engine = "Gecko";
  } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
    name = "Safari";
    version = ua.match(/Version\/([\d.]+)/)?.[1] || "Unknown";
    engine = "WebKit";
  } else if (ua.includes("Opera") || ua.includes("OPR")) {
    name = "Opera";
    version = ua.match(/OPR\/([\d.]+)/)?.[1] || "Unknown";
    engine = "Blink";
  }

  return { name, version, engine, vendor };
};

export const detectIncognitoMode = async (): Promise<boolean> => {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    try {
      const { quota } = await navigator.storage.estimate();
      // Incognito mode usually provides significantly less quota (~120MB or lower)
      if (quota && quota < 120 * 1024 * 1024) {
        return true; // Incognito detected
      }
    } catch {
      return false;
    }
  }
  return false;
};
