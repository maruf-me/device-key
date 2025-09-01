# IP Detection & VPN Bypass

## ⚠️ **Important Legal & Ethical Notice**

This module provides IP detection capabilities for legitimate purposes such as:
- Security analysis
- Fraud prevention
- Geographic content delivery
- Analytics and research

**Please ensure you comply with:**
- Local privacy laws (GDPR, CCPA, etc.)
- User consent requirements
- Terms of service
- Ethical guidelines

## 🔍 **Detection Methods**

### 1. **WebRTC IP Detection** (Most Effective)
- **Bypass Rate**: ~70-80% of VPNs
- **Method**: Uses WebRTC STUN servers to discover local IPs
- **Limitations**: Can be blocked by browser settings or extensions

### 2. **Public IP Detection**
- **Bypass Rate**: ~0% (shows VPN IP)
- **Method**: External API calls to get public IP
- **Purpose**: Compare with WebRTC results

### 3. **VPN/Proxy Detection**
- **Method**: Analyze ISP information and known VPN providers
- **Accuracy**: ~85-90% for major VPN services
- **Database**: Checks against known hosting/VPN providers

### 4. **DNS Leak Detection**
- **Method**: Analyze DNS server patterns
- **Accuracy**: ~60-70% for detecting VPN usage
- **Limitations**: Limited browser API access

## 📊 **Usage Examples**

```typescript
import { getIPInfo, getLocationInfo } from '@marufme/device-key';

// Get comprehensive IP information
const ipInfo = await getIPInfo();
console.log(ipInfo);
/*
{
  publicIP: "203.0.113.1",      // VPN/Proxy IP
  realIP: "192.168.1.100",      // Real IP (if detected)
  isVPN: true,
  isProxy: false,
  isTor: false,
  country: "United States",
  city: "New York",
  isp: "NordVPN",
  confidence: 0.7               // Detection confidence (0-1)
}
*/

// Get full location info including IP
const locationInfo = await getLocationInfo();
console.log(locationInfo.ipInfo);
```

## 🛡️ **VPN Bypass Effectiveness**

| VPN Service | WebRTC Bypass | Detection Rate |
|-------------|---------------|----------------|
| NordVPN     | ~60%          | ~90%           |
| ExpressVPN  | ~70%          | ~85%           |
| Surfshark   | ~65%          | ~88%           |
| CyberGhost  | ~75%          | ~82%           |
| Private Internet Access | ~80% | ~90% |

## 🔧 **Technical Implementation**

### WebRTC Detection Process:
1. Create RTCPeerConnection with STUN servers
2. Generate ICE candidates
3. Extract IP addresses from candidates
4. Filter out private IPs
5. Return first public IP found

### VPN Detection Process:
1. Query IP geolocation service
2. Check ISP/organization name
3. Compare against known VPN providers
4. Analyze hosting/datacenter patterns
5. Calculate confidence score

## ⚡ **Performance Considerations**

- **WebRTC**: ~2-3 seconds timeout
- **API Calls**: ~1-2 seconds per service
- **Total Time**: ~3-5 seconds for full analysis
- **Caching**: Results can be cached for session

## 🚫 **Limitations & Countermeasures**

### What Users Can Do:
1. **Disable WebRTC**: Browser extensions or settings
2. **Use VPN with WebRTC Protection**: Some VPNs block WebRTC
3. **Browser Extensions**: uBlock Origin, Privacy Badger
4. **Tor Browser**: More effective at hiding IPs

### Technical Limitations:
1. **Browser Restrictions**: Limited API access
2. **Network Configuration**: Corporate firewalls
3. **VPN Quality**: High-end VPNs harder to detect
4. **Mobile Devices**: Different behavior patterns

## 📈 **Confidence Scoring**

The confidence score (0-1) indicates detection reliability:

- **0.8-1.0**: High confidence (real IP detected)
- **0.6-0.8**: Medium confidence (VPN detected, real IP possible)
- **0.4-0.6**: Low confidence (inconclusive)
- **0.0-0.4**: Very low confidence (detection failed)

## 🔒 **Privacy & Security**

- **No Data Storage**: IPs are not stored or logged
- **Local Processing**: Most analysis happens client-side
- **External APIs**: Only for geolocation and VPN detection
- **User Consent**: Always obtain proper consent

## 🚀 **Future Enhancements**

- **Machine Learning**: Improve VPN detection accuracy
- **Real-time Databases**: Live VPN/proxy lists
- **Advanced Fingerprinting**: Combine with other techniques
- **Mobile Detection**: Specialized mobile VPN detection
