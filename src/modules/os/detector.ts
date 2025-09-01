import type { OSInfo } from './types';

export const getOSInfo = (): OSInfo => {
  const ua = navigator.userAgent;
  const platform = navigator.platform || "Unknown";
  let name = "Unknown";
  let version = "Unknown";
  let architecture = "Unknown";

  // Detect OS name and version
  if (/Windows NT/.test(ua)) {
    name = "Windows";
    const match = ua.match(/Windows NT (\d+\.\d+)/);
    if (match) {
      const versions: Record<string, string> = {
        "10.0": "10",
        "6.3": "8.1",
        "6.2": "8",
        "6.1": "7",
        "6.0": "Vista",
        "5.1": "XP",
      };
      version = versions[match[1]] || match[1];
    }
  } else if (/Mac OS X/.test(ua)) {
    name = "macOS";
    const match = ua.match(/Mac OS X (\d+[_\.\d]+)/);
    if (match) version = match[1].replace(/_/g, ".");
  } else if (/Android/.test(ua)) {
    name = "Android";
    const match = ua.match(/Android (\d+(\.\d+)?)/);
    if (match) version = match[1];
  } else if (/iPhone|iPad|iPod/.test(ua)) {
    name = "iOS";
    const match = ua.match(/OS (\d+[_\.\d]+)/);
    if (match) version = match[1].replace(/_/g, ".");
  } else if (/Linux/.test(ua)) {
    name = "Linux";
  }

  // Detect architecture
  if (ua.includes("WOW64") || ua.includes("Win64") || ua.includes("x64")) {
    architecture = "64-bit";
  } else if (ua.includes("x86") || ua.includes("i686")) {
    architecture = "32-bit";
  } else {
    architecture = "Unknown";
  }

  return { name, version, platform, architecture };
};
