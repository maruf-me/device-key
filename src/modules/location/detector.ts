import type { LocationInfo, TimezoneInfo, LanguageInfo, IPInfo } from './types';

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

export const getIPInfo = async (): Promise<IPInfo> => {
  const ipInfo: IPInfo = {
    publicIP: '',
    isVPN: false,
    isProxy: false,
    isTor: false,
    confidence: 0,
  };

  try {
    // Method 1: WebRTC IP Detection (can bypass VPNs)
    const realIP = await getWebRTCIP();
    if (realIP) {
      ipInfo.realIP = realIP;
      ipInfo.confidence += 0.4;
    }

    // Method 2: Public IP via external service
    const publicIP = await getPublicIP();
    if (publicIP) {
      ipInfo.publicIP = publicIP;
      ipInfo.confidence += 0.3;
    }

    // Method 3: VPN/Proxy Detection
    const vpnDetection = await detectVPNProxy(ipInfo.publicIP);
    Object.assign(ipInfo, vpnDetection);

    // Method 4: DNS Leak Detection
    const dnsLeak = await detectDNSLeak();
    if (dnsLeak) {
      ipInfo.confidence += 0.2;
    }

  } catch (error) {
    console.warn('IP detection failed:', error);
  }

  return ipInfo;
};

export const getLocationInfo = async (): Promise<LocationInfo> => {
  const timezone = getTimezoneInfo();
  const language = getLanguageInfo();
  
  let coordinates: GeolocationCoordinates | undefined;
  let ipInfo: IPInfo | undefined;
  
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

  // Get IP information
  try {
    ipInfo = await getIPInfo();
  } catch (error) {
    // IP detection failed, continue without IP info
  }
  
  return {
    timezone,
    language,
    coordinates,
    ipInfo,
  };
};

// Helper function to detect DST
function isDST(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  return date.getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

// WebRTC IP Detection (can bypass VPNs)
async function getWebRTCIP(): Promise<string | null> {
  return new Promise((resolve) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
      ],
    });

    pc.createDataChannel('');
    pc.createOffer().then(offer => pc.setLocalDescription(offer));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const candidate = event.candidate.candidate;
        const ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);
        if (ipMatch && !isPrivateIP(ipMatch[1])) {
          pc.close();
          resolve(ipMatch[1]);
        }
      }
    };

    // Timeout after 3 seconds
    setTimeout(() => {
      pc.close();
      resolve(null);
    }, 3000);
  });
}

// Get public IP via external service
async function getPublicIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    const data = await response.json();
    return data.ip || null;
  } catch (error) {
    // Fallback to alternative service
    try {
      const response = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      const data = await response.json();
      return data.ip || null;
    } catch (fallbackError) {
      return null;
    }
  }
}

// Detect VPN/Proxy/Tor
async function detectVPNProxy(ip: string): Promise<Partial<IPInfo>> {
  if (!ip) return {};

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    const data = await response.json();

    return {
      country: data.country_name,
      city: data.city,
      isp: data.org,
      isVPN: isVPNProvider(data.org),
      isProxy: isProxyProvider(data.org),
      isTor: isTorExitNode(ip),
    };
  } catch (error) {
    return {};
  }
}

// Detect DNS leaks
async function detectDNSLeak(): Promise<boolean> {
  try {
    // Check if DNS servers match expected patterns
    const dnsServers = await getDNSServers();
    return dnsServers.some(server => isSuspiciousDNSServer(server));
  } catch (error) {
    return false;
  }
}

// Helper functions
function isPrivateIP(ip: string): boolean {
  const privateRanges = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^127\./,
    /^169\.254\./,
    /^::1$/,
    /^fc00:/,
    /^fe80:/,
  ];
  return privateRanges.some(range => range.test(ip));
}

function isVPNProvider(org: string): boolean {
  if (!org) return false;
  const vpnKeywords = [
    'vpn', 'proxy', 'hosting', 'datacenter', 'cloud',
    'amazon', 'google', 'microsoft', 'digitalocean',
    'linode', 'vultr', 'ovh', 'hetzner'
  ];
  return vpnKeywords.some(keyword => 
    org.toLowerCase().includes(keyword)
  );
}

function isProxyProvider(org: string): boolean {
  if (!org) return false;
  const proxyKeywords = ['proxy', 'tunnel', 'gateway'];
  return proxyKeywords.some(keyword => 
    org.toLowerCase().includes(keyword)
  );
}

function isTorExitNode(ip: string): boolean {
  // This would require a Tor exit node list
  // For now, return false as we don't have the list
  return false;
}

async function getDNSServers(): Promise<string[]> {
  // This is limited in browsers, but we can try
  try {
    const connection = (navigator as any).connection;
    return connection?.dns || [];
  } catch (error) {
    return [];
  }
}

function isSuspiciousDNSServer(server: string): boolean {
  // Check for known VPN/proxy DNS servers
  const suspiciousPatterns = [
    /^8\.8\.8\.8$/,  // Google DNS (common with VPNs)
    /^1\.1\.1\.1$/,  // Cloudflare DNS
    /^208\.67\.222\.222$/, // OpenDNS
  ];
  return suspiciousPatterns.some(pattern => pattern.test(server));
}
