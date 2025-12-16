const DEV_MODE_KEY = 'dev_mode_enabled';

export function isDevModeEnabled(): boolean {
  return localStorage.getItem(DEV_MODE_KEY) === 'true';
}

export function enableDevMode(): void {
  localStorage.setItem(DEV_MODE_KEY, 'true');
  applyDevModeTheme();
}

export function disableDevMode(): void {
  localStorage.setItem(DEV_MODE_KEY, 'false');
  removeDevModeTheme();
}

export function toggleDevMode(): boolean {
  const current = isDevModeEnabled();
  if (current) {
    disableDevMode();
  } else {
    enableDevMode();
  }
  return !current;
}

export function applyDevModeTheme(): void {
  document.body.classList.add('dev-mode');
}

export function removeDevModeTheme(): void {
  document.body.classList.remove('dev-mode');
}

export function initDevMode(): void {
  if (isDevModeEnabled()) {
    applyDevModeTheme();
  }
}
