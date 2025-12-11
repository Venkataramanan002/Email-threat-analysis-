/**
 * Client-side account management service using localStorage
 * Manages multiple Google OAuth accounts with persistent storage
 */

export interface AccountObject {
  name: string;
  email: string;
  profileImgUrl: string;
}

const ACCOUNTS_KEY = 'accounts';
const ACTIVE_ACCOUNT_KEY = 'activeAccount';

/**
 * Store an account in localStorage.accounts
 * If account doesn't exist, adds it. Always updates activeAccount.
 */
export function storeAccount(user: AccountObject): void {
  try {
    const accounts = loadAccounts();
    
    // Check if account already exists by email
    const existingIndex = accounts.findIndex(acc => acc.email === user.email);
    
    if (existingIndex === -1) {
      // Add new account
      accounts.push(user);
    } else {
      // Update existing account
      accounts[existingIndex] = user;
    }
    
    // Save updated accounts array
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    
    // Always update active account
    updateActiveAccount(user);
  } catch (error) {
    console.error('Failed to store account:', error);
    throw error;
  }
}

/**
 * Load all accounts from localStorage.accounts
 * Returns empty array if key doesn't exist
 */
export function loadAccounts(): AccountObject[] {
  try {
    const accountsJson = localStorage.getItem(ACCOUNTS_KEY);
    if (!accountsJson) {
      return [];
    }
    return JSON.parse(accountsJson) as AccountObject[];
  } catch (error) {
    console.error('Failed to load accounts:', error);
    return [];
  }
}

/**
 * Update the active account in localStorage.activeAccount
 * Always calls updateActiveAccountUI() after updating
 */
export function updateActiveAccount(user: AccountObject): void {
  try {
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, JSON.stringify(user));
    updateActiveAccountUI();
  } catch (error) {
    console.error('Failed to update active account:', error);
    throw error;
  }
}

/**
 * Get the current active account from localStorage
 */
export function getActiveAccount(): AccountObject | null {
  try {
    const activeAccountJson = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
    if (!activeAccountJson) {
      return null;
    }
    return JSON.parse(activeAccountJson) as AccountObject;
  } catch (error) {
    console.error('Failed to get active account:', error);
    return null;
  }
}

/**
 * Update the UI to reflect the currently active account
 * This function should be called whenever the active account changes
 */
export function updateActiveAccountUI(): void {
  const activeAccount = getActiveAccount();
  
  // Dispatch a custom event that components can listen to
  window.dispatchEvent(new CustomEvent('activeAccountChanged', {
    detail: { activeAccount }
  }));
  
  // Also update any existing UI elements if needed
  // This can be extended to update specific DOM elements
  if (typeof document !== 'undefined') {
    const event = new CustomEvent('accountUIUpdate', {
      detail: { activeAccount }
    });
    document.dispatchEvent(event);
  }
}

/**
 * Initialize accounts from oauth_profile if it exists
 * This is called on page load to ensure state consistency
 */
export function initializeFromOAuthProfile(): void {
  try {
    const oauthProfileJson = localStorage.getItem('oauth_profile');
    if (!oauthProfileJson) {
      return;
    }
    
    const oauthProfile = JSON.parse(oauthProfileJson);
    if (oauthProfile.email && oauthProfile.name) {
      const account: AccountObject = {
        name: oauthProfile.name,
        email: oauthProfile.email,
        profileImgUrl: oauthProfile.picture || ''
      };
      
      // Store the account and set as active
      storeAccount(account);
    }
  } catch (error) {
    console.error('Failed to initialize from OAuth profile:', error);
  }
}

