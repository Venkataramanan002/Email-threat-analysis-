const SESSION_START_KEY = 'user_session_start';
const TOTAL_TIME_KEY = 'user_total_time_spent';
const LAST_ACTIVE_KEY = 'user_last_active';

export interface SessionTimeInfo {
  sessionStart: number;
  totalTimeSpent: number;
  formattedSessionDuration: string;
  formattedTotalTime: string;
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

export function initializeSession(userEmail: string): void {
  if (!userEmail) return;
  
  const sessionKey = `${SESSION_START_KEY}_${userEmail}`;
  const lastActiveKey = `${LAST_ACTIVE_KEY}_${userEmail}`;
  const totalTimeKey = `${TOTAL_TIME_KEY}_${userEmail}`;
  
  try {
    const existingStart = localStorage.getItem(sessionKey);
    const lastActive = localStorage.getItem(lastActiveKey);
    
    if (!existingStart) {
      localStorage.setItem(sessionKey, Date.now().toString());
    }
    
    // If there was a previous session that wasn't properly closed,
    // add the time from last active to now as missed session time
    if (lastActive) {
      const lastActiveTime = parseInt(lastActive, 10);
      const sessionStart = parseInt(existingStart || Date.now().toString(), 10);
      const previousSessionTime = lastActiveTime - sessionStart;
      
      if (previousSessionTime > 0) {
        const previousTotal = parseInt(localStorage.getItem(totalTimeKey) || '0', 10);
        localStorage.setItem(totalTimeKey, (previousTotal + previousSessionTime).toString());
        // Reset session start for new session
        localStorage.setItem(sessionKey, Date.now().toString());
      }
    }
    
    // Update last active time
    localStorage.setItem(lastActiveKey, Date.now().toString());
    
    // Set up periodic updates
    setupPeriodicUpdate(userEmail);
  } catch (error) {
    console.warn('Failed to initialize session:', error);
  }
}

let updateInterval: ReturnType<typeof setInterval> | null = null;

function setupPeriodicUpdate(userEmail: string): void {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  
  // Update last active time every 30 seconds
  updateInterval = setInterval(() => {
    try {
      const lastActiveKey = `${LAST_ACTIVE_KEY}_${userEmail}`;
      localStorage.setItem(lastActiveKey, Date.now().toString());
    } catch {}
  }, 30000);
  
  // Also update on page unload
  const handleUnload = () => {
    try {
      updateTotalTimeSpent(userEmail);
    } catch {}
  };
  
  window.removeEventListener('beforeunload', handleUnload);
  window.addEventListener('beforeunload', handleUnload);
}

export function getSessionTimeInfo(userEmail: string): SessionTimeInfo {
  if (!userEmail) {
    return {
      sessionStart: Date.now(),
      totalTimeSpent: 0,
      formattedSessionDuration: '0s',
      formattedTotalTime: '0s'
    };
  }
  
  const sessionKey = `${SESSION_START_KEY}_${userEmail}`;
  const totalTimeKey = `${TOTAL_TIME_KEY}_${userEmail}`;
  
  try {
    let sessionStart = parseInt(localStorage.getItem(sessionKey) || '0', 10);
    if (!sessionStart) {
      sessionStart = Date.now();
      localStorage.setItem(sessionKey, sessionStart.toString());
    }
    
    const currentSessionDuration = Date.now() - sessionStart;
    
    const previousTotalTime = parseInt(localStorage.getItem(totalTimeKey) || '0', 10);
    const totalTimeSpent = previousTotalTime + currentSessionDuration;

    return {
      sessionStart,
      totalTimeSpent,
      formattedSessionDuration: formatDuration(currentSessionDuration),
      formattedTotalTime: formatDuration(totalTimeSpent)
    };
  } catch (error) {
    console.warn('Failed to get session time info:', error);
    return {
      sessionStart: Date.now(),
      totalTimeSpent: 0,
      formattedSessionDuration: '0s',
      formattedTotalTime: '0s'
    };
  }
}

export function updateTotalTimeSpent(userEmail: string): void {
  const sessionKey = `${SESSION_START_KEY}_${userEmail}`;
  const totalTimeKey = `${TOTAL_TIME_KEY}_${userEmail}`;
  
  const sessionStart = parseInt(localStorage.getItem(sessionKey) || '0', 10);
  if (sessionStart) {
    const sessionDuration = Date.now() - sessionStart;
    const previousTotal = parseInt(localStorage.getItem(totalTimeKey) || '0', 10);
    localStorage.setItem(totalTimeKey, (previousTotal + sessionDuration).toString());
    localStorage.setItem(sessionKey, Date.now().toString());
  }
}

export function getFirstLoginDate(userEmail: string): string {
  const sessionKey = `${SESSION_START_KEY}_${userEmail}`;
  const sessionStart = parseInt(localStorage.getItem(sessionKey) || '0', 10);
  
  if (sessionStart) {
    return new Date(sessionStart).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  return 'Not available';
}
