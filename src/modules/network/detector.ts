import type { NetworkInfo } from './types';

export const getNetworkInfo = (): NetworkInfo => {
  const info: NetworkInfo = {};

  // Get network type if available
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    info.connectionType = connection.effectiveType;
    info.effectiveType = connection.effectiveType;
    info.downlink = connection.downlink;
    info.rtt = connection.rtt;
  }

  // Get number of CPU cores
  if ("hardwareConcurrency" in navigator) {
    info.cores = navigator.hardwareConcurrency;
  }

  return info;
};
