import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { 
  User,
  RefreshCw,
  Globe,
  HelpCircle,
  LogOut,
  Settings,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  Languages,
  BookOpen
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [language, setLanguage] = useState("english");

  const handleSync = async () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: "Sync completed",
        description: "All data is up to date",
      });
    }, 2000);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
    });
    navigate("/login");
  };

  const userProfile = {
    name: "Rajesh Kumar",
    role: "Sales Representative",
    zone: "Mumbai North",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@company.com",
    joinDate: "Jan 2022",
    lastSync: "2 minutes ago"
  };

  const toggleLanguage = () => {
    const newLang = language === "english" ? "hindi" : "english";
    setLanguage(newLang);
    toast({
      title: "Language changed",
      description: `Switched to ${newLang === "english" ? "English" : "हिंदी"}`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Profile" />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Profile Header */}
        <Card className="p-6 bg-gradient-card shadow-card text-center">
          <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold text-2xl">RK</span>
          </div>
          
          <h2 className="text-xl font-bold text-text-high mb-1">{userProfile.name}</h2>
          <p className="text-text-medium text-sm mb-2">{userProfile.role}</p>
          
          <div className="flex items-center justify-center gap-1 mb-4">
            <MapPin className="w-3 h-3 text-text-medium" />
            <span className="text-text-medium text-xs">{userProfile.zone}</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-success">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Active since {userProfile.joinDate}</span>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Contact Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-text-medium" />
              <div>
                <p className="text-text-high text-sm font-medium">{userProfile.phone}</p>
                <p className="text-text-low text-xs">Mobile Number</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-text-medium" />
              <div>
                <p className="text-text-high text-sm font-medium">{userProfile.email}</p>
                <p className="text-text-low text-xs">Email Address</p>
              </div>
            </div>
          </div>
        </Card>

        {/* App Settings */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <h3 className="font-semibold text-text-high mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            App Settings
          </h3>
          
          <div className="space-y-4">
            {/* Data Sync */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className={`w-4 h-4 text-primary ${isSyncing ? "animate-spin" : ""}`} />
                <div>
                  <p className="text-text-high text-sm font-medium">Sync Data</p>
                  <p className="text-text-low text-xs">Last sync: {userProfile.lastSync}</p>
                </div>
              </div>
              <Button 
                onClick={handleSync}
                disabled={isSyncing}
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary-light"
              >
                {isSyncing ? "Syncing..." : "Sync Now"}
              </Button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Languages className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-text-high text-sm font-medium">Language</p>
                  <p className="text-text-low text-xs">
                    {language === "english" ? "English" : "हिंदी"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-medium">EN</span>
                <Switch 
                  checked={language === "hindi"}
                  onCheckedChange={toggleLanguage}
                />
                <span className="text-xs text-text-medium">हि</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          {/* Help & Training */}
          <Button
            variant="outline"
            className="w-full h-12 justify-start border-info text-info hover:bg-info-light"
            onClick={() => {
              toast({
                title: "Help & Training",
                description: "Opening help resources...",
              });
            }}
          >
            <HelpCircle className="w-4 h-4 mr-3" />
            <div className="text-left">
              <p className="font-medium">Help & Training</p>
              <p className="text-xs opacity-75">Get support and learn new features</p>
            </div>
          </Button>

          {/* Knowledge Base */}
          <Button
            variant="outline"
            className="w-full h-12 justify-start border-warning text-warning hover:bg-warning-light"
            onClick={() => {
              toast({
                title: "Knowledge Base",
                description: "Opening product information...",
              });
            }}
          >
            <BookOpen className="w-4 h-4 mr-3" />
            <div className="text-left">
              <p className="font-medium">Product Knowledge</p>
              <p className="text-xs opacity-75">Browse product catalog and schemes</p>
            </div>
          </Button>

          {/* Attendance */}
          <Button
            variant="outline"
            className="w-full h-12 justify-start border-success text-success hover:bg-success-light"
            onClick={() => navigate("/attendance")}
          >
            <Calendar className="w-4 h-4 mr-3" />
            <div className="text-left">
              <p className="font-medium">Attendance</p>
              <p className="text-xs opacity-75">View and manage attendance</p>
            </div>
          </Button>
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 border-error text-error hover:bg-error-light font-semibold"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-text-low text-xs">
            Field Sales Pro v2.1.0 • Build 2024.08.05
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;