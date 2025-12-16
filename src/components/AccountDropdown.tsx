import { useState, useEffect, useRef } from "react";
import { User, Shield, Globe, FileText, Sparkles, Check, LogOut, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isDevModeEnabled, toggleDevMode } from "@/services/devModeService";
import { getSessionTimeInfo, getFirstLoginDate } from "@/services/sessionTimeService";
import { ipService } from "@/services/ipService";

interface AccountDropdownProps {
  userEmail: string;
  userName?: string;
  userPicture?: string;
  onLogout: () => void;
}

const AccountDropdown = ({ userEmail, userName, userPicture, onLogout }: AccountDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [devMode, setDevMode] = useState(isDevModeEnabled());
  const [userIP, setUserIP] = useState<string>("Detecting...");
  const [sessionInfo, setSessionInfo] = useState({ formattedTotalTime: "Calculating...", formattedSessionDuration: "0s" });
  const [firstLogin, setFirstLogin] = useState<string>("Not available");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const data = await ipService.getIPData();
        if (data?.ip) {
          setUserIP(data.ip);
        }
      } catch {
        setUserIP("Not available");
      }
    };
    fetchIP();
  }, []);

  useEffect(() => {
    if (userEmail) {
      const info = getSessionTimeInfo(userEmail);
      setSessionInfo({
        formattedTotalTime: info.formattedTotalTime,
        formattedSessionDuration: info.formattedSessionDuration
      });
      setFirstLogin(getFirstLoginDate(userEmail));

      const interval = setInterval(() => {
        const updatedInfo = getSessionTimeInfo(userEmail);
        setSessionInfo({
          formattedTotalTime: updatedInfo.formattedTotalTime,
          formattedSessionDuration: updatedInfo.formattedSessionDuration
        });
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [userEmail]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDevModeToggle = () => {
    const newState = toggleDevMode();
    setDevMode(newState);
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-blue-400/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
      >
        {userPicture ? (
          <img src={userPicture} alt={userName || "User"} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-400" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 tahoe-glass rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {userPicture ? (
                <img src={userPicture} alt={userName || "User"} className="w-12 h-12 rounded-full border-2 border-white/20" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 flex items-center justify-center border border-white/20">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{userName || "User"}</p>
                <p className="text-sm opacity-70 truncate">{userEmail}</p>
              </div>
              {devMode && (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40">DEV</Badge>
              )}
            </div>
          </div>

          <div className="p-3 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
              <Globe className="w-4 h-4 opacity-70" />
              <div className="flex-1">
                <p className="text-sm font-medium">Your IP Address</p>
                <p className="text-xs opacity-70 font-mono">{userIP}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
              <Clock className="w-4 h-4 opacity-70" />
              <div className="flex-1">
                <p className="text-sm font-medium">Session Time</p>
                <p className="text-xs opacity-70">{sessionInfo.formattedSessionDuration} (Total: {sessionInfo.formattedTotalTime})</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
              <Shield className="w-4 h-4 opacity-70" />
              <div className="flex-1">
                <p className="text-sm font-medium">First Login</p>
                <p className="text-xs opacity-70">{firstLogin}</p>
              </div>
            </div>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 opacity-70" />
              <span className="text-sm">Terms & Conditions</span>
            </a>
          </div>

          <div className="p-3 border-t border-white/10">
            <button
              onClick={handleDevModeToggle}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                devMode
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 text-white border border-emerald-400/30 hover:from-emerald-600 hover:to-emerald-500 shadow-lg shadow-emerald-500/20"
              }`}
              style={{
                backdropFilter: "blur(12px)",
              }}
            >
              {devMode ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Dev Mode Active</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Subscribe for Dev</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 border-t border-white/10">
            <Button
              onClick={onLogout}
              variant="ghost"
              className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
