# @marufme/device-key 🔑

A lightweight, comprehensive device detection and fingerprinting library for modern web applications. Get detailed information about user devices, browsers, operating systems, and generate unique device fingerprints.

[![npm version](https://img.shields.io/npm/v/@marufme/device-key.svg)](https://www.npmjs.com/package/@marufme/device-key)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **🖥️ Device Detection**: Identify device type (Desktop, Mobile, Tablet)
- **🌐 Browser Information**: Get browser name, version, engine, and vendor
- **💻 OS Detection**: Detect operating system name, version, platform, and architecture
- **🔋 Battery Status**: Monitor battery level, charging status, and charging time
- **🌍 Network Info**: Get network connection type, effectiveType, downlink, RTT, and CPU cores
- **🆔 Device Fingerprinting**: Generate unique, stable device identifiers
- **🎨 Canvas & WebGL Fingerprinting**: Canvas and WebGL helpers used for fingerprints
- **🌍 Localization**: Language preferences, timezone, DST, and optional coordinates
- **📱 Hardware Details**: Screen resolution, pixel ratio, and CPU cores
- **🕵️ Incognito Detection**: Heuristic detection using StorageManager quota
- **🔒 Privacy Aware**: Server-side safe with graceful fallbacks

## 🚀 Installation

```bash
npm install @marufme/device-key
```

```bash
yarn add @marufme/device-key
```

```bash
pnpm add @marufme/device-key
```

## 📖 Quick Start

### Basic Usage

```typescript
import getDeviceInfo from "@marufme/device-key";

// Get comprehensive device information
const deviceInfo = await getDeviceInfo();
console.log(deviceInfo);
```

### Modular Usage

```typescript
import {
  getOSInfo,
  getBrowserInfo,
  getNetworkInfo,
  getDeviceInfoBasic,
  getDeviceId,
  getUserAgent,
  parseUserAgent,
  getLocationInfo,
  getTimezoneInfo,
  getLanguageInfo,
  generateFingerprint,
  getCanvasFingerprint,
  getWebGLFingerprint,
  detectIncognitoMode,
} from "@marufme/device-key";

// Get specific information
const osInfo = getOSInfo();
const browserInfo = getBrowserInfo();
const networkInfo = getNetworkInfo();
const basicDevice = await getDeviceInfoBasic();
const { deviceId } = await getDeviceId();
const ua = getUserAgent();
const uaParsed = parseUserAgent();
const location = await getLocationInfo();
const tz = getTimezoneInfo();
const lang = getLanguageInfo();
const fingerprint = await generateFingerprint();
const canvasFp = getCanvasFingerprint();
const webglFp = getWebGLFingerprint();
const isIncognito = await detectIncognitoMode();
```

## 🔧 API Reference

### Main Function

#### `getDeviceInfo(): Promise<Device>`

Returns comprehensive device information including OS, browser, device details, network info, user-agent, and location.

```typescript
const deviceInfo = await getDeviceInfo();
// Returns:
// {
//   os: { name, version, platform, architecture },
//   browser: { name, version, engine, vendor },
//   device: {
//     deviceId,
//     deviceType,
//     hardwareConcurrency,
//     screen: { width, height, pixelRatio },
//     battery: { level, charging, chargingTime }
//   },
//   network: { connectionType?, effectiveType?, downlink?, rtt?, cores? },
//   location: {
//     timezone: { timezone, offset, dst },
//     language: { current, types, primary },
//     coordinates?: GeolocationCoordinates
//   },
//   userAgent: string
// }
```

### OS

#### `getOSInfo(): OSInfo`

Detects operating system information.

```typescript
const osInfo = getOSInfo();
// { name, version, platform, architecture }
// Example: { name: "Windows", version: "10", platform: "Win32", architecture: "64-bit" }
```

### Browser

#### `getBrowserInfo(): BrowserInfo`

Detects browser information.

```typescript
const browserInfo = getBrowserInfo();
// { name, version, engine, vendor }
// Example: { name: "Chrome", version: "120.0.0.0", engine: "Blink", vendor: "Google Inc." }
```

#### `detectIncognitoMode(): Promise<boolean>`

Heuristic detection using StorageManager quota (returns true if incognito/private mode likely).

```typescript
const isIncognito = await detectIncognitoMode();
```

### Device

#### `getDeviceInfoBasic(): Promise<DeviceBasicInfo>`

Gets basic device information including screen details and battery status.

```typescript
const info = await getDeviceInfoBasic();
// {
//   deviceId,
//   deviceType: "Desktop" | "Mobile" | "Tablet",
//   hardwareConcurrency,
//   screen: { width, height, pixelRatio },
//   battery: { level, charging, chargingTime }
// }
```

#### `getDeviceId(): Promise<{ deviceId: string }>`

Generates or retrieves a stable device identifier. On first run in the browser, it generates a fingerprint and stores it in `localStorage` under a small key. On non-browser environments, returns `"server-mode"`.

```typescript
const { deviceId } = await getDeviceId();
```

#### `getBatteryInfo(): Promise<BatteryInfo>`

Gets battery information (where supported).

```typescript
const battery = await getBatteryInfo();
// { level: 0-100, charging: boolean, chargingTime: number | null }
```

### Network

#### `getNetworkInfo(): NetworkInfo`

Gets network connection information and CPU cores where available.

```typescript
const net = getNetworkInfo();
// {
//   connectionType?,
//   effectiveType?,
//   downlink?,
//   rtt?,
//   cores?
// }
```

### User Agent

#### `getUserAgent(): { userAgent: string }`

Returns the current user agent string.

```typescript
const { userAgent } = getUserAgent();
```

#### `parseUserAgent(): UserAgentInfo`

Lightweight UA parsing helpers.

```typescript
const ua = parseUserAgent();
// { userAgent, isMobile, isTablet, isDesktop, isBot }
```

### Location & Locale

#### `getLocationInfo(): Promise<LocationInfo>`

Aggregates timezone, language, and optional geolocation coordinates (if permitted).

```typescript
const loc = await getLocationInfo();
// {
//   timezone: { timezone, offset, dst },
//   language: { current, types, primary },
//   coordinates?: GeolocationCoordinates
// }
```

#### `getTimezoneInfo(): TimezoneInfo`

Gets timezone identifier, UTC offset (minutes east of UTC), and DST flag.

```typescript
const tz = getTimezoneInfo();
// { timezone, offset, dst }
```

#### `getLanguageInfo(): LanguageInfo`

Gets language preferences.

```typescript
const lang = getLanguageInfo();
// { current, types, primary }
```

### Fingerprint

#### `generateFingerprint(): Promise<string>`

Creates a unique device fingerprint using basic info + Canvas + WebGL, hashed with SHA-256.

```typescript
const fp = await generateFingerprint();
```

#### `getCanvasFingerprint(): string`

Generates a canvas-based fingerprint string (data URL).

```typescript
const canvasFp = getCanvasFingerprint();
```

#### `getWebGLFingerprint(): string`

Generates a WebGL-based fingerprint string (vendor::renderer).

```typescript
const webglFp = getWebGLFingerprint();
```

> Note: Low-level helpers like hashing and info collection are internal; only the functions listed above are part of the public API.

## 📱 Device Types

The library automatically detects and categorizes devices:

- **Desktop**: Traditional computers and laptops
- **Mobile**: Smartphones and mobile devices
- **Tablet**: Tablet devices (including iPad)

## 🎯 Use Cases

- **Analytics**: Track device types and capabilities
- **User Experience**: Adapt UI based on device capabilities
- **Security**: Device fingerprinting for fraud detection
- **Performance**: Optimize based on device specifications
- **Debugging**: Collect device information for troubleshooting
- **A/B Testing**: Segment users by device characteristics

## 🔒 Privacy & Security

- **No External APIs**: All detection is done client-side
- **Graceful Fallbacks**: Works even when certain APIs are unavailable
- **Server-Side Safe**: Can run in Node.js environments; returns conservative defaults
- **User Consent**: Geolocation requests are optional and permission-based

## 🌐 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Features gracefully degrade on older browsers

## 📦 Bundle Size

- **Minified**: ~15KB
- **Gzipped**: ~5KB
- **Tree-shakeable**: Import only what you need

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/maruf-me/device-key.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the package
pnpm build

# Preview build
pnpm preview
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/maruf-me/device-key/issues)
- **Documentation**: [GitHub Wiki](https://github.com/maruf-me/device-key/wiki)
- **Author**: [MD Maruf Hossain](https://marufme.com)

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

---

Made with ❤️ by [MD Maruf Hossain](https://marufme.com)
