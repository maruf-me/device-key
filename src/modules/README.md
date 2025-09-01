# Device Key - Modular Architecture

This directory contains the modular architecture for the Device Key library. Each module is self-contained and focuses on a specific domain of device information.

## Module Structure

### 📁 `/os` - Operating System Detection
- **Purpose**: Detect and provide operating system information
- **Exports**: `getOSInfo()`, `OSInfo` type
- **Files**: `detector.ts`, `types.ts`, `index.ts`

### 📁 `/network` - Network Information
- **Purpose**: Gather network connection and hardware information
- **Exports**: `getNetworkInfo()`, `NetworkInfo` type
- **Files**: `detector.ts`, `types.ts`, `index.ts`

### 📁 `/browser` - Browser Detection
- **Purpose**: Detect browser type, version, and capabilities
- **Exports**: `getBrowserInfo()`, `detectIncognitoMode()`, `BrowserInfo` type
- **Files**: `detector.ts`, `types.ts`, `index.ts`

### 📁 `/device` - Device Hardware Information
- **Purpose**: Gather device hardware details, battery info, and device ID
- **Exports**: `getDeviceInfoBasic()`, `getDeviceId()`, `getBatteryInfo()`, `DeviceBasicInfo`, `BatteryInfo` types
- **Files**: `detector.ts`, `battery.ts`, `getDeviceId.ts`, `types.ts`, `index.ts`

### 📁 `/fingerprint` - Device Fingerprinting
- **Purpose**: Generate unique device fingerprints using various techniques
- **Exports**: `generateFingerprint()`, `getCanvasFingerprint()`, `getWebGLFingerprint()`, `FingerprintInfo` type
- **Files**: `generator.ts`, `types.ts`, `index.ts`

### 📁 `/user-agent` - User Agent Parsing
- **Purpose**: Parse and analyze user agent strings
- **Exports**: `getUserAgent()`, `parseUserAgent()`, `UserAgentInfo` type
- **Files**: `detector.ts`, `types.ts`, `index.ts`

### 📁 `/location` - Location and Timezone
- **Purpose**: Gather location, timezone, and language information
- **Exports**: `getLocationInfo()`, `getTimezoneInfo()`, `getLanguageInfo()`, `LocationInfo`, `TimezoneInfo`, `LanguageInfo` types
- **Files**: `detector.ts`, `types.ts`, `index.ts`

## Benefits of This Structure

1. **Modularity**: Each module is self-contained and can be used independently
2. **Maintainability**: Easy to locate and modify specific functionality
3. **Extensibility**: Simple to add new modules or extend existing ones
4. **Tree Shaking**: Bundlers can eliminate unused modules
5. **Testing**: Each module can be tested in isolation
6. **Documentation**: Clear separation makes documentation easier

## Usage Examples

```typescript
// Import specific modules
import { getOSInfo } from './modules/os';
import { getBrowserInfo } from './modules/browser';
import { generateFingerprint } from './modules/fingerprint';

// Or import everything
import { getDeviceInfo } from './core/device-info';
```

## Adding New Modules

1. Create a new directory under `src/modules/`
2. Add `types.ts` for TypeScript interfaces
3. Add implementation files (e.g., `detector.ts`, `generator.ts`)
4. Add `index.ts` to export public API
5. Update main `src/index.ts` to export the new module
6. Update `src/types/index.ts` to export new types
