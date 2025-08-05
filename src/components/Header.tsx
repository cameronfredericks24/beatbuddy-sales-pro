import { RefreshCw, Wifi, WifiOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  showSync?: boolean;
  showAdd?: boolean;
  onSyncClick?: () => void;
  onAddClick?: () => void;
  isOnline?: boolean;
}

const Header = ({ 
  title, 
  showSync = false, 
  showAdd = false, 
  onSyncClick, 
  onAddClick,
  isOnline = true 
}: HeaderProps) => {
  return (
    <div className="bg-gradient-primary text-white px-4 py-3 shadow-card">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <h1 className="text-lg font-semibold text-high">{title}</h1>
        
        <div className="flex items-center gap-2">
          {/* Online/Offline Indicator */}
          <div className="flex items-center gap-1">
            {isOnline ? (
              <Wifi className="w-4 h-4 opacity-75" />
            ) : (
              <WifiOff className="w-4 h-4 opacity-75" />
            )}
          </div>

          {/* Sync Button */}
          {showSync && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSyncClick}
              className="text-white hover:bg-white/20 p-2"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}

          {/* Add Button */}
          {showAdd && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddClick}
              className="text-white hover:bg-white/20 p-2"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;