import { supabase } from "@/integrations/supabase/client";
import { storeAccount, AccountObject } from "./localAccountService";

export interface OAuthIdentity {
  email: string | null;
  name: string | null;
  picture: string | null;
  provider: string;
  provider_sub: string;
}

export const oauthService = {
  /**
   * Switch to a specific Google account by email
   * Uses select_account prompt to allow user to choose account
   */
  async switchToGoogle(email: string): Promise<void> {
    if (!email) {
      throw new Error('Email is required to switch accounts');
    }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/oauth/callback`,
        scopes: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly',
        queryParams: { 
          login_hint: email, 
          prompt: 'select_account consent' // Use select_account to show account picker
        }
      }
    });
  },

  /**
   * Add a new Google account
   * Uses select_account prompt to show account picker
   */
  async addAccount(): Promise<void> {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/oauth/callback`,
        scopes: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly',
        queryParams: { prompt: 'select_account consent' } // Show account picker
      }
    });
  },

  /**
   * Store account data from OAuth callback
   * Called after successful OAuth authentication
   */
  async storeAccountFromOAuth(profileData: {
    name: string;
    email: string;
    picture?: string;
  }): Promise<void> {
    const account: AccountObject = {
      name: profileData.name,
      email: profileData.email,
      profileImgUrl: profileData.picture || ''
    };
    storeAccount(account);
  }
};
