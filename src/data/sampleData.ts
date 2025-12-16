
export interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: string;
  userId?: string;
  ipAddress: string;
  location: string;
  deviceFingerprint?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: string;
  details: string;
  riskScore?: number;
  userAgent?: string;
}

export interface UserSession {
  userId: string;
  email: string;
  deviceType: string;
  ipAddress: string;
  location: string;
  deviceFingerprint: string;
  sessionStart: string;
  riskScore: number;
  riskLevel: string;
  activities: SecurityEvent[];
}

export interface ThreatIntelligence {
  ipAddress: string;
  threatType: string;
  confidenceScore: number;
  riskLevel: string;
  lastSeen: string;
  associatedCampaigns: string[];
}

export interface BotDetection {
  ipAddress: string;
  botScore: number;
  botType: string;
  detectionReasons: string[];
  recommendedAction: string;
  confidence: string;
}

function generateDeterministicFingerprint(): string {
  const userAgent = navigator?.userAgent || 'Unknown';
  const platform = navigator?.platform || 'Unknown';
  const screenRes = typeof window !== 'undefined' ? `${window.screen?.width || 0}x${window.screen?.height || 0}` : '0x0';
  const timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || 'Unknown';
  const language = navigator?.language || 'en-US';
  
  const data = `${userAgent}|${platform}|${screenRes}|${timezone}|${language}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `FP_${Math.abs(hash).toString(36).toUpperCase()}`;
}

// Dynamic sample data that adapts to current user
export const getCurrentUserSession = (email?: string): UserSession => {
  const defaultEmail = email || "user@example.com";
  const riskScore = calculateDynamicRiskScore(defaultEmail);
  
  return {
    userId: `USER_${defaultEmail.split('@')[0]}`,
    email: defaultEmail,
    deviceType: "Desktop (Chrome, Windows 10)",
    ipAddress: generateRandomIP(),
    location: getDynamicLocation(defaultEmail),
    deviceFingerprint: generateDeterministicFingerprint(),
    sessionStart: new Date().toISOString(),
    riskScore,
    riskLevel: riskScore > 70 ? "Critical" : riskScore > 40 ? "High" : "Medium",
    activities: generateDynamicEvents(defaultEmail, riskScore)
  };
};

const calculateDynamicRiskScore = (email: string): number => {
  let score = Math.random() * 30 + 30; // Base score 30-60
  
  if (email.includes('admin') || email.includes('root')) score += 25;
  if (email.includes('.gov') || email.includes('.mil')) score += 20;
  if (email.includes('temp') || email.includes('test')) score += 30;
  if (email.includes('security') || email.includes('it')) score += 15;
  if (email.length < 10) score += 10;
  
  return Math.min(100, Math.round(score));
};

const generateRandomIP = (): string => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

const getDynamicLocation = (email: string): string => {
  const domains = email.split('@')[1] || '';
  
  if (domains.includes('.gov')) return "Washington, DC, USA";
  if (domains.includes('.edu')) return "Boston, MA, USA";
  if (domains.includes('.co.uk')) return "London, UK";
  if (domains.includes('.de')) return "Berlin, Germany";
  if (domains.includes('.au')) return "Sydney, Australia";
  
  const locations = ["New York, USA", "San Francisco, USA", "London, UK", "Tokyo, Japan", "Sydney, Australia"];
  return locations[Math.floor(Math.random() * locations.length)];
};

const generateDynamicEvents = (email: string, riskScore: number): SecurityEvent[] => {
  const severity = riskScore > 70 ? 'critical' : riskScore > 50 ? 'high' : riskScore > 30 ? 'medium' : 'low';
  
  return [
    {
      id: `evt_${Date.now()}_001`,
      timestamp: new Date().toISOString(),
      eventType: "User Authentication",
      userId: `USER_${email.split('@')[0]}`,
      ipAddress: generateRandomIP(),
      location: getDynamicLocation(email),
      severity: 'low',
      status: "success",
      details: `Successful login for ${email}`,
    },
    {
      id: `evt_${Date.now()}_002`,
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      eventType: "Risk Assessment",
      userId: `USER_${email.split('@')[0]}`,
      ipAddress: generateRandomIP(),
      location: getDynamicLocation(email),
      severity,
      status: "detected",
      details: `Risk score calculated: ${riskScore}/100 for user profile analysis`,
      riskScore
    }
  ];
};

// Empty fallback data - real data comes from authenticated user
export const sampleSecurityEvents: SecurityEvent[] = [];

export const sampleUserSession: UserSession = getCurrentUserSession();

export const sampleThreatIntelligence: ThreatIntelligence[] = [];

export const sampleBotDetection: BotDetection[] = [];

// Empty metrics fallback - real metrics are derived from Gmail/behavior data
export const sampleMetrics = {
  activeUsers: 0,
  threatsDetected: 0,
  threatsBlocked: 0,
  botTraffic: 0,
  userGrowth: "N/A",
  threatGrowth: "N/A",
  blockRate: "N/A",
  botPercentage: "N/A"
};

// Empty hourly data fallback - real data is derived from email timestamps
export const sampleHourlyThreatData: { hour: string; bots: number; fraud: number; attacks: number }[] = [];
