import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  MapPin, 
  TrendingUp, 
  Target, 
  Trophy, 
  Megaphone, 
  Clock,
  CheckCircle,
  Store
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const navigate = useNavigate();

  const kpiData = [
    { label: "Today's Orders", value: "8", icon: Store, color: "text-success" },
    { label: "Sales Today", value: "₹45,250", icon: TrendingUp, color: "text-primary" },
    { label: "Month Achievement", value: "78%", icon: Target, color: "text-warning" },
  ];

  const handleMarkAttendance = () => {
    setAttendanceMarked(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Field Sales Pro" showSync={true} />
      
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Welcome Section */}
        <div className="bg-gradient-card rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text-high">Good Morning!</h2>
              <p className="text-text-medium text-sm">Rajesh Kumar</p>
              <p className="text-text-low text-xs">Today: {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Store className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Attendance Status */}
        {!attendanceMarked ? (
          <Card className="p-4 border-l-4 border-l-warning bg-warning-light">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-warning" />
                <div>
                  <p className="font-medium text-text-high">Mark Attendance</p>
                  <p className="text-sm text-text-medium">Start your day</p>
                </div>
              </div>
              <Button 
                onClick={handleMarkAttendance}
                className="bg-warning hover:bg-warning/90 text-warning-foreground"
              >
                Check In
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-4 border-l-4 border-l-success bg-success-light">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="font-medium text-text-high">Attendance marked</p>
                <p className="text-sm text-text-medium">9:00 AM ✅</p>
              </div>
            </div>
          </Card>
        )}

        {/* KPIs Section */}
        <div>
          <h3 className="text-base font-semibold text-text-high mb-3">Today's Performance</h3>
          <div className="grid grid-cols-1 gap-3">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="p-4 bg-gradient-card shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${kpi.color}`}>
                      <kpi.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-text-medium">{kpi.label}</p>
                      <p className="text-xl font-bold text-text-high">{kpi.value}</p>
                    </div>
                  </div>
                  {kpi.label === "Month Achievement" && (
                    <div className="w-16">
                      <Progress value={78} className="h-2" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <Card className="p-4 bg-info-light border-l-4 border-l-info">
          <div className="flex items-start gap-3">
            <div className="bg-info/20 p-2 rounded-lg">
              <Megaphone className="w-4 h-4 text-info" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-text-high text-sm">New Scheme Alert!</h4>
              <p className="text-text-medium text-xs mt-1">
                Tea Powder: 5% extra discount this week. Boost your sales!
              </p>
            </div>
          </div>
        </Card>

        {/* Beat Plan CTA */}
        <Card className="p-4 bg-gradient-primary text-white shadow-elevated">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Today's Beat</h4>
                <p className="text-white/80 text-sm">12 outlets to visit</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/visits")}
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Start
            </Button>
          </div>
        </Card>

        {/* Gamification Snippet */}
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-warning/20 p-2 rounded-lg">
                <Trophy className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h4 className="font-medium text-text-high text-sm">Your Rank</h4>
                <p className="text-text-medium text-xs">5th (West Zone)</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/leaderboard")}
              variant="outline" 
              size="sm"
              className="text-primary border-primary hover:bg-primary-light"
            >
              View Leaderboard
            </Button>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;