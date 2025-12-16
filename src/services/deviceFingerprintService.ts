export interface DeviceFingerprint {
  hash: string;
  userAgent: string;
  platform: string;
  screenResolution: string;
  colorDepth: number;
  timezone: string;
  language: string;
  languages: string[];
  hardwareConcurrency: number;
  deviceMemory: number | null;
  touchSupport: boolean;
  cookiesEnabled: boolean;
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).toUpperCase();
}

export function generateDeviceFingerprint(): DeviceFingerprint {
  const userAgent = navigator.userAgent || 'Unknown';
  const platform = navigator.platform || 'Unknown';
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const colorDepth = window.screen.colorDepth || 24;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
  const language = navigator.language || 'en-US';
  const languages = Array.from(navigator.languages || [language]);
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as any).deviceMemory || null;
  const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const cookiesEnabled = navigator.cookieEnabled;

  const fingerprintData = [
    userAgent,
    platform,
    screenResolution,
    colorDepth.toString(),
    timezone,
    language,
    languages.join(','),
    hardwareConcurrency.toString(),
    deviceMemory?.toString() || 'N/A',
    touchSupport.toString(),
    cookiesEnabled.toString()
  ].join('|');

  const hash = `FP_${hashString(fingerprintData)}`;

  return {
    hash,
    userAgent,
    platform,
    screenResolution,
    colorDepth,
    timezone,
    language,
    languages,
    hardwareConcurrency,
    deviceMemory,
    touchSupport,
    cookiesEnabled
  };
}

export function getDeviceFingerprintHash(): string {
  const fp = generateDeviceFingerprint();
  return fp.hash;
}

export function getDeviceInfo(): string {
  const fp = generateDeviceFingerprint();
  const browserMatch = fp.userAgent.match(/(Chrome|Safari|Firefox|Edge|Opera)\/[\d.]+/);
  const browser = browserMatch ? browserMatch[1] : 'Browser';
  const osMatch = fp.platform.match(/(Win|Mac|Linux|Android|iOS)/i);
  const os = osMatch ? osMatch[0] : fp.platform;
  return `${browser}/${os} (${fp.screenResolution})`;
}
