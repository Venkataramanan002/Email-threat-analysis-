import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Mail, User, Check } from "lucide-react";
import { oauthService } from "@/services/oauthService";
import { 
  loadAccounts, 
  getActiveAccount, 
  updateActiveAccount,
  initializeFromOAuthProfile,
  AccountObject 
} from "@/services/localAccountService";

interface Props {
  className?: string;
}

export default function AccountSwitcher({ className }: Props) {
  const [accounts, setAccounts] = useState<AccountObject[]>([]);
  const [activeAccount, setActiveAccount] = useState<AccountObject | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Load accounts from localStorage
   */
  const loadAccountsData = () => {
    try {
      const loadedAccounts = loadAccounts();
      const active = getActiveAccount();
      setAccounts(loadedAccounts);
      setActiveAccount(active);
    } catch (error) {
      console.error('Failed to load accounts:', error);
    }
  };

  /**
   * Render accounts dropdown - rebuilds dropdown content
   */
  const renderAccountsDropdown = () => {
    loadAccountsData();
  };

  /**
   * Update active account UI
   */
  const updateActiveAccountUI = useCallback(() => {
    const active = getActiveAccount();
    setActiveAccount(active);
    // Trigger re-render of dropdown
    loadAccountsData();
  }, []);

  /**
   * Handle account selection - switches to selected account
   */
  const onSelect = async (account: AccountObject) => {
    if (!account || !account.email) return;
    
    try {
      // Update active account in localStorage
      updateActiveAccount(account);
      updateActiveAccountUI();
      
      // Initiate OAuth flow with select_account prompt
      await oauthService.switchToGoogle(account.email);
    } catch (error) {
      console.error('Failed to switch account:', error);
    }
  };

  /**
   * Handle adding a new account
   */
  const onAddAccount = async () => {
    try {
      await oauthService.addAccount();
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };

  // Initialize on mount
  useEffect(() => {
    // Initialize from oauth_profile if exists
    initializeFromOAuthProfile();
    
    // Load accounts
    loadAccountsData();
    
    // Listen for active account changes
    const handleAccountChange = () => {
      updateActiveAccountUI();
    };
    
    window.addEventListener('activeAccountChanged', handleAccountChange);
    document.addEventListener('accountUIUpdate', handleAccountChange);
    
    return () => {
      window.removeEventListener('activeAccountChanged', handleAccountChange);
      document.removeEventListener('accountUIUpdate', handleAccountChange);
    };
  }, [updateActiveAccountUI]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            {activeAccount?.profileImgUrl ? (
              <img 
                src={activeAccount.profileImgUrl} 
                alt={activeAccount.email} 
                className="w-4 h-4 rounded-full mr-2"
              />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Accounts
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[14rem]" align="end">
          {loading && (
            <DropdownMenuItem disabled>
              Loading...
            </DropdownMenuItem>
          )}
          {!loading && accounts.length === 0 && (
            <DropdownMenuItem disabled>
              No Google accounts
            </DropdownMenuItem>
          )}
          {!loading && accounts.map((account) => {
            const isCurrent = activeAccount?.email === account.email;
            return (
              <DropdownMenuItem 
                key={account.email} 
                onClick={() => onSelect(account)}
                className={isCurrent ? "bg-blue-500/10" : ""}
              >
                <div className="flex items-center w-full">
                  {account.profileImgUrl ? (
                    <img 
                      src={account.profileImgUrl} 
                      alt={account.email} 
                      className="w-5 h-5 rounded-full mr-2" 
                    />
                  ) : (
                    <User className="w-4 h-4 mr-2" />
                  )}
                  <span className="tahoe-text flex-1">{account.email}</span>
                  {isCurrent && (
                    <Check className="w-4 h-4 text-blue-400 ml-2" />
                  )}
                </div>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onAddAccount}>
            <Mail className="w-4 h-4 mr-2" />
            Add account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
