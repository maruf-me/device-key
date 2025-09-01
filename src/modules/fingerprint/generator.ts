/**
 * Hash a message using SHA-256 and return hex string.
 * @param msg Input message
 */
export const sha256 = async (msg: string): Promise<string> => {
  const data = new TextEncoder().encode(msg);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Collect basic device info for fingerprinting.
 */
export const collectBasicInfo = (): string => {
  const nav = navigator;
  return [
    nav.userAgent,
    nav.platform,
    screen.width + "x" + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    nav.language,
    (nav as any).deviceMemory ?? "",
    (nav as any).hardwareConcurrency ?? "",
  ].join("::");
};

/**
 * Create a canvas fingerprint string.
 */
export const getCanvasFingerprint = (): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  canvas.width = 200;
  canvas.height = 50;
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillStyle = "#f60";
  ctx.fillRect(0, 0, 200, 50);
  ctx.fillStyle = "#069";
  ctx.fillText("canvas fingerprint test", 2, 2);
  return canvas.toDataURL();
};

/**
 * Create a WebGL fingerprint string.
 */
export const getWebGLFingerprint = (): string => {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  if (!gl) return "";
  const ext = gl.getExtension("WEBGL_debug_renderer_info");
  const vendor = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : "";
  const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "";
  return `${vendor}::${renderer}`;
};

/**
 * Generate a unique device fingerprint using basic info + canvas + WebGL.
 */
export const generateFingerprint = async (): Promise<string> => {
  const data =
    collectBasicInfo() +
    "|" +
    getCanvasFingerprint() +
    "|" +
    getWebGLFingerprint();
  return sha256(data);
};
